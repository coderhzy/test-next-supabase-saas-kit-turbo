# 部署指南

> 本文档记录了项目的部署策略和具体实施方案，供后续开发和运维参考。

## 🎯 环境架构

### 确定的部署架构
```
本地开发 (Supabase Local)
    ↓
测试环境 (阿里云服务器 + Supabase Cloud 测试项目)
    ↓  
生产环境 (阿里云服务器 + Supabase Cloud 生产项目)
```

### 数据库策略
- **数据库**: 使用 Supabase Cloud
- **环境隔离**: 同一个 Supabase 账号下创建不同项目区分测试和生产
- **Schema 管理**: 使用项目内置的 Supabase CLI 管理

## 📦 部署范围

### 当前部署目标
- **主要应用**: `apps/web` (Next.js SaaS 应用)
- **不部署**: `apps/dev-tool`、`apps/e2e` (仅开发和测试用)

### 部署方式选择
**推荐**: Docker 部署
- 项目已提供完整 Dockerfile 模板
- 环境一致性好
- 方便 CI/CD
- 适合渐进式成长

**备选**: Node.js 直接部署
- 快速上线
- 调试方便
- 学习成本低

## 🚀 部署命令参考

### 数据库部署
```bash
# 设置 Supabase 项目引用
export SUPABASE_PROJECT_REF="你的项目ID"

# 部署数据库 schema 到 Supabase Cloud
pnpm supabase:deploy
# 等同于: supabase link --project-ref $SUPABASE_PROJECT_REF && supabase db push
```

### 应用构建
```bash
# 安装依赖
pnpm install

# 构建所有应用
pnpm build

# 或只构建 web 应用
pnpm --filter web build
```

### 应用启动
```bash
# Node.js 方式
pnpm --filter web start

# Docker 方式 (推荐)
docker build -t my-saas .
docker run -p 3000:3000 my-saas
```

## 🛠 环境变量配置

### 测试环境
```bash
NEXT_PUBLIC_SUPABASE_URL=https://test-xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=test-anon-key
SUPABASE_SERVICE_ROLE_KEY=test-service-key
NEXT_PUBLIC_SITE_URL=https://test.yourdomain.com
```

### 生产环境
```bash
NEXT_PUBLIC_SUPABASE_URL=https://prod-xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod-anon-key
SUPABASE_SERVICE_ROLE_KEY=prod-service-key
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## 🔄 CI/CD 规划

### 分支策略
- `develop` 分支 → 自动部署到测试环境
- `main` 分支 → 自动部署到生产环境

### 部署流程
1. 代码推送触发构建
2. Docker 镜像构建
3. 推送到镜像仓库
4. 阿里云服务器拉取镜像
5. 容器化部署

## 📋 多项目管理

当有多个 SaaS 项目时，推荐策略：

### 容器隔离方案
```bash
# 项目 1
docker run -p 3000:3000 --name project-1 project-1-image

# 项目 2  
docker run -p 3001:3000 --name project-2 project-2-image
```

### 反向代理配置
使用 Nginx 进行域名路由：
```nginx
# project-1.yourdomain.com → localhost:3000
# project-2.yourdomain.com → localhost:3001
```

## 🔧 待办事项

- [ ] 查看 MakerKit 官网 CLI 工具
- [ ] 配置 Docker Compose 用于多服务管理
- [ ] 设置监控和日志系统
- [ ] 配置自动备份策略
- [ ] 完善 CI/CD 流水线

## 📚 相关资源

- [MakerKit 官方文档](https://makerkit.dev/docs)
- [Supabase 部署指南](https://supabase.com/docs/guides/platform/deploy)
- 项目内置命令参考: `CLAUDE.md` 第 31-48 行

## 📝 更新记录

- 2025-01-19: 初始版本，确定部署架构和策略