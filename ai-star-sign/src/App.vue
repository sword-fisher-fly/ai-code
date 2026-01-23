<script setup>
import { ref } from 'vue'
import { zodiacData } from './data/zodiacData.js'

const selectedZodiac = ref(zodiacData[0])

const selectZodiac = (zodiac) => {
  selectedZodiac.value = zodiac
}
</script>

<template>
  <div class="app-container">
    <header class="header">
      <h1>十二星座详解</h1>
      <p class="subtitle">探索星座奥秘，了解命运密码</p>
    </header>

    <main class="main-content">
      <!-- 左侧星座列表 -->
      <aside class="sidebar">
        <div class="zodiac-list">
          <div
            v-for="zodiac in zodiacData"
            :key="zodiac.id"
            :class="['zodiac-item', { active: selectedZodiac.id === zodiac.id }]"
            @click="selectZodiac(zodiac)"
          >
            <span class="zodiac-symbol">{{ zodiac.symbol }}</span>
            <span class="zodiac-name">{{ zodiac.name }}</span>
          </div>
        </div>
      </aside>

      <!-- 右侧详情区域 -->
      <section class="detail-panel">
        <div class="detail-header">
          <div class="zodiac-icon">{{ selectedZodiac.symbol }}</div>
          <div class="zodiac-info">
            <h2>{{ selectedZodiac.name }}</h2>
            <div class="zodiac-meta">
              <span class="element">{{ selectedZodiac.element }}</span>
              <span class="ruling">{{ selectedZodiac.ruling }}</span>
            </div>
          </div>
        </div>

        <div class="date-range">
          <div class="date-icon">📅</div>
          <div class="date-text">
            <span class="label">日期范围</span>
            <span class="value">{{ selectedZodiac.dateRange }}</span>
          </div>
        </div>

        <div class="detail-section">
          <h3>星象解释</h3>
          <p>{{ selectedZodiac.description }}</p>
        </div>

        <div class="detail-section">
          <h3>性格特点</h3>
          <p>{{ selectedZodiac.personality }}</p>
        </div>

        <div class="detail-section">
          <h3>命运解读</h3>
          <p>{{ selectedZodiac.destiny }}</p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>星座仅供娱乐参考，命运掌握在自己手中</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  min-height: 100vh;
  color: #ffffff;
}

#app {
  min-height: 100vh;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header h1 {
  font-size: 2.5rem;
  background: linear-gradient(90deg, #ffd700, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}

.main-content {
  flex: 1;
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  gap: 20px;
}

/* 左侧边栏 */
.sidebar {
  width: 200px;
  flex-shrink: 0;
}

.zodiac-list {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 10px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.zodiac-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 4px;
}

.zodiac-item:last-child {
  margin-bottom: 0;
}

.zodiac-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.zodiac-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.zodiac-symbol {
  font-size: 1.5rem;
  margin-right: 12px;
}

.zodiac-name {
  font-size: 1rem;
  font-weight: 500;
}

/* 右侧详情区域 */
.detail-panel {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.zodiac-icon {
  font-size: 4rem;
  margin-right: 20px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.zodiac-info h2 {
  font-size: 2rem;
  margin-bottom: 10px;
  background: linear-gradient(90deg, #ffd700, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.zodiac-meta {
  display: flex;
  gap: 15px;
}

.zodiac-meta span {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.date-range {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 107, 107, 0.15) 100%);
  border-radius: 12px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.date-icon {
  font-size: 2rem;
  margin-right: 15px;
}

.date-text {
  display: flex;
  flex-direction: column;
}

.date-text .label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
}

.date-text .value {
  font-size: 1.3rem;
  font-weight: 600;
  color: #ffd700;
}

.detail-section {
  margin-bottom: 25px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section h3 {
  font-size: 1.2rem;
  margin-bottom: 12px;
  color: #4ecdc4;
  display: flex;
  align-items: center;
}

.detail-section h3::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 20px;
  background: linear-gradient(180deg, #4ecdc4, #44a08d);
  margin-right: 10px;
  border-radius: 2px;
}

.detail-section p {
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  text-align: justify;
  font-size: 1rem;
}

.footer {
  text-align: center;
  padding: 20px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
  background: rgba(0, 0, 0, 0.2);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }

  .zodiac-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .zodiac-item {
    flex-direction: column;
    padding: 10px;
    text-align: center;
  }

  .zodiac-symbol {
    margin-right: 0;
    margin-bottom: 4px;
  }

  .zodiac-name {
    font-size: 0.85rem;
  }

  .detail-panel {
    padding: 20px;
  }

  .header h1 {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .zodiac-list {
    grid-template-columns: repeat(3, 1fr);
  }

  .detail-header {
    flex-direction: column;
    text-align: center;
  }

  .zodiac-icon {
    margin-right: 0;
    margin-bottom: 15px;
  }

  .zodiac-meta {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
