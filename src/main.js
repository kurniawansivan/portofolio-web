import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

// Import UIkit CSS and JS
import 'uikit/dist/css/uikit.min.css'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

// Loads the UIkit icon plugin
UIkit.use(Icons)

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
