<template>
  <PageBody>
    <InputText
      v-model='organizationCode'
      title='ЄДРПОУ / РНОКПП'
      readonly
    />

    <InputText
      v-model='organizationName'
      title='Назва організації'
      readonly
    />

    <InputText
      v-model='address'
      title='Адреса'
      readonly
    />

    <InputText
      v-model='manager'
      title='Керівник'
      readonly
    />
  </PageBody>
</template>

<script>
import { ref } from 'vue';
import { apiGetCompany } from '@/api/company';

import PageBody from '@/components/PageBody';
import InputText from '@/components/InputText';


export default {
  name: 'Account',
  components: {
    PageBody,
    InputText
  },
  setup() {
    const organizationCode = ref('');
    const organizationName = ref('');
    const address = ref('');
    const manager = ref('');

    (async () => {
      const company = await apiGetCompany();
      organizationCode.value = company.organizationCode;
      organizationName.value = company.organizationName;
      address.value = company.address;
      manager.value = company.manager;
    })();

    return {
      organizationCode,
      organizationName,
      address,
      manager
    }
  }
}
</script>

