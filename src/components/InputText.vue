<template>
  <label class='input-text'>
    <input
      :value = 'modelValue'
      class = "input"
      :placeholder = 'placeholder'
      :required = 'required'
      :readonly = 'readonly'
      @input = 'onInput'
    />

    <span
      class= "label"
      v-text = 'title'
    />
  </label>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    title: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup(_, { emit }) {
    const onInput = event => emit('update:modelValue', event.target.value);
    return {
      onInput
    }
  }
};
</script>

<style scoped>
.input-text {
  display: block;
  position: relative;
  padding-top: 1.8rem;
  text-align: left;
}

.input-text:not(:last-child) {
  margin-bottom: 1.5rem;
}

.input,
.label {
  width: 100%;
  margin-bottom: .8rem;
  padding: .6rem 1.2rem;
  font-size: 1.6rem;
}

.label {
  position: absolute;
  top: 1.8rem;
  left: 0;
  width: 120%;
  overflow: hidden;
  color: #495057;
  white-space: nowrap;
  text-overflow: ellipsis;
  transform: translateY(-2.3rem) scale(.8);
  transform-origin: 0 0;
  transition:
    transform .3s cubic-bezier(.25, .8, .5, 1),
    width .3s cubic-bezier(.25, .8, .5, 1),
    color .3s cubic-bezier(.25, .8, .5, 1);
  will-change: transform;
}

.input {
  display: block;
  height: calc(3.6rem + .2rem);
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: .1rem solid #ced4da;
  border-radius: .4rem;
  transition:
    border-color .15s ease-in-out,
    box-shadow .15s ease-in-out;
}

.input--error {
  border-color: #ff5252;
}

.input:not(:hover):not(:focus):placeholder-shown + .label {
  width: 100%;
  color: #a5a5a5;
  transform: translateY(0) scale(1);
  pointer-events: none;
}

.input:not(:hover):not(:focus):placeholder-shown + .label--error {
  color: #ff5252;
}

.input.placeholder-shown:not(:hover):not(:focus) + .label {
  width: 100%;
  color: #a5a5a5;
  transform: translateY(0) scale(1);
  pointer-events: none;
}

.input.placeholder-shown:not(:hover):not(:focus) + .label-error {
  color: #ff5252;
}

.input::placeholder {
  color: transparent;
  transition: color .3s cubic-bezier(.25, .8, .5, 1);
}

.input:focus::placeholder,
.input:hover::placeholder {
  color: #a5a5a5;
}

.input:focus {
  color: #495057;
  background-color: white;
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 .32rem rgba(0, 123, 255, .25);
}
</style>
