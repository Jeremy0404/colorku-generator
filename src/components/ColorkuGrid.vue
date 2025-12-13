<script setup lang="ts">
import { NUMBER_TO_COLOR } from '../core/constants';
import type { Grid } from '../core/SudokuGenerator';

defineProps<{
  grid: Grid;
}>();
</script>

<template>
  <div class="colorku-board">
    <div 
      v-for="(row, rowIndex) in grid" 
      :key="rowIndex" 
      class="grid-row"
      :class="{ 'section-bottom': (rowIndex + 1) % 3 === 0 && rowIndex !== 8 }"
    >
      <div 
        v-for="(cell, colIndex) in row" 
        :key="`${rowIndex}-${colIndex}`" 
        class="grid-cell"
        :class="{ 'section-right': (colIndex + 1) % 3 === 0 && colIndex !== 8 }"
      >
        <div class="cell-socket">
          <transition name="pop">
            <div 
              v-if="cell !== 0" 
              class="ball" 
              :style="{ 
                '--ball-color': NUMBER_TO_COLOR[cell],
                backgroundColor: NUMBER_TO_COLOR[cell] 
              }"
            >
              <div class="highlight"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.colorku-board {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background: rgba(15, 23, 42, 0.6); /* Darker, more contrast */
  border-radius: var(--radius-lg);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-glass);
  width: fit-content;
  max-width: 100%;
}

.grid-row {
  display: flex;
}

/* 3x3 Section Delimiters - Enhanced Visibility */
.section-bottom {
  margin-bottom: 16px; /* Increased gap */
  position: relative;
}

/* Add visual separator line */
.section-bottom::after {
  content: '';
  position: absolute;
  bottom: -9px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.section-right {
  margin-right: 16px; /* Increased gap */
  position: relative;
}

.section-right::after {
  content: '';
  position: absolute;
  right: -9px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.grid-cell {
  /* Responsive Cell Size */
  --cell-size: 50px;
  width: var(--cell-size);
  height: var(--cell-size);
  
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cell-socket {
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4); /* Darker socket for better contrast */
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ball {
  width: 85%;
  height: 85%;
  border-radius: 50%;
  position: relative;
  box-shadow: 
    inset 0 -4px 6px rgba(0,0,0,0.4),
    inset 0 2px 6px rgba(255,255,255,0.4),
    0 4px 8px rgba(0,0,0,0.5);
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.ball:hover {
  transform: scale(1.1);
  cursor: pointer;
}

.highlight {
  position: absolute;
  top: 15%;
  left: 15%;
  width: 30%;
  height: 25%;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(255,255,255,0.9), rgba(255,255,255,0));
  filter: blur(1px);
}

/* Animations */
.pop-enter-active,
.pop-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0);
}

/* Mobile Responsiveness */
@media (max-width: 600px) {
  .colorku-board {
    padding: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    backdrop-filter: none;
  }

  .grid-cell {
    --cell-size: 8.5vw;
    max-width: 36px;
    max-height: 36px;
    margin: 1px;
  }
  
  .section-bottom {
    margin-bottom: 8px;
  }
  
  .section-bottom::after {
    bottom: -5px;
  }

  .section-right {
    margin-right: 8px;
  }
  
  .section-right::after {
    right: -5px;
  }

  /* Optimize heavy rendering effects for mobile */
  .ball {
    box-shadow: 
      inset 0 -2px 3px rgba(0,0,0,0.3),
      inset 0 1px 3px rgba(255,255,255,0.3); /* Removed external shadow */
  }

  .cell-socket {
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.5); /* Simplified socket shadow */
  }
}
</style>
