// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default withNuxt(
  prettierConfig,
  {
    files: ['**/*.ts', '**/*.vue'],
    plugins: {
      prettier
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/multi-word-component-names': 'off',
      'func-call-spacing': 'off', // Fix for 'defineEmits'
      "vue/no-v-html": "off",
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      'prettier/prettier': 'error',
      'object-curly-newline': ['error', { multiline: true, consistent: true }],
      'object-property-newline': ['error', { allowMultiplePropertiesPerLine: false }],
    }
  },
)
