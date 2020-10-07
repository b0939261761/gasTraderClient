<template>
  <header class='page-header'>
    <picture class = 'page-header__wrapper_logo'>
      <source
        srcset = '@/assets/images/logo.webp'
        type = 'image/webp'
      >
      <source
        srcset = '@/assets/images/logo.jpg'
        type = 'image/jpeg'
      >
      <img
        class = 'page-header__logo'
        src = '@/assets/images/logo.jpg'
        alt = 'Логотип'
      >
    </picture>

    <div>
      <p class='page-header__company-title'>
        АСОЦІАЦІЯ
      </p>
      "ГАЗОВІ ТРЕЙДЕРИ УКРАЇНИ"
    </div>

    <slot />
  </header>
</template>

<script>
export default {
  name: 'PageHeader'
};
</script>

<style>
.page-header {
  display: flex;
  align-items: center;
  padding: .5rem;
  font-weight: bold;
  color: #fff;
  background-color: #1976d2;
  user-select: none;
}

.page-header__wrapper_logo {
  width: 7rem;
  height: 7rem;
  margin-right: 1rem;
}

.page-header__logo {
  width: auto;
  height: 100%;
  border-radius: 50%;
}

.page-header__company-title {
  margin: 0 0 .5rem;
  font-size: 2rem;
  letter-spacing: .2rem;
}
</style>
