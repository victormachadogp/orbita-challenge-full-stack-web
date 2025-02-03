import { describe, it, expect, vi } from 'vitest'
import { useStudentList } from '@/composables/useStudentList'
import { useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/studentStore'
import { reactive } from 'vue'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}))

vi.mock('@/stores/studentStore', () => ({
  useStudentStore: vi.fn(),
}))

describe('useStudentList', () => {
  it('should return correct default values', () => {
    const mockRouter = { push: vi.fn() }
    useRouter.mockReturnValue(mockRouter)

    const mockStore = reactive({
      loading: false,
      students: [
        { id: 1, name: 'John Doe', email: 'john@example.com', ra: '123456', cpf: '111.222.333-44' },
      ],
    })
    useStudentStore.mockReturnValue(mockStore)

    const { loading, students, headers, handleEdit } = useStudentList()

    expect(loading.value).toBe(false)
    expect(students.value).toEqual(mockStore.students)
    expect(headers).toHaveLength(5)
    expect(headers.map((h) => h.key)).toEqual(['name', 'email', 'ra', 'cpf', 'actions'])
  })

  it('should navigate to student edit page when handleEdit is called', () => {
    const mockRouter = { push: vi.fn() }
    useRouter.mockReturnValue(mockRouter)
    useStudentStore.mockReturnValue(reactive({ loading: false, students: [] }))

    const { handleEdit } = useStudentList()
    const student = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      ra: '123456',
      cpf: '111.222.333-44',
    }

    handleEdit(student)
    expect(mockRouter.push).toHaveBeenCalledWith('/student-form/1')
  })
})
