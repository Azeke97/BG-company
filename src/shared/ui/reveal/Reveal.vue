<script setup lang="ts">
import type { RevealProps, Side } from "~/shared/ui";

const props = withDefaults(defineProps<RevealProps>(), {
  as: "div",
  side: "up" as Side,
  distance: 32,
  threshold: 0.12,
  once: true,
  stagger: false,
  staggerStep: 80,
  duration: 520,
  delay: 0,
  easing: "ease",
  rootMargin: "0px 0px -10% 0px",
});

const style = useCssModule();

const root = ref<HTMLElement | null>(null);
let io: IntersectionObserver | null = null;

function setInitialStyles(el: HTMLElement) {
  el.classList.add(style.rv);

  const dx =
    props.side === "left"
      ? -props.distance
      : props.side === "right"
        ? props.distance
        : 0;
  const dy =
    props.side === "up"
      ? -props.distance
      : props.side === "down"
        ? props.distance
        : 0;
  el.style.setProperty("--rv-ox", `${dx}px`);
  el.style.setProperty("--rv-oy", `${dy}px`);
  el.style.setProperty("--rv-duration", `${props.duration}ms`);
  el.style.setProperty("--rv-delay", `${props.delay}ms`);
  el.style.setProperty("--rv-easing", props.easing);

  if (props.stagger) {
    el.classList.add(style["rv--stagger"]);
    const children = Array.from(el.children) as HTMLElement[];
    children.forEach((child, i) => {
      child.style.setProperty(
        "--rv-delay",
        `${props.delay + i * props.staggerStep}ms`,
      );
      child.style.setProperty("--rv-duration", `${props.duration}ms`);
      child.style.setProperty("--rv-easing", props.easing);
      child.style.setProperty("--rv-ox", `${dx}px`);
      child.style.setProperty("--rv-oy", `${dy}px`);
      child.classList.add(style["rv__item"]);
    });
  }
}

function observe(el: HTMLElement) {
  if (io) io.disconnect();
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add(style["rv--in"]);
          if (props.stagger) el.classList.add(style["rv--in-stagger"]);
          if (props.once) io?.unobserve(el);
        } else if (!props.once) {
          el.classList.remove(style["rv--in"]);
          if (props.stagger) el.classList.remove(style["rv--in-stagger"]);
        }
      });
    },
    {
      threshold: props.threshold,
      rootMargin: props.rootMargin,
    },
  );
  io.observe(el);
}

onMounted(() => {
  const el = root.value;
  if (!el) return;
  setInitialStyles(el);
  observe(el);
});

onBeforeUnmount(() => {
  io?.disconnect();
  io = null;
});

watchEffect(() => {
  const el = root.value;
  if (!el) return;
  const dx =
    props.side === "left"
      ? -props.distance
      : props.side === "right"
        ? props.distance
        : 0;
  const dy =
    props.side === "up"
      ? -props.distance
      : props.side === "down"
        ? props.distance
        : 0;
  el.style.setProperty("--rv-ox", `${dx}px`);
  el.style.setProperty("--rv-oy", `${dy}px`);
  el.style.setProperty("--rv-duration", `${props.duration}ms`);
  el.style.setProperty("--rv-delay", `${props.delay}ms`);
  el.style.setProperty("--rv-easing", props.easing);
});
</script>

<template>
  <component :is="props.as" ref="root" :class="style.rv">
    <slot />
  </component>
</template>

<style module>
.rv {
  --rv-ox: 0px;
  --rv-oy: 16px;
  --rv-duration: 520ms;
  --rv-delay: 0ms;
  --rv-easing: ease;
}

.rv {
  opacity: 0;
  transform: translate(var(--rv-ox, 0px), var(--rv-oy, 16px));
  transition:
    opacity var(--rv-duration, 520ms) var(--rv-easing, ease),
    transform var(--rv-duration, 520ms) var(--rv-easing, ease);
  transition-delay: var(--rv-delay, 0ms);
  will-change: opacity, transform;
}
.rv.rv--in {
  opacity: 1;
  transform: translate(0, 0);
}

.rv--stagger > .rv__item {
  opacity: 0;
  transform: translate(var(--rv-ox, 0px), var(--rv-oy, 16px));
  transition:
    opacity var(--rv-duration, 520ms) var(--rv-easing, ease),
    transform var(--rv-duration, 520ms) var(--rv-easing, ease);
  transition-delay: var(--rv-delay, 0ms);
  will-change: opacity, transform;
}
.rv--in-stagger > .rv__item {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .rv,
  .rv__item {
    transition: opacity 200ms linear !important;
    transform: none !important;
  }
}
</style>
