<script setup lang="ts">
import chairsImg from "../assets/images/soft.jpg";

type Feature = { title: string; desc: string };

const style = useCssModule();
const { t, tm } = useI18n();

const title = computed(() => t("furniture.whyChoose.title"));
const features = computed<Feature[]>(() => {
  const arr = tm("furniture.whyChoose.items") as unknown;
  return Array.isArray(arr) ? (arr as Feature[]) : [];
});

const fmt = (i: number) => (i + 1).toString().padStart(2, "0");

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
    { threshold: 0.22 },
  );
  io.observe(root.value);
});
onBeforeUnmount(() => io?.disconnect());

const mediaRef = ref<HTMLElement | null>(null);
const handleMove = (e: MouseEvent) => {
  const el = mediaRef.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = (e.clientX - cx) / rect.width;
  const dy = (e.clientY - cy) / rect.height;
  const img = el.querySelector("img") as HTMLImageElement | null;
  if (img)
    img.style.transform = `scale(1.06) translate(${dx * 8}px, ${dy * 8}px)`;
};
const resetMove = () => {
  const el = mediaRef.value;
  const img = el?.querySelector("img") as HTMLImageElement | null;
  if (img) img.style.transform = "";
};

onMounted(() => {
  const el = mediaRef.value;
  if (!el) return;
  el.addEventListener("mousemove", handleMove);
  el.addEventListener("mouseleave", resetMove);
});
onBeforeUnmount(() => {
  const el = mediaRef.value;
  if (!el) return;
  el.removeEventListener("mousemove", handleMove);
  el.removeEventListener("mouseleave", resetMove);
});

const onImgError = (e: Event) => {
  const el = e.target as HTMLElement | null;
  el?.closest("." + style.media)?.classList.add("noimg");
};
</script>

<template>
  <section ref="root" :class="[style.section, inView && style.in]">
    <div :class="style.container">
      <h2 :class="style.title">{{ title }}</h2>
      <div :class="style.wrap">
        <div :class="style.colText">
          <ul :class="style.list">
            <li
              v-for="(f, i) in features"
              :key="i"
              :class="style.item"
              :style="{ '--i': i }"
            >
              <div :class="style.badge" aria-hidden="true">
                <span>{{ fmt(i) }}</span>
              </div>

              <div :class="style.itemBody">
                <div :class="style.itemTitle">{{ f.title }}</div>
                <div :class="style.itemDesc">{{ f.desc }}</div>
              </div>
            </li>
          </ul>
        </div>

        <div :class="style.colMedia">
          <div ref="mediaRef" :class="style.media">
            <img :src="chairsImg" alt="" loading="lazy" @error="onImgError" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style module>
.section {
  padding: 48px 0 64px;
  margin-bottom: 40px;
  background:
    radial-gradient(
      1200px 1200px at 0% -200px,
      rgba(246, 196, 83, 0.08),
      transparent 60%
    ),
    linear-gradient(180deg, #f7f7f7 0%, #f3f3f3 100%);
}
.container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 16px;
}
.wrap {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 28px;
  align-items: center;
}
.colText {
  padding: 8px 0;
}

.title {
  font-size: 30px;
  line-height: 1.2;
  margin: 0 0 20px;
  font-weight: 600;
  color: #222;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  position: relative;
  text-align: center;
}
.title::after {
  content: "";
  position: absolute;
  left: 43%;
  bottom: -10px;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #f6c453, #ffd97a);
  border-radius: 2px;
  transition: width 0.8s cubic-bezier(0.2, 0.8, 0.25, 1);
}
.in .title::after {
  width: 180px;
}

.list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 12px;
}
.item {
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 12px;
  align-items: start;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 14px;
  padding: 14px 14px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  opacity: 0;
  transform: translateY(14px);
  transition:
    transform 0.5s cubic-bezier(0.2, 0.8, 0.25, 1),
    opacity 0.5s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  transition-delay: calc(var(--i) * 90ms);
}
.in .item {
  opacity: 1;
  transform: translateY(0);
}
.item:hover {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  border-color: rgba(246, 196, 83, 0.45);
}

.badge {
  position: relative;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: radial-gradient(
    120% 120% at 20% 20%,
    #fff7e5 0%,
    #ffe7a8 40%,
    #ffd97a 100%
  );
  color: #3a300d;
  box-shadow:
    0 6px 16px rgba(246, 196, 83, 0.25),
    inset 0 0 0 1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transform: translateZ(0);
}
.badge::after {
  content: "";
  position: absolute;
  inset: -40%;
  background: conic-gradient(
    from 0deg,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0.7) 80%,
    rgba(255, 255, 255, 0)
  );
  opacity: 0;
  filter: blur(10px);
  transition: opacity 0.3s ease;
}
.item:hover .badge::after {
  opacity: 0.6;
}
.badge span {
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.12em;
}

.itemTitle {
  font-weight: 700;
  color: #1f1f1f;
  margin: -2px 0 4px;
  font-size: 16px;
}
.itemDesc {
  color: #575757;
  font-size: 14px;
  line-height: 1.55;
}

.media {
  position: relative;
  height: clamp(220px, 28vw, 300px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
  transform: translateX(14px);
  opacity: 0;
  transition:
    transform 0.6s cubic-bezier(0.2, 0.8, 0.25, 1) 0.1s,
    opacity 0.6s ease 0.1s;
}
.in .media {
  transform: none;
  opacity: 1;
}
.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  animation: kenburns 8s ease-in-out infinite alternate;
}
@keyframes kenburns {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.12);
  }
}
.media::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    rgba(255, 255, 255, 0) 20%,
    rgba(255, 255, 255, 0.4) 50%,
    rgba(255, 255, 255, 0) 80%
  );
  transform: translateX(-120%);
  opacity: 0;
  animation: shine 4s ease-in-out infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-120%);
    opacity: 0;
  }
  30% {
    opacity: 0.8;
  }
  60% {
    opacity: 0.8;
  }
  100% {
    transform: translateX(120%);
    opacity: 0;
  }
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
  inset: auto 16px 14px 16px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

@media (max-width: 980px) {
  .wrap {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .media {
    height: clamp(220px, 52vw, 340px);
  }
}
</style>
