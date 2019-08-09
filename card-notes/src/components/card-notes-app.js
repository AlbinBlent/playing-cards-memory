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
    background-color: black;
    padding: 1rem;
    border: 0;
    border-radius: 10px;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
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
  .notesInput {
    margin-right: 1rem;
  }
  .notesOutputContainer {
    background-color: white;
    margin-top: 1rem;
    border-radius: 10px;
  }
  button {
    margin: 1rem;
  }
</style>
<div class="filler">
</div>
<div class="main-container">
  <div class="container flex-row">
    <input id="card-note-input" class="notesInput" placeholder="Note goes here"></input>
    <button id="add-note-button">Add</button>
  </div>
  <div class="container flex-row notesOutputContainer">
    <p id="notes"></p>
    <button id="show-note-button">Show note?</button>
  </div>
</div>
<div class="filler">
</div>
`
const keyWrapper = key => `$key$${key}$/key$`
const getKeyFromPair = pair => pair.split('$key$')[1].split('$/key$')[0]
const valueWrapper = value => `$value$${value}$/value$`
const getValueFromPair = pair => pair.split('$value$')[1].split('$/value$')[0]
const keyValueSeparator = '#%#'
const pairSeparator = '!&!'

export default class CardNotesApp extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(appTemplate.content.cloneNode(true))

    this.$cardNoteInput = this._shadowRoot.getElementById('card-note-input')
    this.$addNoteButton = this._shadowRoot.getElementById('add-note-button')
    this.$notesElement = this._shadowRoot.getElementById('notes')
    this.$showNoteButton = this._shadowRoot.getElementById('show-note-button')

    this.$addNoteButton.addEventListener(
      'click',
      this._handleAddCardNote.bind(this),
    )
    this.$showNoteButton.addEventListener(
      'click',
      this._handleShowNote.bind(this),
    )

    this._cardNotes = new Map()
    this._readCardNotesFromLocalStorage()

    this._currentCard = ''
    this._showNote = false
  }

  _handleShowNote() {
    this._showNote = true
    this._render()
  }

  _readCardNotesFromLocalStorage() {
    const storageString = localStorage.getItem('cardnotes')
      ? localStorage.getItem('cardnotes')
      : ''
    storageString.split(pairSeparator).forEach(stringPair => {
      if (stringPair) {
        this._cardNotes.set(
          getKeyFromPair(stringPair),
          getValueFromPair(stringPair),
        )
      }
    })
  }

  _writeCardNotesToLocalStorage() {
    let storageString = ''
    this._cardNotes.forEach((value, key) => {
      storageString = `${storageString}${keyWrapper(
        key,
      )}${keyValueSeparator}${valueWrapper(value)}${pairSeparator}`
    })
    localStorage.setItem('cardnotes', storageString)
  }

  connectedCallback() {
    window.addEventListener(
      'deck:current-card:changed',
      this._handleCurrentCardChanged.bind(this),
    )
    this._render()
  }

  disconnectedCallback() {
    window.removeEventListener(
      'deck:current-card:changed',
      this._handleCurrentCardChanged.bind(this),
    )
  }

  _handleCurrentCardChanged(event) {
    this._currentCard = event.detail
    this._showNote = false
    this._render()
  }

  _handleAddCardNote() {
    if (this.$cardNoteInput && this.$cardNoteInput.value) {
      this._cardNotes.set(this._currentCard, this.$cardNoteInput.value)
      this.$cardNoteInput.value = ''
    }
    this._writeCardNotesToLocalStorage()
    this._render()
  }

  _render() {
    this.$notesElement.hidden = !this._showNote
    this.$showNoteButton.hidden = this._showNote
    this.$notesElement.innerHTML = this._cardNotes.get(this._currentCard)
      ? this._cardNotes.get(this._currentCard)
      : ''
  }
}
