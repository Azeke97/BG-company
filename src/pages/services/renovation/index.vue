<script setup lang="ts">
import { UiContainer } from "~/shared/ui";
import { Renovation } from "~/widgets/services/renovation";
</script>

<template>
  <div :class="$style.services">
    <UiContainer>
      <Renovation />
    </UiContainer>
  </div>
</template>

<style module>
.services {
  background-color: #ffffff;
  background-image: url("@/widgets/main-page/assets/images/light-grey-terrazzo.webp");
  background-repeat: repeat;
  background-position: center;
  background-size: 400px 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
