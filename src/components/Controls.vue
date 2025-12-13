<script setup lang="ts">
import { ref } from 'vue';
import { Difficulty } from '../core/SudokuGenerator';

const selectedDifficulty = ref<Difficulty>(Difficulty.Medium);

const emit = defineEmits<{
  (e: 'generate', difficulty: Difficulty): void;
  (e: 'toggleSolution'): void;
}>();

defineProps<{
  showSolution: boolean;
}>();

const generate = () => {
  emit('generate', selectedDifficulty.value);
};

const toggleSolution = () => {
  emit('toggleSolution');
};
</script>

<template>
  <div class="controls">
    <div class="control-group">
      <label for="difficulty">Difficulté:</label>
      <select id="difficulty" v-model="selectedDifficulty">
        <option :value="Difficulty.Easy">Facile</option>
        <option :value="Difficulty.Medium">Moyen</option>
        <option :value="Difficulty.Hard">Difficile</option>
        <option :value="Difficulty.Expert">Expert</option>
      </select>
    </div>
    
    <button @click="generate" class="generate-btn">
      Generer
    </button>
    
    <button 
      @click="toggleSolution" 
      class="solution-btn"
      :class="{ active: showSolution }"
    >
      {{ showSolution ? 'Cacher' : 'Solution' }}
    </button>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 24px;
  align-items: center;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(4px);
}

.control-group {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
}

label {
  font-weight: 600;
  color: var(--text-muted);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Custom Select Styling */
select {
  appearance: none;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
  padding: 10px 40px 10px 16px;
  font-family: var(--font-main);
  font-size: 1rem;
  color: var(--text-main);
  cursor: pointer;
  outline: none;
  transition: all var(--transition-fast);
  
  /* Custom Arrow */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
}

select:hover {
  background-color: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
}

select:focus {
  border-color: var(--bg-accent);
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.generate-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--bg-accent) 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
  text-transform: uppercase;
}

.generate-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 15px -3px rgba(99, 102, 241, 0.4);
  filter: brightness(1.1);
}

.generate-btn:active {
  transform: translateY(0);
}

.solution-btn {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-main);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-transform: uppercase;
}

.solution-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.solution-btn.active {
  background: var(--bg-accent);
  color: white;
  border-color: transparent;
}

@media (max-width: 600px) {
  .controls {
    flex-direction: column;
    width: 100%;
    align-items: stretch;
    gap: 16px;
    backdrop-filter: none;
  }
  
  .control-group {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  
  select {
    width: 100%;
  }
}
</style>
