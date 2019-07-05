import PlayingCardsMemoryApp from './components/playing-cards-memory-app'
import CustomButton from './components/custom-button'
import PlayingCard from './components/playing-card'
import CustomText from './components/custom-text'

window.customElements.define('custom-text', CustomText)
window.customElements.define('playing-card', PlayingCard)
window.customElements.define('custom-button', CustomButton)
window.customElements.define('app-root', PlayingCardsMemoryApp)
