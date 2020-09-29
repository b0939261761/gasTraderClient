<template>
  <button
    class = "btn"
  >
    <span class = 'btn__wrapper-icon'>
      <slot />
    </span>

    <span class = 'btn__wrapper-text' v-text='title' />
  </button>
</template>

<script>
export default {
  name: 'DrawerItem',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {

  }
};
</script>

<style scoped>
.btn {
  display: flex;
  line-height: 1rem;
  align-items: center;
  padding: 0 8px;
      font-size: 1.3rem;
      font-family: inherit;
    font-weight: 500;
    width: 100%;
    min-height: 4rem;
    border: none;
    background-color: transparent;
    outline: none;
    color: inherit;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    position: relative;
}

.btn__wrapper-icon :first-child {
  height: 24px;
  margin-right: 32px;
  fill: #757575;
  flex-shrink: 0;
}

.btn:not(:last-child) {
  margin-bottom: 4px;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  border-radius: inherit;
  opacity: 0;
  transition: opacity .3s cubic-bezier(.25, .8, .5, 1);
  pointer-events: none;
  will-change: opacity;
}

.btn:hover:enabled::before,
.btn:focus:enabled::before {
  opacity: .04;
}

.btn:hover:focus::before {
  opacity: .1;
}

.btn__wrapper-text {

}

</style>
