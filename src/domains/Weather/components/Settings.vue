<script setup lang="ts">
import {computed, ref} from 'vue'
import SettingsBody from './SettingsBody.vue'
import gear from '../assets/imgs/gear.png'
import cross from '../assets/imgs/close.svg'

const isSettingsShow = ref(false)
let weatherLineIsRefreshed = ref(5)
const img = computed(() => isSettingsShow.value ? cross : gear)


</script>

<template>
  <div class="settings-wrapper"
       :class="{'settings-wrapper__bg': isSettingsShow}"
  >
    <Teleport to="body">
      <div class="settings__outside"
           @click="isSettingsShow = false"
           v-show="isSettingsShow"
      >
      </div>
    </Teleport>
    
    <div class="settings__spot">
      <div class="spot-top">
        <div v-show="isSettingsShow"
             class="spot-top__title"
        >
          Settings
        </div>
        <div @click="isSettingsShow = !isSettingsShow"
             class="spot-top__icon"
        >
          <img :src="img" alt="menu" class="spot-top__icon-img">
        </div>
      </div>
      
      <SettingsBody v-show="isSettingsShow"
                    class="spot-body"
                    @reloadHimSelf="weatherLineIsRefreshed += 1"
                    :key="weatherLineIsRefreshed"
      />
    </div>
  </div>
</template>


<style scoped lang="scss">
$icon-size: 30px;

.settings-wrapper {
  min-width: $icon-size;
  min-height: $icon-size;
  height: max-content;
  box-sizing: border-box;
  padding: var(--vt-c-common-padding);
  z-index: 101;
}

.settings-wrapper__bg {
  background: var(--vt-c-blue_light);
}

.settings__outside {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: var(--vt-c-white-mute);
}

.settings__spot {
  z-index: 101;
  width: fit-content;
  background: transparent;
  
  .spot-top {
    display: flex;
    
    &__title {
      display: flex;
      place-items: center start;
      text-transform: uppercase;
    }
    
    &__icon {
      width: $icon-size;
      height: $icon-size;
      margin-left: auto;
      cursor: pointer;
      
      &-img {
        width: $icon-size;
        height: $icon-size;
      }
    }
  }
  
  .spot-body {
    margin-top: calc(var(--vt-c-common-padding) * 2);
  }
}

</style>