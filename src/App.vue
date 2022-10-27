<script setup lang="ts">
import {RouterView} from 'vue-router'


</script>


<template>
  <suspense>
    <RouterView/>
  </suspense>
</template>

<style scoped lang="scss">
header {
  border-bottom: var(--vt-c-grey) 1px solid;
}

</style>
