<template>
  <PageBody>
    <form
      class='form'
      @submit.prevent="onSubmit"
    >
      <InputPassword
        v-model='password'
        title='Поточний пароль'
        placeholder='_'
        required
      />

      <InputPassword
        v-model='newPassword'
        title='Новий пароль'
        placeholder='_'
        required
      />

      <InputPassword
        v-model='confirmNewPassword'
        title='Підтвердження нового пароля'
        placeholder='_'
        required
      />

      <Btn title='Змінити пароль'>
        <ChangePasswordIco />
      </Btn>
    </form>
  </PageBody>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import PageBody from '@/components/PageBody';
import InputPassword from '@/components/InputPassword';
import Btn from '@/components/Btn';
import ChangePasswordIco from '@/assets/images/key.svg';

import { authSignUp } from '@/api/auth';

export default {
  name: 'ChangePassword',
  components: {
    PageBody,
    InputPassword,
    Btn,
    ChangePasswordIco
  },
  setup() {
    const router = useRouter();

    const password = ref('');
    const newPassword = ref('');
    const confirmNewPassword = ref('');
    const hasChangePassword = ref(false);

    const onSubmit = async event => {
      event.preventDefault();
      const body = {
        password: password.value,
        newPassword: newPassword.value,
      }
      try {
        // await authSignUp(body);
        hasChangePassword.value = true;
      } catch {}
    };

    const onCancelModal = () => {
      password.value = '';
      newPassword.value = '';
      confirmNewPassword.value = '';
    };

    return {
      password,
      newPassword,
      confirmNewPassword,
      onSubmit,
      onCancelModal
    }
  }
}
</script>

<style scoped>
  .form {
    display: block;
    width: 100%;
  }
</style>
