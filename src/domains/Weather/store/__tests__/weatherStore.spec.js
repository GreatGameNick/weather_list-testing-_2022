import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'

import {useWeatherStore} from "../weatherStore"



describe('WeatherStore ====', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

  })

  it('FETCH_WEATHER send request properly', async () => {
    const weatherStore = useWeatherStore()

    toHaveBeenCalled
    const weatherData = await weatherStore.FETCH_WEATHER([[11, 11]])

  })
})
