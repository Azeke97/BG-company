<script setup lang="ts">
import ContactSection from "~/widgets/contact/ContactSection.vue";
import { Reveal } from "~/shared/ui";
import { FaqSection } from "~/widgets/faq";
import HeroSection from "~/widgets/services/carpentry/components/HeroSection.vue";
import FurnitureSection from "~/widgets/services/carpentry/components/FurnitureSection.vue";
import WhyChooseSection from "~/widgets/services/carpentry/components/WhyChooseSection.vue";

const { t } = useI18n();

definePageMeta({ contactLabelKey: "pageNames.carpentry" });

const faqItems = [
  {
    id: "materials",
    question: t("furniture.faq.items.0.question"),
    answer: t("furniture.faq.items.0.answer"),
  },
  {
    id: "production-time",
    question: t("furniture.faq.items.1.question"),
    answer: t("furniture.faq.items.1.answer"),
  },
  {
    id: "custom-size",
    question: t("furniture.faq.items.2.question"),
    answer: t("furniture.faq.items.2.answer"),
  },
  {
    id: "warranty",
    question: t("furniture.faq.items.3.question"),
    answer: t("furniture.faq.items.3.answer"),
  },
  {
    id: "ready-vs-custom",
    question: t("furniture.faq.items.4.question"),
    answer: t("furniture.faq.items.4.answer"),
  },
  {
    id: "care",
    question: t("furniture.faq.items.5.question"),
    answer: t("furniture.faq.items.5.answer"),
  },
];
</script>

<template>
  <div :class="$style.furnitureHero">
    <Reveal side="up" :once="false">
      <HeroSection id="home" />
    </Reveal>

    <Reveal side="left" :once="false">
      <FurnitureSection />
    </Reveal>

    <Reveal side="down" :once="false">
      <WhyChooseSection />
    </Reveal>

    <Reveal side="right" :once="false">
      <FaqSection
        :items="faqItems"
        :open-first="false"
        :title="t('furniture.faq.title')"
        :subtitle="t('furniture.faq.subtitle')"
      />
    </Reveal>
    <Reveal side="up" :once="false">
      <ContactSection id="contact" />
    </Reveal>
  </div>
</template>

<style module>
.furnitureHero {
  display: block;
  padding-top: 100px;
}
</style>
