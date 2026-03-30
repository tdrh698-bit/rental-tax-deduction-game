# Cloudflare Pages 部署指南

## 📋 部署前准备

### 1. GitHub 仓库
- **仓库地址**: https://github.com/tdrh698-bit/rental-tax-deduction-game
- **分支**: `main`
- **Token**: 已配置 (GitHub Personal Access Token)

### 2. 项目文件
- **HTML文件**: 34个
- **配置文件**: `_config.yml`, `package.json`
- **工作流**: `.github/workflows/deploy.yml`
- **总大小**: 约1.9MB

## 🚀 Cloudflare Pages 配置步骤

### 步骤 1: 登录 Cloudflare Dashboard
1. 访问 https://dash.cloudflare.com/
2. 使用你的 Cloudflare 账户登录
3. 确保账户有 Pages 权限

### 步骤 2: 创建 Pages 项目
1. 点击左侧菜单 "Workers & Pages"
2. 点击 "Create application"
3. 选择 "Pages" 选项卡
4. 点击 "Connect to Git"

### 步骤 3: 连接 GitHub
1. 选择 "GitHub" 作为 Git 提供商
2. 点击 "Authorize with GitHub"
3. 授权 Cloudflare 访问你的 GitHub 账户
4. 选择仓库: `tdrh698-bit/rental-tax-deduction-game`

### 步骤 4: 配置构建设置
**重要配置值:**
- **项目名称**: `rental-tax-deduction-game` (自动填充)
- **生产分支**: `main`
- **构建设置**:
  - **框架预设**: `None` (静态站点)
  - **构建命令**: (留空)
  - **构建输出目录**: `/`
  - **根目录**: `/`

### 步骤 5: 环境变量 (可选)
无需特殊环境变量，保持默认即可。

### 步骤 6: 保存并部署
1. 点击 "Save and Deploy"
2. 等待首次构建完成 (约2-3分钟)
3. 构建成功后，会显示默认域名

## 🌐 域名配置

### 默认域名
部署成功后，你会获得:
`https://rental-tax-deduction-game.pages.dev`

### 自定义域名配置
如果你有自定义域名，按以下步骤配置:

#### 1. 添加自定义域名
1. 进入 Pages 项目设置
2. 点击 "Custom domains"
3. 点击 "Set up a custom domain"
4. 输入你的自定义域名

#### 2. DNS 配置
根据你的域名情况:

##### 情况 A: 域名已在 Cloudflare 托管
- Cloudflare 会自动添加 CNAME 记录
- 等待 SSL 证书签发 (约5-30分钟)

##### 情况 B: 域名不在 Cloudflare 托管
需要手动添加 DNS 记录:
- **类型**: CNAME
- **名称**: 子域名 (如 `rental-game`)
- **目标**: `rental-tax-deduction-game.pages.dev`
- **TTL**: 自动

#### 3. SSL 证书
- Cloudflare 会自动签发 SSL 证书
- 强制 HTTPS 会自动启用
- 证书更新自动处理

## 🔧 项目配置详情

### 配置文件: `_config.yml`
```yaml
name: rental-tax-deduction-game
production_branch: main
build:
  command: ""
  output_dir: "/"
routes:
  - path: /*
    status: 200
```

### 路由规则
- 所有路径 (`/*`) 返回 200 状态
- 支持直接访问 HTML 文件
- 支持深层链接

### 缓存策略
- 默认缓存 1 小时
- 静态资源自动优化
- 全球 CDN 分发

## 📊 部署状态检查

### 构建状态
1. 进入 Pages 项目
2. 查看 "Deployments" 选项卡
3. 检查构建日志

### 访问测试
部署完成后，测试以下链接:
1. 主游戏: `https://[你的域名]/auto-advance-game.html`
2. 启动页: `https://[你的域名]/start-game.html`
3. 首页: `https://[你的域名]/game-homepage.html`

### 性能监控
- Cloudflare Analytics 提供访问统计
- 性能指标自动收集
- 错误日志记录

## 🛠️ 故障排除

### 常见问题

#### 1. 构建失败
**可能原因:**
- 配置文件错误
- 权限问题
- 网络问题

**解决方案:**
- 检查构建日志
- 验证 `_config.yml` 格式
- 确保 GitHub Token 有效

#### 2. 访问 404 错误
**可能原因:**
- 文件路径错误
- 路由配置问题
- 缓存问题

**解决方案:**
- 检查文件是否在根目录
- 清除浏览器缓存
- 检查 `_config.yml` 路由配置

#### 3. 自定义域名不工作
**可能原因:**
- DNS 记录未生效
- SSL 证书未签发
- 域名未正确配置

**解决方案:**
- 检查 DNS 记录
- 等待 SSL 证书签发
- 验证域名配置

### 调试命令
```bash
# 检查 GitHub 仓库状态
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/tdrh698-bit/rental-tax-deduction-game

# 检查 Cloudflare Pages 状态
# 需要 Cloudflare API Token
```

## 🔄 自动部署流程

### 触发条件
1. **推送代码到 main 分支**
2. **手动触发部署**
3. **定时构建** (可选配置)

### 部署过程
1. Cloudflare 拉取最新代码
2. 执行构建命令 (如果有)
3. 部署文件到全球 CDN
4. 更新域名指向
5. 清除旧缓存

### 回滚机制
1. 每个部署都有独立版本
2. 可以快速回滚到之前版本
3. 保留构建日志和文件

## 📈 性能优化建议

### 1. 文件优化
- 已优化: HTML 文件压缩
- 建议: 图片压缩 (如果需要添加图片)

### 2. 缓存策略
- 默认: 1小时缓存
- 可调整: 根据需求修改 `_config.yml`

### 3. CDN 设置
- 全球 200+ 个节点
- 自动选择最优节点
- 边缘计算支持

### 4. 安全设置
- 自动 HTTPS
- DDoS 防护
- WAF 规则 (可选)

## 📞 支持与帮助

### 官方文档
- Cloudflare Pages: https://developers.cloudflare.com/pages/
- GitHub Actions: https://docs.github.com/en/actions

### 问题反馈
1. 检查构建日志
2. 查看错误信息
3. 参考本指南故障排除部分

### 紧急联系
- GitHub Issues: 项目仓库 Issues
- Cloudflare Support: Dashboard 支持

## ✅ 部署检查清单

- [ ] Cloudflare 账户已登录
- [ ] GitHub 仓库已授权
- [ ] 项目名称正确
- [ ] 构建设置正确
- [ ] 首次构建成功
- [ ] 默认域名可访问
- [ ] 自定义域名配置 (可选)
- [ ] SSL 证书生效
- [ ] 所有游戏文件可访问

---

**最后更新**: 2026-03-30  
**文档状态**: ✅ 完整  
**项目状态**: 🚀 准备部署