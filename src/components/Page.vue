<template>
  <div class='page-main'>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Page'
}
</script>

<style scoped>
.page-main {
  min-height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
}
</style>
