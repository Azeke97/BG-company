<script setup lang="ts"></script>

<template>
  <div class="load">
    <div class="progress"></div>
    <div class="progress"></div>
    <div class="progress"></div>
  </div>
</template>

<style scoped>
.load {
  display: flex;
  border-radius: 50%;
  flex-direction: row;
}

.progress {
  width: 0.5em;
  height: 0.5em;
  margin: 0.1em;
  scale: 0;
  border-radius: 50%;
  background: rgb(255, 255, 255);
  animation: loading 1s ease infinite;
  animation-delay: 0.2s;
  display: inline-block;
  vertical-align: middle;
}

@keyframes loading {
  50% {
    scale: 1;
  }
}

.progress:nth-child(2) {
  animation-delay: 0.4s;
}

.progress:nth-child(3) {
  animation-delay: 0.6s;
}
</style>
