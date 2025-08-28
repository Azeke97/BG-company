<script setup lang="ts">
import ContactSection from "~/widgets/main-page/components/ContactSection.vue";
import { Reveal } from "~/shared/ui";
</script>

<template>
  index.ts Index.vue

  <Reveal side="up" :once="false">
    <ContactSection id="contact" />
  </Reveal>
</template>

<style module></style>
