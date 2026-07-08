# 你该换工作，还是换活法？

CloudBase 静态托管版，纯前端 H5 测试页。

## CloudBase 当前配置

- 目标目录：`./`
- 安装命令：`npm install`
- 构建命令：`npm run build`
- 构建产物目录：`./dist`
- 部署路径：`/`

`npm run build` 会把 `tcb-deploy/public` 复制到 `dist`，不依赖 Vite、Sharp、后端服务或数据库。

## 测试入口

```text
/#/test/work-or-life
```

## 素材工作台

```text
/#/xhs-studio
```

工作台为纯前端页面，支持编辑小红书三页图文、商品详情页、标题库、正文模板、评论话术和自动发货话术。修改内容会自动保存到浏览器 localStorage，可导入/导出 JSON，不需要后端或数据库。
