// 租赁合同审查游戏模块
class ContractGame {
    constructor() {
        this.problems = [
            {
                id: 'landlord',
                element: null,
                description: '出租人信息不完整，缺少身份证号码',
                fixed: false,
                fixText: '张先生 (身份证: 330102198501012345)'
            },
            {
                id: 'address', 
                element: null,
                description: '地址不完整，缺少详细门牌号',
                fixed: false,
                fixText: '杭州市西湖区文三路123号西湖花园3栋2单元501室'
            },
            {
                id: 'rent',
                element: null,
                description: '租金金额应同时注明大小写',
                fixed: false, 
                fixText: '人民币贰仟元整（¥2000）'
            },
            {
                id: 'record',
                element: null,
                description: '缺失租赁合同备案编号',
                fixed: false,
                fixText: '备案编号: ZJ202503250001'
            },
            {
                id: 'property',
                element: null,
                description: '缺失房屋所有权证号',
                fixed: false,
                fixText: '浙(2024)杭州市不动产权第0123456号'
            }
        ];
        
        this.quizAnswer = null;
        this.score = 0;
    }
    
    init() {
        this.setupProblemAreas();
        this.setupQuiz();
    }
    
    setupProblemAreas() {
        this.problems.forEach(problem => {
            const element = document.querySelector(`[data-problem="${problem.id}"]`);
            if (element) {
                problem.element = element;
                element.addEventListener('click', () => this.fixProblem(problem));
            }
        });
    }
    
    setupQuiz() {
        const quizOptions = document.querySelectorAll('input[name="contractQuiz"]');
        quizOptions.forEach(option => {
            option.addEventListener('change', (e) => {
                this.quizAnswer = e.target.value;
            });
        });
    }
    
    fixProblem(problem) {
        if (problem.fixed) return;
        
        // 显示修复对话框
        this.showFixDialog(problem);
    }
    
