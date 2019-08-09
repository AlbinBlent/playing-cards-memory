import { generateRandomDeckArray, decodeCard } from '../functions/cardFunctions'
const appTemplate = document.createElement('template')
appTemplate.innerHTML = `
<style>
  body {
    background-color: whitesmoke;
  }
  :host {
    display: flex;
    text-align: center;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    flex: 2;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .flex-col {
    flex-direction: column;
  }
  .flex-row {
    flex-direction: row;
  }
  .filler {
    flex: 3;
  }
</style>
<div class="filler">
</div>
<div class="main-container">
  <div class="container flex-col">
    <custom-button id="shuffle-deck-button" value="Shuffle deck"></custom-button>
    <playing-card id="card" value="tja"></playing-card>
    <div class="container flex-row">
      <custom-button id="reset-deck-button" value="reset deck"></custom-button>
      <custom-button id="next-card-button" value="next card"></custom-button>
    </div>
  </div>
</div>
<div class="filler">
</div>
`

export default class PlayingCardsMemoryApp extends HTMLElement {
  constructor() {
    super()
    if (location.search.includes('order')) {
      const encodedDeck = location.search.substring(7).split('')
      this._deck = encodedDeck.map(encodedCard => decodeCard(encodedCard))
    } else {
      this._shuffleDeck()
    }
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(appTemplate.content.cloneNode(true))

    this.$nextCardButton = this._shadowRoot.getElementById('next-card-button')
    this.$currentCard = this._shadowRoot.getElementById('card')
    this.$shuffleDeckButton = this._shadowRoot.getElementById(
      'shuffle-deck-button',
    )
    this.$resetDeckButton = this._shadowRoot.getElementById('reset-deck-button')

    this.$nextCardButton.addEventListener('click', this._nextCard.bind(this))
    this.$shuffleDeckButton.addEventListener(
      'click',
      this._shuffleDeck.bind(this),
    )
    this.$resetDeckButton.addEventListener('click', this._resetDeck.bind(this))

    this._index = -1
  }

  connectedCallback() {
    this._renderCard(this._index)
  }

  _resetDeck() {
    this._index = -1
    this._renderCard(this._index)
  }

  _nextCard() {
    if (this._index < this._deck.length - 1) {
      this._index++
      this._renderCard(this._index)
    }
  }

  _shuffleDeck() {
    location.assign(
      location.origin + '/?order=' + generateRandomDeckArray().join(''),
    )
  }

  _renderCard(index) {
    this.$currentCard.setAttribute('value', '')
    const $card = this._deck[index]
    this.$currentCard.setAttribute('value', $card)
    this.dispatchEvent(
      new CustomEvent('deck:current-card:changed', {
        detail: $card,
        bubbles: true,
      }),
    )
  }
}
