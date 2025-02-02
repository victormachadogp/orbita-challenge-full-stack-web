import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/studentStore'
import type { Student } from '@/types/student'

export interface StudentTableHeader {
  title: string
  align: 'start' | 'end' | 'center'
  key: string
  sortable?: boolean
}

export function useStudentList() {
  const router = useRouter()
  const studentStore = useStudentStore()

  const loading = computed(() => studentStore.loading)
  const students = computed(() => studentStore.students)

  const headers: StudentTableHeader[] = [
    { title: 'Nome', align: 'start', key: 'name' },
    { title: 'Email', align: 'start', key: 'email' },
    { title: 'RA', align: 'start', key: 'ra' },
    { title: 'CPF', align: 'start', key: 'cpf' },
    { title: 'Ações', align: 'end', key: 'actions', sortable: false },
  ]

  const handleEdit = (student: Student) => {
    router.push(`/student-form/${student.id}`)
  }

  return {
    loading,
    students,
    headers,
    handleEdit,
  }
}
