<template>
  <div>
    <v-data-table :headers="headers" :items="students" :loading="loading" :items-per-page="5" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <StudentListItem :student="item" @edit="handleEdit" @delete="handleDelete" />
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStudentStore } from '../stores/studentStore'
import StudentListItem from './StudentListItem.vue'
import type { Student } from '../types/student'

const router = useRouter()
const studentStore = useStudentStore()

const loading = computed(() => studentStore.loading)
const students = computed(() => studentStore.students)

const headers = [
  { title: 'Nome', align: 'start', key: 'name' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'RA', align: 'start', key: 'ra' },
  { title: 'CPF', align: 'start', key: 'cpf' },
  { title: 'Ações', align: 'end', key: 'actions', sortable: false }
]

const handleEdit = (student: Student) => {
  router.push(`/student-form/${student.id}`)
}

const handleDelete = (student: Student) => {
  emit('delete-student', student)
}

const emit = defineEmits<{
  (e: 'delete-student', student: Student): void
}>()
</script>
