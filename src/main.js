import './assets/main.css'

import { DateTime } from 'luxon'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Modal from './components/modals/Index.vue'
import Checkbox from './components/inputs/Checkbox.vue'
import Select from './components/inputs/Select.vue'
import Text from './components/inputs/Text.vue'
import Textarea from './components/inputs/Textarea.vue'
import Multiselect from './components/inputs/Multiselect.vue'
import File from './components/inputs/File.vue'

import Page from './components/page/Page.vue'
import Button from './components/buttons/Button.vue'

import Icon from './components/icons/Base.vue'
import Table from './components/table/Table.vue'
import Row from './components/table/Row.vue'
import Column from './components/table/Column.vue'
import Col from '@/components/grid/Col.vue'
import Grid from '@/components/grid/Grid.vue'
import Card from '@/components/page/Card.vue'
import Avatar from '@/components/page/Avatar.vue'
import StatusBadge from '@/components/page/StatusBadge.vue'

import Browse from '@/components/crud/Browse.vue'
import Store from '@/components/crud/Store.vue'
import Update from '@/components/crud/Update.vue'

import Pagination from '@/components/page/Pagination.vue'
import PaginationLocal from '@/components/page/PaginationLocal.vue'
import tooltip from '@/directives/tooltip'

const app = createApp(App)
const pinia = createPinia()

app.config.globalProperties.FormatDate = function(date, format = null) {

    const newDate = DateTime.fromISO(date, { zone: "utc" })
        .setZone('America/Bogota')

    if(format){
        return newDate.toFormat(format)
    }
    
    return newDate.toFormat('dd/MM/yyyy HH:mm')

}

app.config.globalProperties.FormatNumber = function(value, properties) {
    const number = typeof value === 'string' ? parseFloat(value) : value
    
    if (isNaN(number)) return '0'

    properties = {
        style: 'currency',
        currency: 'COP',
        ...properties
    }
    
    return number.toLocaleString('es-CO', properties)
}

app.component('Multiselect', Multiselect)
app.component('Checkbox', Checkbox)
app.component('Select', Select)
app.component('Text', Text)
app.component('Textarea', Textarea)
app.component('File', File)

app.component('Page', Page)
app.component('Button', Button)
app.component('Icon', Icon)
app.component('Table', Table)
app.component('Row', Row)
app.component('Column', Column)
app.component('Col', Col)
app.component('Grid', Grid)
app.component('Card', Card)
app.component('Modal', Modal)
app.component('Avatar', Avatar)
app.component('StatusBadge', StatusBadge)

app.component('Browse', Browse)
app.component('Store', Store)
app.component('Update', Update)

app.component('Pagination', Pagination)
app.component('PaginationLocal', PaginationLocal)

app.directive('tooltip', tooltip)

app.use(pinia)
app.use(router)

app.mount('#app')
