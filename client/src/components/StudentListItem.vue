<template>
  <div class="d-flex justify-end">
    <v-btn icon variant="text" color="primary" @click="$emit('edit', student)">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn icon variant="text" color="error" @click="$emit('delete', student)">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import type { Student } from '@/types/student'

defineProps<{
  student: Student
}>()

defineEmits<{
  (e: 'edit', student: Student): void
  (e: 'delete', student: Student): void
}>()
</script>
