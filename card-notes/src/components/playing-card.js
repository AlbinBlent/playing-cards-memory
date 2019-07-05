const itemTemplate = document.createElement('template')
itemTemplate.innerHTML = `
<style>
  :host {
    display: block;
    background-color: antiquewhite;
    width: 12rem;
    height: 15rem;
    margin: 1rem;
    border-radius: 15px;
    border: 2px solid lightgrey;
  }
  .container {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-between;
  }
  .margin {
    margin: 1rem;
  }
  .flex-col {
    flex-direction: column;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-end {
    align-items: flex-end;
  }
</style>
<div class="container flex-col">
  <div class="container flex-row">
    <div class="margin" id="suit0"></div>
    <div class="margin" id="suit1"></div>
  </div>
  <custom-text></custom-text>
  <div class="container flex-row flex-end">
    <div class="margin" id="suit2"></div>
    <div class="margin" id="suit3"></div>
  </div>
</div>
`

export default class PlayingCard extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(itemTemplate.content.cloneNode(true))

    this.$text = this._shadowRoot.querySelector('custom-text')
    this.$suit = [...new Array(4)].map((value, index) =>
      this._shadowRoot.getElementById(`suit${index}`),
    )
  }

  connectedCallback() {
    this._render()
  }

  _render() {
    this.$text.setAttribute('value', this._value)
    this.$suit.map(element => (element.innerHTML = this._suit))
  }

  static get observedAttributes() {
    return ['value']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'value':
        this._value = newValue
        switch (newValue.split(' ')[0]) {
          case 'Ruter':
            this._suit = '&#x2662'
            break
          case 'Spader':
            this._suit = '&#x2664'
            break
          case 'Hjärter':
            this._suit = '&#x2661'
            break
          case 'Klöver':
            this._suit = '&#x2667'
            break
        }
        break
    }
    this._render()
  }
}
