<template>
  <CustomPage>
    <Drawer
      v-if = 'isOpenDrawer'
      @cancel = 'isOpenDrawer = false'
    />
    <div
      class='form'
    >
      <PageHeader>
        <ToggleButton
          :is-open = 'isOpenDrawer'
          @click = 'isOpenDrawer = !isOpenDrawer'
        />
      </PageHeader>

      <router-view v-slot='{ Component }'>
        <transition name='slide'>
          <component :is='Component' />
        </transition>
      </router-view>
    </div>
  </CustomPage>
</template>

<script>
import { ref } from 'vue';
import CustomPage from '@/components/Page/CustomPage.vue';
import PageHeader from '@/components/Page/PageHeader.vue';
import ToggleButton from '@/components/ToggleButton.vue';
import Drawer from '@/components/Drawer.vue';

export default {
  name: 'Home',
  components: {
    CustomPage,
    PageHeader,
    ToggleButton,
    Drawer
  },
  setup() {
    const isOpenDrawer = ref(false);

    return {
      isOpenDrawer
    };
  }
};
</script>

<style scoped>

.slide-enter-from {
  position: absolute;
  transform: translateX(100%);
}

.slide-leave-to {
  position: absolute;
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  position: absolute;
  transform: translateX(0);
}

.slide-enter-active,
.slide-leave-active {
  position: absolute;
  transition: transform .75s ease-in-out;
}
</style>
