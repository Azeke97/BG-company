<script setup lang="ts">
import DesignIcon from "../assets/icons/design.svg";
import FixSmetaIcon from "../assets/icons/fix-smeta.svg";
import GuaranteeIcon from "../assets/icons/guarantee.svg";
import TariffsIcon from "../assets/icons/tariffs.svg";
import hero from "../assets/images/hero.jpg";

const { t } = useI18n();
const s = useCssModule();

const info = [
  {
    icon: FixSmetaIcon,
    text: "mainPage.hero.info[0]",
  },
  {
    icon: GuaranteeIcon,
    text: "mainPage.hero.info[1]",
  },
  {
    icon: TariffsIcon,
    text: "mainPage.hero.info[2]",
  },
  {
    icon: DesignIcon,
    text: "mainPage.hero.info[3]",
  },
];
</script>

<template>
  <section :class="s.hero">
    <img
      :src="hero"
      alt="Ремонт и дизайн квартир BG Company"
      width="1920"
      height="1080"
      :class="s.heroBg"
      fetchpriority="high"
      decoding="async"
    />

    <div :class="s.heroOverlay"></div>

    <div :class="[s.heroInner, s.container]">
      <div :class="s.heroContent">
        <h1 :class="s.heroTitle">
          {{ t("mainPage.hero.title") }}
          <span>BG Company</span>
        </h1>

        <p :class="s.heroSubtitle">
          {{ t("mainPage.hero.desc") }}
        </p>

        <div :class="s.heroInfo">
          <div :class="s.heroInfoRow">
            <span
              v-for="(item, idx) in info"
              :key="idx"
              :class="s.heroInfoText"
            >
              {{ t(item.text) }}
              <template v-if="idx < info.length - 1"> • </template>
            </span>
          </div>
        </div>

        <div :class="s.heroActions">
          <a href="#contact" :class="[s.btn, s.btnPrimary]">
            {{ t("mainPage.hero.button.feedback") }}
          </a>
          <a href="#projects" :class="[s.btn, s.btnGhost]">
            {{ t("mainPage.hero.button.portfolio") }}
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
  padding: clamp(56px, 10vw, 120px) 0;
  color: #fff;
  overflow: hidden;
  min-height: clamp(420px, 52vw, 620px);
}

.heroBg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;

  animation: hero-breathe 12s ease-in-out infinite;
  transform: scale(1);
}

@keyframes hero-breathe {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.heroOverlay {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1;
}

.heroInner {
  position: relative;
  z-index: 2;
}

.heroTitle {
  font-size: clamp(28px, 5.2vw, 44px);
  line-height: 1.15;
  margin: 0 0 12px;
  font-weight: 500;
}
.heroTitle span {
  color: #f6c453;
}

.heroSubtitle {
  opacity: 0.95;
  max-width: 720px;
  margin: 0 0 24px;
  font-size: 18px;
  line-height: 1.15;
}

.heroInfo {
  margin: 0 0 32px;
}
.heroInfoRow {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
}
.heroInfoText {
  font-size: 15px;
  font-weight: 500;
  color: #f6c453;
}

.btn {
  display: inline-block;
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid #fff;
  transition: 0.2s;
  text-decoration: none;
  color: #111;
  font-weight: 500;
  background: #fff;
}
.btnPrimary {
  background: #f6c453;
  color: #111;
  border-color: #f6c453;
}
.btnPrimary:hover {
  background: #fadb7e;
  border-color: #fadb7e;
}
.btnGhost {
  background: transparent;
  color: #fff;
  border-color: #fff;
}
.btnGhost:hover {
  background: #fff;
  color: #111;
}

.heroActions {
  display: flex;
  gap: 12px;
}

@media (max-width: 1024px) {
  .container {
    padding: 0 20px;
  }
  .hero {
    min-height: clamp(380px, 60vw, 520px);
  }
}

@media (max-width: 640px) {
  .heroTitle {
    text-align: center;
  }

  .heroActions {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .btnGhost {
    margin-left: 0;
  }

  .heroSubtitle {
    text-align: center;
    max-width: 100%;
  }

  .heroBg {
    object-position: center top;
  }
  .heroInfoRow {
    justify-content: center;
  }
}

@media (max-width: 420px) {
  .hero {
    padding-top: 48px;
    padding-bottom: 48px;
  }
  .heroInfoText {
    white-space: normal;
  }
}
</style>
