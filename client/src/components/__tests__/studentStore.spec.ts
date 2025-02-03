import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useStudentStore } from '@/stores/studentStore'
import axios from 'axios'

vi.mock('axios')

describe('studentStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('should fetch students successfully', async () => {
    const store = useStudentStore()
    const mockStudents = [
      { id: 1, name: 'John Doe', email: 'john@example.com', ra: '12345', cpf: '12345678901' },
    ]

    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockStudents })

    await store.fetchStudents()

    expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/students`)
    expect(store.students).toEqual(mockStudents)
    expect(store.error).toBeNull()
  })

  it('should handle fetchStudents error', async () => {
    const store = useStudentStore()
    const errorMessage = 'Network Error'

    vi.mocked(axios.get).mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    })

    await store.fetchStudents()

    expect(store.error).toBe(errorMessage)
    expect(store.students).toEqual([])
  })

  it('should fetch student by id successfully', async () => {
    const store = useStudentStore()
    const mockStudent = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      ra: '12345',
      cpf: '12345678901',
    }

    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockStudent })

    const result = await store.fetchStudentById(1)

    expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/students/1`)
    expect(result).toEqual(mockStudent)
    expect(store.currentStudent).toEqual(mockStudent)
  })

  it('should create student successfully', async () => {
    const store = useStudentStore()
    const newStudent = {
      name: 'John Doe',
      email: 'john@example.com',
      ra: '12345',
      cpf: '12345678901',
    }
    const createdStudent = { id: 1, ...newStudent }

    vi.mocked(axios.post).mockResolvedValueOnce({ data: createdStudent })

    const result = await store.createStudent(newStudent)

    expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_API_URL}/students`, newStudent)
    expect(result).toEqual(createdStudent)
    // Verificando se o array contém um objeto com as mesmas propriedades
    expect(store.students).toEqual(
      expect.arrayContaining([expect.objectContaining(createdStudent)]),
    )
  })

  it('should update student successfully', async () => {
    const store = useStudentStore()
    const studentId = 1
    const updateData = {
      name: 'Updated Name',
      email: 'updated@example.com',
    }

    // Add initial student to store
    store.students = [
      {
        id: studentId,
        name: 'Original Name',
        email: 'original@example.com',
        ra: '12345',
        cpf: '12345678901',
      },
    ]

    vi.mocked(axios.put).mockResolvedValueOnce({ data: {} })

    await store.updateStudent(studentId, updateData)

    expect(axios.put).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/students/${studentId}`,
      updateData,
    )
    expect(store.students[0]).toMatchObject(updateData)
  })

  it('should delete student successfully', async () => {
    const store = useStudentStore()
    const studentId = 1

    // Add student to store
    store.students = [
      {
        id: studentId,
        name: 'John Doe',
        email: 'john@example.com',
        ra: '12345',
        cpf: '12345678901',
      },
    ]

    vi.mocked(axios.delete).mockResolvedValueOnce({ status: 200 })

    const result = await store.deleteStudent(studentId)

    expect(axios.delete).toHaveBeenCalledWith(
      `${import.meta.env.VITE_API_URL}/students/${studentId}`,
    )
    expect(result).toBe(true)
    expect(store.students).toHaveLength(0)
  })

  it('should handle 404 error when deleting student', async () => {
    const store = useStudentStore()

    vi.mocked(axios.delete).mockRejectedValueOnce({
      response: { status: 404 },
    })

    await expect(store.deleteStudent(1)).rejects.toThrow('Aluno não encontrado')
  })
})
