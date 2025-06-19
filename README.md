# Makerkit - Supabase SaaS Starter Kit - Turbo Edition

This is a Starter Kit for building SaaS applications using Supabase, Next.js, and Tailwind CSS.

A demo version of this project can be found at [makerkit/next-supabase-saas-kit-turbo-demo](https://github.com/makerkit/next-supabase-saas-kit-turbo-demo). This version contains a tasks functionality that is not present in the original version, multiple languages, and other various modifications.

## 📖 文档

- [官方文档 - 快速开始](https://makerkit.dev/docs/next-supabase-turbo/introduction)
- [项目部署指南](./dev-note/deployment-guide.md) - 本地开发和生产部署策略
- [开发指南](./CLAUDE.md) - 详细的开发规范和最佳实践

## 🚀 快速开始

### 本地开发
```bash
# 安装依赖
pnpm install

# 启动 Supabase 本地环境
pnpm supabase:web:start

# 重置数据库（首次运行）
pnpm supabase:web:reset

# 生成 TypeScript 类型
pnpm supabase:web:typegen

# 启动开发服务器
pnpm dev
```

### 部署到生产环境
```bash
# 部署数据库到 Supabase Cloud
export SUPABASE_PROJECT_REF="你的项目ID"
pnpm supabase:deploy

# 构建应用
pnpm build

# 启动生产服务器
pnpm --filter web start
```

## 🏗 项目架构

### 环境策略
- **本地开发**: Supabase Local
- **测试环境**: 阿里云服务器 + Supabase Cloud
- **生产环境**: 阿里云服务器 + Supabase Cloud

### 应用结构
- `apps/web` - 主 SaaS 应用 (端口 3000)
- `apps/dev-tool` - 开发工具 (端口 3010)
- `apps/e2e` - 端到端测试
- `packages/` - 共享组件和工具包

**Please remember to update the repository daily**.