<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { ElCarousel, ElCarouselItem } from "element-plus";
import type { CarouselInstance } from "element-plus";

import caseImage from "../assets/images/living.jpg";
import kitchenImage from "../assets/images/kitchen.jpg";
import softImage from "../assets/images/soft.jpg";
import CaseWalkin from "../assets/images/case-walkin.jpg";
import CaseWardrobe from "../assets/images/case-wardrobe.jpg";
import SoftArmchair from "../assets/images/soft-armchair.jpg";

type Card = { title: string; desc: string };

const style = useCssModule();
const { t, tm } = useI18n();

const caseTitle = computed(() => t("furniture.types.case.title"));
const caseDesc = computed(() => t("furniture.types.case.desc"));
const caseMaterials = computed(
  () => tm("furniture.types.case.materials") as string[],
);

const softTitle = computed(() => t("furniture.types.soft.title"));
const softDesc = computed(() => t("furniture.types.soft.desc"));

const ctaLabel = computed(() => t("furniture.types.cta"));

const caseCards = computed<Card[]>(() => {
  const arr = tm("furniture.types.case.cards") as unknown;
  return Array.isArray(arr)
    ? (arr as Card[])
    : [
        {
          title: "Kitchen",
          desc: "Storage & ergonomics.",
        },
        {
          title: "Closets",
          desc: "Custom shelving & drawers.",
        },
        {
          title: "Wardrobes",
          desc: "Mirror/matte fronts.",
        },
      ];
});
const softCards = computed<Card[]>(() => {
  const arr = tm("furniture.types.soft.cards") as unknown;
  return Array.isArray(arr)
    ? (arr as Card[])
    : [
        {
          title: "Sofas",
          desc: "Folding, storage, covers.",
        },
        {
          title: "Beds",
          desc: "Soft headboard, drawers.",
        },
        {
          title: "Armchairs",
          desc: "Accent for interiors.",
        },
      ];
});

const caseImages = [kitchenImage, CaseWalkin, CaseWardrobe];
const softImages = [softImage, caseImage, SoftArmchair];

const caseIdx = ref(0);
const softIdx = ref(0);
const caseCarousel = ref<CarouselInstance | null>(null);
const softCarousel = ref<CarouselInstance | null>(null);

const setCase = (i: number) => {
  caseIdx.value = i;
  caseCarousel.value?.setActiveItem(i);
};
const setSoft = (i: number) => {
  softIdx.value = i;
  softCarousel.value?.setActiveItem(i);
};
const onCaseChange = (current: number) => {
  caseIdx.value = current;
};
const onSoftChange = (current: number) => {
  softIdx.value = current;
};

const onImgError = (e: Event) => {
  const el = e.target as HTMLElement | null;
  el?.closest("." + style.media)?.classList.add("noimg");
};

const goContact = () => {
  const el = document.querySelector("#contact");
  if (el)
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  else location.href = "/#contact";
};
</script>

