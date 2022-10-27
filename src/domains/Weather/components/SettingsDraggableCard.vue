<script setup lang="ts">
import {defineProps} from "vue";
import type {CardWeatherSet} from "../store/storeTypes"
import hamburger from '../assets/imgs/hamburger.png'
import trash from '../assets/imgs/trash.jpg'
import {useWeatherStore} from "@/domains/Weather/store/weatherStore"

const props = defineProps<{
  weatherSet: CardWeatherSet
}>()

const weatherStore = useWeatherStore()

function delItem(id: string): void {
  weatherStore.DEL_WEATHER(id)
}

</script>

<template>
  <div class="settings-dr-card-wrapper">
    <div class="dr-card__icon">
      <img :src="hamburger" alt="hamburger" class="dr-card__icon-img">
    </div>
    <div class="dr-card__body">
      <span>lon &nbsp;{{ weatherSet.lon }}</span>
      <span>lat &nbsp;{{ weatherSet.lat }}</span>
    </div>
    <div @click="delItem(weatherSet.id)"
         class="dr-card__trash dr-card__icon"
    >
      <img :src="trash" alt="trash" class="dr-card__icon-img">
    </div>
  </div>
</template>


<style scoped lang="scss">
.settings-dr-card-wrapper {
  display: flex;
  box-sizing: border-box;
  padding: calc(var(--vt-c-common-padding) / 2);
  background-color: var(--vt-c-grey_light);
  color: var(--vt-c-grey2);
  cursor: move;
  
  .dr-card__icon, .dr-card__icon-img {
    width: 30px;
    height: 30px;
    opacity: 0.87;
  }
  
  .dr-card__body {
    border-bottom: 1px solid var(--vt-c-green);
    margin: 0 var(--vt-c-common-padding);
    flex: 1;
    
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    
    & :first-child {
      margin-right: calc(var(--vt-c-common-padding) * 2);
    }
  }
  
  .dr-card__trash {
    cursor: pointer;
  }
  
  .dr-card__trash:hover {
    opacity: 0.4;
  }
}

</style>