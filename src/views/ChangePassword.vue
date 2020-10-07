<template>
  <PageBody>
    <form
      class='form'
      @submit.prevent='onSubmit'
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

      <CustomButton title='Змінити пароль'>
        <ChangePasswordIco />
      </CustomButton>
    </form>

    <teleport to='body'>
      <FormModal
        v-if = 'hasChangePassword'
        title = 'Інформація'
        @cancel = 'onCancelModal'
      >
        <template #body>
          <p>Пароль змінено</p>
        </template>
      </FormModal>
    </teleport>
  </PageBody>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import FormModal from '@/components/FormModal';
import PageBody from '@/components/PageBody';
import InputPassword from '@/components/InputPassword';
import CustomButton from '@/components/Base/CustomButton.vue';
import ChangePasswordIco from '@/assets/images/key.svg';

import { apiChangePassword } from '@/api/user';

export default {
  name: 'ChangePassword',
  components: {
    FormModal,
    PageBody,
    InputPassword,
    CustomButton,
    ChangePasswordIco
  },
  setup() {
    const router = useRouter();

    const password = ref('');
    const newPassword = ref('');
    const confirmNewPassword = ref('');
    const hasChangePassword = ref(false);

    const onSubmit = async (event) => {
      event.preventDefault();
      const body = {
        password: password.value,
        newPassword: newPassword.value
      };

      try {
        await apiChangePassword(body);
        hasChangePassword.value = true;
      } catch {
        password.value = '';
      }
    };

    const onCancelModal = () => {
      password.value = '';
      newPassword.value = '';
      confirmNewPassword.value = '';
      hasChangePassword.value = false;
    };

    return {
      password,
      newPassword,
      confirmNewPassword,
      hasChangePassword,
      onSubmit,
      onCancelModal
    };
  }
};
</script>

<style scoped>
  .form {
    display: block;
    width: 100%;
  }
</style>
