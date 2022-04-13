import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'echarts/lib/chart/line'
import Echarts from 'vue-echarts'
import {use} from "echarts/core"
import axios from 'axios'
import VueAxios from 'vue-axios'

import {
    CanvasRenderer
} from 'echarts/renderers'
import {
    BarChart
} from 'echarts/charts'
import {
    GridComponent,
    TooltipComponent
} from 'echarts/components'

use([
    CanvasRenderer,
    BarChart,
    GridComponent,
    TooltipComponent
])

axios.defaults.baseURL='/api'
axios.defaults.headers.post['Content-Type']='application/json'
axios.defaults.headers.post['Access-Control-Allow-Origin']='*'
const app = createApp(App)
app.use(VueAxios, axios)
app.component('v-chart', Echarts)
app.use(ElementPlus)
app.mount('#app')