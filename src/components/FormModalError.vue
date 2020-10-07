<template>
  <FormModal
    v-if = 'currentError'
    :title = 'currentError.title'
    @cancel = 'onCancel'
  >
    <template #body>
      {{ currentError.message }}
    </template>
  </FormModal>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import FormModal from '@/components/FormModal.vue';

const errorMessages = {
  HTTP: {
    getTitle: () => 'Помилка з\'єднання',
    getMessage: data => `${data.statusCode} "${data.method} ${data.url}"\n${data.message}`
  },
  NETWORK: {
    getTitle: () => 'Помилка мережі',
    getMessage: data => `${data.method} ${data.url}`
  },
  FAIL_AUTH: {
    getTitle: () => 'Помилка аутентифікації',
    getMessage: () => 'Невірний еmail або пароль'
  },
  USER_NOT_ACTIVE: {
    getTitle: () => 'Помилка відновлення паролю',
    getMessage: () => 'Користувач не активний'
  },
  ACTIVE_USER_EXISTS: {
    getTitle: () => 'Помилка реєстрації',
    getMessage: () => 'Email зареєстрований і активний'
  },
  NOT_ACTIVE_USER_EXISTS: {
    getTitle: () => 'Помилка реєстрації',
    getMessage: () => 'Email зареєстрований і не активний'
  },
  USER_NOT_EXISTS: {
    getTitle: () => 'Помилка відновлення паролю',
    getMessage: () => 'Користувач не існує'
  },
  WRONG_PASSWORD: {
    getTitle: () => 'Помилка зміни паролю',
    getMessage: () => 'Поточний пароль невірний'
  },
  RECAPTCHA_INVALID: {
    getTitle: () => 'Помилка',
    getMessage: () => 'Невірна капча'
  }
};

export default {
  name: 'FormModalError',
  components: {
    FormModal
  },
  setup() {
    const store = useStore();

    const getCurrentError = () => {
      const error = store.getters['errors/current'];
      if (!error) return null;
      const { code, data } = error;
      let title = code;
      let message = data;

      const errorMessage = errorMessages[code];
      if (errorMessage) {
        title = errorMessage.getTitle();
        message = errorMessage.getMessage(data);
      }
      return { title, message };
    };

    return {
      currentError: computed(getCurrentError),
      onCancel: () => store.commit('errors/remove')
    };
  }
};
</script>
