<script setup lang="ts">
import { ElCarousel, ElCarouselItem } from "element-plus";
import "element-plus/es/components/carousel/style/css";
import "element-plus/es/components/carousel-item/style/css";
import Mission from "../assets/images/mission.jpg";
import Vision from "../assets/images/vision.jpg";
import ChooseUs from "../assets/images/choose-us.jpg";

const style = useCssModule();
const { t, tm } = useI18n();

interface Slide {
  title: string;
  text: string;
  img: string;
  isList?: boolean;
}

withDefaults(
  defineProps<{
    interval?: number;
    height?: string;
    autoplay?: boolean;
    loop?: boolean;
    arrow?: "always" | "hover" | "never";
    indicatorOutside?: boolean;
    imgAspect?: `${number}/${number}`;
  }>(),
  {
    interval: 4500,
    height: "480px",
    autoplay: true,
    loop: true,
    arrow: "always",
    indicatorOutside: false,
    imgAspect: "16/9",
  },
);

const slides: Slide[] = [
  {
    title: "mainPage.heroSlides.items[0].title",
    text: "mainPage.heroSlides.items[0].text",
    img: Mission,
  },
  {
    title: "mainPage.heroSlides.items[1].title",
    text: "mainPage.heroSlides.items[1].text",
    img: Vision,
  },
  {
    title: "mainPage.heroSlides.items[2].title",
    text: "mainPage.heroSlides.items[2].list",
    img: ChooseUs,
    isList: true,
  },
];

const current = ref(0);
const blurOn = ref(false);
let blurT: number | null = null;

const handleChange = (newIndex: number) => {
  current.value = newIndex;
  blurOn.value = false;
  if (blurT) {
    clearTimeout(blurT);
    blurT = null;
  }
  blurT = window.setTimeout(() => {
    blurOn.value = true;
    blurT = window.setTimeout(() => (blurOn.value = false), 380);
  }, 10);
};

onBeforeUnmount(() => {
  if (blurT) clearTimeout(blurT);
});

const ready = ref(false);
const preload = (src: string) =>
  new Promise<void>((res) => {
    const img = new Image();
    img.onload = img.onerror = () => res();
    img.src = src;
  });

onMounted(async () => {
  if (slides[0]) await preload(slides[0].img);
  ready.value = true;
  await Promise.allSettled(slides.slice(1).map((s) => preload(s.img)));
});
</script>

<template>
  <section :class="style.heroCarousel" aria-roledescription="carousel">
    <div :class="style.container">
      <div
        v-if="!ready"
        :class="style.skeleton"
        :style="{ height }"
        aria-hidden="true"
      >
        <div :class="style.skeletonBar"></div>
      </div>

      <el-carousel
        v-else
        :interval="interval"
        :height="height"
        :autoplay="autoplay"
        :loop="loop"
        :arrow="arrow"
        :indicator-position="indicatorOutside ? 'outside' : ''"
        :class="style.carousel"
        @change="handleChange"
      >
        <el-carousel-item v-for="(s, i) in slides" :key="s.title">
          <div
            :class="[
              style.slide,
              i === current && style.active,
              blurOn && i === current && style.blur,
            ]"
          >
            <div
              :class="style.imageWrapper"
              :style="{ aspectRatio: imgAspect }"
            >
              <img :src="s.img" :alt="t(s.title)" :class="style.image" />
            </div>

            <div :class="style.content">
              <h2 :class="style.title">{{ t(s.title) }}</h2>

              <p v-if="!s.isList" :class="style.text">{{ t(s.text) }}</p>

              <ul v-else :class="style.list">
                <li
                  v-for="(li, idx) in tm(s.text) as string[]"
                  :key="idx"
                  :class="style.listItem"
                >
                  {{ li }}
                </li>
              </ul>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </section>
</template>

<style module>
.heroCarousel {
  background: #e9edf3;
  margin-top: 40px;
  padding: 0;
}
.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 16px;
}

.skeleton {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #f3f5f8;
}
.skeletonBar {
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 0.06),
    transparent
  );
  animation: skeletonAnim 1.1s infinite;
}
@keyframes skeletonAnim {
  to {
    transform: translateX(100%);
  }
}

.slide {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;
  height: 100%;
  padding: 16px 8px;
}
.imageWrapper {
  width: 100%;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  transition: 0.38s;
}

.blur .image {
  filter: blur(6px) saturate(1.02);
  transform: scale(1.03);
  opacity: 0.92;
}
.active .image {
  filter: none;
  transform: scale(1);
  opacity: 1;
}

.content {
  max-width: 80%;
}

.title {
  font-size: 28px;
  margin-bottom: 20px;
}
.text {
  line-height: 1.45;
  color: #333;
}

.list {
  margin: 0;
  padding: 0 0 0 18px;
  color: #333;
}
.listItem {
  margin: 6px 0;
  line-height: 1.45;
  list-style: disc;
}

@media (max-width: 900px) {
  .slide {
    grid-template-columns: 1fr;
  }
}
</style>
