import { describe, it, expect, vi } from 'vitest'
import { useStudentActions } from '@/composables/useStudentActions'

describe('useStudentActions', () => {
  const student = {
    id: 1,
    name: 'João',
    email: 'joao@email.com',
    ra: '123',
    cpf: '123.456.789-00',
  }

  it('emits edit event with student data', () => {
    const emit = vi.fn()
    const { onEdit } = useStudentActions(emit)

    onEdit(student)
    expect(emit).toHaveBeenCalledWith('edit', student)
  })

  it('emits delete event with student data', () => {
    const emit = vi.fn()
    const { onDelete } = useStudentActions(emit)

    onDelete(student)
    expect(emit).toHaveBeenCalledWith('delete', student)
  })
})
