import type { Student } from '@/types/student'

export interface StudentActionsEmits {
  (e: 'edit', student: Student): void
  (e: 'delete', student: Student): void
}

export function useStudentActions(emit: StudentActionsEmits) {
  const onEdit = (student: Student) => {
    emit('edit', student)
  }

  const onDelete = (student: Student) => {
    emit('delete', student)
  }

  return {
    onEdit,
    onDelete,
  }
}