<template>
  <section :class="$style.section">
    <div :class="$style.container">
      <div class="container" :class="$style.split">
        <div :class="$style.media" data-kind="case">
          <ElCarousel
            ref="caseCarousel"
            :autoplay="false"
            :loop="false"
            arrow="never"
            indicator-position="none"
            height="100%"
            @change="onCaseChange"
          >
            <ElCarouselItem
              v-for="(src, i) in caseImages"
              :key="'case-img-' + i"
            >
              <img
                :src="src"
                :alt="caseCards[i]?.title || caseTitle"
                loading="lazy"
                @error="onImgError"
              />
            </ElCarouselItem>
          </ElCarousel>
        </div>

        <div :class="$style.content">
          <h2 :class="$style.title">{{ caseTitle }}</h2>
          <p :class="$style.lead">{{ caseDesc }}</p>
          <ul :class="$style.list">
            <li v-for="(m, i) in caseMaterials" :key="'mat-' + i">
              {{ m }}
            </li>
          </ul>

          <div :class="$style.cards">
            <article
              v-for="(c, i) in caseCards"
              :key="'case-' + i"
              :class="[$style.card, i === caseIdx && $style.cardActive]"
              role="button"
              tabindex="0"
              :aria-current="i === caseIdx ? 'true' : 'false'"
              @click="setCase(i)"
              @keydown.enter.prevent="setCase(i)"
              @keydown.space.prevent="setCase(i)"
            >
              <div :class="$style.cardBullet" aria-hidden="true" />
              <h3 :class="$style.cardTitle">{{ c.title }}</h3>
              <p :class="$style.cardDesc">{{ c.desc }}</p>
            </article>
          </div>
        </div>
      </div>

      <div class="container" :class="[$style.split, $style.reverse]">
        <div :class="$style.media" data-kind="soft">
          <ElCarousel
            ref="softCarousel"
            :autoplay="false"
            :loop="false"
            arrow="never"
            indicator-position="none"
            height="100%"
            @change="onSoftChange"
          >
            <ElCarouselItem
              v-for="(src, i) in softImages"
              :key="'soft-img-' + i"
            >
              <img
                :src="src"
                :alt="softCards[i]?.title || softTitle"
                loading="lazy"
                @error="onImgError"
              />
            </ElCarouselItem>
          </ElCarousel>
        </div>

        <div :class="$style.content">
          <h2 :class="$style.title">{{ softTitle }}</h2>
          <p :class="$style.lead">{{ softDesc }}</p>

          <div :class="$style.cards">
            <article
              v-for="(c, i) in softCards"
              :key="'soft-' + i"
              :class="[$style.card, i === softIdx && $style.cardActive]"
              role="button"
              tabindex="0"
              :aria-current="i === softIdx ? 'true' : 'false'"
              @click="setSoft(i)"
              @keydown.enter.prevent="setSoft(i)"
              @keydown.space.prevent="setSoft(i)"
            >
              <div :class="$style.cardBullet" aria-hidden="true" />
              <h3 :class="$style.cardTitle">{{ c.title }}</h3>
              <p :class="$style.cardDesc">{{ c.desc }}</p>
            </article>
          </div>
        </div>
      </div>

      <div :class="$style.ctaWrapper">
        <button type="button" :class="$style.cta" @click="goContact">
          {{ ctaLabel }}
        </button>
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
  margin: 40px 0;
  padding: 56px 0 72px;
  background:
    radial-gradient(
      1200px 1200px at 100% -200px,
      rgba(246, 196, 83, 0.08),
      transparent 60%
    ),
    linear-gradient(180deg, #f7f7f7 0%, #f3f3f3 100%);
}

.split {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 36px;
  align-items: center;
  margin-bottom: 100px;
}
.reverse {
  grid-auto-flow: dense;
}
.reverse .media {
  order: 2;
}
.reverse .content {
  order: 1;
}

.media {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  height: 280px;
}
.media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media.noimg::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, rgba(246, 196, 83, 0.25), transparent 40%),
    linear-gradient(180deg, #2b2b2d, #3a3a3d);
}
.media.noimg::after {
  content: "image";
  position: absolute;
  inset: auto 16px 14px 16px;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
}

.content {
  padding: 8px 0;
}
.title {
  margin: 0 0 14px;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0.2px;
  color: #222;
}
.lead {
  margin: 0 0 18px;
  color: #4a4a4a;
  font-size: 16px;
  line-height: 1.55;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 12px;
}
.card {
  position: relative;
  border-radius: 14px;
  background: #fff;
  padding: 16px 14px 18px 14px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
  cursor: pointer;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  border-color: rgba(246, 196, 83, 0.55);
}
.cardActive {
  border-color: rgba(246, 196, 83, 0.85);
  box-shadow: 0 8px 20px rgba(246, 196, 83, 0.18);
  transform: translateY(-2px);
}
.cardBullet {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f6c453;
  box-shadow: 0 0 0 6px rgba(246, 196, 83, 0.18);
  margin-bottom: 8px;
}
.cardTitle {
  margin: 0 0 6px;
  font-weight: 700;
  font-size: 16px;
  color: #1e1e1e;
}
.cardDesc {
  margin: 0;
  font-size: 14px;
  color: #5b5b5b;
  line-height: 1.5;
}

.list {
  margin: 0 0 16px;
  padding-left: 20px;
  color: #4a4a4a;
  font-size: 15px;
  line-height: 1.55;
}
.list li {
  margin-bottom: 6px;
}

.ctaWrapper {
  display: flex;
  justify-content: center;
}

.cta {
  margin-top: 18px;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid #f6c453;
  background: #f6c453;
  color: #222;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease,
    border-color 0.15s ease;
}
.cta:hover {
  background: #fadb7e;
  border-color: #fadb7e;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
  transform: translateY(-1px);
}

@media (max-width: 1100px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 900px) {
  .split {
    grid-template-columns: 1fr;
  }
  .reverse .media,
  .reverse .content {
    order: initial;
  }
}
@media (max-width: 640px) {
  .cards {
    grid-template-columns: 1fr;
  }
}

:global(.el-carousel) {
  height: 100%;
}
:global(.el-carousel__container) {
  height: 100%;
}
:global(.el-carousel__item) {
  height: 100%;
}
:global(.el-carousel__indicators) {
  display: none !important;
} /* на всякий случай */
:global(.el-carousel__arrow) {
  display: none !important;
}
</style>
