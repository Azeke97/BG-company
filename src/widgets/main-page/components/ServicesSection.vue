<script setup lang="ts">
import Carpentry from "../assets/images/carpentry.jpg";
import Ceilings from "../assets/images/ceilings.jpg";
import Renovation from "../assets/images/renovation.jpg";

const style = useCssModule();
const { t } = useI18n();

interface Services {
  title: string;
  text: string;
  img: string;
  to?: string;
}

const services: Services[] = [
  {
    title: "mainPage.services.items[0].title",
    text: "mainPage.services.items[0].text",
    img: Renovation,
    to: "/services/renovation",
  },
  {
    title: "mainPage.services.items[1].title",
    text: "mainPage.services.items[1].text",
    img: Ceilings,
    to: "/services/ceilings",
  },
  {
    title: "mainPage.services.items[2].title",
    text: "mainPage.services.items[2].text",
    img: Carpentry,
    to: "/services/carpentry",
  },
];
</script>

<template>
  <section :class="style.servicesSection">
    <div :class="style.container">
      <h2 :class="style.title">{{ t("mainPage.services.title") }}</h2>
      <p :class="style.subtitle">{{ t("mainPage.services.subtitle") }}</p>

      <div :class="style.cardsGrid">
        <NuxtLinkLocale
          v-for="svc in services"
          :key="svc.title"
          :to="svc.to"
          :class="style.card"
          :style="{ backgroundImage: `url(${svc.img})` }"
        >
          <h3 :class="style.cardHeading">{{ t(svc.title) }}</h3>

          <div :class="style.cardDesc" aria-hidden="false">
            <p :class="style.cardDescText">{{ t(svc.text) }}</p>
          </div>
        </NuxtLinkLocale>
      </div>

      <p :class="style.hint">
        {{ t("mainPage.services.hint") }}
      </p>
    </div>
  </section>
</template>

<style module>
.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 16px;
}

.servicesSection {
  padding: 40px 0;
}

.title {
  text-align: center;
  font-size: 30px;
  margin: 0 0 8px;
  font-weight: 600;
}

.subtitle {
  text-align: center;
  color: #666;
  margin: 0 0 32px;
}

.cardsGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.card {
  position: relative;
  height: 320px;
  border-radius: 14px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  transform: translateZ(0);
  transition: transform 0.45s ease;
  will-change: transform;
  cursor: pointer;
}

.card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.55),
    rgba(0, 0, 0, 0.25) 40%,
    rgba(0, 0, 0, 0) 70%
  );
  pointer-events: none;
  transition: opacity 0.35s ease;
  z-index: 1;
}

.card::before {
  content: "";
  position: absolute;
  inset: -20%;
  border-radius: 16px;
  pointer-events: none;

  background: linear-gradient(
    115deg,
    transparent 0%,
    rgba(255, 255, 255, 0.06) 40%,
    rgba(255, 255, 255, 0.35) 48%,
    rgba(255, 255, 255, 0.55) 50%,
    rgba(255, 255, 255, 0.35) 52%,
    rgba(255, 255, 255, 0.06) 60%,
    transparent 100%
  );

  transform: translateX(-20%) translateY(40%) rotate(-50deg);
  opacity: 0;
  filter: blur(0.3px);
  will-change: transform, opacity;
  animation: card-light-sweep 6s ease-in-out infinite;
  z-index: 2;
}

.cardsGrid > *:nth-child(1) .card::before {
  animation: card-light-sweep 2s ease-in-out infinite;
  animation-delay: 0s;
}
.cardsGrid > *:nth-child(2) .card::before {
  animation: card-light-sweep 6s ease-in-out infinite;
  animation-delay: 10s;
}
.cardsGrid > *:nth-child(3) .card::before {
  animation: card-light-sweep 8s ease-in-out infinite;
  animation-delay: 6s;
}

@keyframes card-light-sweep {
  0% {
    transform: translateX(-70%) translateY(40%) rotate(-18deg);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  50% {
    transform: translateX(0%) translateY(0%) rotate(-18deg);
    opacity: 1;
  }
  100% {
    transform: translateX(70%) translateY(-40%) rotate(-18deg);
    opacity: 0;
  }
}

.cardHeading {
  position: absolute;
  left: 16px;
  right: 16px;
  top: 16px;
  margin: 0;
  color: #fff;
  font-size: 22px;
  line-height: 1.2;
  font-weight: 700;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 2.45);
  z-index: 3;
}

.cardDesc {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 55%;
  padding: 16px 16px 18px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.7) 30%,
    rgba(0, 0, 0, 0.5) 60%,
    rgba(0, 0, 0, 0.25) 85%,
    rgba(0, 0, 0, 0) 100%
  );
  transform: translateY(100%);
  opacity: 0;
  transition:
    transform 0.45s ease,
    opacity 0.45s ease;
  z-index: 3;
}

.cardDescText {
  margin: 0;
  font-size: 15px;
  line-height: 1.4;
  color: #fff;
}

.card:hover,
.card:focus-within {
  transform: scale(1.03);
}

.card:hover .cardDesc,
.card:focus-within .cardDesc {
  transform: translateY(0);
  opacity: 1;
}

.hint {
  margin-top: 20px;
  text-align: center;
  font-size: 15px;
  color: #555;
  font-weight: 500;
}

@media (max-width: 900px) {
  .cardsGrid {
    grid-template-columns: 1fr;
  }
  .card {
    height: 260px;
  }
  .cardHeading {
    font-size: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card,
  .card::after,
  .card::before,
  .cardDesc {
    transition: none !important;
    animation: none !important;
  }
}
</style>
