import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useStudentForm } from '@/composables/useStudentForm'
import { useStudentStore } from '@/stores/studentStore'
import { createPinia, setActivePinia } from 'pinia'

// Mock do router com implementação do push
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: {},
  }),
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('useStudentForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should initialize with default values', () => {
    const form = useStudentForm()

    expect(form.formData.value).toEqual({
      name: '',
      email: '',
      ra: '',
      cpf: '',
    })
    expect(form.isValid.value).toBe(false)
    expect(form.loading.value).toBe(false)
    expect(form.snackbar.value).toEqual({
      show: false,
      text: '',
      color: 'success',
    })
  })

  it('should validate name field correctly', () => {
    const { validation } = useStudentForm()

    // Required validation
    expect(validation.nameRules[0]('')).toBe('Nome é obrigatório')
    expect(validation.nameRules[0]('John')).toBe(true)

    // Minimum length validation
    expect(validation.nameRules[1]('Jo')).toBe('Nome deve ter no mínimo 3 caracteres')
    expect(validation.nameRules[1]('John')).toBe(true)
  })

  it('should validate email field correctly', () => {
    const { validation } = useStudentForm()

    // Required validation
    expect(validation.emailRules[0]('')).toBe('Email é obrigatório')
    expect(validation.emailRules[0]('test@example.com')).toBe(true)

    // Email format validation
    expect(validation.emailRules[1]('invalid-email')).toBe('Email deve ser válido')
    expect(validation.emailRules[1]('test@example.com')).toBe(true)
  })

  it('should format CPF correctly on input', () => {
    const { handleCPFInput, formData } = useStudentForm()

    const event = {
      target: { value: '12345678901' },
    } as unknown as Event

    handleCPFInput(event)
    expect(formData.value.cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
  })

  it('should handle form submission for new student', async () => {
    const form = useStudentForm()
    const studentStore = useStudentStore()

    // Mock form validation
    form.form.value = { validate: () => true }
    form.formData.value = {
      name: 'John Doe',
      email: 'john@example.com',
      ra: '12345',
      cpf: '123.456.789-01',
    }

    // Mock store action
    vi.spyOn(studentStore, 'createStudent').mockResolvedValueOnce({
      id: 1,
      ...form.formData.value,
    })

    await form.handleSubmit()

    expect(studentStore.createStudent).toHaveBeenCalledWith({
      ...form.formData.value,
      cpf: '12345678901', // Clean CPF format
    })
    expect(mockPush).toHaveBeenCalledWith('/students')
    expect(form.snackbar.value.text).toBe('Aluno criado com sucesso!')
  })

  it('should handle form submission errors', async () => {
    const form = useStudentForm()
    const studentStore = useStudentStore()

    // Mock form validation
    form.form.value = { validate: () => true }

    // Mock store action to throw error
    vi.spyOn(studentStore, 'createStudent').mockRejectedValueOnce(new Error('API Error'))

    await form.handleSubmit()

    expect(form.snackbar.value.text).toBe('API Error')
    expect(form.snackbar.value.color).toBe('error')
  })

  it('should handle cancel button click', () => {
    const form = useStudentForm()

    form.handleCancel()

    expect(mockPush).toHaveBeenCalledWith('/students')
  })
})
