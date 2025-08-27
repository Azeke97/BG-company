<script setup lang="ts">
import type { UiLinkProps } from "./types";

const props = withDefaults(defineProps<UiLinkProps>(), { variant: "primary" });
const localePath = useLocalePath();
const attrs = useAttrs();
const attrsWithProps = computed(() => {
  return {
    ...props.linkProps,
    ...attrs,
  };
});
const preparedLink = computed(() => {
  return props.forceTo ? props.to : localePath(props.to);
});
</script>

<template>
  <NuxtLink
    v-bind="attrsWithProps"
    :to="preparedLink"
    :external="forceTo"
    :class="[$style.link, $style[`-${variant}`]]"
  >
    <slot>{{ label }}</slot>
  </NuxtLink>
</template>

<style module>
.link {
  text-decoration: none;
  transition: color var(--transition-duration);

  &.-primary {
    color: var(--color-text-black);

    &:hover {
      color: var(--color-primary);
    }
  }

  &.-secondary {
    color: var(--color-text-secondary-light);

    &:hover {
      color: var(--color-secondary);
    }
  }

  &.-tertiary {
    color: var(--color-text-white);

    &:hover {
      color: var(--color-text-tertiary);
    }
  }

  &:active {
    opacity: 0.7;
  }
}
</style>
