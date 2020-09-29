<template>
  <router-view v-slot="{ Component }">
    <transition
      name="slide"
      @before-enter="beforeEnterPage"
      @after-enter="afterEnterPage"
    >
      <component :is="Component" />
    </transition>
  </router-view>

<FormModalError />
</template>

<script>
import FormModalError from '@/components/FormModalError.vue';

export default {
  components: {
    FormModalError
  },
  setup() {
    const beforeEnterPage = () => document.body.style.overflow = 'hidden';
    const afterEnterPage = () => document.body.style.removeProperty('overflow');

    return {
      beforeEnterPage,
      afterEnterPage
    }
  }
}
</script>

<style>
@import url('./fonts.css');

*,
*::before,
*::after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  line-height: 1.15;
  font-size: 62.5%;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
      background-color: #f5f5f5;
  color: #2c3e50;
  text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-size: 1.6rem;
  margin: 0;
}

.wrapper-page {
  min-height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
}


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
