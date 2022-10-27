<script setup lang="ts">
import type {IAPIWeatherSet} from "@/domains/Weather/store/storeTypes";
import {computed, defineProps, reactive, toRef, toRefs} from "vue"
import type {CardWeatherSet} from "@/domains/Weather/store/storeTypes"

const weatherItem = defineProps<{
  weatherSet: CardWeatherSet
}>()

function indCorrector(ind: number): number {
  if(ind > 0)
    return ind + 1
  return ind
}

</script>


<template>
  <div class="weather-card-wrapper">
    <div v-for="(val, key, ind) of weatherSet.getForCard()"
         :key="'set' + ind"
         :class="`card__${ind}`"
         class="card__item"
    >
      <div>{{ key }}</div>
      <div>{{ val }}</div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.weather-card-wrapper {
  width: 100%;
  border-left: var(--vt-c-grey_dark) 1px solid;
  border-bottom: var(--vt-c-grey_dark) 1px solid;
  box-sizing: border-box;
  padding: var(--vt-c-common-padding);
  
  display: grid;
  grid-auto-rows: 30px;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--vt-c-common-padding);
  grid-auto-flow: row dense;
  
  .card__item {
    box-sizing: border-box;
    padding: var(--vt-c-common-padding) calc(var(--vt-c-common-padding) / 2);
    border-left: var(--vt-c-grey_dark) 1px solid;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .card__0 {
    grid-row: 1;
    grid-column: 1 / span 2 !important;
    width: 50%;
  }
  
  .card__1 {
    grid-row: 2;
    grid-column: 1 / span 2 !important;
    width: 50%;
  }
  .card__2 {
    grid-row: 4;
    grid-column: 1;
  }
  
  .card__3 {
    grid-row: 4;
    grid-column: 2;
  }
  
}
</style>