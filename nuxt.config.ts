import vuetify from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/supabase',
        '@pinia/nuxt',
        async (options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                config.plugins ||= []
                config.plugins.push(vuetify({}))
            })
        },
    ],
    supabase: {
        redirect: false,
    },
    css: ['vuetify/styles'],
    vite: { ssr: { noExternal: ['vuetify'] } },
    typescript: { shim: false },
    build: { transpile: ['vuetify'] },
    plugins: [`${__dirname}/src/presenter/plugins/useSupabaseClient`],
    pinia: {
        storesDirs: [`${__dirname}/src/data/stores/**`],
    },
    srcDir: 'src/presenter',
    alias: {
        '@domain': `${__dirname}/src/domain`,
        '@data': `${__dirname}/src/data`,
        '@presenter': `${__dirname}/src/presenter`,
    },
})
