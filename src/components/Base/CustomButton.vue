<template>
  <button
    class = 'custom-button'
    :disabled = 'disabled'
    @mousedown.left = 'addRipple'
    @mouseup.left = 'ripples = []'
    @contextmenu.prevent
  >
    <transition-group
      class = 'custom-button__ripples'
      name = 'custom-button__ripple-grow'
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
        class = 'custom-button__ripple'
      />
    </transition-group>

    <span class = 'custom-button__wrapper-icon'>
      <slot />
    </span>

    <span
      class = 'custom-button__wrapper-text'
      v-text = 'title'
    />
  </button>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CustomButton',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
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
.custom-button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 4.4rem;
  padding: .8rem 1.6rem;
  overflow: hidden;
  font-weight: bold;
  font-size: 1.4rem;
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: .125rem;
  border: none;
  border-radius: .2rem;
  outline: none;
  user-select: none;
  will-change: box-shadow;
  fill: currentColor;
}

.custom-button:enabled {
  color: #fff;
  background-color: #1867c0;
  box-shadow:
    0 .3rem .1rem -.2rem rgba(0, 0, 0, .2),
    0 .2rem .2rem 0 rgba(0, 0, 0, .14),
    0 .1rem .5rem 0 rgba(0, 0, 0, .12);
  cursor: pointer;
}

.custom-button:disabled {
  color: #b6b6b6;
  background-color: #e0e0e0;
}

.custom-button:not(:last-child) {
  margin-bottom: 2rem;
}

.custom-button:active {
  box-shadow:
    0 .5rem .5rem -.3rem rgba(0, 0, 0, .2),
    0 .8rem 1rem .1rem rgba(0, 0, 0, .14),
    0 .3rem 1.4rem .2rem rgba(0, 0, 0, .12);
}

.custom-button::before {
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

.custom-button:enabled:hover::before,
.custom-button:enabled:focus::before {
  opacity: .12;
}

.custom-button__wrapper-icon {
  height: 2rem;
  margin-right: .8rem;
  pointer-events: none;
}

.custom-button__wrapper-icon > :first-child {
  height: 100%;
}

.custom-button__wrapper-text {
  pointer-events: none;
}

.custom-button__ripples {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.custom-button__ripple {
  position: absolute;
  background-color: rgba(255, 255, 255, .3);
  background-color: currentColor;
  border-radius: 50%;
  transform: scale(0);
  opacity: .3;
  will-change: opacity, transform;
}

.custom-button__ripple-grow-enter-active {
  transition: transform 1.5s ease-out;
}

.custom-button__ripple-grow-leave-active {
  transition: .7s ease-out;
  transition-property: opacity, transform;
}

.custom-button__ripple-grow-enter-from {
  transform: scale(0);
}

.custom-button__ripple-grow-enter-to {
  transform: scale(4);
}

.custom-button__ripple-grow-leave-from {
  transform: scale(4);
  opacity: .3;
}

.custom-button__ripple-grow-leave-to {
  transform: scale(4);
  opacity: 0;
}
</style>
