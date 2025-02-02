<template>
  <div class="d-flex justify-end">
    <v-btn icon variant="text" color="primary" @click="onEdit(student)">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn icon variant="text" color="error" @click="onDelete(student)">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import type { Student } from '@/types/student'
import { useStudentActions } from '@/composables/useStudentActions'

const props = defineProps<{
  student: Student
}>()

const emit = defineEmits<{
  (e: 'edit', student: Student): void
  (e: 'delete', student: Student): void
}>()

const { onEdit, onDelete } = useStudentActions(emit)
</script>
