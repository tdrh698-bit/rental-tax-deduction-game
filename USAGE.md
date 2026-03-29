# 住房租金扣除游戏 - 使用说明

## 明天测试准备

### 1. 文件位置
游戏包已保存在：`/root/.openclaw/agents/wechat-assistant/rental-game-package/`

### 2. 快速启动步骤

**步骤1：进入游戏目录**
```bash
cd /root/.openclaw/agents/wechat-assistant/rental-game-package
```

**步骤2：启动服务器**
```bash
# 方法A：使用快速测试脚本（推荐）
./quick-test.sh

# 方法B：使用启动脚本
./start-server.sh

# 方法C：直接启动
python3 -m http.server 3000
```

**步骤3：访问游戏**
- 主游戏：`http://localhost:3000/index.html`
- 综合测试：`http://localhost:3000/test-game.html`
- 最终修复：`http://localhost:3000/final-fix.html`

### 3. 测试重点

#### ✅ 已修复的问题：
1. **七台河市显示问题** - 已确保显示
2. **苏州市重复问题** - 已删除重复
3. **浏览器缓存问题** - 提供带时间戳的链接

#### 🔍 需要验证的功能：
1. 任务一：8个城市都显示（包括七台河）
2. 任务二：合同审查功能正常
3. 任务三：扣除计算准确
4. 任务四：材料准备游戏正常

### 4. 问题诊断工具

如果发现问题，可以使用以下诊断页面：

1. **七台河问题诊断**
   ```
   http://localhost:3000/check-qitaihe.html
   ```

2. **城市数据验证**
   ```
   http://localhost:3000/verify-cities.html
   ```

3. **直接数据测试**
   ```
   http://localhost:3000/direct-test.html
   ```

4. **最终修复版本**
   ```
   http://localhost:3000/final-fix.html
   ```

### 5. 常见问题解决

#### 问题1：七台河不显示
**解决方案：**
1. 访问 `final-fix.html`（自动修复版本）
2. 清除浏览器缓存：`Ctrl+Shift+Delete`
3. 使用无痕模式测试

#### 问题2：苏州市重复
**解决方案：**
1. 已修复，检查 `final-fix.html`
2. 确保使用最新文件

#### 问题3：功能异常
**解决方案：**
1. 按 `F12` 打开开发者工具
2. 查看 Console 标签页的错误信息
3. 使用测试页面诊断

#### 问题4：无法访问
**解决方案：**
1. 检查端口是否被占用
2. 尝试更换端口：`./start-server.sh 3001`
3. 检查防火墙设置

### 6. 测试检查清单

详细测试步骤见：`TEST-CHECKLIST.md`

### 7. 文件说明

| 文件 | 说明 |
|------|------|
| `index.html` | 主游戏页面 |
| `game.js` | 主游戏逻辑 |
| `style.css` | 游戏样式 |
| `test-game.html` | 综合测试页面 |
| `final-fix.html` | 最终修复版本 |
| `check-qitaihe.html` | 七台河问题诊断 |
| `start-server.sh` | 服务器启动脚本 |
| `quick-test.sh` | 快速测试脚本 |
| `README.md` | 游戏说明文档 |
| `TEST-CHECKLIST.md` | 测试检查清单 |

### 8. 备份文件

游戏包已压缩备份：
- `rental-game-package.tar.gz` (49KB)

### 9. 联系信息

如有问题，请参考：
- 游戏文档：`README.md`
- 测试清单：`TEST-CHECKLIST.md`
- 使用说明：本文件

---

**明天测试时，建议先运行 `./quick-test.sh`，它会自动启动服务器并打开测试页面。**

**祝测试顺利！** 🎮