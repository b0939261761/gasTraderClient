<template>
  <div class='page-body'>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Page'
}
</script>

<style scoped>
.page-body {
  padding: 1.6rem .8rem 0;
  width: 100%;
}
</style>
