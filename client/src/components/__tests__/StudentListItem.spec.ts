import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StudentListItem from '../StudentListItem.vue'

describe('StudentListItem', () => {
  const student = {
    id: 1,
    name: 'João',
    email: 'joao@email.com',
    ra: '123',
    cpf: '123.456.789-00',
  }

  const createWrapper = () => {
    return mount(StudentListItem, {
      props: {
        student,
      },
      global: {
        stubs: {
          'v-btn': true,
          'v-icon': true,
        },
      },
    })
  }

  it('emits edit event when edit button is clicked', async () => {
    const wrapper = createWrapper()
    await wrapper.findAll('v-btn-stub')[0].trigger('click')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')?.[0]).toEqual([student])
  })

  it('emits delete event when delete button is clicked', async () => {
    const wrapper = createWrapper()
    await wrapper.findAll('v-btn-stub')[1].trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')?.[0]).toEqual([student])
  })
})
