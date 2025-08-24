<script setup lang="ts" generic="T extends string">
import { useNCALayer } from '~/shared/libs'
import { UiButton, UiTypography } from '~/shared/ui'
import type { UiSignEDSEvents, UiSignEDSProps } from './types'

const { isConnected, signXML, signCMS } = useNCALayer()

const props = defineProps<UiSignEDSProps<T>>()
const emit = defineEmits<UiSignEDSEvents<T>>()

const handleSign = async () => {
  const method = props.singType === 'cms' ? signCMS : signXML
  const signedContent = await method(props.content)
  if (!signedContent) return
  emit('sign', signedContent as T)
}
</script>

<template>
  <div>
    <UiButton :disabled="!isConnected" class="ui-sign-eds-button" full @click="handleSign">
      {{ text }}
    </UiButton>

    <UiTypography v-if="!isConnected" class="ui-sign-eds-error" variant="body" color="error">
      {{ errorText }}
    </UiTypography>
  </div>
</template>

<style module></style>
