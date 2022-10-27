import {describe, it, expect} from 'vitest'
import {getGeolocation} from '../geolocation'

describe('getGeolocation ====', () => {
  it('getGeolocation work properly', () => {
    if (navigator.geolocation) {
      let [lat, lon] = getGeolocation()
      expect(lat).toBeTypeOf('number')
      expect(lon).toBeTypeOf('number')
    }
  })
})
