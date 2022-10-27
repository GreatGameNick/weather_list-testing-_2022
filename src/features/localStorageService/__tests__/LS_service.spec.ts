import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import {LS_service} from '../LS_service'


describe('LocalStorageService ====', () => {
  it('LocalStorageService work properly', () => {
    const LSName = 'test'
    const LSData = 'itIsTest'
    let LSResult

    LS_service.setLS(LSName, LSData)
    LSResult = LS_service.getLS('test')
    expect(LSResult).toBe(LSData)

    LS_service.delLS(LSName)
    LSResult = LS_service.getLS(LSName)
    expect(LSResult).toBe('')
  })
})
