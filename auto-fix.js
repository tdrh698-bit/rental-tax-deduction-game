// 自动修复脚本
const fs = require('fs');
const path = require('path');

console.log('开始自动检查并修复游戏错误问题...');

// 检查的文件列表
const filesToCheck = [
    'index.html',
    'game.js',
    'contract-game.js',
    'calculation-game.js',
    'materials-game.js',
    'simple-game.html',
    'game-main-complete.html',
    'master-game.html'
];

// 常见错误模式
const errorPatterns = [
    {
        pattern: /app\.js/g,
        replacement: 'game.js',
        description: '修复app.js引用为game.js'
    },
    {
        pattern: /localhost:3000/g,
        replacement: '43.153.117.19:3000',
        description: '修复本地主机引用为公网IP'
    },
    {
        pattern: /http:\/\/localhost/g,
        replacement: 'http://43.153.117.19',
        description: '修复HTTP本地主机引用'
    },
    {
        pattern: /七台河市.*七台河市/g,
        replacement: '七台河市',
        description: '修复七台河市重复问题'
    },
    {
        pattern: /苏州市.*苏州市/g,
        replacement: '苏州市',
        description: '修复苏州市重复问题'
    },
    {
        pattern: /console\.error\(/g,
        replacement: 'console.error(\'[修复] \' + ',
        description: '增强错误日志'
    },
    {
        pattern: /<script src="([^"]+)"[^>]*><\/script>/g,
        replacement: (match, p1) => {
            if (p1 === 'app.js') {
                return '<script src="game.js"></script>';
            }
            return match;
        },
        description: '修复脚本引用'
    }
];

// 检查文件是否存在
function checkFileExists(file) {
    if (!fs.existsSync(file)) {
        console.log(`❌ 文件不存在: ${file}`);
        return false;
    }
    return true;
}

// 读取文件内容
function readFile(file) {
    try {
        return fs.readFileSync(file, 'utf8');
    } catch (error) {
        console.log(`❌ 读取文件失败: ${file}`, error.message);
        return null;
    }
}

// 写入文件内容
function writeFile(file, content) {
    try {
        fs.writeFileSync(file, content, 'utf8');
        return true;
    } catch (error) {
        console.log(`❌ 写入文件失败: ${file}`, error.message);
        return false;
    }
}

// 检查并修复文件
function checkAndFixFile(file) {
    if (!checkFileExists(file)) return;
    
    console.log(`\n🔍 检查文件: ${file}`);
    let content = readFile(file);
    if (!content) return;
    
    let fixesApplied = 0;
    let originalContent = content;
    
    // 应用修复模式
    errorPatterns.forEach((pattern, index) => {
        const matches = content.match(pattern.pattern);
        if (matches) {
            console.log(`  发现 ${matches.length} 个匹配: ${pattern.description}`);
            content = content.replace(pattern.pattern, pattern.replacement);
            fixesApplied++;
        }
    });
    
    // 检查城市数据完整性
    if (file.includes('.js') || file.includes('.html')) {
        const cityChecks = [
            { name: '北京市', check: /北京市/g },
            { name: '厦门市', check: /厦门市/g },
            { name: '杭州市', check: /杭州市/g },
            { name: '苏州市', check: /苏州市/g },
            { name: '温州市', check: /温州市/g },
            { name: '佛山市', check: /佛山市/g },
            { name: '伊春市', check: /伊春市/g },
            { name: '七台河市', check: /七台河市/g }
        ];
        
        let missingCities = [];
        cityChecks.forEach(city => {
            if (!content.match(city.check)) {
                missingCities.push(city.name);
            }
        });
        
        if (missingCities.length > 0) {
            console.log(`  ⚠️  缺少城市: ${missingCities.join(', ')}`);
        } else {
            console.log(`  ✅ 所有8个城市都存在`);
        }
    }
    
    // 检查脚本引用
    const scriptRefs = content.match(/<script[^>]*src="([^"]+)"[^>]*>/g) || [];
    scriptRefs.forEach(ref => {
        const srcMatch = ref.match(/src="([^"]+)"/);
        if (srcMatch) {
            const src = srcMatch[1];
            if (src === 'app.js') {
                console.log(`  ❌ 发现错误的脚本引用: ${src}`);
            } else if (!fs.existsSync(path.join(path.dirname(file), src))) {
                console.log(`  ⚠️  脚本文件可能不存在: ${src}`);
            }
        }
    });
    
    // 如果有修复，保存文件
    if (content !== originalContent) {
        if (writeFile(file, content)) {
            console.log(`  ✅ 已应用 ${fixesApplied} 个修复`);
        }
    } else {
        console.log(`  ✅ 无需修复`);
    }
}

// 创建修复报告
function createFixReport() {
    const report = `
# 游戏错误自动修复报告
生成时间: ${new Date().toLocaleString('zh-CN')}

## 检查的文件
${filesToCheck.map(f => `- ${f}`).join('\n')}

## 修复的常见问题
1. **脚本引用错误**：app.js → game.js
2. **本地主机引用**：localhost → 43.153.117.19
3. **城市重复问题**：七台河市、苏州市重复
4. **城市缺失问题**：检查8个城市完整性
5. **错误日志增强**：添加修复标记

## 建议的启动链接
经过自动修复后，建议使用以下链接：

### 1. 终极优化版
http://43.153.117.19:3000/master-game.html

### 2. 完整功能版
http://43.153.117.19:3000/game-main-complete.html

### 3. 简化稳定版
http://43.153.117.19:3000/simple-game.html

## 验证检查
- [ ] 所有8个城市都存在
- [ ] 脚本引用正确
- [ ] 链接可访问
- [ ] 功能完整

## 备注
自动修复脚本已运行，常见问题已处理。
如有其他问题，请检查浏览器控制台错误信息。
    `;
    
    fs.writeFileSync('fix-report.md', report, 'utf8');
    console.log('\n📋 修复报告已生成: fix-report.md');
}

// 主函数
function main() {
    console.log('🚀 开始自动修复流程...\n');
    
    // 检查并修复每个文件
    filesToCheck.forEach(checkAndFixFile);
    
    // 创建修复报告
    createFixReport();
    
    console.log('\n✅ 自动修复完成！');
    console.log('建议启动链接: http://43.153.117.19:3000/master-game.html');
}

// 执行主函数
main();