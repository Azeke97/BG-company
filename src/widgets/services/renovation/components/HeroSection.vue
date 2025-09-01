<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t, tm } = useI18n();
const style = useCssModule();

const perks = computed<string[]>(() => {
  const raw = tm("renovate.hero.items") as unknown;
  return Array.isArray(raw) ? (raw as string[]) : [];
});
</script>

<template>
  <section :class="style.hero">
    <div :class="style.heroOverlay" />

    <div :class="[style.heroInner, style.container]">
      <div :class="style.heroContent">
        <h1 :class="[style.heroTitle, style.textShadow]">
          {{ t("renovate.hero.title") }}
        </h1>

        <p :class="[style.heroSubtitle, style.textShadow]">
          {{ t("renovate.hero.desc") }}
        </p>

        <div :class="style.heroInfo">
          <ul :class="style.heroList">
            <li
              v-for="(p, i) in perks"
              :key="i"
              :class="[style.heroInfoItem, style.textShadow]"
              :style="{ '--i': i }"
            >
              {{ p }}
            </li>
          </ul>
        </div>

        <div :class="style.heroActions">
          <a href="#contact" :class="[style.btn, style.btnPrimary]">
            {{ t("renovate.hero.cta") }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style module>
.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 16px;
}
.hero {
  position: relative;
  background: url("../assets/images/hero.jpg") center/cover no-repeat;
  padding: clamp(56px, 10vw, 120px) 0;
  color: #fff;
  overflow: hidden;
  min-height: clamp(320px, 45vw, 460px);
  animation: hero-zoom 18s ease-in-out infinite alternate;
}
@keyframes hero-zoom {
  from {
    background-size: 100%;
  }
  to {
    background-size: 108%;
  }
}

.heroOverlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      60% 60% at 20% 30%,
      rgba(0, 0, 0, 0.22) 0%,
      rgba(0, 0, 0, 0.04) 70%
    ),
    linear-gradient(0deg, rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0.26));
  pointer-events: none;
  z-index: 1;
}
.heroOverlay::after {
  content: "";
  position: absolute;
  inset: -8%;
  background: repeating-linear-gradient(
    -45deg,
    rgba(246, 196, 83, 0.25) 0 2px,
    rgba(246, 196, 83, 0) 2px 18px
  );
  mix-blend-mode: overlay;
  opacity: 0.6;
  animation: drift 8s linear infinite;
  transform: translate3d(0, 0, 0);
}
@keyframes drift {
  from {
    transform: translateX(-8%) rotate(0.001deg);
  }
  to {
    transform: translateX(8%) rotate(0.001deg);
  }
}

.heroInner {
  position: relative;
  z-index: 2;
}

.textShadow {
  text-shadow:
    0 2px 6px rgba(0, 0, 0, 0.45),
    0 0 1px rgba(0, 0, 0, 0.25);
}
.heroTitle {
  position: relative;
  font-size: clamp(28px, 5.2vw, 44px);
  line-height: 1.15;
  margin: 0 0 12px;
  font-weight: 500;
  max-width: 80%;

  animation: title-reveal 0.9s cubic-bezier(0.2, 0.8, 0.25, 1) 0.2s forwards;
  clip-path: inset(0 100% 0 0);
}
.in .heroTitle {
  animation: title-reveal 0.9s cubic-bezier(0.2, 0.8, 0.25, 1) 0.15s forwards;
}
@keyframes title-reveal {
  to {
    clip-path: inset(0 0 0 0);
  }
}
.heroTitle::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  height: 3px;
  width: 0;
  background: linear-gradient(90deg, #f6c453, #ffd97a);
  border-radius: 3px;
  animation: underline 0.8s ease 0.55s forwards;
}
@keyframes underline {
  to {
    width: 200px;
  }
}

.heroSubtitle {
  opacity: 0.96;
  max-width: 760px;
  margin: 0 0 24px;
  font-size: 18px;
  line-height: 1.45;
  animation: fade-up 0.5s ease 0.35s both;
}
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.heroInfo {
  margin: 0 0 32px;
}
.heroList {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
}

.heroInfoItem {
  position: relative;
  padding-left: 20px;
  font-size: 16px;
  font-weight: 600;
  color: #f6c453;
  opacity: 0;
  transform: translateY(6px);
  animation: perk-in 0.45s ease both;
  animation-delay: calc(0.45s + var(--i, 0) * 90ms);
}

.heroInfoItem::before {
  content: "•";
  position: absolute;
  left: 0;
  top: 0;
  color: #f6c453;
  font-size: 18px;
  line-height: 1;
}
@keyframes perk-in {
  to {
    opacity: 1;
    transform: none;
  }
}

/* CTA */
.heroActions {
  display: flex;
  gap: 12px;
}
.btn {
  display: inline-block;
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid #fff;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.2s;
  text-decoration: none;
  color: #111;
  font-weight: 700;
  background: #fff;
}
.btnPrimary {
  background: #f6c453;
  color: #111;
  border-color: #f6c453;
  position: relative;
  overflow: hidden;
}
.btnPrimary:hover {
  background: #fadb7e;
  border-color: #fadb7e;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
}
.btnPrimary::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.45),
    rgba(255, 255, 255, 0)
  );
  transform: translateX(-120%);
  opacity: 0;
}
.btnPrimary:hover::after {
  animation: btn-shine 0.9s ease forwards;
}
@keyframes btn-shine {
  0% {
    transform: translateX(-120%);
    opacity: 0;
  }
  30% {
    opacity: 0.9;
  }
  100% {
    transform: translateX(120%);
    opacity: 0;
  }
}

/* responsive */
@media (max-width: 1024px) {
  .container {
    padding: 0 20px;
  }
  .hero {
    min-height: clamp(380px, 60vw, 520px);
  }
}
@media (max-width: 640px) {
  .heroTitle,
  .heroSubtitle {
    text-align: center;
    max-width: 100%;
  }
  .heroInfoRow {
    justify-content: center;
  }
  .heroActions {
    justify-content: center;
  }
}
@media (max-width: 420px) {
  .hero {
    padding-top: 48px;
    padding-bottom: 48px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero,
  .heroOverlay::after,
  .in .heroTitle,
  .in .heroTitle::after,
  .in .heroSubtitle,
  .in .heroInfoItem,
  .btnPrimary:hover::after {
    animation: none !important;
  }
  .heroSubtitle,
  .heroInfoItem {
    opacity: 1;
    transform: none;
  }
}
</style>
