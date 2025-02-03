import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import StudentFormView from '@/views/StudentFormView.vue'
import { useStudentStore } from '@/stores/studentStore'
import { createRouter, createWebHistory } from 'vue-router'

// Mock vue-router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/students',
      name: 'students',
      component: {} as any,
    },
    {
      path: '/students/:id',
      name: 'student-edit',
      component: {} as any,
    },
  ],
})

// Mock route setup helper
const setupRoute = (params = {}) => {
  router.currentRoute.value.params = params
  return router
}

describe('StudentFormView', () => {
  let wrapper: any

  const mountComponent = (params = {}) => {
    return mount(StudentFormView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              student: {
                currentStudent: null,
              },
            },
          }),
          setupRoute(params),
        ],
        stubs: {
          'v-container': true,
          'v-row': true,
          'v-col': true,
          'v-card': true,
          'v-card-text': true,
          'v-form': true,
          'v-text-field': true,
          'v-card-actions': true,
          'v-spacer': true,
          'v-btn': true,
          'v-snackbar': true,
        },
        // Don't stub v-card-title so we can check its content
        mocks: {
          $route: {
            params: params,
          },
        },
      },
    })
  }

  beforeEach(() => {
    vi.clearAllMocks()
    wrapper = mountComponent()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Form Validation', () => {
    it('validates required name field', async () => {
      const rules = wrapper.vm.validation.nameRules
      expect(rules[0]('')).toBe('Nome é obrigatório')
      expect(rules[1]('ab')).toBe('Nome deve ter no mínimo 3 caracteres')
      expect(rules[1]('abc')).toBe(true)
    })

    it('validates email format', async () => {
      const rules = wrapper.vm.validation.emailRules
      expect(rules[0]('')).toBe('Email é obrigatório')
      expect(rules[1]('invalid-email')).toBe('Email deve ser válido')
      expect(rules[1]('test@example.com')).toBe(true)
    })

    it('validates RA format', async () => {
      const rules = wrapper.vm.validation.raRules
      expect(rules[0]('')).toBe('RA é obrigatório')
      expect(rules[1]('abc123')).toBe('RA deve conter apenas números')
      expect(rules[1]('123456')).toBe(true)
    })

    it('validates CPF format', async () => {
      const rules = wrapper.vm.validation.cpfRules
      expect(rules[0]('')).toBe('CPF é obrigatório')
      expect(rules[1]('invalid-cpf')).toBe('CPF inválido')
      expect(rules[1]('123.456.789-00')).toBe(true)
    })
  })

  describe('Form Submission', () => {
    it('calls createStudent when submitting in create mode', async () => {
      const store = useStudentStore()
      const formData = {
        name: 'Test Student',
        email: 'test@example.com',
        ra: '123456',
        cpf: '123.456.789-00',
      }

      wrapper.vm.formData = formData
      wrapper.vm.isValid = true
      wrapper.vm.form = { validate: () => true }

      await wrapper.vm.handleSubmit()

      expect(store.createStudent).toHaveBeenCalledWith({
        ...formData,
        cpf: '12345678900',
      })
    })

    it('calls updateStudent when submitting in edit mode', async () => {
      wrapper = mountComponent({ id: '1' })
      const store = useStudentStore()
      const formData = {
        name: 'Updated Student',
        email: 'updated@example.com',
        ra: '123456',
        cpf: '123.456.789-00',
      }

      wrapper.vm.formData = formData
      wrapper.vm.isValid = true
      wrapper.vm.form = { validate: () => true }

      await wrapper.vm.handleSubmit()

      expect(store.updateStudent).toHaveBeenCalledWith(1, {
        name: formData.name,
        email: formData.email,
      })
    })

    it('shows error message when submission fails', async () => {
      const store = useStudentStore()
      vi.spyOn(store, 'createStudent').mockRejectedValue(new Error('Test error'))

      wrapper.vm.formData = {
        name: 'Test Student',
        email: 'test@example.com',
        ra: '123456',
        cpf: '123.456.789-00',
      }
      wrapper.vm.isValid = true
      wrapper.vm.form = { validate: () => true }

      await wrapper.vm.handleSubmit()

      expect(wrapper.vm.snackbar.show).toBe(true)
      expect(wrapper.vm.snackbar.color).toBe('error')
      expect(wrapper.vm.snackbar.text).toBe('Test error')
    })
  })

  describe('Navigation', () => {
    it('navigates back to students list on cancel', async () => {
      const routerPush = vi.spyOn(router, 'push')
      await wrapper.vm.handleCancel()
      expect(routerPush).toHaveBeenCalledWith('/students')
    })

    it('navigates back to students list after successful submission', async () => {
      const routerPush = vi.spyOn(router, 'push')
      wrapper.vm.formData = {
        name: 'Test Student',
        email: 'test@example.com',
        ra: '123456',
        cpf: '123.456.789-00',
      }
      wrapper.vm.isValid = true
      wrapper.vm.form = { validate: () => true }

      await wrapper.vm.handleSubmit()
      expect(routerPush).toHaveBeenCalledWith('/students')
    })
  })

  describe('Loading States', () => {
    it('shows loading state during form submission', async () => {
      wrapper.vm.formData = {
        name: 'Test Student',
        email: 'test@example.com',
        ra: '123456',
        cpf: '123.456.789-00',
      }
      wrapper.vm.isValid = true
      wrapper.vm.form = { validate: () => true }

      const submitPromise = wrapper.vm.handleSubmit()
      expect(wrapper.vm.loading).toBe(true)
      await submitPromise
      expect(wrapper.vm.loading).toBe(false)
    })
  })

  describe('CPF Handling', () => {
    it('formats CPF input correctly', async () => {
      const event = {
        target: {
          value: '12345678900',
        },
      }

      wrapper.vm.handleCPFInput(event)
      expect(wrapper.vm.formData.cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    })
  })
})
