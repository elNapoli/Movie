import vuetify from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/supabase',
        'nuxt-icon',
        '@nuxtjs/google-fonts',
        async (options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                config.plugins ||= []
                config.plugins.push(
                    vuetify({
                        styles: { configFile: 'assets/styles/settings.scss' },
                    })
                )
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
    srcDir: 'src/presenter',
    alias: {
        '@domain': `${__dirname}/src/domain`,
        '@data': `${__dirname}/src/data`,
        '@mocks': `${__dirname}/src/mocks`,
        '@presenter': `${__dirname}/src/presenter`,
    },
    googleFonts: {
        families: {
            Roboto: true,
            'Josefin+Sans': true,
            Lato: [100, 300],
            Raleway: {
                wght: [100, 400],
                ital: [100],
            },
            Inter: '200..700',
            'Crimson Pro': {
                wght: '200..900',
                ital: '200..700',
            },
        },
    },
})
