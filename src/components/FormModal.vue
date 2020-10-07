<template>
    <div
      ref = 'formModal'
      class = 'wrapper-form-modal'
      tabindex = '-1'
    >
      <transition
        appear
        name = 'form-modal'
      >
        <div class = 'form-modal'>
          <header class = 'modal-header'>
            {{ title }}
            <button
              class = 'modal-btn-close'
              @click = 'onCancel'
            >
              &times;
            </button>
          </header>

          <div class = 'modal-body'>
            <slot name = 'body' />
          </div>

          <footer class = 'modal-footer'>
            <!-- <slot name = 'footer' /> -->
          </footer>
        </div>
      </transition>
    </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';

export default {

// //при открытии окна
// let marginSize = window.innerWidth - html.clientWidth;
// //ширина скроллбара равна разнице ширины окна и ширины документа (селектора html)
// if (marginSize) {
//     html.style.marginRight = marginSize + "px";
// }
// //при закрытии окна
// html.style.marginRight = "";

  name: 'FormModal',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup(_, { emit }) {
    onMounted(() => document.body.style.overflow = 'hidden');
    onUnmounted(() => document.body.style.removeProperty('overflow'));

    const onCancel = () => emit('cancel');

    return {
      onCancel
    }
  }
};
</script>

<style scoped>
/* transition */
.form-modal-enter-to,
.form-modal-leave-from {
  transform: scale(1);
}

.form-modal-enter-from,
.form-modal-leave-to {
  transform: scale(0);
}

.form-modal-enter-active,
.form-modal-leave-active {
  transition: transform .75s ease-in-out;
}

/* ********************* */
.wrapper-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgb(33, 33, 33, .46);
}

.form-modal {
  position: relative;
  width: 50rem;
  max-width: calc(100% - 4rem);
  margin: 1.6rem;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  word-break: break-word;
  hyphens: auto;
  background-color: white;
  border-radius: .2rem;
  box-shadow:
    0 1.1rem 1.5rem -.7rem rgba(0, 0, 0, .2),
    0 2.4rem 3.8rem .3rem rgba(0, 0, 0, .14),
    0 .9rem 4.6rem .8rem rgba(0, 0, 0, .12);
}

.modal-header {
  margin: 0;
  padding: 1.6rem;
  font-weight: normal;
  font-size: 2.4rem;
  text-align: left;
}

.modal-btn-close {
  position: relative;
  float: right;
  margin: -1.6rem -1.6rem 0 0;
  padding: 1.4rem;
  font-weight: bold;
  font-size: 2.4rem;
  line-height: 1;
  color: rgba(0, 0, 0, .5);
  text-shadow: 0 .1rem 0 #fff;
  background-color: transparent;
  border: 0;
  border-radius: .2rem;
  outline: none;
  cursor: pointer;
}

.modal-btn-close::before {
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

.modal-btn-close:hover::before,
.modal-btn-close:focus::before {
  opacity: .12;
}

.modal-body {
  padding: 1.6rem;
  font-size: 1.6rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 1.6rem;
}
</style>
