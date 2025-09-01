<script setup lang="ts">
const { t, tm } = useI18n();
const style = useCssModule();

const info = computed<string[]>(() => {
  const arr = tm("furniture.hero.items") as unknown;
  return Array.isArray(arr) ? (arr as string[]) : [];
});
</script>

<template>
  <section :class="style.hero">
    <div :class="style.heroOverlay" />

    <div :class="[style.heroInner, style.container]">
      <div :class="style.heroContent">
        <h2 :class="[style.heroTitle, style.textShadow]">
          {{ t("furniture.hero.title") }}
        </h2>

        <p :class="[style.heroSubtitle, style.textShadow]">
          {{ t("furniture.hero.desc") }}
        </p>

        <div :class="style.heroInfo">
          <div :class="style.heroInfoRow">
            <span
              v-for="(item, idx) in info"
              :key="idx"
              :class="[style.heroInfoText, style.textShadow]"
            >
              {{ item }}<template v-if="idx < info.length - 1"> • </template>
            </span>
          </div>
        </div>

        <!--
        <div :class="style.heroActions">
          <a href="#contact" :class="[style.btn, style.btnPrimary]">
            {{ t("contact.actions.submit") }}
          </a>
        </div>
        -->
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
  background: url("../assets/images/hero-bg.jpg") center/cover no-repeat;
  animation: heroZoom 22s ease-in-out infinite alternate;
  padding: clamp(56px, 10vw, 120px) 0;
  color: #fff;
  overflow: hidden;
  min-height: clamp(300px, 45vw, 400px);
}

@keyframes heroZoom {
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
  background: radial-gradient(
    60% 60% at 20% 30%,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.05) 70%
  );
  pointer-events: none;
  z-index: 1;
}

.heroOverlay::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--x, 20%) var(--y, 30%),
    rgba(246, 196, 83, 0.2),
    transparent 70%
  );
  mix-blend-mode: overlay;
  animation: floatGlow 12s ease-in-out infinite alternate;
}

@keyframes floatGlow {
  0% {
    --x: 20%;
    --y: 30%;
  }
  50% {
    --x: 50%;
    --y: 10%;
  }
  100% {
    --x: 80%;
    --y: 70%;
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
  font-size: clamp(28px, 5.2vw, 44px);
  line-height: 1.15;
  margin: 0 0 12px;
  font-weight: 700;
}

.heroSubtitle {
  opacity: 0.96;
  max-width: 720px;
  margin: 0 0 24px;
  font-size: 18px;
  line-height: 1.45;
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
  font-weight: 600;
  color: #f6c453;
  white-space: normal;
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
  .hero {
    background: url("../assets/images/hero-bg.jpg") no-repeat fixed center;
    animation: none;
  }
  .heroTitle {
    text-align: center;
  }
  .heroSubtitle {
    text-align: center;
    max-width: 100%;
  }
  .heroInfoRow {
    justify-content: center;
  }
  .heroActions {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
  .btnGhost {
    margin-left: 0;
  }
}

@media (max-width: 420px) {
  .hero {
    padding-top: 48px;
    padding-bottom: 48px;
  }
}
</style>
