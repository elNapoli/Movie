import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: true,
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
