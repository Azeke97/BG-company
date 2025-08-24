<script setup lang="ts">
import { useAppHead } from '~/app/helpers/useAppHead'
import { useDayjsLocale, useElementLocale } from '~/app/helpers/locales'

const { locale } = useI18n()

const elementLocale = useElementLocale(locale.value)
useDayjsLocale(locale.value)
useAppHead()
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
</template>
