import { generateIndexName } from '.'

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
