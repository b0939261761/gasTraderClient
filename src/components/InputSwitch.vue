<template>
  <label class ='input-switch'>
    <input
      :checked = 'value'
      type = 'checkbox'
      class = 'input-switch__input'
      @change = 'onChange'
    >
    <span
      class = 'input-switch__label'
      v-text = 'title'
    />
  </label>
</template>

<script>
export default {
  name: 'InputSwitch',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      validator: String,
      default: ''
    }
  },
  setup(_, { emit }) {
    const onChange = event => emit('update:modelValue', event.target.value);
    return {
      onChange
    }
  }
};
</script>

<style scoped>
.input-switch {
  display: block;
  position: relative;
  margin-bottom: 1rem;
  padding: .5rem 0 .5rem .5rem;
}

.input-switch__input {
  position: absolute;
  top: 0;
  left: 0;
  width: .01rem;
  height: .01rem;
  margin: 0;
  opacity: 0;
}

.input-switch__label {
  position: relative;
  display: block;
  min-height: 2rem;
  padding-left: 4.2rem;
  cursor: pointer;
  user-select: none;
}

.input-switch__label::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 2.4rem;
  height: 1.2rem;
  margin: auto 0;
  background-color: rgb(117, 117, 117);
  border-radius: .6rem;
}

.input-switch__label::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 2rem;
  height: 2rem;
  margin: auto 0;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 .2rem .4rem #616161;
  transform: translateX(-1rem);
  transition:
    transform .3s ease,
    box-shadow .3s ease,
    background-color .3s ease;
  will-change: transform, box-shadow, background-color;
}

.input-switch__input:checked + .input-switch__label::after {
  background-color: #2196f3;
  transform: translateX(1.4rem);
}

.input-switch__input:disabled + .input-switch__label::before {
  background-color: #ccc;
  opacity: 1;
}

.input-switch__input:disabled + .input-switch__label::after {
  background-color: #aaa;
  opacity: 1;
}

.input-switch__input:focus:enabled + .input-switch__label::after,
.input-switch__input:hover:enabled + .input-switch__label::after {
  box-shadow:
    0 .2rem .4rem #616161,
    0 0 0 1rem rgb(117, 117, 117, .2);
}

.input-switch__input:focus:enabled:checked + .input-switch__label::after,
.input-switch__input:hover:enabled:checked + .input-switch__label::after {
  box-shadow:
    0 .2rem .4rem #616161,
    0 0 0 1rem rgb(33, 150, 243, .2);
}

.input-switch__input:checked + .input-switch__label::before {
  background-color: #2196f3;
  opacity: .6;
}
</style>
