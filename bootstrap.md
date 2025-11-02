# 1. 创建仓库并初始化
# step 1. 创建根目录
mkdir my-monorepo && cd my-monorepo

# step 2. 初始化 package.json（根目录）
pnpm init

# step 3. 修改 package.json，添加 Monorepo 核心配置
{
  "name": "my-monorepo",
  "private": true, // 根项目不发布到 npm，必须设为 true
  "packageManager": "pnpm@10.19.0", // 锁定 pnpm 版本，避免团队成员版本不一致
  "workspaces": [
    "apps/*",    // 业务应用目录（如 web、h5）
    "packages/*" // 共享包目录（如 ui 组件库、工具库）
  ],
  "scripts": {
    "dev": "turbo run dev", // 并行启动所有子项目的 dev 命令
    "build": "turbo run build", // 并行构建所有子项目
    "lint": "turbo run lint" // 并行执行所有子项目的 lint 命令
  },
  "devDependencies": {
    "turbo": "^1.10.0", // 命令调度和构建缓存工具
    "@types/node": "^20.5.0" // 类型支持（可选，TS 项目需装）
  }
}

# 2. 创建目录结构
step 1：按 workspaces 配置创建目录，最终结构如下：

my-mono/
├─ apps/          # 业务应用（多项目）
│  └─ web/        # 示例：React 业务应用
├─ packages/      # 共享包（多项目）
│  └─ ui/         # 示例：React 组件库
├─ package.json   # 根目录配置
└─ turbo.json     # Turborepo 配置（下一步创建）

step 2：配置 Turborepo（命令调度 + 构建缓存）
在根目录创建 turbo.json，核心解决：
哪些命令需要并行执行（如 dev、build）；
构建缓存规则（哪些文件变化需要重新构建）；
项目间依赖关系（如 web 依赖 ui，ui 构建后才构建 web）。

```
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": [".env", "package.json"], // 根目录文件变化时，所有项目重新构建
  "pipeline": {
    // 1. 开发命令：并行执行，无缓存（开发时实时更新）
    "dev": {
      "cache": false,
      "persistent": true, // 持续运行（如 dev 命令不会退出）
      "dependsOn": ["^dev"] // 子项目 dev 依赖父项目 dev（如 web 依赖 ui 的 dev）
    },
    // 2. 构建命令：有缓存，依赖顺序（先构建依赖项）
    "build": {
      "cache": true,
      "outputs": ["dist/**"], // 构建产物目录，缓存时保留
      "dependsOn": ["^build"], // 先构建依赖的项目（如先 build ui，再 build web）
      "inputs": ["src/**", "package.json"] // 这些文件变化时，重新 build
    },
    // 3. lint 命令：有缓存，并行执行
    "lint": {
      "cache": true,
      "outputs": [], // lint 无产物，只缓存结果
      "inputs": ["src/**", "package.json", ".eslintrc.js"]
    }
  }
}
```

step 3：创建共享包（packages/ui 组件库）




# 3. 
