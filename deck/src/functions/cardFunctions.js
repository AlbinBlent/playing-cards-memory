const convertValueToCardFace = value => {
  switch (value) {
    case 1:
      return 'Ess'
    case 11:
      return 'Knekt'
    case 12:
      return 'Dam'
    case 13:
      return 'Kung'
    default:
      return value
  }
}

export const decodeCard = card => {
  const code = card.charCodeAt(0)
  if (code <= 90) {
    const value = ((code - 65) % 13) + 1
    const suitValue = Math.floor((code - 65) / 13)
    switch (suitValue) {
      case 0:
        return `Spader ${convertValueToCardFace(value)}`
      case 1:
        return `Hjärter ${convertValueToCardFace(value)}`
      case 2:
        return `Klöver ${convertValueToCardFace(value)}`
    }
  }
  const value = ((code - 71) % 13) + 1
  const suitValue = Math.floor((code - 71) / 13)
  switch (suitValue) {
    case 2:
      return `Klöver ${convertValueToCardFace(value)}`
    case 3:
      return `Ruter ${convertValueToCardFace(value)}`
  }
}

export const sortedEncodedCardDeck = [...new Array(52)].map((value, index) => {
  if (index <= 25) {
    return String.fromCharCode(index + 65)
  }
  return String.fromCharCode(index + 71)
})

export const generateRandomDeckArray = (
  sortedDeck = [...sortedEncodedCardDeck],
  randomDeck = [],
) => {
  if (sortedDeck.length === 0) {
    return randomDeck
  }
  const randomNumber = Math.floor(Math.random() * sortedDeck.length)
  const randomCard = sortedDeck.splice(randomNumber, 1)[0]
  return generateRandomDeckArray(sortedDeck, [...randomDeck, randomCard])
}
