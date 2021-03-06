<template>
  <button
    class = 'drawer-item'
    @mousedown.left = 'addRipple'
    @mouseup.left = 'ripples = []'
  >
    <transition-group
      class = 'drawer-item__ripples'
      name = 'drawer-item__ripple-grow'
      tag = 'div'
    >
      <div
        v-for = 'ripple in ripples'
        :key = 'ripple.id'
        :style = '{
          top: ripple.top,
          left: ripple.left,
          width: ripple.width,
          height: ripple.height
        }'
        class = 'drawer-item__ripple'
      />
    </transition-group>

    <span class = 'drawer-item__wrapper-icon'>
      <slot />
    </span>

    <span
      class = 'drawer-item__wrapper-text'
      v-text = 'title'
    />
  </button>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'DrawerItem',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    const ripples = ref([]);

    const addRipple = ({ clientX, clientY, target }) => {
      const { top, left } = target.getBoundingClientRect();
      const rippleSize = Math.max(target.offsetWidth, target.offsetHeight);
      ripples.value.push({
        id: Date.now(),
        top: `${clientY - top - rippleSize / 2}px`,
        left: `${clientX - left - rippleSize / 2}px`,
        width: `${rippleSize}px`,
        height: `${rippleSize}px`
      });
    };

    return {
      ripples,
      addRipple
    };
  }
};
</script>

<style scoped>
.drawer-item {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding: 0 .8rem;
  overflow: hidden;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1rem;
  font-family: 'Roboto', sans-serif;
  color: #2c3e50;
  text-decoration: none;
  background-color: transparent;
  border: none;
  border-radius: .2rem;
  outline: none;
  cursor: pointer;
  user-select: none;
  will-change: box-shadow;
}

.drawer-item:not(:last-child) {
  margin-bottom: .4rem;
}

.drawer-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: currentColor;
  border-radius: inherit;
  opacity: 0;
  transition: opacity .3s cubic-bezier(.25, .8, .5, 1);
  pointer-events: none;
  will-change: opacity;
}

.drawer-item:hover:enabled::before {
  opacity: .05;
}

.drawer-item:focus:enabled::before {
  opacity: .1;
}

.drawer-item__wrapper-icon {
  height: 2.4rem;
  margin-right: 3.2rem;
  pointer-events: none;
  fill: #757575;
}

.drawer-item__wrapper-icon > :first-child {
  height: 100%;
}

.drawer-item__wrapper-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  pointer-events: none;
}

.drawer-item__ripples {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.drawer-item__ripple {
  position: absolute;
  background-color: rgba(255, 255, 255, .3);
  background-color: currentColor;
  border-radius: 50%;
  transform: scale(0);
  opacity: .3;
  will-change: opacity, transform;
}

.drawer-item__ripple-grow-enter-active {
  transition: transform 1.5s ease-out;
}

.drawer-item__ripple-grow-leave-active {
  transition: .7s ease-out;
  transition-property: opacity, transform;
}

.drawer-item__ripple-grow-enter-from {
  transform: scale(0);
}

.drawer-item__ripple-grow-enter-to {
  transform: scale(4);
}

.drawer-item__ripple-grow-leave-from {
  transform: scale(4);
  opacity: .3;
}

.drawer-item__ripple-grow-leave-to {
  transform: scale(4);
  opacity: 0;
}
</style>
