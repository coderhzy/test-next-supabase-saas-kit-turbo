import { EnvMode } from '@/app/variables/lib/types';

import { getVariable } from '../variables/lib/env-scanner';

export function createConnectivityService(mode: EnvMode) {
  return new ConnectivityService(mode);
}

class ConnectivityService {
  constructor(private mode: EnvMode = 'development') {}

  async checkSupabaseConnectivity() {
    const url = await getVariable('NEXT_PUBLIC_SUPABASE_URL', this.mode);

    if (!url) {
      return {
        status: 'error' as const,
        message: 'No Supabase URL found in environment variables',
      };
    }

    const anonKey = await getVariable(
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      this.mode,
    );

    if (!anonKey) {
      return {
        status: 'error' as const,
        message: 'No Supabase Anon Key found in environment variables',
      };
    }

    try {
      const response = await fetch(`${url}/auth/v1/health`, {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      });

      if (!response.ok) {
        return {
          status: 'error' as const,
          message:
            'Failed to connect to Supabase. The Supabase Anon Key or URL is not valid.',
        };
      }

      return {
        status: 'success' as const,
        message: 'Connected to Supabase',
      };
    } catch (error) {
      return {
        status: 'error' as const,
        message: `Failed to connect to Supabase. ${error}`,
      };
    }
  }

  async checkSupabaseAdminConnectivity() {
    const url = await getVariable('NEXT_PUBLIC_SUPABASE_URL', this.mode);

    if (!url) {
      return {
        status: 'error' as const,
        message: 'No Supabase URL found in environment variables',
      };
    }

    const endpoint = `${url}/rest/v1/accounts`;

    const apikey = await getVariable(
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      this.mode,
    );

    if (!apikey) {
      return {
        status: 'error' as const,
        message: 'No Supabase Anon Key found in environment variables',
      };
    }

    const adminKey = await getVariable('SUPABASE_SERVICE_ROLE_KEY', this.mode);

    if (!adminKey) {
      return {
        status: 'error' as const,
        message: 'No Supabase Service Role Key found in environment variables',
      };
    }

    try {
      const response = await fetch(endpoint, {
        headers: {
          apikey,
          Authorization: `Bearer ${adminKey}`,
        },
      });

      if (!response.ok) {
        return {
          status: 'error' as const,
          message:
            'Failed to connect to Supabase Admin. The Supabase Service Role Key is not valid.',
        };
      }

      const data = await response.json();

      if (data.length === 0) {
        return {
          status: 'error' as const,
          message:
            'No accounts found in Supabase Admin. The data may not be seeded. Please run `pnpm run supabase:web:reset` to reset the database.',
        };
      }

      return {
        status: 'success' as const,
        message: 'Connected to Supabase Admin',
      };
    } catch (error) {
      return {
        status: 'error' as const,
        message: `Failed to connect to Supabase Admin. ${error}`,
      };
    }
  }
}
