const itemTemplate = document.createElement('template')
itemTemplate.innerHTML = `
<style>
    :host {
        display: block;
        margin: 1rem;
        font-family: monospace;
    }
</style>
<span></span>
`

export default class CustomText extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(itemTemplate.content.cloneNode(true))

    this.$text = this._shadowRoot.querySelector('span')
  }

  connectedCallback() {
    this._render()
  }

  _render() {
    this.$text.innerHTML = this._value
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
    this._render()
  }
}
