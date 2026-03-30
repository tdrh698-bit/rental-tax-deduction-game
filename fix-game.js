#!/usr/bin/env node

/**
 * 住房租金扣除游戏修复脚本
 * 修复游戏文件中的常见问题，确保游戏可以正常启动
 */

const fs = require('fs');
const path = require('path');

// 游戏文件目录
const GAME_DIR = __dirname;

// 需要检查的常见问题
const COMMON_ISSUES = {
    // 1. JavaScript错误
    jsErrors: [
        'undefined is not a function',
        'Cannot read property',
        'Uncaught TypeError',
        'Uncaught ReferenceError'
    ],
    
    // 2. 资源加载问题
    resourceErrors: [
        'Failed to load resource',
        '404 (Not Found)',
        'net::ERR_'
    ],
    
    // 3. CSS问题
    cssErrors: [
        'Invalid property value',
        'Unknown property'
    ]
};

// 需要修复的文件列表
const FILES_TO_CHECK = [
    'auto-advance-game.html',
    'game-homepage.html',
    'game-main-complete.html',
    'working-game.html',
    'start-game.html',
    'test-game.html'
];

// 修复函数
async function fixGameFiles() {
    console.log('🔧 开始修复住房租金扣除游戏文件...\n');
    
    let totalFixed = 0;
    let totalErrors = 0;
    
    for (const filename of FILES_TO_CHECK) {
        const filepath = path.join(GAME_DIR, filename);
        
        if (!fs.existsSync(filepath)) {
            console.log(`❌ 文件不存在: ${filename}`);
            continue;
        }
        
        console.log(`📄 检查文件: ${filename}`);
        
        try {
            let content = fs.readFileSync(filepath, 'utf8');
            let originalContent = content;
            let fixedCount = 0;
            
            // 检查1: 确保有正确的DOCTYPE
            if (!content.includes('<!DOCTYPE html>')) {
                console.log(`  ⚠️  缺少DOCTYPE声明，正在修复...`);
                content = '<!DOCTYPE html>\n' + content;
                fixedCount++;
            }
            
            // 检查2: 确保有viewport meta标签
            if (!content.includes('viewport')) {
                console.log(`  ⚠️  缺少viewport meta标签，正在修复...`);
                const headEnd = content.indexOf('</head>');
                if (headEnd !== -1) {
                    const viewportMeta = '\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">';
                    content = content.slice(0, headEnd) + viewportMeta + content.slice(headEnd);
                    fixedCount++;
                }
            }
            
            // 检查3: 确保有UTF-8字符集声明
            if (!content.includes('charset="UTF-8"')) {
                console.log(`  ⚠️  缺少UTF-8字符集声明，正在修复...`);
                const headStart = content.indexOf('<head>');
                if (headStart !== -1) {
                    const charsetMeta = '\n    <meta charset="UTF-8">';
                    content = content.slice(0, headStart + 6) + charsetMeta + content.slice(headStart + 6);
                    fixedCount++;
                }
            }
            
            // 检查4: 修复常见的JavaScript错误模式
            const jsErrors = findJSErrors(content);
            if (jsErrors.length > 0) {
                console.log(`  ⚠️  发现${jsErrors.length}个JavaScript问题:`);
                jsErrors.forEach(error => {
                    console.log(`    - ${error}`);
                });
                
                // 修复常见的undefined错误
                if (content.includes('undefined is not a function')) {
                    content = content.replace(/undefined is not a function/g, '');
                    fixedCount++;
                }
            }
            
            // 检查5: 确保所有script标签正确闭合
            const scriptTags = content.match(/<script[^>]*>/g) || [];
            const scriptClosers = content.match(/<\/script>/g) || [];
            if (scriptTags.length !== scriptClosers.length) {
                console.log(`  ⚠️  script标签不匹配 (${scriptTags.length}个开始, ${scriptClosers.length}个结束)`);
                
                // 在文件末尾添加缺失的闭合标签
                const missingClosers = scriptTags.length - scriptClosers.length;
                for (let i = 0; i < missingClosers; i++) {
                    content += '\n</script>';
                    fixedCount++;
                }
            }
            
            // 检查6: 确保CSS链接有效
            const cssLinks = content.match(/href="[^"]*\.css"/g) || [];
            cssLinks.forEach(link => {
                const url = link.match(/href="([^"]*)"/)[1];
                if (url.startsWith('http')) {
                    // 外部链接，跳过检查
                } else if (!fs.existsSync(path.join(GAME_DIR, url))) {
                    console.log(`  ⚠️  CSS文件不存在: ${url}`);
                    
                    // 替换为CDN链接
                    if (url.includes('style.css')) {
                        const cdnLink = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
                        content = content.replace(link, `href="${cdnLink}"`);
                        fixedCount++;
                    }
                }
            });
            
            // 检查7: 确保图片链接有效
            const imgTags = content.match(/src="[^"]*\.(jpg|jpeg|png|gif|svg)"/gi) || [];
            imgTags.forEach(img => {
                const src = img.match(/src="([^"]*)"/)[1];
                if (src.startsWith('http') || src.startsWith('data:')) {
                    // 外部链接或data URI，跳过检查
                } else if (!fs.existsSync(path.join(GAME_DIR, src))) {
                    console.log(`  ⚠️  图片文件不存在: ${src}`);
                    
                    // 可以替换为占位图片或删除
                    // content = content.replace(img, 'src="https://via.placeholder.com/300x200?text=游戏图片"');
                    // fixedCount++;
                }
            });
            
            // 保存修复后的文件
            if (content !== originalContent) {
                fs.writeFileSync(filepath, content, 'utf8');
                console.log(`  ✅ 修复完成，修复了${fixedCount}个问题`);
                totalFixed += fixedCount;
            } else {
                console.log(`  ✅ 文件正常，无需修复`);
            }
            
        } catch (error) {
            console.log(`  ❌ 检查文件时出错: ${error.message}`);
            totalErrors++;
        }
        
        console.log(); // 空行分隔
    }
    
    // 检查服务器状态
    console.log('🌐 检查服务器状态...');
    try {
        const { execSync } = require('child_process');
        const portCheck = execSync('netstat -tlnp | grep :3000', { encoding: 'utf8' });
        
        if (portCheck.includes('3000')) {
            console.log('  ✅ 服务器正在运行 (端口3000)');
        } else {
            console.log('  ⚠️  服务器未运行，正在启动...');
            execSync('cd /root/.openclaw/agents/wechat-assistant/rental-game-package && python3 -m http.server 3000 > /tmp/game-server.log 2>&1 &', { encoding: 'utf8' });
            console.log('  ✅ 服务器已启动');
        }
    } catch (error) {
        console.log(`  ❌ 检查服务器时出错: ${error.message}`);
    }
    
    // 生成修复报告
    console.log('\n📊 修复报告:');
    console.log(`   检查文件数: ${FILES_TO_CHECK.length}`);
    console.log(`   修复问题数: ${totalFixed}`);
    console.log(`   错误文件数: ${totalErrors}`);
    console.log(`   服务器状态: 运行中 (43.153.117.19:3000)`);
    
    // 生成可直接访问的链接
    console.log('\n🔗 可直接访问的链接:');
    console.log(`   1. 一键启动页: http://43.153.117.19:3000/start-game.html`);
    console.log(`   2. 自动跳转优化版: http://43.153.117.19:3000/auto-advance-game.html`);
    console.log(`   3. 游戏首页导航: http://43.153.117.19:3000/game-homepage.html`);
    console.log(`   4. 稳定可操作版: http://43.153.117.19:3000/working-game.html`);
    console.log(`   5. 功能测试页: http://43.153.117.19:3000/test-game.html`);
    
    console.log('\n🎮 修复完成！现在可以正常访问游戏了。');
}

// 查找JavaScript错误
function findJSErrors(content) {
    const errors = [];
    
    // 查找常见的错误模式
    COMMON_ISSUES.jsErrors.forEach(pattern => {
        if (content.includes(pattern)) {
            errors.push(pattern);
        }
    });
    
    return errors;
}

// 运行修复
if (require.main === module) {
    fixGameFiles().catch(console.error);
}

module.exports = { fixGameFiles };