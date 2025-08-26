<script lang="ts" setup>
import type { TypographyTypeMap, UiTypographyProps } from './types'

const props = withDefaults(defineProps<UiTypographyProps>(), {
  variant: 'body',
  tag: undefined,
  color: 'default',
  label: undefined,
  error: false,
  transform: 'none',
  align: 'left',
})

const style = useCssModule()
const typographyTypeMap: TypographyTypeMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  bodyLarge: 'p',
  bodyCompact: 'p',
  bodySmall: 'p',
  bodyNote: 'small',
}

const typographyComponent = computed(
  () => props.tag ?? typographyTypeMap[props.variant]
)

const typographyClasses = computed(() => {
  const variantClass = style[props.variant]
  const colorClass = style[props.color]
  const transformClass = style[props.transform]
  const alignClass = style[props.align]

  return [variantClass, colorClass, transformClass, alignClass]
})
</script>

<template>
  <Component
    :is="typographyComponent"
    :class="[...typographyClasses, 'ui-typography']"
    v-bind="$attrs"
  >
    <slot>
      {{ label }}
    </slot>
  </Component>
</template>

<style module>
.h1 {
  font-size: 2.75rem;
  line-height: 3.375rem;
  font-weight: 700;
}

.h2 {
  font-size: 2rem;
  line-height: 2.5rem;
  font-weight: 700;
}

.h3 {
  font-size: 1.875rem;
  line-height: 2.5rem;
  font-weight: 700;
}

.h4 {
  font-size: 1.5rem;
  line-height: 1.75rem;
  font-weight: 700;
}

.h5 {
  font-size: 1.25rem;
  line-height: 1.875rem;
  font-weight: 700;
}

.h6 {
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 700;
}

.body {
  font-size: 0.875rem;
  line-height: 1rem;
  font-weight: 400;
}

.bodyLarge {
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 600;
}

.primary {
  color: var(--color-text-primary);
}

.secondary {
  color: var(--color-text-secondary);
}

.secondaryLight {
  color: var(--color-text-secondary-light);
}

.white {
  color: var(--color-text-white);
}

.default {
  color: var(--color-text);
}

.accentPrimary {
  color: var(--color-primary);
}

.accentSecondary {
  color: var(--color-secondary);
}

.textAccent {
  color: var(--color-text-accent);
}

.error {
  color: var(--color-text-error);
}

.uppercase {
  text-transform: uppercase;
}

.lowercase {
  text-transform: lowercase;
}

.capitalize {
  text-transform: capitalize;
}

.none {
  text-transform: none;
}

.left {
  text-align: left;
}

.center {
  text-align: center;
}

.right {
  text-align: right;
}

.justify {
  text-align: justify;
}
</style>
