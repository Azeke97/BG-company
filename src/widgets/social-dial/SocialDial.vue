<script setup lang="ts">
import Instagram from "@/shared/assets/icons/social-instagram.svg";
import Whatsapp from "@/shared/assets/icons/social-whatsapp.svg";
import Telegram from "@/shared/assets/icons/social-telegram.svg";
import Phone from "@/shared/assets/icons/phone.svg";
import type { SocialItem } from "~/widgets/social-dial/types";

const s = useCssModule();
const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    items?: SocialItem[];
    position?: "br" | "bl" | "tr" | "tl";
    offset?: { x: number; y: number };
  }>(),
  {
    position: "br",
    offset: () => ({
      x: 20,
      y: 20,
    }),
    items: () => [
      {
        id: "telegram",
        href: "https://t.me/bg_company_astana",
      },
      {
        id: "whatsapp",
        href: "https://wa.me/77718969634",
      },
      {
        id: "instagram",
        href: "https://www.instagram.com/bg_company_astana",
      },
      {
        id: "phone",
        href: "tel:+77718969634",
      },
    ],
  },
);

const root = ref<HTMLElement | null>(null);
const open = ref(false);
const items = computed(() =>
  (props.items || [])
    .filter((i) => !!i.href)
    .map((i) => ({
      ...i,
      label: i.label ?? t(`social.${i.id}`),
    })),
);

const toggle = () => {
  open.value = !open.value;
};

const close = () => {
  open.value = false;
};

if (import.meta.client) {
  const onDocClick = (e: MouseEvent) => {
    if (root.value && !root.value.contains(e.target as Node)) close();
  };
  const onEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") close();
  };

  onMounted(() => {
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", onDocClick);
    document.removeEventListener("keydown", onEsc);
  });
}
</script>

<template>
  <div
    ref="root"
    :class="[s.wrap, s[props.position], open && s.isOpen]"
    :style="{
      '--ox': (props.offset?.x ?? 20) + 'px',
      '--oy': (props.offset?.y ?? 20) + 'px',
    }"
  >
    <div :class="s.backdrop" @click="close" />

    <ul :class="s.list" aria-hidden="false">
      <li
        v-for="(it, i) in items"
        :key="it.id"
        :style="{ '--i': String(i) }"
        :class="s.li"
      >
        <a
          :href="it.href"
          target="_blank"
          rel="noopener"
          :aria-label="it.label"
          :class="[s.item, s[it.id]]"
        >
          <Telegram v-if="it.id === 'telegram'" />
          <Whatsapp v-else-if="it.id === 'whatsapp'" />
          <Instagram v-else-if="it.id === 'instagram'" />
          <Phone v-else width="40px" />
          <span :class="s.tooltip">{{ it.label }}</span>
        </a>
      </li>
    </ul>

    <button
      :class="s.fab"
      type="button"
      :aria-label="open ? t('social.close') : t('social.open')"
      @click="toggle"
    >
      <svg
        viewBox="0 0 24 24"
        :class="[s.fabIcon, open && s.fabIconOpen]"
        aria-hidden="true"
      >
        <path
          d="M12 5v14M5 12h14"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </div>
</template>

<style module>
:root {
  --fab-size: 56px;
  --item-size: 48px;
  --gap: 64px;
  --e: cubic-bezier(0.22, 0.61, 0.36, 1);
  --ox: 20px;
  --oy: 20px;
  --i: 0;
}

.wrap {
  position: fixed;
  z-index: 1100;
}
.br {
  right: max(var(--ox), env(safe-area-inset-right));
  bottom: max(var(--oy), env(safe-area-inset-bottom));
}
.bl {
  left: max(var(--ox), env(safe-area-inset-left));
  bottom: max(var(--oy), env(safe-area-inset-bottom));
}
.tr {
  right: max(var(--ox), env(safe-area-inset-right));
  top: max(var(--oy), env(safe-area-inset-top));
}
.tl {
  left: max(var(--ox), env(safe-area-inset-left));
  top: max(var(--oy), env(safe-area-inset-top));
}

.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.28);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s var(--e);
}
.isOpen .backdrop {
  opacity: 1;
  pointer-events: auto;
}

.fab {
  width: var(--fab-size);
  height: var(--fab-size);
  border-radius: 50%;
  border: 0;
  background: #f6c453;
  color: #111;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.22);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition:
    transform 0.18s var(--e),
    box-shadow 0.18s var(--e),
    background 0.18s var(--e);
  position: relative;
}

.fab::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #f6c453;
  z-index: -1;
  animation: fab-pulse 2s infinite;
}

@keyframes fab-pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(246, 196, 83, 0.6);
  }
  50% {
    transform: scale(1.08);
    box-shadow: 0 0 20px rgba(246, 196, 83, 0.6);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 rgba(246, 196, 83, 0.6);
  }
}

.fab:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
}

.fabIcon {
  width: 24px;
  height: 24px;
  transition: transform 0.25s var(--e);
}
.fabIconOpen {
  transform: rotate(45deg);
}

.list {
  position: absolute;
  right: 4px;
  bottom: 4px;
}
.li {
  position: relative;
}

.item {
  position: absolute;
  right: 0;
  bottom: 0;
  width: var(--item-size);
  height: var(--item-size);
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  transform: translateY(0) scale(0.8);
  opacity: 0;
  pointer-events: none;
  transition:
    transform 0.25s var(--e),
    opacity 0.18s var(--e),
    filter 0.18s var(--e);
  transition-delay: calc(var(--i) * 40ms);
}
.isOpen .item {
  transform: translateY(calc(-1 * (var(--i) + 1) * var(--gap))) scale(1);
  opacity: 1;
  pointer-events: auto;
}
.item:hover {
  filter: brightness(1.05);
}

.tooltip {
  position: absolute;
  right: calc(100% + 10px);
  bottom: calc(100% + 8px);
  transform: translateY(50%);
  font-size: 12px;
  line-height: 1;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  padding: 6px 8px;
  border-radius: 6px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s var(--e);
  white-space: nowrap;
}
.item:hover .tooltip {
  opacity: 1;
}

.telegram {
  background: #2aabee;
}
.whatsapp {
  background: #25d366;
}
.instagram {
  background: linear-gradient(
    45deg,
    #feda75,
    #fa7e1e,
    #d62976,
    #962fbf,
    #4f5bd5
  );
}
.phone {
  background: #f6c453;
  color: #111;
}

.icon {
  width: 22px;
  height: 22px;
}

@media (prefers-reduced-motion: reduce) {
  .item,
  .fab,
  .fabIcon,
  .backdrop {
    transition: none;
  }
}
</style>
