import { createApp } from 'vue'
import App from './App.vue'
import router from './router/client.js'

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

// Import custom CSS files
import './assets/css/elegant-icons.css'
import './assets/css/font-awesome.min.css'
import './assets/css/magnific-popup.css'
import './assets/css/nice-select.css'
import './assets/css/owl.carousel.min.css'
import './assets/css/slicknav.min.css'
import './assets/css/style.css'
// Import main SCSS (if present)
import './assets/scss/style.scss'

const app = createApp(App)

app.use(router)

app.mount('#app')
