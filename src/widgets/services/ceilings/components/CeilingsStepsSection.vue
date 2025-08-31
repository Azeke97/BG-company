<script setup lang="ts">
import Classic from "../assets/images/classic.jpg";
import Floating from "../assets/images/floating.jpg";
import Gkl from "../assets/images/gkl.jpg";
import Shadow from "../assets/images/shadow.jpg";

type Step = {
  id: string;
  title: string;
  image: string;
  effect: string;
  visual: string;
  advantages: string[];
};

const s = useCssModule();
const { t, tm } = useI18n();

const steps = ref<Step[]>([
  {
    id: "gkl",
    title: t("ceiling.steps.gkl.title"),
    image: Gkl,
    effect: t("ceiling.steps.gkl.effect"),
    visual: t("ceiling.steps.gkl.visual"),
    advantages:
      (tm("ceiling.steps.gkl.advantages") as unknown as string[]) || [],
  },
  {
    id: "shadow",
    title: t("ceiling.steps.shadow.title"),
    image: Shadow,
    effect: t("ceiling.steps.shadow.effect"),
    visual: t("ceiling.steps.shadow.visual"),
    advantages:
      (tm("ceiling.steps.shadow.advantages") as unknown as string[]) || [],
  },
  {
    id: "floating",
    title: t("ceiling.steps.floating.title"),
    image: Floating,
    effect: t("ceiling.steps.floating.effect"),
    visual: t("ceiling.steps.floating.visual"),
    advantages:
      (tm("ceiling.steps.floating.advantages") as unknown as string[]) || [],
  },
  {
    id: "classic",
    title: t("ceiling.steps.classic.title"),
    image: Classic,
    effect: t("ceiling.steps.classic.effect"),
    visual: t("ceiling.steps.classic.visual"),
    advantages:
      (tm("ceiling.steps.classic.advantages") as unknown as string[]) || [],
  },
]);

const activeIdx = ref(0);
const active = computed(() => steps.value[activeIdx.value]);

const go = (idx: number) => {
  if (idx < 0 || idx >= steps.value.length) return;
  activeIdx.value = idx;
};
</script>

<template>
  <section id="choose-ceiling" :class="s.section">
    <div :class="[s.container]">
      <div :class="s.header">
        <h2 :class="s.title">{{ t("ceiling.steps.ui.chooseTitle") }}</h2>
        <p :class="s.subtitle">{{ t("ceiling.steps.ui.chooseSubtitle") }}</p>
      </div>

      <div :class="s.stepper">
        <div :class="s.stepChips">
          <button
            v-for="(item, i) in steps"
            :key="item.id"
            :class="[s.stepChip, i === activeIdx ? s.stepChipActive : '']"
            type="button"
            @click="go(i)"
          >
            <span :class="s.stepIndex">{{ i + 1 }}</span>
            <span :class="s.stepLabel">{{ item.title }}</span>
          </button>
        </div>
      </div>

      <div v-if="active" :class="s.card">
        <div :class="s.media">
          <img :src="active.image" :alt="active.title" :class="s.image" />
        </div>
        <div :class="s.content">
          <h3 :class="s.cardTitle">{{ active.title }}</h3>

          <div :class="s.rows">
            <div :class="s.row">
              <div :class="s.rowTitle">
                {{ t("ceiling.steps.ui.labels.effect") }}
              </div>
              <div :class="s.rowText">{{ active.effect }}</div>
            </div>
            <div :class="s.row">
              <div :class="s.rowTitle">
                {{ t("ceiling.steps.ui.labels.visual") }}
              </div>
              <div :class="s.rowText">{{ active.visual }}</div>
            </div>
            <div :class="s.row">
              <div :class="s.rowTitle">
                {{ t("ceiling.steps.ui.labels.advantages") }}
              </div>
              <ul :class="s.benefits">
                <li v-for="(adv, i) in active.advantages" :key="i">
                  - {{ adv }}
                </li>
              </ul>
            </div>
          </div>

          <div :class="s.actions">
            <a href="#contact" :class="[s.btn, s.btnPrimary]">
              {{ t("ceiling.steps.ui.cta") }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style module>
.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 20px;
}

.section {
  padding: clamp(40px, 7vw, 88px) 0;
  background: #e9edf3;
  margin: 40px 0;
}

.header {
  text-align: center;
  margin-bottom: clamp(18px, 4vw, 40px);
}

.title {
  font-size: 30px;
  line-height: 1.2;
  margin: 0 0 8px;
  font-weight: 600;
}

.subtitle {
  color: #5b5b5b;
  max-width: 760px;
  margin: 0 auto;
  font-size: 16px;
}

.stepper {
  margin-top: 18px;
}

.progressBar {
  height: 6px;
  border-radius: 999px;
  background: #e6e6e6;
  overflow: hidden;
}
.progressValue {
  height: 100%;
  background: #f6c453;
  width: 0%;
  transition: width 240ms ease;
}

.stepChips {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 14px;
}
.stepChip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e9e9e9;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
  text-align: left;
}
.stepChip:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
}
.stepChipActive {
  border-color: #f6c453;
  box-shadow: 0 8px 24px rgba(246, 196, 83, 0.28);
}
.stepIndex {
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #f6c453;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
}
.stepLabel {
  font-size: 15px;
  line-height: 1.2;
}

.card {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 20px;
  margin-top: clamp(18px, 4vw, 28px);
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.05);
}

.media {
  position: relative;
  min-height: 280px;
}
.image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  padding: clamp(14px, 3vw, 24px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cardTitle {
  font-size: clamp(18px, 3.6vw, 24px);
  margin: 0 0 25px;
  font-weight: 600;
}

.cardTitle::after {
  content: "";
  display: block;
  width: auto;
  height: 4px;
  margin: 10px auto 0;
  background: #f6c453;
  border-radius: 999px;
}

.rows {
  display: grid;
  gap: 12px;
}
.row {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 10px;
  align-items: start;
}
.rowTitle {
  font-weight: 600;
  color: #111;
}
.rowText {
  color: #333;
  min-height: 50px;
}

.benefits {
  min-height: 70px;
}
.benefits li {
  margin: 2px 0;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 12px;
}

.btn {
  display: inline-block;
  padding: 14px 20px;
  border-radius: 10px;
  border: 1px solid #fff;
  transition: 0.2s;
  text-decoration: none;
  color: #111;
  font-weight: 500;
  background: #fff;
  white-space: nowrap;
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
  color: #111;
  border-color: #d9d9d9;
}
.btnGhost:hover {
  background: #fff;
  border-color: #bdbdbd;
}

@media (max-width: 1024px) {
  .card {
    grid-template-columns: 1fr;
  }
  .media {
    min-height: 220px;
  }
  .row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
@media (max-width: 640px) {
  .stepChips {
    grid-template-columns: 1fr;
  }
  .actions {
    flex-wrap: wrap;
  }
}
</style>
