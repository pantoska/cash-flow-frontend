import Vue from 'vue'
import VueI18n from 'vue-i18n'

const messages = {
    en: {
        hello: 'hellog'
    },
    pl: {
        hello: 'Witaj'
    }
}

Vue.use(VueI18n)
export const i18n = new VueI18n({
    locale: 'pl',
    fallbackLocale: 'pl',
    messages
})
