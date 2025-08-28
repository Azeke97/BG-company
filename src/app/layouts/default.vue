<script setup lang="ts">
import { useAppHead } from "~/app/helpers/useAppHead";
import { AppHeader } from "~/widgets/header";
import { Footer } from "~/widgets/footer";
import { SocialDial } from "~/widgets/social-dial";
import type { SocialItem } from "~/widgets/social-dial/types";

const style = useCssModule();
const route = useRoute();

useAppHead();
const showDial = computed(() => !/^\/(admin|auth|checkout)/.test(route.path));

const socialItems: SocialItem[] = [
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
];
</script>

<template>
  <div>
    <div :class="style.layoutDefault">
      <AppHeader />

      <div :class="style.pageContent">
        <slot />
      </div>

      <Footer />
    </div>
    <ClientOnly>
      <SocialDial
        v-if="showDial"
        :offset="{ x: 20, y: 20 }"
        :items="socialItems"
        position="br"
      />
    </ClientOnly>
  </div>
</template>

<style module>
.layoutDefault {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.pageContent {
  flex: 1;
}

.layoutDefault > * {
  width: 100%;
}
</style>
