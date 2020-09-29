<template>
  <Page>
  <div class='page'>
    <Drawer
      v-if = 'isOpenDrawer'
      @cancel = 'isOpenDrawer = false'
    />
    <div
      class='form'
    >
      <Header>
        <ToggleButton
          :isOpen = 'isOpenDrawer'
          @click = 'isOpenDrawer = !isOpenDrawer'
        />
      </Header>

      <router-view v-slot="{ Component }">
        <transition name="slide">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
  </Page>
</template>

<script>
import { ref } from 'vue';
import Page from '@/components/Page';
import Header from '@/components/Header';
import ToggleButton from '@/components/ToggleButton';
import Drawer from '@/components/Drawer';


export default {
  name: 'Home',
  components: {
    Page,
    Header,
    ToggleButton,
    Drawer,

  },
  setup() {
    const isOpenDrawer = ref(false);



    return {
      isOpenDrawer,
    }
  }
}
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

.page {
  min-height: 100vh;
  max-width: 40rem;
  width: 100%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
  border-radius: .6rem;
  background-color: #fff;
  position: relative;
  overflow-x: hidden;
}

@media (max-width: 40rem) {
  .page {
    border-radius: 0;
  }
}
</style>
