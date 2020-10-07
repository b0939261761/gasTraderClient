<template>
  <CustomPage>
    <PageHeader />

    <form
      class='form'
      @submit.prevent='onSubmit'
    >
      <InputEmail
        v-model = 'email'
        title='Email'
        placeholder='user@example.com'
        required
      />

      <InputPassword
        v-model='password'
        title='Пароль'
        placeholder='_'
        required
      />

      <InputPassword
        v-model='confirmPassword'
        title='Підтвердження пароля'
        placeholder='_'
        required
      />

      <InputText
        v-model='lastName'
        title='Прізвище'
        placeholder='Іванов'
        required
      />

      <InputText
        v-model='firstName'
        title='Імя'
        placeholder='Іван'
        required
      />

      <InputText
        v-model='edrpou'
        title='ЄДРПОУ / РНОКПП'
        placeholder='32855961 / 3121111612'
        required
      />

      <InputText
        v-model='organizationName'
        title='Назва організації'
        placeholder='ОСББ "Дружба"'
      />

      <Recaptcha
        ref = 'recaptchaEl'
        @verify = 'recaptchaToken = $event'
        @error = 'recaptchaToken = ""'
      />

      <CustomButton
        title='Створити аккаунт'
        :disabled = 'recaptchaToken === ""'
      >
        <UserPlusIco />
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
        v-if = 'hasSignUp'
        title = 'Інформація'
        @cancel = 'onCancelModal'
      >
        <template #body>
          <p>Користувач був створений.</p>
          <p>Дочекайтесь активації адміністратором.</p>
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
import InputEmail from '@/components/InputEmail.vue';
import InputPassword from '@/components/InputPassword.vue';
import InputText from '@/components/InputText.vue';
import Recaptcha from '@/components/Base/Recaptcha.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import UserPlusIco from '@/assets/images/user-plus.svg';

import FormModal from '@/components/FormModal.vue';

import { authSignUp } from '@/api/auth';

export default {
  name: 'SignUp',
  components: {
    CustomPage,
    PageHeader,
    InputEmail,
    InputPassword,
    InputText,
    Recaptcha,
    CustomButton,
    UserPlusIco,
    FormModal
  },
  setup() {
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const firstName = ref('');
    const lastName = ref('');
    const edrpou = ref('');
    const organizationName = ref('');
    const recaptchaEl = ref(null);
    const recaptchaToken = ref('');
    const hasSignUp = ref(false);

    const onSubmit = async event => {
      event.preventDefault();

      const body = {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        edrpou: edrpou.value,
        organizationName: organizationName.value,
        recaptchaToken: recaptchaToken.value
      };

      try {
        await authSignUp(body);
        hasSignUp.value = true;
      } catch {
        recaptchaToken.value = '';
        recaptchaEl.value.reset();
      }
    };

    return {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      edrpou,
      organizationName,
      recaptchaEl,
      recaptchaToken,
      hasSignUp,
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
