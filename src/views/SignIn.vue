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

      <Recaptcha
        ref = 'recaptchaEl'
        @verify = 'recaptchaToken = $event'
        @error = 'recaptchaToken = ""'
      />

      <CustomButton
        title = 'Вхід'
        :disabled = 'recaptchaToken === ""'
      >
        <SignInIco />
      </CustomButton>
    </form>
    <div class='link-wrapper'>
      <router-link
        :to='{ name: "SignUp" }'
        class='link-create'
      >
        Створити аккаунт
      </router-link>
      <router-link
        :to='{ name: "Recovery" }'
        class='link-create'
      >
        Забули пароль?
      </router-link>
    </div>
  </CustomPage>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import CustomPage from '@/components/Page/CustomPage.vue';
import PageHeader from '@/components/Page/PageHeader.vue';
import InputEmail from '@/components/InputEmail.vue';
import InputPassword from '@/components/InputPassword.vue';
import Recaptcha from '@/components/Base/Recaptcha.vue';
import CustomButton from '@/components/Base/CustomButton.vue';
import SignInIco from '@/assets/images/sign-in.svg';

import { authSignIn } from '@/api/auth';

export default {
  name: 'SignIn',
  components: {
    CustomPage,
    PageHeader,
    InputEmail,
    InputPassword,
    Recaptcha,
    CustomButton,
    SignInIco
  },
  setup() {
    const router = useRouter();
    // const email = ref('ostap999@test.com');
    // const password = ref('2');
    const email = ref('');
    const password = ref('');
    const recaptchaEl = ref(null);
    const recaptchaToken = ref('');

    const onSubmit = async event => {
      event.preventDefault();

      const body = {
        email: email.value,
        password: password.value,
        recaptchaToken: recaptchaToken.value
      };

      try {
        await authSignIn(body);
        router.push({ name: 'Home' });
      } catch (err) {
        recaptchaToken.value = '';
        recaptchaEl.value.reset();
        if (err.message === 'FAIL_AUTH') password.value = '';
      }
    };

    return {
      email,
      password,
      recaptchaEl,
      recaptchaToken,
      onSubmit
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