    showFixDialog(problem) {
        const dialog = document.createElement('div');
        dialog.className = 'fix-dialog';
        dialog.innerHTML = `
            <div class="dialog-content">
                <h3><i class="fas fa-wrench"></i> 修复问题</h3>
                <p><strong>问题：</strong>${problem.description}</p>
                
                <div class="fix-options">
                    <div class="fix-option" onclick="contractGame.applyFix('${problem.id}', 'correct')">
                        <h4>✅ 正确修复</h4>
                        <p>${problem.fixText}</p>
                        <small>点击应用此修复</small>
                    </div>
                    
                    <div class="fix-option incorrect" onclick="contractGame.applyFix('${problem.id}', 'incorrect')">
                        <h4>❌ 错误修复</h4>
                        <p>${problem.description.split('，')[0]}（修复不完整）</p>
                        <small>点击查看错误示例</small>
                    </div>
                </div>
                
                <div class="dialog-actions">
                    <button class="btn btn-secondary" onclick="this.parentElement.parentElement.remove()">
                        取消
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
    }
    
    applyFix(problemId, fixType) {
        const problem = this.problems.find(p => p.id === problemId);
        if (!problem || problem.fixed) return;
        
        const element = problem.element;
        
        if (fixType === 'correct') {
            // 标记为已修复
            problem.fixed = true;
            
            // 更新UI
            element.classList.remove('problem-area');
            element.classList.add('fixed-area');
            
            // 更新文本
            const valueSpan = element.querySelector('.field-value');
            if (valueSpan) {
                valueSpan.textContent = problem.fixText;
                valueSpan.style.color = '#4CAF50';
                valueSpan.style.fontWeight = 'bold';
            }
            
            // 移除问题图标
            const icon = element.querySelector('.fa-exclamation-circle');
            if (icon) {
                icon.className = 'fas fa-check-circle';
                icon.style.color = '#4CAF50';
            }
            
            // 移除问题文本
            const problemText = element.querySelector('.problem-text');
            if (problemText) {
                problemText.textContent = '✓ 已修复';
                problemText.style.color = '#4CAF50';
            }
            
            // 加分
            this.score += 20;
            this.showFeedback('✅ 修复正确！+20分', 'success');
            
        } else {
            // 错误修复的反馈
            this.showFeedback('❌ 修复不完整，请仔细阅读问题描述', 'error');
        }
        
        // 移除对话框
        const dialog = document.querySelector('.fix-dialog');
        if (dialog) dialog.remove();
        
        // 更新总分
        this.updateScore();
    }
    
    checkQuiz() {
        if (!this.quizAnswer) {
            this.showFeedback('请先选择答案', 'warning');
            return false;
        }
        
        const isCorrect = this.quizAnswer === 'D'; // 正确答案是D
        if (isCorrect) {
            this.score += 30;
            this.showFeedback('✅ 选择题正确！+30分', 'success');
        } else {
            this.showFeedback('❌ 选择题错误，正确答案是D（以上都是）', 'error');
        }
        
        return isCorrect;
    }
    
    submitContractReview() {
        // 检查是否所有问题都已修复
        const unfixedProblems = this.problems.filter(p => !p.fixed);
        
        if (unfixedProblems.length > 0) {
            this.showFeedback(`还有${unfixedProblems.length}个问题未修复`, 'warning');
            return;
        }
        
        // 检查选择题
        if (!this.checkQuiz()) {
            return;
        }
        
        // 计算总分
        const totalScore = this.score;
        let rating = '';
        let bonus = 0;
        
        if (totalScore >= 130) {
            rating = '🎉 合同审查专家！';
            bonus = 80;
        } else if (totalScore >= 100) {
            rating = '👍 合同审查合格';
            bonus = 50;
        } else if (totalScore >= 70) {
            rating = '📚 需要加强合同知识';
            bonus = 30;
        } else {
            rating = '🔁 建议重新学习';
            bonus = 10;
        }
        
        // 显示最终结果
        this.showFinalResult(totalScore, rating, bonus);
    }
    
    showFinalResult(score, rating, bonus) {
        const dialog = document.createElement('div');
        dialog.className = 'result-dialog';
        dialog.innerHTML = `
            <div class="dialog-content">
                <h3><i class="fas fa-file-contract"></i> 合同审查完成！</h3>
                
                <div class="result-stats">
                    <div class="stat-item">
                        <div class="stat-label">问题修复</div>
                        <div class="stat-value">${this.problems.filter(p => p.fixed).length}/${this.problems.length}</div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-label">选择题</div>
                        <div class="stat-value">${this.quizAnswer === 'D' ? '✅ 正确' : '❌ 错误'}</div>
                    </div>
                    
                    <div class="stat-item">
                        <div class="stat-label">总分</div>
                        <div class="stat-value">${score}</div>
                    </div>
                </div>
                
                <div class="rating">
                    <h4>${rating}</h4>
                    <p>获得奖励：${bonus}税币</p>
                </div>
                
                <div class="knowledge-summary">
                    <h5><i class="fas fa-lightbulb"></i> 知识点总结</h5>
                    <ul>
                        <li>租赁合同必须包含双方完整身份信息</li>
                        <li>地址应详细到门牌号</li>
                        <li>金额需同时注明大小写</li>
                        <li>合同备案是扣除的必要条件</li>
                        <li>需要提供房产证明</li>
                    </ul>
                </div>
                
                <div class="dialog-actions">
                    <button class="btn btn-secondary" onclick="this.parentElement.parentElement.remove()">
                        关闭
                    </button>
                    <button class="btn btn-primary" onclick="contractGame.nextMission()">
                        继续下一任务
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
    }
    
    updateScore() {
        const scoreElement = document.getElementById('contractScore');
        if (scoreElement) {
            scoreElement.textContent = this.score;
        }
    }
    
    showFeedback(message, type) {
        // 简单的反馈显示
        const feedback = document.createElement('div');
        feedback.className = `feedback-toast ${type}`;
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#FF9800'};
            color: white;
            border-radius: 8px;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }
    
    nextMission() {
        // 切换到任务三
        if (window.game) {
            window.game.switchMission(3);
        }
    }
    
    resetGame() {
        this.problems.forEach(problem => {
            problem.fixed = false;
        });
        this.quizAnswer = null;
        this.score = 0;
        
        // 重新渲染任务二
        if (window.game) {
            window.game.renderMission2();
        }
    }
}

// 全局实例
window.contractGame = new ContractGame();