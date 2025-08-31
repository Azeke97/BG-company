<script setup lang="ts">
const { t } = useI18n();
const s = useCssModule();

const info = [
  {
    // icon: FixSmetaIcon,
    text: "ceiling.hero.items[0]",
  },
  {
    // icon: GuaranteeIcon,
    text: "ceiling.hero.items[1]",
  },
  {
    // icon: TariffsIcon,
    text: "ceiling.hero.items[2]",
  },
];
</script>

<template>
  <section :class="s.hero">
    <div :class="[s.heroInner, s.container]">
      <div :class="s.heroContent">
        <h1 :class="s.heroTitle">
          {{ t("ceiling.hero.title") }}
        </h1>

        <p :class="s.heroSubtitle">
          {{ t("ceiling.hero.desc") }}
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

        <!--        <div :class="s.heroActions">-->
        <!--          <a href="#contact" :class="[s.btn, s.btnPrimary]">-->
        <!--            {{ t("ceiling.hero.button.feedback") }}-->
        <!--          </a>-->
        <!--        </div>-->
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
  background: url("../assets/images/seiling-hero-bg.png") center/cover no-repeat;
  padding: clamp(56px, 10vw, 120px) 0;
  color: #fff;
  overflow: hidden;
  min-height: clamp(300px, 45vw, 400px);
}

.heroBg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
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
  font-size: 16px;
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
