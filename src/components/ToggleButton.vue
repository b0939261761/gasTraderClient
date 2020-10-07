<template>
  <button
    class='toggle'
  >
    <span :class='["toggle-icon", { "toggle-icon--open": isOpen }]' />
  </button>
</template>

<script>
export default {
  name: 'ToggleButton',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.toggle {
  position: relative;
  width: 44px;
  height: 44px;
  margin-left: auto;
  background-color: transparent;
  cursor: pointer;
  border-radius: 100%;
  border: none;
  transition: 0.6s;
  outline: none;
  flex-shrink: 0;
}

.toggle:hover,
.toggle:focus {
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, .1),
    inset 0 0 0 22px rgba(255, 255, 255, .1);
}

.toggle-icon,
.toggle-icon::before,
.toggle-icon::after {
  content: '';
  position: absolute;
  left: 0;
  width: 20px;
  height: 2px;
  background-color: #fff;
  transition: transform .5s;
}

.toggle-icon {
  left: 12px;
  top: 21px;
}

.toggle-icon::before {
  top: -5px;
}

.toggle-icon::after {
  top: 5px;
}

.toggle-icon--open {
  background-color: transparent;
}

.toggle-icon--open:before {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.toggle-icon--open:after {
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
}

</style>
