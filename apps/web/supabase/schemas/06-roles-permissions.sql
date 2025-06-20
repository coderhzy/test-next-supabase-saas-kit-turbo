/*
 * -------------------------------------------------------
 * Section: Role Permissions
 * We create the schema for the role permissions. Role permissions are the permissions for a role.
 * For example, the 'owner' role might have the 'roles.manage' permission.
 * -------------------------------------------------------
 
 */
-- Create table for roles permissions
create table if not exists
  public.role_permissions (
    id bigint generated by default as identity primary key,
    role varchar(50) references public.roles (name) not null,
    permission public.app_permissions not null,
    unique (role, permission)
  );

comment on table public.role_permissions is 'The permissions for a role';

comment on column public.role_permissions.role is 'The role the permission is for';

comment on column public.role_permissions.permission is 'The permission for the role';

-- Indexes on the role_permissions table
create index ix_role_permissions_role on public.role_permissions (role);

-- Revoke all on role_permissions table from authenticated and service_role
revoke all on public.role_permissions
from
  authenticated,
  service_role;

-- Open up access to role_permissions table for authenticated users and service_role
grant
select
,
  insert,
update,
delete on table public.role_permissions to service_role;

-- Authenticated users can read role permissions
grant
select
  on table public.role_permissions to authenticated;

-- Function "public.has_permission"
-- Create a function to check if a user has a permission
create
or replace function public.has_permission (
  user_id uuid,
  account_id uuid,
  permission_name public.app_permissions
) returns boolean
set
  search_path = '' as $$
begin
    return exists(
        select
            1
        from
            public.accounts_memberships
	    join public.role_permissions on
		accounts_memberships.account_role =
		role_permissions.role
        where
            accounts_memberships.user_id = has_permission.user_id
            and accounts_memberships.account_id = has_permission.account_id
            and role_permissions.permission = has_permission.permission_name);

end;

$$ language plpgsql;

grant
execute on function public.has_permission (uuid, uuid, public.app_permissions) to authenticated,
service_role;

-- Function "public.has_more_elevated_role"
-- Check if a user has a more elevated role than the target role
create
or replace function public.has_more_elevated_role (
  target_user_id uuid,
  target_account_id uuid,
  role_name varchar
) returns boolean
set
  search_path = '' as $$
declare
    declare is_primary_owner boolean;
    user_role_hierarchy_level int;
    target_role_hierarchy_level int;
begin
    -- Check if the user is the primary owner of the account
    select
        exists (
            select
                1
            from
                public.accounts
            where
                id = target_account_id
                and primary_owner_user_id = target_user_id) into is_primary_owner;

    -- If the user is the primary owner, they have the highest role and can
    --   perform any action
    if is_primary_owner then
        return true;
    end if;

    -- Get the hierarchy level of the user's role within the account
    select
        hierarchy_level into user_role_hierarchy_level
    from
        public.roles
    where
        name =(
            select
                account_role
            from
                public.accounts_memberships
            where
                account_id = target_account_id
                and target_user_id = user_id);

    if user_role_hierarchy_level is null then
        return false;
    end if;

    -- Get the hierarchy level of the target role
    select
        hierarchy_level into target_role_hierarchy_level
    from
        public.roles
    where
        name = role_name;

    -- If the target role does not exist, the user cannot perform the action
    if target_role_hierarchy_level is null then
        return false;
    end if;

    -- If the user's role is higher than the target role, they can perform
    --   the action
    return user_role_hierarchy_level < target_role_hierarchy_level;

end;

$$ language plpgsql;

grant
execute on function public.has_more_elevated_role (uuid, uuid, varchar) to authenticated,
service_role;

-- Function "public.has_same_role_hierarchy_level"
-- Check if a user has the same role hierarchy level as the target role
create
or replace function public.has_same_role_hierarchy_level (
  target_user_id uuid,
  target_account_id uuid,
  role_name varchar
) returns boolean
set
  search_path = '' as $$
declare
    is_primary_owner boolean;
    user_role_hierarchy_level int;
    target_role_hierarchy_level int;
begin
    -- Check if the user is the primary owner of the account
    select
        exists (
            select
                1
            from
                public.accounts
            where
                id = target_account_id
                and primary_owner_user_id = target_user_id) into is_primary_owner;

    -- If the user is the primary owner, they have the highest role and can perform any action
    if is_primary_owner then
        return true;
    end if;

    -- Get the hierarchy level of the user's role within the account
    select
        hierarchy_level into user_role_hierarchy_level
    from
        public.roles
    where
        name =(
            select
                account_role
            from
                public.accounts_memberships
            where
                account_id = target_account_id
                and target_user_id = user_id);

    -- If the user does not have a role in the account, they cannot perform the action
    if user_role_hierarchy_level is null then
        return false;
    end if;

    -- Get the hierarchy level of the target role
    select
        hierarchy_level into target_role_hierarchy_level
    from
        public.roles
    where
        name = role_name;

    -- If the target role does not exist, the user cannot perform the action
    if target_role_hierarchy_level is null then
        return false;
    end if;

   -- check the user's role hierarchy level is the same as the target role
    return user_role_hierarchy_level = target_role_hierarchy_level;

end;

$$ language plpgsql;

grant
execute on function public.has_same_role_hierarchy_level (uuid, uuid, varchar) to authenticated,
service_role;

-- Enable RLS on the role_permissions table
alter table public.role_permissions enable row level security;

-- RLS on the role_permissions table
-- SELECT(role_permissions):
-- Authenticated Users can read global permissions
create policy role_permissions_read on public.role_permissions for
select
  to authenticated using (true);
