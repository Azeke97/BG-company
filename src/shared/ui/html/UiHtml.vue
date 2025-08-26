<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify'
import type { Config } from 'isomorphic-dompurify'
import { useAttrs } from 'vue'
import type { SafeHtmlProps } from '~/shared/ui/html/types'

const props = withDefaults(defineProps<SafeHtmlProps>(), {
  tag: 'div' as const,
})

const attrs = useAttrs()

const defaultOptions: Config = {
  USE_PROFILES: { html: true },
  ALLOWED_URI_REGEXP:
    /^(?:(?:https?|mailto|tel|ftp|sms):|[^a-z]|[a-z+.-]+(?:[^a-z+.-]|$))/i,
  FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta'],
}

const options = computed<Config>(() => ({
  ...defaultOptions,
  ...(props.sanitizeOptions ?? {}),
}))

const html = computed(() =>
  DOMPurify.sanitize(String(props.content), options.value)
)
</script>

<template>
  <component :is="props.tag" :class="$style.uiHtml" v-bind="attrs">
    <span :class="$style.uiHtmlContent" v-html="html" />
  </component>
</template>

<style module>
.uiHtml {
  font-size: var(--font-size);
  line-height: 1.5;
}
.uiHtmlContent {
  margin: 0;
  padding: 0;
  line-height: initial;
  height: auto;
  display: inline-block;
}

.uiHtml :global(p) {
  margin-bottom: 0.5rem;
}
</style>
