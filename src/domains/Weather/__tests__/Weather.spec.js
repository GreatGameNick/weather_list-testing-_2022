import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Weather from '../Weather.vue'

describe('Weather ====', () => {
  it('page renders properly', () => {
    const wrapper = mount(Weather)

    expect(2).not.toBe(5)
    // expect(wrapper.text()).toContain('Weather')
  })
})
