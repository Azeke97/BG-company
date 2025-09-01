<script setup lang="ts">
import HeroSection from "./components/HeroSection.vue";
import MissionCarousel from "./components/MissionCarousel.vue";
import ServicesSection from "./components/ServicesSection.vue";
import PortfolioSection from "./components/PortfolioSection.vue";
import TestimonialsSection from "./components/TestimonialsSection.vue";
import { Reveal } from "~/shared/ui";
import { ContactSection } from "~/widgets/contact";
import { FaqSection } from "~/widgets/faq";

const { t } = useI18n();

definePageMeta({ contactLabelKey: "pageNames.home" });

const faqItems = [
  {
    id: "timing",
    question: t("mainPage.faq.items.0.question"),
    answer: t("mainPage.faq.items.0.answer"),
  },
  {
    id: "fullservice",
    question: t("mainPage.faq.items.1.question"),
    answer: t("mainPage.faq.items.1.answer"),
  },
  {
    id: "warranty",
    question: t("mainPage.faq.items.2.question"),
    answer: t("mainPage.faq.items.2.answer"),
  },
  {
    id: "payment",
    question: t("mainPage.faq.items.3.question"),
    answer: t("mainPage.faq.items.3.answer"),
  },
  {
    id: "separate",
    question: t("mainPage.faq.items.4.question"),
    answer: t("mainPage.faq.items.4.answer"),
  },
];
</script>

<template>
  <div :class="$style.mainPage">
    <Reveal side="up" :once="false">
      <HeroSection id="home" />
    </Reveal>

    <Reveal side="right" :distance="40" :once="false">
      <MissionCarousel id="about" :interval="4500" height="520px" />
    </Reveal>

    <Reveal
      id="services"
      as="section"
      class="container"
      side="up"
      :stagger="true"
      :stagger-step="80"
      :once="false"
    >
      <ServicesSection />
    </Reveal>

    <Reveal side="left" :once="false">
      <PortfolioSection id="projects" />
    </Reveal>

    <Reveal side="down" :threshold="0.2" :once="false">
      <TestimonialsSection id="reviews" />
    </Reveal>

    <Reveal side="up" :once="false">
      <FaqSection
        :items="faqItems"
        :open-first="false"
        :title="t('mainPage.faq.title')"
        :subtitle="t('mainPage.faq.subtitle')"
      />
    </Reveal>

    <Reveal side="up" :once="false">
      <ContactSection id="contact" />
    </Reveal>
  </div>
</template>

<style module>
.mainPage {
  display: block;
  padding-top: 100px;
}
</style>
