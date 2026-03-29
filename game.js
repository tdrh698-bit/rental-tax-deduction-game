// 税务大师游戏 - 租房租金扣除关卡
class TaxMasterGame {
    constructor() {
        this.currentMission = 1;
        this.score = 0;
        this.hintsRemaining = 3;
        this.progress = 25;
        this.droppedCities = { 1500: [], 1100: [], 800: [] };
        
        this.cities = [
            { name: "北京市", population: "2170万", correctZone: 1500, type: "直辖市" },
            { name: "厦门市", population: "528万", correctZone: 1500, type: "计划单列市" },
            { name: "杭州市", population: "1220万", correctZone: 1500, type: "省会城市" },
            { name: "苏州市", population: "1274万", correctZone: 1100, type: "人口>100万" },
            { name: "温州市", population: "957万", correctZone: 1100, type: "人口>100万" },
            { name: "佛山市", population: "950万", correctZone: 1100, type: "人口>100万" },
            { name: "伊春市", population: "90万", correctZone: 800, type: "人口≤100万" },
            { name: "七台河市", population: "72万", correctZone: 800, type: "人口≤100万" }
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderMission1();
        this.updateUI();
    }
    
    setupEventListeners() {
        // 提示按钮
        document.getElementById('hintBtn').addEventListener('click', () => this.useHint());
        
        // 提交按钮
        document.getElementById('submitBtn').addEventListener('click', () => this.submitMission());
        
        // 下一关按钮
        document.getElementById('nextBtn').addEventListener('click', () => this.nextMission());
        
        // 重置按钮
        document.getElementById('resetBtn').addEventListener('click', () => this.resetMission());
    }
    
    switchMission(missionNumber) {
        this.currentMission = missionNumber;
        
        // 更新任务列表激活状态
        document.querySelectorAll('.mission-item').forEach((item, index) => {
            if (index + 1 === missionNumber) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // 渲染对应任务
        this.renderMission(missionNumber);
        this.updateUI();
    }
    
    renderMission(missionNumber) {
        const mainContent = document.querySelector('.main-content');
        
        switch(missionNumber) {
            case 1:
                this.renderMission1();
                break;
            case 2:
                this.renderMission2();
                break;
            case 3:
                this.renderMission3();
                break;
            case 4:
                this.renderMission4();
                break;
        }
    }
    
    renderMission1() {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
            <div id="mission1" class="mission-content">
                <div class="mission-title">
                    <i class="fas fa-map-marked-alt"></i>
                    <h2>任务一：城市等级判断</h2>
                </div>
                <p style="margin-bottom: 20px; color: #666;">
                    请将城市拖拽到正确的扣除标准区域。直辖市、省会城市扣除标准为1500元/月，
                    市辖区户籍人口超过100万的城市为1100元/月，不超过100万的城市为800元/月。
                </p>
                
                <div class="city-game">
                    <!-- 城市列表 -->
                    <div class="city-list">
                        <h4><i class="fas fa-city"></i> 待分类城市</h4>
                        <div id="cityContainer">
                            ${this.cities.map(city => `
                                <div class="city-item" draggable="true" data-city="${city.name}" data-correct="${city.correctZone}">
                                    <div>
                                        <div class="city-name">${city.name}</div>
                                        <div class="city-type" data-type="${city.type}">${city.type}</div>
                                        <div class="city-population">户籍人口：${city.population}</div>
                                    </div>
                                    <i class="fas fa-arrows-alt"></i>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <!-- 拖放区域 -->
                    <div class="drop-zones">
                        <div class="drop-zone" data-zone="1500" ondrop="game.drop(event)" ondragover="game.allowDrop(event)">
                            <div class="zone-title">1500元/月</div>
                            <div class="deduction-amount">¥1500</div>
                            <p style="text-align: center; font-size: 14px; color: #666;">直辖市、省会城市</p>
                            <div id="zone1500" class="zone-content"></div>
                        </div>
                        
                        <div class="drop-zone" data-zone="1100" ondrop="game.drop(event)" ondragover="game.allowDrop(event)">
                            <div class="zone-title">1100元/月</div>
                            <div class="deduction-amount">¥1100</div>
                            <p style="text-align: center; font-size: 14px; color: #666;">人口＞100万</p>
                            <div id="zone1100" class="zone-content"></div>
                        </div>
                        
                        <div class="drop-zone" data-zone="800" ondrop="game.drop(event)" ondragover="game.allowDrop(event)">
                            <div class="zone-title">800元/月</div>
                            <div class="deduction-amount">¥800</div>
                            <p style="text-align: center; font-size: 14px; color: #666;">人口≤100万</p>
                            <div id="zone800" class="zone-content"></div>
                        </div>
                    </div>
                </div>
                
                <div class="hint-system">
                    <div class="hint-count">
                        <div class="hint-bubble">${this.hintsRemaining}</div>
                        <span>提示剩余</span>
                    </div>
                    <button class="btn btn-secondary" id="hintBtn">
                        <i class="fas fa-lightbulb"></i> 使用提示
                    </button>
                </div>
                
                <div class="game-controls">
                    <button class="btn btn-secondary" id="resetBtn">
                        <i class="fas fa-redo"></i> 重新开始
                    </button>
                    <button class="btn btn-primary" id="submitBtn">
                        <i class="fas fa-check-circle"></i> 提交答案
                    </button>
                </div>
            </div>
        `;
        
        // 重新绑定事件
        this.setupDragAndDrop();
        document.getElementById('hintBtn').addEventListener('click', () => this.useHint());
        document.getElementById('submitBtn').addEventListener('click', () => this.submitMission1());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetMission1());
    }
    
    setupDragAndDrop() {
        const cities = document.querySelectorAll('.city-item');
        cities.forEach(city => {
            city.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', city.dataset.city);
                city.classList.add('dragging');
            });
            
            city.addEventListener('dragend', () => {
                city.classList.remove('dragging');
            });
        });
        
        const zones = document.querySelectorAll('.drop-zone');
        zones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('active');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('active');
            });
        });
    }
    
    allowDrop(e) {
        e.preventDefault();
    }
    
    drop(e) {
        e.preventDefault();
        const zone = e.currentTarget;
        const zoneAmount = zone.dataset.zone;
        const cityName = e.dataTransfer.getData('text/plain');
        
        // 找到城市数据
        const city = this.cities.find(c => c.name === cityName);
        if (!city) return;
        
        // 检查是否已经放置
        const alreadyPlaced = Object.values(this.droppedCities).flat().includes(cityName);
        if (alreadyPlaced) return;
        
        // 添加到对应区域
        this.droppedCities[zoneAmount].push(cityName);
        
        // 创建放置的城市元素
        const isCorrect = city.correctZone == zoneAmount;
        const cityElement = document.createElement('div');
        cityElement.className = `dropped-city ${isCorrect ? 'correct' : 'incorrect'}`;
        cityElement.innerHTML = `
            <div>
                <div class="city-name">${city.name}</div>
                <div class="city-type" data-type="${city.type}">${city.type}</div>
                <div class="city-population">${city.population}</div>
            </div>
            <div>
                ${isCorrect ? 
                    '<i class="fas fa-check" style="color: #4CAF50;"></i>' : 
                    '<i class="fas fa-times" style="color: #F44336;"></i>'
                }
            </div>
        `;
        
        // 添加到区域
        const zoneContent = zone.querySelector('.zone-content');
        zoneContent.appendChild(cityElement);
        
        // 从原列表移除
        const cityItem = document.querySelector(`.city-item[data-city="${cityName}"]`);
        if (cityItem) {
            cityItem.style.display = 'none';
        }
        
        zone.classList.remove('active');
        
        // 更新分数
        if (isCorrect) {
            this.score += 10;
            this.showFeedback('正确！', 'success');
        } else {
            this.showFeedback('城市分类错误，请检查人口数据', 'error');
        }
        
        this.updateUI();
    }
    
    submitMission1() {
        // 检查是否所有城市都已分类
        const totalCities = this.cities.length;
        const placedCities = Object.values(this.droppedCities).flat().length;
        
        if (placedCities < totalCities) {
            this.showFeedback('请完成所有城市的分类', 'warning');
            return;
        }
        
        // 计算正确率
        let correctCount = 0;
        this.cities.forEach(city => {
            const placedZone = Object.keys(this.droppedCities).find(zone => 
                this.droppedCities[zone].includes(city.name)
            );
            if (parseInt(placedZone) === city.correctZone) {
                correctCount++;
            }
        });
        
        const accuracy = Math.round((correctCount / totalCities) * 100);
        
        // 显示结果
        let message = '';
        if (accuracy === 100) {
            message = '🎉 完美！所有城市分类正确！';
            this.score += 50;
        } else if (accuracy >= 80) {
            message = '👍 不错！大部分城市分类正确';
            this.score += 30;
        } else if (accuracy >= 60) {
            message = '📚 需要复习城市扣除标准';
            this.score += 20;
        } else {
            message = '🔁 建议重新学习本任务';
        }
        
        this.showFeedback(`
            <h3>任务完成！</h3>
            <p>${message}</p>
            <p>正确率：${accuracy}% (${correctCount}/${totalCities})</p>
            <p>获得分数：${accuracy === 100 ? 50 : accuracy >= 80 ? 30 : 20}分</p>
            <p>累计分数：${this.score}分</p>
        `, 'info');
        
        // 更新进度
        this.progress = 50;
        this.updateProgress();
        
        // 解锁下一任务
        document.querySelectorAll('.mission-item')[1].classList.add('unlocked');
    }
    
    resetMission1() {
        this.droppedCities = { 1500: [], 1100: [], 800: [] };
        this.renderMission1();
        this.showFeedback('任务已重置，请重新开始', 'info');
    }
    
    renderMission2() {
        const mainContent = document.querySelector('.main-content');
        mainContent.innerHTML = `
            <div id="mission2" class="mission-content">
                <div class="mission-title">
                    <i class="fas fa-file-contract"></i>
                    <h2>任务二：租赁合同审查</h2>
                </div>
                <p style="margin-bottom: 20px; color: #666;">
                    请检查下面的租赁合同，找出缺失或错误的信息。点击问题区域进行修正。
                </p>
                
                <div class="contract-game">
                    <div class="contract-paper">
                        <div class="contract-title">房屋租赁合同</div>
                        
                        <div class="contract-section">
                            <div class="contract-field problem-area" onclick="game.fixContractField('landlord')">
                                <span class="field-label">出租人（甲方）：</span>
                                <span class="field-value">张先生</span>
                                <i class="fas fa-exclamation-circle"></i>
                                <span class="problem-text">缺失身份证号码</span>
                            </div>
                            
                            <div class="contract-field">
                                <span class="field-label">承租人（乙方）：</span>
                                <span class="field-value">李小明</span>
                            </div>
                            
                            <div class="contract-field problem-area" onclick="game.fixContractField('address')">
                                <span class="field-label">租赁房屋地址：</span>
                                <span class="field-value">杭州市西湖区</span>
                                <i class="fas fa-exclamation-circle"></i>
                                <span class="problem-text">地址不完整</span>
                            </div>
                            
                            <div class="contract-field">
                                <span class="field-label">租赁期限：</span>
                                <span class="field-value">2025年1月1日至2025年12月31日</span>
                            </div>
                            
                            <div class="contract-field problem-area" onclick="game.fixContractField('rent')">
                                <span class="field-label">月租金：</span>
                                <span class="field-value">人民币贰仟元整</span>
                                <i class="fas fa-exclamation-circle"></i>
                                <span class="problem-text">应同时注明数字金额</span>
                            </div>
                            
                            <div class="contract-field">
                                <span class="field-label">支付方式：</span>
                                <span class="field-value">按月支付</span>
                            </div>
                            
                            <div class="contract-field problem-area" onclick="game.fixContractField('record')">
                                <span class="field-label">租赁合同备案编号：</span>
                                <span class="field-value">（空白）</span>
                                <i class="fas fa-exclamation-circle"></i>
                                <span class="problem-text">未填写备案编号</span>
                            </div>
                            
                            <div class="contract-field problem-area" onclick="game.fixContractField('property')">
                                <span class="field-label">房屋所有权证号：</span>
                                <span class="field-value">（空白）</span>
                                <i class="fas fa-exclamation-circle"></i>
                                <span class="problem-text">缺失房产证信息</span>
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; padding: 15px; background: #f0f8ff; border-radius: 8px;">
                        <h4><i class="fas fa-question-circle"></i> 合同有效性判断</h4>
                        <p>以下哪种情况不能享受租房租金扣除？</p>
                        <div class="quiz-options">
                            <label style="display: block; margin: 10px 0;">
                                <input type="radio" name="contractQuiz" value="A"> 
                                A. 租赁商用房屋用于居住
                            </label>
                            <label style="display: block; margin: 10px 0;">
                                <input type="radio" name="contractQuiz" value="B"> 
                                B. 租赁住宅但未签订正式合同
                            </label>
                            <label style="display: block; margin: 10px 0;">
                                <input type="radio" name="contractQuiz" value="C"> 
                                C. 租赁住宅但合同未备案
                            </label>
                            <label style="display: block; margin: 10px 0;">
                                <input type="radio" name="contractQuiz" value="D"> 
                                D. 以上都是
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="hint-system">
                    <div class="hint-count">
                        <div class="hint-bubble">${this.hintsRemaining}</div>
                        <span>提示剩余</span>
                    </div>
                    <button class="btn btn-secondary" id="hintBtn">
                        <i class="fas fa-lightbulb"></i> 使用提示
                    </button>
                </div>
                
                <div class="game-controls">
                    <button class="btn btn-secondary" id="resetBtn">
                        <i class="fas fa-redo"></i> 重新开始
                    </button>
                    <button class="btn btn-primary" id="submitBtn">
                        <i class="fas fa-check-circle"></i> 提交审查
                    </button>
                </div>
            </div>
        `;
        
        // 重新绑定事件
        document.getElementById('hintBtn').addEventListener('click', () => this.useHint());
        document.getElementById('submitBtn').addEventListener('click', () => this.submitMission2());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetMission2());
    }
    
    fixContractField(fieldType) {
        let message = '';
        switch(fieldType) {
            case 'landlord':
                message = '出租人应填写姓名和身份证号码，用于税务核查';
                break;
            case 'address':
                message = '地址应详细到门牌号，如"XX路XX号XX小区X栋X单元XXX室"';
                break;
            case 'rent':
                message = '租金应同时用大写和小写数字注明，如"人民币贰仟元整（¥2000）"';
                break;
            case 'record':
                message = '租赁合同需在房管部门备案，备案编号是扣除的重要依据';
                break;
            case 'property':
                message = '需要提供房屋所有权证号，证明