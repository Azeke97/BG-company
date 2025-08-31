<script setup lang="ts">
import { createAvatar, type Style } from "@dicebear/core";
import {
  identicon,
  shapes,
  bottts,
  pixelArt,
  thumbs,
} from "@dicebear/collection";

export interface Testimonial {
  author: string;
  role?: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    author: "Ирина К.",
    role: "mainPage.testimonials.roles.client",
    text: "Идеи стали реальностью. Отличное качество и сроки!",
  },
  {
    author: "Алексей П.",
    role: "mainPage.testimonials.roles.customer",
    text: "Команда BG — это внимание к деталям и прозрачность.",
  },
  {
    author: "Динара Ж.",
    role: "mainPage.testimonials.roles.client",
    text: "Рекомендуем! Сделали всё “под ключ”.",
  },
];

const props = withDefaults(
  defineProps<{
    useRandomAvatars?: boolean;
    avatarSize?: number;
  }>(),
  {
    useRandomAvatars: true,
    avatarSize: 120,
  },
);

const { t } = useI18n();
const style = useCssModule();

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return h >>> 0;
}

const dicebearStyles = [identicon, shapes, bottts, pixelArt, thumbs];

function avatarDataUri(seed: string, size: number) {
  const styleIndex = hashString(seed) % dicebearStyles.length;
  const style = dicebearStyles[styleIndex] as unknown as Style<any>;

  const svg = createAvatar(style, {
    seed,
    size,
  } as any).toString();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const cards = computed(() =>
  testimonials.map((t, idx) => {
    const seed = `${t.author}-${idx}`;
    const avatar = avatarDataUri(seed, props.avatarSize);
    return {
      ...t,
      imgSrc: avatar,
      alt: `Аватар пользователя ${t.author}`,
    };
  }),
);
</script>

<template>
  <section :class="style.testimonialsSection">
    <div :class="style.testimonialsContainer">
      <h2 :class="style.sectionTitle">
        {{ t("mainPage.testimonials.title") }}
      </h2>

      <div :class="style.testimonialsGrid">
        <article
          v-for="card in cards"
          :key="card.author"
          :class="style.testimonialCard"
        >
          <img
            :src="card.imgSrc"
            :alt="card.alt"
            :class="[style.avatar, style.avatarRound]"
            :width="avatarSize"
            :height="avatarSize"
          />
          <h3 :class="style.testimonialAuthor">{{ card.author }}</h3>
          <small v-if="card.role" :class="style.testimonialRole">{{
            t(card.role)
          }}</small>
          <p :class="style.testimonialText">“{{ card.text }}”</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style module>
.testimonialsSection {
  padding: 40px 0;
}

.sectionTitle {
  text-align: center;
  margin: 0 0 24px;
  font-size: 30px;
  font-weight: 600;
}

.testimonialsGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.testimonialCard {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  transform: translateZ(0);
}

.avatar {
  display: block;
  margin: 0 auto 12px;
  width: 60px;
  height: 60px;
  object-fit: cover;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);
  border-radius: 50%;
}

.testimonialAuthor {
  margin: 10px 0 2px;
  font-size: 18px;
  color: #f6c453;
  font-weight: 500;
}

.testimonialRole {
  color: #777;
}

.testimonialText {
  color: #444;
  margin-top: 8px;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .testimonialsGrid {
    grid-template-columns: 1fr;
  }
}
</style>
