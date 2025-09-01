<script setup lang="ts">
type Plan = {
  name: string;
  price: string;
  for: string;
  desc: string;
  features: string[];
  note?: string;
  pdf: string;
};

const s = useCssModule();
const { t, tm } = useI18n();

const title = computed(() => t("renovate.pricing.title"));
const subtitle = computed(() => t("renovate.pricing.subtitle"));
const ctaLabel = computed(() => t("renovate.pricing.cta"));

const plans = computed<Plan[]>(() => {
  const arr = tm("renovate.pricing.plans") as unknown;
  return Array.isArray(arr) ? (arr as Plan[]) : [];
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
    { threshold: 0.18 },
  );
  io.observe(root.value);
});
onBeforeUnmount(() => io?.disconnect());
</script>

<template>
  <section ref="root" :class="[s.section, inView && s.in]">
    <div :class="s.container">
      <header :class="s.header">
        <h2 :class="s.title">{{ title }}</h2>
        <p :class="s.subtitle">{{ subtitle }}</p>
      </header>

      <div :class="s.grid">
        <div v-for="(p, i) in plans" :key="p.name + i" :class="s.scene">
          <article
            :class="[
              s.card,
              i === 0 && s.tiltLeft,
              i === 1 && s.tiltUp,
              i === 2 && s.tiltRight,
              i === 1 && s.featured,
            ]"
          >
            <div :class="s.glass" aria-hidden="true" />

            <div :class="s.cardHead">
              <div :class="s.badge">{{ p.name }}</div>
              <div :class="s.price">{{ p.price }}</div>
              <div :class="s.fit">{{ p.for }}</div>
            </div>

            <p :class="s.desc">{{ p.desc }}</p>

            <ul :class="s.list">
              <li v-for="(f, j) in p.features" :key="j" :class="s.item">
                <span :class="s.dot" aria-hidden="true" />
                <span>{{ f }}</span>
              </li>
            </ul>

            <p v-if="p.note" :class="s.note">{{ p.note }}</p>

            <a :href="p.pdf" target="_blank" rel="noopener" :class="s.btnGlass">
              {{ ctaLabel }}
            </a>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style module>
.section {
  padding: 56px 0 80px;
  background:
    radial-gradient(
      1200px 1200px at 100% -200px,
      rgba(246, 196, 83, 0.08),
      transparent 60%
    ),
    linear-gradient(180deg, #f7f7f7 0%, #f3f3f3 100%);
  overflow: hidden;
  margin: 40px auto;
}
.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 16px;
}

.header {
  text-align: center;
  margin-bottom: 26px;
}
.title {
  letter-spacing: 0.2px;
  color: #1f1f1f;
  text-align: center;
  font-size: 30px;
  margin: 0 0 8px;
  font-weight: 600;
}
.subtitle {
  margin: 0 auto;
  max-width: 820px;
  color: #525252;
  font-size: 16px;
  line-height: 1.55;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.scene {
  perspective: 900px;
  perspective-origin: 50% 40%;
}

.card {
  display: flex;
  flex-direction: column;
  min-height: 700px;
  position: relative;
  border-radius: 18px;
  padding: 28px 24px 24px;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  opacity: 0;
  transform: translateY(16px);
  transition:
    transform 0.4s cubic-bezier(0.2, 0.8, 0.25, 1),
    opacity 0.45s ease,
    box-shadow 0.3s ease;
  will-change: transform;
}
.in .card {
  opacity: 1;
  transform: none;
}

.card:hover {
  transform: scale(1.04) translateY(-4px);
  box-shadow:
    0 32px 70px rgba(0, 0, 0, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.55);
}

.tiltLeft:hover {
  transform: scale(1.04) rotateY(-6deg) translateY(-4px);
}
.tiltUp:hover {
  transform: scale(1.04) rotateX(-6deg) translateY(-4px);
}
.tiltRight:hover {
  transform: scale(1.04) rotateY(6deg) translateY(-4px);
}

.card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255, 255, 255, 0.5) 45%,
    rgba(255, 255, 255, 0.7) 50%,
    rgba(255, 255, 255, 0.5) 55%,
    transparent 100%
  );
  transform: translateX(-100%) rotate(15deg);
  opacity: 0;
  pointer-events: none;
}
.card:hover::after {
  opacity: 1;
  transform: translateX(100%) rotate(15deg);
  transition:
    transform 0.8s ease,
    opacity 0.2s ease;
}

.cardHead {
  display: grid;
  gap: 10px;
  margin-bottom: 14px;
}
.badge {
  width: fit-content;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(246, 196, 83, 0.25),
    rgba(246, 196, 83, 0.5)
  );
  color: #5c4a14;
  border: 1px solid rgba(246, 196, 83, 0.55);
  box-shadow: inset 0 0 10px rgba(246, 196, 83, 0.25);
}
.price {
  font-size: 28px;
  font-weight: 900;
  color: #1d1d1d;
}
.fit {
  font-size: 16px;
  color: #1d1d1d;
  font-weight: 500;
}

.desc {
  margin: 8px 0 12px;
  color: #1d1d1d;
  font-size: 16px;
}

.list {
  margin: 20px 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 16px;
}
.item {
  display: grid;
  grid-template-columns: 14px 1fr;
  gap: 12px;
  align-items: start;
  font-size: 14px;
  color: #2b2b2b;
}
.dot {
  width: 10px;
  height: 10px;
  margin-top: 4px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffd97a, #f6c453);
  box-shadow: 0 0 0 6px rgba(246, 196, 83, 0.18);
}

.note {
  margin: 20px 0 12px;
  font-size: 14px;
  color: #6a6a6a;
}

.btnGlass {
  margin-top: auto;
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 800;
  color: #2a2208;
  text-decoration: none;
  background: rgba(246, 196, 83, 0.9);
  border: 1px solid rgba(246, 196, 83, 0.95);
  box-shadow:
    0 12px 24px rgba(246, 196, 83, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;
}
.btnGlass:hover {
  transform: translateY(-1px);
  box-shadow:
    0 18px 32px rgba(246, 196, 83, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.featured {
  background: rgba(255, 255, 255, 0.6);
  border-color: rgba(246, 196, 83, 0.7);
  box-shadow:
    0 28px 64px rgba(246, 196, 83, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.55);
  transform: translateY(-2px);
}

@media (max-width: 1000px) {
  .card {
    max-height: 500px;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  .featured {
    transform: none;
  }
  .scene {
    perspective: 800px;
  }
}
</style>
