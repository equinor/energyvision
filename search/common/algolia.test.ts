import { generateIndexName } from '.'
import { prefixEnv } from './algolia'


describe('prefixEnv', () => {
  const sut = prefixEnv

  describe('Empty string returns empty string', () => {
    const res = sut('')
    it('Result is empty string', () => {
      expect(res).toBe('')
    })
  })
  describe('String with less than three chars returns itself', () => {
    const str = 'AB'
    const res = sut(str)
    it('Result is the string itself', () => {
      expect(res).toBe(str)
    })
  })
  describe('Strings longer than 3 chars first 3 chrs', () => {
    const str = 'ABCDEF'
    const res = sut(str)
    it('Result the first 3 characters', () => {
      expect(res).toBe('ABC')
    })
  })
})

describe('generateIndexName', () => {
  const sut = generateIndexName

  describe('Basic test - function works as expected given valid parameters', () => {
    const identifier = 'EVENTS'
    const language = 'en-GB'
    const environment = 'DEV'
    const res = sut(identifier)(language)(environment)
    it('Result should be as expected', () => {
      expect(res).toBe('dev_EVENTS_en-GB')
    })
  })
})
