import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

import { md3 } from 'vuetify/blueprints'
export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: true,
        blueprint: md3,
        defaults: {
            VTextField: {
                variant: 'outlined',
            },
        },
        icons: {
            defaultSet: 'mdi', // This is already the default value - only for display purposes
        },
        theme: {
            defaultTheme: 'dark',
        },
    })
    app.vueApp.use(vuetify)
})
