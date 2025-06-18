<template>
  <fieldset class="flex flex-col gap-2">
    <label :for="id" class="text-sm font-semibold">{{ label }}</label>
    <!-- class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" -->
    <input
      v-bind="$attrs"
      :disabled="typeof $attrs['disabled'] !== 'undefined'"
      :class="
        input({
          intent,
          size,
          disabled: typeof $attrs['disabled'] !== 'undefined',
        })
      "
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    />
  </fieldset>
</template>

<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'

const input = cva('button', {
  variants: {
    intent: {
      primary:
        'border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent',
    },
    size: {
      small: 'px-2 py-1 rounded text-xs',
      medium: 'px-4 py-2 rounded text-sm',
      large: 'px-6 py-3 rounded text-md',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: 'cursor-pointer',
    },
  },
})

type InputProps = VariantProps<typeof input>

withDefaults(
  defineProps<{
    id?: string
    label: string
    modelValue: string
    intent?: InputProps['intent']
    size?: InputProps['size']
  }>(),
  {
    intent: 'primary',
    size: 'medium',
    disabled: false,
  },
)

defineEmits(['update:modelValue'])
</script>
