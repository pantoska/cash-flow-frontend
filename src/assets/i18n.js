<<<<<<< HEAD
import Vue from "vue";
import VueI18n from "vue-i18n";

const messages = {
  en: {
    hello: "hellog",
  },
  pl: {
    hello: "Witaj",
  },
};

Vue.use(VueI18n);
export const i18n = new VueI18n({
  locale: "pl",
  fallbackLocale: "pl",
  messages,
});
=======
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
>>>>>>> 6526c4e0d29bf2b6acb4706cd74defcc624bd635
