<template>
  <div
    ref = 'rootEl'
    class = 'recaptcha'
  />
</template>

<script>
import { ref, onUnmounted } from 'vue';

const initRecaptcha = () => {
  const url = new URL('https://www.google.com/recaptcha/api.js');
  url.searchParams.append('onload', 'vueRecaptchaCb');
  url.searchParams.append('render', 'explicit');
  url.searchParams.append('hl', 'uk');
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
  return script;
};

export default {
  name: 'Recaptcha',
  emits: {
    verify: null,
    expired: null,
    error: null,
    'update:eventReset': null
  },
  setup(props, { emit }) {
    const rootEl = ref(null);
    const scriptEl = initRecaptcha();

    const removeScripts = () => {
      document.querySelector('script[src^="https://www.gstatic.com/recaptcha/"').remove();
      scriptEl.remove();
    };

    onUnmounted(removeScripts);

    let widgetId;

    const renderOptions = {
      sitekey: process.env.VUE_APP_RECAPTCHA_KEY,
      theme: 'light',
      size: 'normal',
      tabindex: 0,
      callback: response => emit('verify', response),
      'expired-callback': () => emit('expired'),
      'error-callback': () => emit('error')
    };

    globalThis.vueRecaptchaCb = () => {
      widgetId = globalThis.grecaptcha.render(rootEl.value, renderOptions);
    };

    return {
      rootEl,
      // eslint-disable-next-line vue/no-unused-properties
      reset: () => globalThis.grecaptcha.reset(widgetId)
    };
  }
};
</script>

<style scoped>
.recaptcha {
  min-height: 7.8rem;
  margin-bottom: 1.5rem;
}

.recaptcha > :first-child {
  margin: 0 auto;
}
</style>
