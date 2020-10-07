<template>
  <CustomPage>
    <PageHeader />
    <form
      class='form'
      @submit.prevent='onSubmit'
    >
      <InputText
        v-model = 'recoveryValue'
        title='Email / ЄДРПОУ / РНОКПП'
        placeholder='user@example.com / 32855961 / 3121111612'
        required
      />

      <Recaptcha
        ref = 'recaptchaEl'
        @verify = 'recaptchaToken = $event'
        @error = 'recaptchaToken = ""'
      />

      <CustomButton
        title='Відновити пароль'
      >
        <UnlockIco />
      </CustomButton>
    </form>
    <div class='link-wrapper'>
      <router-link
        :to='{ name: "SignIn" }'
        class='link-create'
      >
        Головна
      </router-link>
    </div>

    <teleport to='body'>
      <FormModal
        v-if = 'hasRecovery'
        title = 'Інформація'
        @cancel = 'onCancelModal'
      >
        <template #body>
          <p>Пароль надіслано на email вказаний при реєстрації.</p>
        </template>
      </FormModal>
    </teleport>
  </CustomPage>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import CustomPage from '@/components/Page/CustomPage.vue';
import PageHeader from '@/components/Page/PageHeader.vue';
import InputText from '@/components/InputText.vue';
import Recaptcha from '@/components/Base/Recaptcha.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import UnlockIco from '@/assets/images/unlock.svg';

import FormModal from '@/components/FormModal.vue';

import { authRecovery } from '@/api/auth';

export default {
  name: 'Recovery',
  components: {
    CustomPage,
    PageHeader,
    InputText,
    Recaptcha,
    CustomButton,
    UnlockIco,
    FormModal
  },
  setup() {
    const recoveryValue = ref('');
    const recaptchaEl = ref(null);
    const recaptchaToken = ref('');
    const hasRecovery = ref(false);

    const onSubmit = async evt => {
      evt.preventDefault();

      const body = {
        recoveryValue: recoveryValue.value,
        recaptchaToken: recaptchaToken.value
      };

      try {
        await authRecovery(body);
        hasRecovery.value = true;
      } catch {
        recaptchaToken.value = '';
        recaptchaEl.value.reset();
      }
    };

    return {
      recoveryValue,
      hasRecovery,
      recaptchaEl,
      recaptchaToken,
      onSubmit,
      onCancelModal: () => useRouter().push({ name: 'SignIn' })
    };
  }
};
</script>

<style scoped>
.form {
  width: 100%;
  padding: 1.6rem .8rem;
}

.link-wrapper {
  display: flex;
  border-top: .1rem solid rgba(0, 0, 0, .12);
}

.link-create {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 4.4rem;
  font-size: 1.6rem;
  text-align: center;
}
</style>
