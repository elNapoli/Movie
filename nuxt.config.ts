import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/supabase',
        '@pinia/nuxt',
        '@vee-validate/nuxt',
        'dayjs-nuxt',
        async (_, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                config.plugins ||= []
                config.plugins.push(vuetify({}))
            })
        },
    ],
    dayjs: {
        locales: ['es'],
        plugins: ['relativeTime', 'utc', 'timezone'],
        defaultLocale: 'es',
        defaultTimezone: 'America/New_York',
    },
    supabase: {
        redirect: false,
    },
    veeValidate: {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
            Form: 'VeeForm',
            Field: 'VeeField',
            FieldArray: 'VeeFieldArray',
            ErrorMessage: 'VeeErrorMessage',
        },
    },
    css: ['vuetify/styles'],
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
    typescript: { shim: false },
    build: { transpile: ['vuetify'] },
    plugins: [],
    pinia: {
        storesDirs: [`./src/data/stores/**`],
    },
    srcDir: 'src/presenter',
    alias: {
        '@domain': `${__dirname}/src/domain`,
        '@data': `${__dirname}/src/data`,
        '@presenter': `${__dirname}/src/presenter`,
    },
})
