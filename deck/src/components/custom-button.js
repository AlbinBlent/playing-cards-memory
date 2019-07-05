const itemTemplate = document.createElement('template')
itemTemplate.innerHTML = `
<style>
    :host {
    display: block;
    margin: 1rem;
    }

    button {
    cursor: pointer;
    display: block
    border: 0;
    border-radius: 10px;
    background-color: deepskyblue;
    }
</style>
<button>
    <custom-text></custom-text>
</button>
`

export default class CustomButton extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(itemTemplate.content.cloneNode(true))

    this.$text = this._shadowRoot.querySelector('custom-text')
  }

  connectedCallback() {
    this._renderButton()
  }

  _renderButton() {
    this.$text.setAttribute('value', this._value)
  }

  static get observedAttributes() {
    return ['value']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'value':
        this._value = newValue
        break
    }
  }
}
