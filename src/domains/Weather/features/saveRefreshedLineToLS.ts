import type {CardWeatherSet, TLSCoordinates} from "@/domains/Weather/store/storeTypes";
import {LS_service} from "@/features/localStorageService/LS_service";

export function saveRefreshedLineToLS(refreshedItemLine_id: string[], weatherSets: CardWeatherSet[]): void {
  let refreshedWeatherCoordinates: TLSCoordinates = []

  for (let id of refreshedItemLine_id) {
    let targetItem: CardWeatherSet | undefined = weatherSets.find((item: CardWeatherSet) => item.id === id)
    if (targetItem)
      refreshedWeatherCoordinates.push([targetItem.lon, targetItem.lat])
  }

  LS_service.setLS(import.meta.env.VITE_WEATHER_LOCAL_STORAGE_NAME, refreshedWeatherCoordinates)
}