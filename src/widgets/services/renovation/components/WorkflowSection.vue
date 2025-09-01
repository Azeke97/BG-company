<script setup lang="ts">
type Step = { title: string; desc: string };

const style = useCssModule();
const { t, tm } = useI18n();

const title = computed(() => t("renovate.workflow.title"));
const subtitle = computed(() => t("renovate.workflow.subtitle"));

const steps = computed<Step[]>(() => {
  const arr = tm("renovate.workflow.items") as unknown;
  return Array.isArray(arr) ? (arr as Step[]) : [];
});

const root = ref<HTMLElement | null>(null);
const inView = ref(false);
let io: IntersectionObserver | null = null;

onMounted(() => {
  if (!root.value) return;
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          inView.value = true;
          io?.disconnect();
        }
      });
    },
    { threshold: 0.2 },
  );
  io.observe(root.value);
});
onBeforeUnmount(() => io?.disconnect());
</script>

<template>
  <section ref="root" :class="[style.section, inView && style.in]">
    <div :class="style.container">
      <header :class="style.header">
        <h2 :class="style.title">{{ title }}</h2>
        <p :class="style.subtitle">{{ subtitle }}</p>
      </header>

      <ol :class="style.grid" role="list">
        <li
          v-for="(step, i) in steps"
          :key="step.title + i"
          :class="style.card"
        >
          <div :class="style.badge">
            <span :class="style.badgeShadow" aria-hidden="true" />
            <span :class="style.badgeNum">{{ i + 1 }}</span>
          </div>

          <h3 :class="style.cardTitle">{{ step.title }}</h3>
          <p :class="style.cardDesc">{{ step.desc }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style module>
.section {
  padding: 56px 0 72px;
  background:
    radial-gradient(
      900px 900px at 110% -140px,
      rgba(246, 196, 83, 0.09),
      transparent 60%
    ),
    linear-gradient(180deg, #f7f7f7 0%, #f3f3f3 100%);
  overflow: hidden;
  margin-bottom: 40px;
}
.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 16px;
}
.header {
  text-align: center;
  margin-bottom: 28px;
}
.title {
  text-align: center;
  font-size: 30px;
  margin: 0 0 8px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: #1f1f1f;
}
.subtitle {
  margin: 0 auto;
  max-width: 780px;
  color: #555;
  font-size: 16px;
  line-height: 1.6;
}

/* ===== Timeline сетка ===== */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* левая/правая колонка */
  gap: 28px 32px;
  position: relative;
  margin-top: 18px;
}

/* центральная «живая» линия */
.grid::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    rgba(246, 196, 83, 0) 0%,
    rgba(246, 196, 83, 0.55) 50%,
    rgba(246, 196, 83, 0) 100%
  );
  background-size: 100% 260px;
  animation: flowY 5s linear infinite;
  opacity: 0.6;
  pointer-events: none;
  filter: blur(0.2px);
}
@keyframes flowY {
  0% {
    background-position-y: -260px;
  }
  100% {
    background-position-y: 260px;
  }
}

/* ===== Карточка шага ===== */
.card {
  position: relative;
  border-radius: 16px;
  padding: 18px 18px 16px;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow:
    0 18px 42px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  overflow: hidden;

  width: min(520px, 100%);
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.55s ease,
    transform 0.55s cubic-bezier(0.2, 0.8, 0.25, 1),
    box-shadow 0.3s ease;
}

/* раскладка зигзагом: нечётные слева, чётные справа */
.card:nth-child(odd) {
  grid-column: 1;
  justify-self: end;
  padding-right: 36px;
}
.card:nth-child(even) {
  grid-column: 2;
  justify-self: start;
  padding-left: 36px;
}

/* коннектор-луч к центральной линии (дорисовывается при входе) */
.card::before {
  content: "";
  position: absolute;
  top: 28px; /* ориентируемся на бейдж */
  height: 2px;
  width: 64px;
  background: linear-gradient(
    90deg,
    rgba(246, 196, 83, 0),
    rgba(246, 196, 83, 0.8),
    rgba(246, 196, 83, 0)
  );
  transform: scaleX(0);
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.25, 1);
  pointer-events: none;
}
/* от карточки к центру */
.card:nth-child(odd)::before {
  right: -64px;
  transform-origin: left center;
}
.card:nth-child(even)::before {
  left: -64px;
  transform-origin: right center;
}

