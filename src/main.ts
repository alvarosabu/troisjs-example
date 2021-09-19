import { createApp } from 'vue';
import App from './App.vue';
import '@purge-icons/generated';
import { createI18n } from 'vue-i18n';

import './styles/base.css';

// Router
import { Router } from '/@/router';

// i18n
import messages from '@intlify/vite-plugin-vue-i18n/messages';

// WindiCSS
import 'virtual:windi.css';
import 'virtual:windi-devtools';

const app = createApp(App);

// Dynamic Forms
import { createDynamicForms } from '@asigloo/vue-dynamic-forms';

const VueDynamicForms = createDynamicForms({
  autoValidate: true,
  form: {
    method: 'POST',
    netlify: false,
    netlifyHoneypot: null,
  },
});

app.use(VueDynamicForms)

//
const i18n = createI18n({
  locale: 'en',
  messages,
});

app.use(i18n);

app.use(Router);

app.mount('#app');
