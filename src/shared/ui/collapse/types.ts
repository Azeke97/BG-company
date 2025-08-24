import type { ExtractPropTypes } from 'vue'
import type { collapseProps, collapseItemProps, CollapseModelValue } from 'element-plus'

export type UiCollapseProps = Partial<ExtractPropTypes<typeof collapseProps>>
export type UiCollapseItemProps = Partial<ExtractPropTypes<typeof collapseItemProps>>

export type UiCollapseEvents = {
  (e: 'update:modelValue', val: CollapseModelValue): void
}

// export type { CollapseModelValue } from 'element-plus'
