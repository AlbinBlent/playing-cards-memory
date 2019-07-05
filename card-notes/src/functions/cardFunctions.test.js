import {
  sortedEncodedCardDeck,
  generateRandomDeckArray,
  decodeCard,
} from './cardFunctions'

describe('Card function tests', () => {
  test('cardValues', () => {
    expect(sortedEncodedCardDeck[0]).toBe('A')
    expect(sortedEncodedCardDeck[51]).toBe('z')
    expect(sortedEncodedCardDeck.length).toBe(52)
  })
  test('randomDeckString', () => {
    expect(generateRandomDeckArray().length).toBe(52)
  })
  test('decodeCard', () => {
    expect(decodeCard('A')).toBe('Spader Ess')
    expect(decodeCard('B')).toBe('Spader 2')
    expect(decodeCard('C')).toBe('Spader 3')
    expect(decodeCard('D')).toBe('Spader 4')
    expect(decodeCard('E')).toBe('Spader 5')
    expect(decodeCard('L')).toBe('Spader Dam')
    expect(decodeCard('M')).toBe('Spader Kung')
    expect(decodeCard('N')).toBe('Hjärter Ess')
    expect(decodeCard('O')).toBe('Hjärter 2')
    expect(decodeCard('Z')).toBe('Hjärter Kung')
    expect(decodeCard('a')).toBe('Klöver Ess')
    expect(decodeCard('b')).toBe('Klöver 2')
    expect(decodeCard('c')).toBe('Klöver 3')
    expect(decodeCard('m')).toBe('Klöver Kung')
    expect(decodeCard('n')).toBe('Ruter Ess')
    expect(decodeCard('y')).toBe('Ruter Dam')
    expect(decodeCard('z')).toBe('Ruter Kung')
  })
})
