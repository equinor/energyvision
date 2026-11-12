import { languageOrDefault } from './language'

describe('Language function tests', () => {
  it('returns a supported ISO code unchanged', () => {
    expect(languageOrDefault('nb-NO')).toBe('nb-NO')
  })

  it('uses the default for an unsupported ISO code', () => {
    expect(languageOrDefault('foobar')).toBe('en-GB')
  })
})
