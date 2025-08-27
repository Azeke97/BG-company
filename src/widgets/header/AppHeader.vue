<script setup lang="ts">
import { ElTooltip } from "element-plus";
import { LangSwitcher } from "~/widgets/header/components/lang-switcher";
import { MobileMenu } from "~/widgets/header/components/mobile-menu";
import { BurgerButton } from "~/widgets/header/components/burger-button";
import Logo from "~/shared/assets/icons/logo.svg";

const { t } = useI18n();
const route = useRoute();

const activeSection = ref<string | null>(null);
const isMobileNav = ref(false);
const scrollProgress = ref(0);

const goTo = (hash: string) => {
  const el = document.querySelector(hash);
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    isMobileNav.value = false;
  }
};

onMounted(() => {
  const ids = ["#home", "#services", "#projects", "#reviews", "#contact"];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = `#${entry.target.id}`;
      });
    },
    { threshold: 0.5 },
  );
  ids.forEach((id) => {
    const el = document.querySelector(id);
    if (el) observer.observe(el);
  });

  window.scrollTo(0, 0);
  window.addEventListener("scroll", () => {
    scrollProgress.value = Math.min(window.scrollY / 80, 1);
  });
});

const containerPadding = computed(() => {
  const start = 25;
  const end = 8;
  const current = start - (start - end) * scrollProgress.value;
  return `${current}px 16px`;
});

watch(
  () => route.path,
  () => (isMobileNav.value = false),
);
</script>

<template>
  <header :class="$style.wrap">
    <div :class="$style.container" :style="{ padding: containerPadding }">
      <div :class="$style.inner">
        <NuxtLink to="/" :class="$style.brand">
          <Logo
            width="40"
            height="40"
            :class="$style.icon"
            aria-hidden="true"
          />
          <span>{{ t("header.brand") }}</span>
        </NuxtLink>

        <nav :class="$style.nav">
          <button
            type="button"
            :class="[
              $style.navLink,
              { [$style.active]: activeSection === '#home' },
            ]"
            @click="goTo('#home')"
          >
            {{ t("header.menu.home") }}
          </button>

          <button
            type="button"
            :class="[
              $style.navLink,
              { [$style.active]: activeSection === '#services' },
            ]"
            @click="goTo('#services')"
          >
            {{ t("header.menu.services") }}
          </button>

          <ElTooltip
            effect="light"
            content="Раздел в разработке"
            placement="bottom"
          >
            <NuxtLink
              :class="[
                $style.navLink,
                { [$style.active]: route.path === '/shop' },
              ]"
              @click.prevent
            >
              {{ t("header.menu.shop") }}
            </NuxtLink>
          </ElTooltip>

          <button
            type="button"
            :class="$style.contactBtn"
            @click="goTo('#contact')"
          >
            {{ t("header.menu.contact") }}
          </button>

          <LangSwitcher />
        </nav>

        <BurgerButton @click="isMobileNav = true" />
      </div>
    </div>

    <MobileMenu v-model="isMobileNav" @go-to="goTo" />
  </header>
</template>

<style module>
.container {
  margin: 0 auto;
  width: 100%;
  max-width: 1430px;
  transition: padding 0.3s ease;
}

.wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(8px);
  background: linear-gradient(
    350deg,
    rgba(22, 22, 24, 0.95) 0%,
    rgba(34, 34, 36, 0.92) 70%,
    rgba(250, 186, 42, 0.5) 120%
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition:
    background 0.25s ease,
    box-shadow 0.25s ease,
    padding 0.25s ease,
    height 0.25s ease;
}

.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  letter-spacing: 0.3px;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  width: fit-content;
}
.icon {
  width: 40px;
  height: 40px;
  color: #f6c453;
}

.nav {
  display: flex;
  align-items: center;
  gap: 10px;
}
.navLink {
  appearance: none;
  border: 0;
  background: transparent;
  color: #f3f3f3;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
}
.navLink:hover {
  background: rgba(255, 255, 255, 0.08);
}
.active {
  color: #f6c453;
  border-bottom: 2px solid #f6c453;
}

.contactBtn {
  background: #f6c453;
  color: #222;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 8px;
  transition: background 0.25s;
  cursor: pointer;
}
.contactBtn:hover {
  background: #fadb7e;
}
.navLink:hover,
.contactBtn:hover {
  transform: translateY(-2px);
  transition-duration: 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 900px) {
  .nav {
    display: none;
  }
}
</style>
