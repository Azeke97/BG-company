<script setup lang="ts">
import { UiContainer } from "~/shared/ui";
import { MainPage } from "~/widgets/main-page";

const title = "Ремонт, потолки и мебель в Астане — BG Company";
const description =
  "Ремонт квартир и домов под ключ, натяжные потолки, изготовление корпусной и мягкой мебели. Гарантия, фиксированная смета, дизайн-проект.";

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  // ogImage: absolute URL к превью (загрузи в /public/og.jpg)
  ogImage: "https://bg-company.kz/og.jpg",
  twitterImage: "https://bg-company.kz/og.jpg",
});
</script>

<template>
  <div :class="$style.mainPage">
    <UiContainer>
      <MainPage />
    </UiContainer>
  </div>
</template>

<style module>
.mainPage {
  background-color: #ffffff;
  background-image: url("~/widgets/main-page/assets/images/light-grey-terrazzo.webp");
  background-repeat: repeat;
  background-position: center;
  background-size: 400px 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
