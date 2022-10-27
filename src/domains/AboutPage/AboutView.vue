<script setup lang="ts">
import {taskText} from "./assets/taskText"

</script>


<template>
  <div class="about">
    # ABOUT
  </div>
  
  <article v-html="taskText">
  </article>
  
  <div @click="$router.push('/')"
    class="controller"
  >
    BACK
  </div>
</template>


<style>
article {
  margin-top: var(--vt-c-common-padding);
}

.controller {
  margin-top: var(--vt-c-common-padding);
  color: var(--vt-c-green);
  cursor: pointer;
}
</style>