/* мягкий стеклянный «сheen»-блик (ненавязчивый, без hover) */
.card::after {
  content: "";
  position: absolute;
  inset: -30%;
  background: linear-gradient(
    115deg,
    transparent 0%,
    rgba(255, 255, 255, 0.12) 46%,
    rgba(255, 255, 255, 0.32) 50%,
    rgba(255, 255, 255, 0.12) 54%,
    transparent 100%
  );
  transform: translateX(-70%) translateY(35%) rotate(-16deg);
  opacity: 0;
  animation: sheen 6.4s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}
@keyframes sheen {
  0% {
    transform: translateX(-70%) translateY(35%) rotate(-16deg);
    opacity: 0;
  }
  10% {
    opacity: 0.9;
  }
  50% {
    transform: translateX(0%) translateY(0%) rotate(-16deg);
    opacity: 0.9;
  }
  90% {
    opacity: 0;
  }
  100% {
    transform: translateX(70%) translateY(-35%) rotate(-16deg);
    opacity: 0;
  }
}

/* вход с поочерёдной задержкой */
.in .card:nth-child(1) {
  opacity: 1;
  transform: none;
  transition-delay: 0.05s;
}
.in .card:nth-child(2) {
  opacity: 1;
  transform: none;
  transition-delay: 0.12s;
}
.in .card:nth-child(3) {
  opacity: 1;
  transform: none;
  transition-delay: 0.19s;
}
.in .card:nth-child(4) {
  opacity: 1;
  transform: none;
  transition-delay: 0.26s;
}

/* коннектор дорисовывается после появления карточки */
.in .card:nth-child(1)::before {
  transform: scaleX(1);
  transition-delay: 0.18s;
}
.in .card:nth-child(2)::before {
  transform: scaleX(1);
  transition-delay: 0.25s;
}
.in .card:nth-child(3)::before {
  transform: scaleX(1);
  transition-delay: 0.32s;
}
.in .card:nth-child(4)::before {
  transform: scaleX(1);
  transition-delay: 0.39s;
}

/* разносим фазы блика, чтобы не синхронно */
.card:nth-child(1)::after {
  animation-delay: 0.4s;
}
.card:nth-child(2)::after {
  animation-delay: 1.1s;
}
.card:nth-child(3)::after {
  animation-delay: 1.8s;
}
.card:nth-child(4)::after {
  animation-delay: 2.5s;
}

/* бейдж с номером шага */
.badge {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(180deg, #fff, #f5f1e6);
  border: 1px solid rgba(246, 196, 83, 0.6);
  box-shadow:
    0 10px 24px rgba(246, 196, 83, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.75);
  display: grid;
  place-items: center;
  margin-bottom: 10px;
  z-index: 1;
}
.badgeShadow {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: 12px;
  background: conic-gradient(
    from 0deg,
    rgba(246, 196, 83, 0.45),
    rgba(255, 255, 255, 0.6),
    rgba(246, 196, 83, 0.45)
  );
  opacity: 0.28;
  filter: blur(0.4px);
  pointer-events: none;
}
.badgeNum {
  font-weight: 900;
  color: #5c4a14;
  font-size: 16px;
}

/* текст */
.cardTitle {
  margin: 6px 0 6px;
  color: #1f1f1f;
  font-weight: 800;
  font-size: 18px;
}
.cardDesc {
  margin: 0;
  color: #3b3b3b;
  font-size: 14.5px;
  line-height: 1.6;
}

/* лёгкий hover без перегруза */
.card:hover {
  box-shadow:
    0 26px 56px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.55);
  transform: translateY(-2px);
}

/* ===== Мобилка: одна колонка, линия слева ===== */
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .grid::before {
    left: 22px;
    transform: none;
  }

  .card,
  .card:nth-child(odd),
  .card:nth-child(even) {
    grid-column: 1;
    justify-self: stretch;
    padding-left: 48px; /* место под линию + коннектор */
    padding-right: 18px;
  }

  .card::before {
    left: -48px;
    right: auto;
    width: 48px;
    transform-origin: right center;
  }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .grid::before {
    animation: none !important;
  }
  .card,
  .card::before,
  .card::after {
    transition: none !important;
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
</style>
