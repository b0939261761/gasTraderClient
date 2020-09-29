<template>
  <div class="wrapper">
   <picture>
      <source srcset="../assets/logo.webp" type="image/webp">
      <source srcset="../assets/logo.png" type="image/png">
      <img src="../assets/logo.png" alt="Логотип">
    </picture>

    <div>
      <p class="first">АССОЦИАЦИЯ</p>
      <p>"ГАЗОВЫЕ ТРЕЙДЕРЫ УКРАИНЫ"</p>
    </div>

    <slot />
  </div>

</template>

<script>
export default {
  name: 'Header Logo'
};
</script>

<style>
.wrapper {
  display: flex;
  align-items: center;
  background-color: #1976d2;
  color: #fff;
  font-weight: bold;
  /* border-radius: .6rem  .6rem 0 0 ; */
  padding: .5rem;
}

p {
  margin: 0;
}

.first {
  font-size: 20px;
  letter-spacing: 2px;
  margin-bottom: 5px;
}

picture {
  height: 70px;
  width: 70px;
  margin-right: 10px;
}

img {
  height: 100%;
  width: auto;
}
</style>

