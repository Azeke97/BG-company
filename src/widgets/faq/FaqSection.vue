<script setup lang="ts">
type Key = string | number;
type Model = Key | Key[];

type FaqItem = {
  id: Key;
  question: string;
  answer: string;
};

const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    items: FaqItem[];
    accordion?: boolean;
    openFirst?: boolean;
  }>(),
  {
    title: "Частые вопросы о потолках",
    subtitle:
      "Коротко о выборе, монтаже и эксплуатации натяжных и других потолков.",
    accordion: true,
    openFirst: true,
  },
);

const opened = ref<Model>(props.accordion ? "" : []);

watch(
  () => props.items,
  (list) => {
    if (!Array.isArray(list) || list.length === 0) {
      opened.value = props.accordion ? "" : [];
      return;
    }

    if (props.openFirst) {
      const firstId = list[0]!.id as Key;
      opened.value = props.accordion ? firstId : [firstId];
    } else {
      opened.value = props.accordion ? "" : [];
    }
  },
  { immediate: true },
);
</script>

<template>
  <section id="faq" :class="$style.section">
    <div :class="$style.container">
      <div :class="$style.header">
        <h2 :class="$style.title">{{ title }}</h2>
        <p v-if="subtitle" :class="$style.subtitle">{{ subtitle }}</p>
      </div>

      <div :class="$style.card">
        <el-collapse
          v-model="opened"
          :accordion="accordion"
          :class="$style.collapse"
        >
          <el-collapse-item
            v-for="(it, idx) in items"
            :key="it.id"
            :name="it.id"
            :class="$style.item"
          >
            <template #title>
              <div :class="$style.itemHeader">
                <span :class="$style.badge">{{
                  String(idx + 1).padStart(2, "0")
                }}</span>
                <span :class="$style.question">{{ it.question }}</span>
              </div>
            </template>

            <div :class="$style.answer">
              {{ it.answer }}
            </div>
          </el-collapse-item>
        </el-collapse>
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
  margin-bottom: 40px;
}
.header {
  text-align: center;
  margin-bottom: 22px;
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
.card {
  background: #fff;
  border: 1px solid #ececec;
  border-radius: 16px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.collapse :global(.el-collapse) {
  border: none;
}
.collapse :global(.el-collapse-item) {
  border-bottom: 1px solid #f0f0f0;
}
.collapse :global(.el-collapse-item:last-child) {
  border-bottom: none;
}
.collapse :global(.el-collapse-item__header) {
  padding: 18px 20px;
  height: auto;
  line-height: 1.3;
  background: #fff;
  border: none !important;
}
.collapse :global(.el-collapse-item__arrow) {
  color: #111;
  transition: transform 0.2s ease;
}
.collapse :global(.is-active .el-collapse-item__arrow) {
  transform: rotate(90deg);
}

.itemHeader {
  display: flex;
  align-items: center;
  gap: 12px;
}
.badge {
  display: inline-grid;
  place-items: center;
  min-width: 34px;
  height: 28px;
  padding: 0 8px;
  border-radius: 999px;
  background: #111;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}
.question {
  font-weight: 600;
  font-size: 18px;
}

.answer {
  padding: 25px 30px 0;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
}

.collapse :global(.is-active .el-collapse-item__header) {
  box-shadow: inset 4px 0 0 #f6c453;
  background: #fff9ea;
}

@media (max-width: 640px) {
  .answer {
    padding-left: 18px;
  }
}
</style>
