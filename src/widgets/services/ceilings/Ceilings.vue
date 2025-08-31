<script setup lang="ts">
import ContactSection from "~/widgets/main-page/components/ContactSection.vue";
import { Reveal } from "~/shared/ui";
import HeroSection from "~/widgets/services/ceilings/components/HeroSection.vue";
import CeilingsStepsSection from "~/widgets/services/ceilings/components/CeilingsStepsSection.vue";
import FaqSection from "~/widgets/services/ceilings/components/FaqSection.vue";

const { t } = useI18n();

const faqItems = [
  {
    id: "kitchen",
    question: t("ceiling.faq.items.0.question"),
    answer: t("ceiling.faq.items.0.answer"),
  },
  {
    id: "height",
    question: t("ceiling.faq.items.1.question"),
    answer: t("ceiling.faq.items.1.answer"),
  },
  {
    id: "leaks",
    question: t("ceiling.faq.items.2.question"),
    answer: t("ceiling.faq.items.2.answer"),
  },
  {
    id: "lighting",
    question: t("ceiling.faq.items.3.question"),
    answer: t("ceiling.faq.items.3.answer"),
  },
  {
    id: "budget",
    question: t("ceiling.faq.items.4.question"),
    answer: t("ceiling.faq.items.4.answer"),
  },
  {
    id: "care",
    question: t("ceiling.faq.items.5.question"),
    answer: t("ceiling.faq.items.5.answer"),
  },
];
</script>

<template>
  <div :class="$style.ceilingHero">
    <Reveal side="up" :once="false">
      <HeroSection id="home" />
    </Reveal>

    <Reveal
      id="services"
      as="section"
      class="container"
      side="right"
      :stagger="true"
      :stagger-step="80"
      :once="false"
    >
      <CeilingsStepsSection />
    </Reveal>

    <Reveal side="left" :once="false">
      <FaqSection
        :items="faqItems"
        :open-first="false"
        :title="t('ceiling.faq.title')"
        :subtitle="t('ceiling.faq.subtitle')"
      />
    </Reveal>
    <Reveal side="up" :once="false">
      <ContactSection id="contact" />
    </Reveal>
  </div>
</template>

<style module>
.ceilingHero {
  display: block;
  padding-top: 100px;
}
</style>
