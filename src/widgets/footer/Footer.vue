<script setup lang="ts">
import Logo from "~/shared/assets/icons/logo.svg";

const { t } = useI18n();
const year = new Date().getFullYear();
</script>

<template>
  <footer :class="$style.wrap">
    <div :class="$style.container">
      <div :class="$style.row">
        <div :class="$style.col">
          <div :class="$style.brand">
            <Logo
              width="40"
              height="40"
              :class="$style.icon"
              aria-hidden="true"
            />
            <span>{{ t("header.brand") }}</span>
          </div>
          <small :class="$style.copy"
            >© {{ year }} · {{ t("footer.rights") }}</small
          >
        </div>

        <div :class="$style.col">
          <div :class="$style.title">{{ t("footer.contacts") }}</div>
          <a :class="$style.link" href="tel:+77718969634" aria-label="Phone">
            +7 771 896-96-34
          </a>
          <a
            :class="$style.link"
            href="mailto:v.kim.project@gmail.com"
            aria-label="Email"
          >
            v.kim.project@gmail.com
          </a>
          <address :class="$style.address">
            {{ t("footer.address") }}
          </address>
        </div>

        <div :class="$style.col">
          <div :class="$style.title">{{ t("footer.madeByTitle") }}</div>
          <a :class="$style.link" target="_blank" rel="noopener">
            {{ t("footer.madeByName") }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style module>
.wrap {
  margin-top: 0;
  background: linear-gradient(170deg, #141414 0%, #222 60%, #f6c453 120%);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #f3f3f3;
}
.container {
  margin: 0 auto;
  width: 100%;
  max-width: 1430px;
  padding: 24px 16px;
}
.row {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 20px;
  align-items: start;
}
@media (max-width: 900px) {
  .row {
    grid-template-columns: 1fr;
  }
}

.col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.brand {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
}
.icon {
  width: 18px;
  height: 18px;
  color: #f6c453;
}

.title {
  font-weight: 700;
  opacity: 0.95;
}
.copy {
  color: #bbb;
}

.link {
  color: #f3f3f3;
  text-decoration: none;
  opacity: 0.92;
  border-radius: 8px;
  padding: 4px 0;
}
.address {
  color: #f3f3f3;
  text-decoration: none;
  opacity: 0.92;
  border-radius: 8px;
  padding: 4px 0;
}
.link:hover {
  opacity: 1;
  text-decoration: underline;
}

.muted {
  color: #bbb;
  font-size: 13px;
  opacity: 0.9;
}

@media screen and (max-width: 768px) {
  .row {
    align-items: center;
    text-align: center;
  }

  .brand {
    justify-content: center;
  }
}
</style>
