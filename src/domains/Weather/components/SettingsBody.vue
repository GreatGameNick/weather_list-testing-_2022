<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue"
import {numeric} from '@vuelidate/validators'
import {drugStart, drugEnd, dragOver} from "@/features/dragAndDrop/drugEndDrop"
import type {IAPIWeatherSet} from "@/domains/Weather/store/storeTypes"
import {saveRefreshedLineToLS} from '../features/saveRefreshedLineToLS'
import {useWeatherStore} from "@/domains/Weather/store/weatherStore"
import SettingsDraggableCard from './SettingsDraggableCard.vue'
import useVuelidate from "@vuelidate/core"


const weatherStore = useWeatherStore()
let weatherSets = computed(() => weatherStore.GET_WEATHER_SETS)
const emit = defineEmits(['reloadHimSelf'])

onMounted(() => {
  const tasksListElement: any = document.querySelector(`.weather-list`)
  
  tasksListElement.addEventListener(`dragstart`, (ev: any) => drugStart(ev))
  
  tasksListElement.addEventListener(`dragend`, (ev: any) => {
    let refreshedItemLine_id = drugEnd(ev, document, `.weather-list__item`)
    
    saveRefreshedLineToLS(refreshedItemLine_id, weatherSets.value)
    weatherStore.REFRESH_WEATHER_LINE(refreshedItemLine_id)
    
    emit('reloadHimSelf')
  })
  
  tasksListElement.addEventListener(`dragover`, (ev: any) => {
    dragOver(ev, tasksListElement, 'weather-list__item')
  })
})

const state = reactive({
  coordinates: {
    longitude: {
      name: 'longitude',
      val: ''
    },
    latitude: {
      name: 'latitude',
      val: ''
    }
  }
})

const validators = {
  coordinates: {
    longitude: {
      val: {numeric}
    },
    latitude: {
      val: {numeric}
    },
  }
}

const v$ = useVuelidate(validators, state, {$autoDirty: true})

function isGoAllowed(ind: number): boolean {
  return (ind + 1) === Object.keys(state.coordinates).length
}

const isValid = computed(() => {
  return !v$.value.coordinates['longitude'].val.$invalid && !!v$.value.coordinates['longitude'].val.$model &&
    !v$.value.coordinates['latitude'].val.$invalid && !!v$.value.coordinates['latitude'].val.$model
})

async function addWeather() {
  await weatherStore.FETCH_WEATHER([[state.coordinates.longitude.val, state.coordinates.latitude.val]])
    .then(() => {
      state.coordinates.longitude.val = ''
      state.coordinates.latitude.val = ''
      v$.value.$reset()
    })
}


</script>


<template>
  <div>
    <div class="weather-list">
      <SettingsDraggableCard v-for="(weatherSet, ind) of weatherSets"
                             :key="'sdc' + ind"
                             :weatherSet="weatherSet"
                             :id="weatherSet.id"
                             class="weather-list__item"
                             draggable="true"
      />
    </div>
    
    <div class="weather-search">
      <div class="weather-search__title">
        Add Location
      </div>
      <div v-for="(field, key, ind) in state.coordinates"
           :key="'coord' + ind"
           class="weather-search__input-block"
      >
        
        <div class="input-block__title">{{ field.name }}</div>
        <input v-model="field.val"
               type="text"
               :class="{'input-error': v$.coordinates[key].val.$error,
                        'input-valid': !v$.coordinates[key].val.$invalid && v$.coordinates[key].val.$model
                       }"
        >
        <div v-if="isGoAllowed(ind) && isValid"
             @click="addWeather"
             class="input-block__btn"
        >
          GO
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.weather-list {
}

.weather-list__item:not(:first-child) {
  margin-top: var(--vt-c-common-padding);
}

.weather-list:not(:first-child) {
  margin-top: 7px;
}

.selected {
  color: var(--vt-c-green);
  opacity: 0.6;
}

.weather-search {
  display: flex;
  flex-direction: column;
  margin-top: calc(var(--vt-c-common-padding) * 3);
  
  &__title {
    text-transform: uppercase;
  }
  
  &__input-block {
    width: 100%;
    display: grid;
    grid-auto-rows: min-content;
    grid-template-columns: 2fr 2fr 1fr;
    margin-top: var(--vt-c-common-padding);
    
    input {
      max-width: 130px;
      border: none;
      border-left: var(--vt-c-grey_dark) 1px solid;
      border-bottom: var(--vt-c-grey_dark) 1px solid;
      
      &:focus-visible {
        outline: none !important;
      }
    }
    
    .input-error {
      border: var(--vt-c-red) 1px solid !important;
    }
    .input-valid{
      border: var(--vt-c-valid) 1px solid !important;
    }
    
    .input-block__title {
      color: var(--vt-c-green);
    }
    
    .input-block__btn {
      width: 100%;
      text-align: center;
      cursor: pointer;
      font-weight: 900;
      color: var(--vt-c-green);
      
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
</style>