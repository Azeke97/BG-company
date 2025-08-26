<script setup lang="ts">
import { ElCarousel, ElCarouselItem } from "element-plus";
import "element-plus/es/components/carousel/style/css";
import "element-plus/es/components/carousel-item/style/css";

type Slide = {
  title: string;
  text: string;
  img: string;
  cta?: string;
  alt?: string;
};

const props = withDefaults(
  defineProps<{
    slides?: Slide[];
    interval?: number;
    height?: string;
    autoplay?: boolean;
    loop?: boolean;
    arrow?: "always" | "hover" | "never";
    indicatorOutside?: boolean;
    imgAspect?: `${number}/${number}`;
  }>(),
  {
    interval: 5200,
    height: "480px",
    autoplay: true,
    loop: true,
    arrow: "hover",
    indicatorOutside: false,
    imgAspect: "16/9",
  },
);

const slides = props.slides ?? [
  {
    title: "Our Mission",
    text: "BG Company — ...",
    img: "/images/mission/1.jpg",
    cta: "Learn More",
  },
  {
    title: "Our Vision",
    text: "Создаём красивые...",
    img: "/images/mission/2.jpg",
    cta: "Discover Our Vision",
  },
  {
    title: "Why Choose Us?",
    text: "Экспертиза + ...",
    img: "/images/mission/3.jpg",
    cta: "Find Out Why",
  },
];

const current = ref(0);
const blurOn = ref(false);
let blurT: number | null = null;

function handleChange(newIndex: number) {
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
}

onBeforeUnmount(() => {
  if (blurT) clearTimeout(blurT);
});

const ready = ref(false);

function preload(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
  });
}

onMounted(async () => {
  if (slides[0]) await preload(slides[0].img);
  ready.value = true;
  const rest = slides.slice(1).map((s) => preload(s.img));
  await Promise.allSettled(rest);
});
</script>

<template>
  <section class="mc" aria-roledescription="carousel">
    <div class="container">
      <div
        v-if="!ready"
        class="mc__skeleton"
        :style="{ height }"
        aria-hidden="true"
      >
        <div class="mc__skeleton-bar"></div>
      </div>

      <el-carousel
        v-else
        :interval="interval"
        :height="height"
        :autoplay="autoplay"
        :loop="loop"
        :arrow="arrow"
        :indicator-position="indicatorOutside ? 'outside' : ''"
        class="mc__carousel"
        @change="handleChange"
      >
        <el-carousel-item v-for="(s, i) in slides" :key="i">
          <div
            class="mc__slide"
            :class="[
              { 'is-active': i === current },
              { 'is-blur': blurOn && i === current },
            ]"
          >
            <div class="mc__img" :style="{ aspectRatio: imgAspect }">
              <img
                :src="s.img"
                :alt="s.alt || s.title"
                loading="eager"
                fetchpriority="high"
              />
            </div>
            <div class="mc__content">
              <h2 class="mc__title">{{ s.title }}</h2>
              <p class="mc__text">{{ s.text }}</p>
              <a v-if="s.cta" href="#contact" class="btn btn--primary">{{
                s.cta
              }}</a>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </section>
</template>

<style scoped>
.mc {
  background: #e9edf3;
  padding: 56px 0;
}
.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 16px;
}

.mc__skeleton {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: #f3f5f8;
}
.mc__skeleton-bar {
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 0.06),
    transparent
  );
  animation: mc-skel 1.1s infinite;
}
@keyframes mc-skel {
  to {
    transform: translateX(100%);
  }
}

.mc__slide {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;
  height: 100%;
  padding: 16px 8px;
}

.mc__img {
  width: 100%;
}
.mc__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  display: block;
  transform: translateZ(0);
  transition:
    transform 0.38s ease,
    filter 0.38s ease,
    opacity 0.38s ease;
  will-change: transform, filter, opacity;
}

.mc__slide.is-blur .mc__img img {
  filter: blur(6px) saturate(1.02);
  transform: scale(1.03);
  opacity: 0.92;
}
.mc__slide.is-active .mc__img img {
  filter: blur(0);
  transform: scale(1);
  opacity: 1;
}

.mc__title {
  font-size: 28px;
  margin: 0 0 8px;
}
.mc__text {
  margin: 0 0 16px;
  color: #333;
}
.btn {
  padding: 12px 20px;
  border-radius: 10px;
  background: #111;
  color: #fff;
  text-decoration: none;
  display: inline-block;
}

@media (max-width: 900px) {
  .mc__slide {
    grid-template-columns: 1fr;
  }
}
</style>
