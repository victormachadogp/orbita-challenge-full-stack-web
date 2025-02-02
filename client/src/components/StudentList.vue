<template>
  <div>
    <v-data-table :headers="headers" :items="students" :loading="loading" :items-per-page="5" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <StudentListItem :student="item" @edit="handleEdit" @delete="$emit('delete-student', item)" />
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import { useStudentList } from '@/composables/useStudentList'
import StudentListItem from './StudentListItem.vue'
import type { Student } from '../types/student'

const {
  loading,
  students,
  headers,
  handleEdit
} = useStudentList()

defineEmits<{
  (e: 'delete-student', student: Student): void
}>()
</script>
