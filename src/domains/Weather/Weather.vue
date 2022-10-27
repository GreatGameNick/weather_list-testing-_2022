<script setup lang="ts">
import Settings from './components/Settings.vue'
import {computed, toRefs} from "vue"
import {getGeolocation} from "@/features/geolocation/geolocation"
import {LS_service} from "@/features/localStorageService/LS_service"
import {useWeatherStore} from './store/weatherStore'
import {storeToRefs} from "pinia"
import WetherCard from './components/WetherCard.vue'
import {CardWeatherSet} from "@/domains/Weather/store/storeTypes";

const weatherStore = useWeatherStore()

if(weatherStore.GET_WEATHER_SETS.length === 0) {
  let weatherLocations: Array<string[]> = LS_service.getLS(import.meta.env.VITE_WEATHER_LOCAL_STORAGE_NAME)
  if (!weatherLocations || weatherLocations.length === 0)
    weatherLocations = [await getGeolocation()]
  
  await weatherStore.FETCH_WEATHER(weatherLocations)
}

let weatherSets = computed(() => weatherStore.GET_WEATHER_SETS)


</script>


<template>
  <div class="weather-wrapper">
    <main>
      <h1 @click="$router.push('/about')" title="about this task">
        Weather
      </h1>
      <Settings class="weather__settings"/>
      
      <WetherCard v-for="(weatherSet, ind) of weatherSets"
                  :key="'weather' + ind"
                  :weatherSet="weatherSet"
                  class="weather__card"
      />
    </main>
  </div>
</template>


<style scoped lang="scss">
.weather-wrapper {
  
  main {
    position: relative;
    margin: var(--vt-c-common-padding) auto;
    max-width: 30rem;
    width: 100%;
    min-height: 40rem;
    height: min-content;
    box-sizing: border-box;
    padding: var(--vt-c-common-padding);
  
    border: var(--vt-c-blue_dark) 1px solid;
  
    h1 {
      width: min-content;
      color: var(--vt-c-green);
      cursor: pointer;
    }
  
    .weather__settings {
      position: absolute;
      top: 0;
      right: 0;
    }
  
    .weather__card:not(:first-child) {
      margin-top: 20px;
    }
  }
  
}
</style>

