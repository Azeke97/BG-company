<script setup lang="ts">
import { Reveal } from "~/shared/ui";
import HeroSection from "~/widgets/services/renovation/components/HeroSection.vue";
import { ContactSection } from "~/widgets/contact";
import PricingSection from "~/widgets/services/renovation/components/PricingSection.vue";
import { FaqSection } from "~/widgets/faq";
import WorkflowSection from "~/widgets/services/renovation/components/WorkflowSection.vue";

const { t } = useI18n();

definePageMeta({ contactLabelKey: "pageNames.renovation" });

const faqItems = [
  {
    id: "timing",
    question: t("renovate.faq.items.0.question"),
    answer: t("renovate.faq.items.0.answer"),
  },
  {
    id: "materials",
    question: t("renovate.faq.items.1.question"),
    answer: t("renovate.faq.items.1.answer"),
  },
  {
    id: "design",
    question: t("renovate.faq.items.2.question"),
    answer: t("renovate.faq.items.2.answer"),
  },
  {
    id: "warranty",
    question: t("renovate.faq.items.3.question"),
    answer: t("renovate.faq.items.3.answer"),
  },
  {
    id: "payment",
    question: t("renovate.faq.items.4.question"),
    answer: t("renovate.faq.items.4.answer"),
  },
  {
    id: "cleaning",
    question: t("renovate.faq.items.5.question"),
    answer: t("renovate.faq.items.5.answer"),
  },
];
</script>

<template>
  <div :class="$style.renovationPage">
    <Reveal side="up" :once="false">
      <HeroSection id="home" />
    </Reveal>

    <Reveal side="left" :once="false">
      <PricingSection id="pricing" />
    </Reveal>

    <Reveal side="down" :once="false">
      <WorkflowSection id="workflow" />
    </Reveal>

    <Reveal side="left" :once="false">
      <FaqSection
        :items="faqItems"
        :open-first="false"
        :title="t('renovate.faq.title')"
        :subtitle="t('renovate.faq.subtitle')"
      />
    </Reveal>

    <Reveal side="right" :once="false">
      <ContactSection id="contact" />
    </Reveal>
  </div>
</template>

<style module>
.renovationPage {
  display: block;
  padding-top: 100px;
}
</style>
