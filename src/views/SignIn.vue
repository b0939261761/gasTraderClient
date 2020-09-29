<template>
  <Page>
    <div class='page'>
      <form
        class='form'
        @submit.prevent="onSubmit"
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

        <Btn title='Вхід'>
          <SignInIco />
        </Btn>
      </form>
      <div class="link-wrapper">
        <router-link :to="{name: 'SignUp'}" class="link-create">Створити аккаунт</router-link>
        <router-link :to="{name: 'Recovery'}" class="link-create">Забули пароль?</router-link>
      </div>
    </div>
  </Page>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Page from '@/components/Page';
import InputEmail from '@/components/InputEmail';
import InputPassword from '@/components/InputPassword';
import Btn from '@/components/Btn';
import SignInIco from '@/assets/sign-in.svg';

import { authSignIn } from '@/api/auth';

export default {
  name: 'SignIn',
  components: {
    Page,
    InputEmail,
    InputPassword,
    Btn,
    SignInIco
  },
  setup() {
    const router = useRouter();
    // const email = ref('ostap999@test.com');
    // const password = ref('1');
    const email = ref('');
    const password = ref('');

    const onSubmit = async event => {
      event.preventDefault();
      const body = {
        email: email.value,
        password: password.value
      }
      try {
        await authSignIn(body);
        router.push({ name: 'Home' });
      } catch (err) {
        if (err.message === 'FAIL_AUTH') password.value = '';
      }
    };

    return {
      email,
      password,
      onSubmit
    }
  }
}
</script>

<style scoped>
.page {
  max-width: 40rem;
  width: 100%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  padding: 2rem 2rem 0;
  border-radius: .6rem;
  background-color: #fff;
}

.link-wrapper {
  display: flex;
  border-top: .1rem solid rgba(0, 0, 0, .12);
}

.link-create {
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 4.4rem;
  text-align: center;
}

</style>
