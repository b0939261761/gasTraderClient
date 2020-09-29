<template>
<div>
  {{ testComp }}
  <button @click='click'>Click1</button>
</div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup () {
    const goals = ref('some');
    const testComp = computed(() => `COmp ${goals.value}`);

    const click = () => goals.value = Math.random();
    return {
      goals,
      testComp,
      click
    }
  }
}
</script>

<style scoped>

</style>