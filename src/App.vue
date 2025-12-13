<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted } from 'vue';
import ColorkuGrid from './components/ColorkuGrid.vue';
import Controls from './components/Controls.vue';
import { Difficulty, type Grid } from './core/SudokuGenerator';
import SudokuWorker from './core/sudoku.worker?worker';

const worker = new SudokuWorker();
const currentGrid = shallowRef<Grid>([]);
const currentDifficulty = ref<Difficulty>(Difficulty.Medium);
const isGenerating = ref(false);

worker.onmessage = (e: MessageEvent<Grid>) => {
  currentGrid.value = e.data;
  isGenerating.value = false;
};

const handleGenerate = (difficulty: Difficulty) => {
  currentDifficulty.value = difficulty;
  isGenerating.value = true;
  worker.postMessage(difficulty);
};

onMounted(() => {
  handleGenerate(Difficulty.Medium);
});

onUnmounted(() => {
  worker.terminate();
});


</script>

<template>
  <div class="app-container">
    <div class="glass-panel">
      <header>
        <div class="title-wrapper">
          <h1>Colorku</h1>
          <span class="subtitle">By Alice</span>
        </div>
      </header>

      <main>
        <Controls @generate="handleGenerate" />
        <ColorkuGrid v-if="currentGrid.length" :grid="currentGrid" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.glass-panel {
  background: var(--bg-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  padding: 40px;
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

header {
  text-align: center;
  position: relative;
}

.title-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: -2px;
  background: linear-gradient(135deg, #fff 30%, #a5b4fc 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: -10px;
}

main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
}

@media (max-width: 640px) {
  .app-container {
    padding: 10px;
    align-items: flex-start; /* Move up on mobile */
  }

  .glass-panel {
    padding: 24px 16px;
    gap: 24px;
    border-radius: var(--radius-md);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: rgba(15, 23, 42, 0.95);
    box-shadow: none;
  }

  h1 {
    font-size: 3rem;
    letter-spacing: -1px;
  }

  .subtitle {
    font-size: 0.9rem;
    margin-top: -5px;
  }
}
</style>
