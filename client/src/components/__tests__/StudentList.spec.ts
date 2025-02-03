import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import StudentList from '../StudentList.vue'
import { createTestingPinia } from '@pinia/testing'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

describe('StudentList', () => {
  const createWrapper = () => {
    return mount(StudentList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              student: {
                loading: false,
                students: [
                  {
                    id: 1,
                    name: 'João',
                    email: 'joao@email.com',
                    ra: '123',
                    cpf: '123.456.789-00',
                  },
                ],
              },
            },
          }),
        ],
        stubs: {
          'v-data-table': true,
          StudentListItem: true,
        },
      },
    })
  }

  it('renders properly', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
  })
})
