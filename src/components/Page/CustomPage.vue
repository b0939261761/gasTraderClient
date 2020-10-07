<template>
  <div class='wrapper-custom-page'>
    <div class='custom-page'>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomPage'
};
</script>

<style scoped>
.wrapper-custom-page {
  width: 100%;
  min-height: 100vh;
}

.custom-page {
  position: relative;
  width: 100%;
  max-width: 40rem;
  min-height: 100vh;
  margin: 0 auto;
  overflow-x: hidden;
  background-color: #fff;
  border-radius: .6rem .6rem 0 0;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .14);
}

@media (max-width: 400px) {
  .custom-page {
    border-radius: 0;
  }
}
</style>
