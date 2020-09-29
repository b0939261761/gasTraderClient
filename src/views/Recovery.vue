<template>
  <Page>
    <div class='page'>
      <form
        class='form'
        @submit.prevent="onSubmit"
      >
        <InputText
          v-model = 'email'
          title='Email / ЄДРПОУ / РНОКПП'
          placeholder='user@example.com / 32855961 / 3121111612'
          required
        />

        <Btn title='Відновити пароль'>
          <UnlockIco />
        </Btn>
      </form>
      <div class="link-wrapper">
        <router-link :to="{name: 'SignIn'}" class="link-create">Головна</router-link>
      </div>
    </div>
  </Page>

  <teleport to="body">
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
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Page from '@/components/Page';
import InputText from '@/components/InputText';
import Btn from '@/components/Btn';
import UnlockIco from '@/assets/images/unlock.svg';

import FormModal from '@/components/FormModal';

import { authRecovery } from '@/api/auth';

export default {
  name: 'Recovery',
  components: {
    Page,
    InputText,
    Btn,
    UnlockIco,
    FormModal
  },
  setup() {
    const router = useRouter();
    const email = ref('');
    const hasRecovery = ref(false);

    const onSubmit = async event => {
      event.preventDefault();
      try {
        await authRecovery({ email: email.value });
        hasRecovery.value = true;
      } catch {}
    };

    const onCancelModal = () => router.push({ name: 'SignIn' });

    return {
      email,
      hasRecovery,
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
