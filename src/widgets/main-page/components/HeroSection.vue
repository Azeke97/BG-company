<script setup lang="ts">
import DesignIcon from "../assets/icons/design.svg";
import FixSmetaIcon from "../assets/icons/fix-smeta.svg";
import GuaranteeIcon from "../assets/icons/guarantee.svg";
import TariffsIcon from "../assets/icons/tariffs.svg";

const { t } = useI18n();
const s = useCssModule();

const info = [
  {
    icon: FixSmetaIcon,
    text: "hero.info[0]",
  },
  {
    icon: GuaranteeIcon,
    text: "hero.info[1]",
  },
  {
    icon: TariffsIcon,
    text: "hero.info[2]",
  },
  {
    icon: DesignIcon,
    text: "hero.info[3]",
  },
];
</script>

<template>
  <section :class="s.hero">
    <div :class="[s.heroInner, s.container]">
      <div :class="s.heroContent">
        <h1 :class="s.heroTitle">
          {{ t("hero.title") }}
          <span>BG Company</span>
        </h1>

        <p :class="s.heroSubtitle">
          {{ t("hero.desc") }}
        </p>

        <div :class="s.heroInfo">
          <div :class="s.heroInfoRow">
            <span
              v-for="(item, idx) in info"
              :key="idx"
              :class="s.heroInfoText"
            >
              {{ t(item.text)
              }}<template v-if="idx < info.length - 1"> • </template>
            </span>
          </div>
        </div>

        <div :class="s.heroActions">
          <a href="#contact" :class="[s.btn, s.btnPrimary]">
            {{ t("hero.button.feedback") }}
          </a>
          <a href="#projects" :class="[s.btn, s.btnGhost]">
            {{ t("hero.button.portfolio") }}
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
  padding: 96px 0;
  background: url("../assets/images/hero.jpg") center/cover no-repeat;
  color: #fff;
}
.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
}
.heroInner {
  position: relative;
  z-index: 1;
}

.heroTitle {
  font-size: 44px;
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
  display: block;
}

.heroInfoText {
  font-size: 15px;
  font-weight: 500;
  color: #f6c453;
  white-space: wrap;
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
  margin-left: 12px;
}
.btnGhost:hover {
  background: #fff;
  color: #111;
}
</style>
