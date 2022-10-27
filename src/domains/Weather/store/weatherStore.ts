import {ref, computed, reactive, inject} from 'vue'
import {defineStore} from 'pinia'

import {LS_service} from "@/features/localStorageService/LS_service"

import type {IAPIWeatherSet, TLSCoordinates} from "../store/storeTypes"
import {CardWeatherSet} from "./storeTypes"
import {retrieveCoordinatesFromIAPIWeatherSets} from "../features/retrieveCoordinatesFromIAPIWeatherSets"


export const useWeatherStore = defineStore('weatherStore', () => {
  const $api: any = inject('$api')

  let APIWeatherSets: IAPIWeatherSet[] = reactive([])

  const GET_WEATHER_SETS = computed(() => {
    let setList: CardWeatherSet[] = []
    for (let set of APIWeatherSets) {
      setList.push(new CardWeatherSet(set))
    }
    return setList
  })

  async function FETCH_WEATHER(coordinates: TLSCoordinates): Promise<boolean> {
    // @ts-ignore
    let fetchedDataList = await Promise.allSettled(
      coordinates.map(coord => {
        return $api('FETCH_WEATHER').send(null, {lon: coord[0], lat: coord[1]})
      })
    )

    const newAPIWeatherSets = fetchedDataList.reduce((total: IAPIWeatherSet, item: any, ind: number) => {
      if (item.status === 'fulfilled') {
        item.value.id = (Date.now() + Math.floor(Math.random() * 1000)).toString()
        // @ts-ignore
        return total.concat(item.value)
      }
    }, [])

    APIWeatherSets.push(...newAPIWeatherSets)

    //сохраняем в LS
    const weatherCoordinates: TLSCoordinates = retrieveCoordinatesFromIAPIWeatherSets(APIWeatherSets)
    LS_service.setLS(import.meta.env.VITE_WEATHER_LOCAL_STORAGE_NAME, weatherCoordinates)

    return true
  }

  function DEL_WEATHER(id: string): void {
    let ind = APIWeatherSets.findIndex(item => item.id === id)
    APIWeatherSets.splice(ind, 1)

    //сохраняем в LS
    const weatherCoordinates: TLSCoordinates = retrieveCoordinatesFromIAPIWeatherSets(APIWeatherSets)
    LS_service.setLS(import.meta.env.VITE_WEATHER_LOCAL_STORAGE_NAME, weatherCoordinates)
  }

  function REFRESH_WEATHER_LINE(refreshedItemLine_id: string[]): void {
    for(let id of refreshedItemLine_id) {
      let item = APIWeatherSets.find((item, ind) => item.id === id)
      if(item)
        APIWeatherSets.push(item)
    }

    APIWeatherSets.splice(0, refreshedItemLine_id.length)
  }


  return {
    GET_WEATHER_SETS,
    FETCH_WEATHER,
    DEL_WEATHER,
    REFRESH_WEATHER_LINE
  }
})
