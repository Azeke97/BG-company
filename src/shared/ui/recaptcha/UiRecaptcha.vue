<script lang="ts" setup>
import { useNormalizedLocale } from '~/shared/helpers'
import { loadRecaptcha } from './loadRecaptcha'
import type { UiRecaptchaProps, UiRecaptchaEvents } from './types'
import { useFormItem } from 'element-plus'

const props = withDefaults(defineProps<UiRecaptchaProps>(), {
  theme: 'light',
})
const emit = defineEmits<UiRecaptchaEvents>()

const { formItem } = useFormItem()

const locale = useNormalizedLocale()
const config = useRuntimeConfig()
let grecaptcha: any = null
const isLoaded = ref(false)

const render = () => {
  try {
    grecaptcha = window.grecaptcha.render('recaptcha', {
      sitekey: config.public.recaptcha,
      theme: props.theme,
      size: 'normal',
      hl: locale.value,
      callback: (res) => {
        emit('update:captchaValid', true)
        emit('update:captchaResponse', res)
        formItem?.validate('blur')
        formItem?.validate('change')
      },
      'expired-callback': () => {
        emit('update:captchaValid', false)
        formItem?.validate('blur')
        formItem?.validate('change')
      },
      'error-callback': () => {
        emit('update:captchaValid', false)
        formItem?.validate('blur')
        formItem?.validate('change')
      },
    })

    isLoaded.value = true
  } catch (err) {
    console.error('recaptcha', err)
  }
}

onMounted(async () => {
  await loadRecaptcha()

  nextTick(render)
})

const reset = () => {
  if (grecaptcha === null) return

  window.grecaptcha.reset(grecaptcha)

  emit('update:captchaValid', false)
  emit('update:captchaResponse', '')
  formItem?.validate('blur')
}

watch(
  () => props.captchaValid,
  () => {
    if (props.captchaValid) return

    reset()
  }
)

defineExpose({
  reset,
})
</script>

<template>
  <div v-show="isLoaded" id="recaptcha" :class="['captcha', `-${theme}`]" />
</template>

<style module></style>
