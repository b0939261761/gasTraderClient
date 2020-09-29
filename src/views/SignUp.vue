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

        <Btn title='Створити аккаунт'>
          <UserPlusIco />
        </Btn>
      </form>
      <div class="link-wrapper">
        <router-link :to="{name: 'SignIn'}" class="link-create">Головна</router-link>
      </div>
    </div>
  </Page>

  <teleport to="body">
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
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Page from '@/components/Page';
import InputEmail from '@/components/InputEmail';
import InputPassword from '@/components/InputPassword';
import InputText from '@/components/InputText';
import Btn from '@/components/Btn';
import UserPlusIco from '@/assets/user-plus.svg';

import FormModal from '@/components/FormModal';

import { authSignUp } from '@/api/auth';

export default {
  name: 'SignUp',
  components: {
    Page,
    InputEmail,
    InputPassword,
    InputText,
    Btn,
    UserPlusIco,
    FormModal
  },
  setup() {
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const firstName = ref('');
    const lastName = ref('');
    const edrpou = ref('');
    const organizationName = ref('');
    const hasSignUp = ref(false);

    const onSubmit = async event => {
      event.preventDefault();
      const body = {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        edrpou: edrpou.value,
        organizationName: organizationName.value
      }
      try {
        await authSignUp(body);
        hasSignUp.value = true;
      } catch {}
    };

    const onCancelModal = () => router.push({ name: 'SignIn' });

    return {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      edrpou,
      organizationName,
      hasSignUp,
      onSubmit,
      onCancelModal
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
