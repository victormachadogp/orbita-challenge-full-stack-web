import { defineStore } from 'pinia'
import axios from 'axios'
import type { Student } from '../types/student'

const apiUrl = import.meta.env.VITE_API_URL

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [] as Student[],
    currentStudent: null as Student | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchStudents() {
      this.loading = true
      try {
        const response = await axios.get(`${apiUrl}/students`)
        this.students = response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Erro ao carregar alunos'
      } finally {
        this.loading = false
      }
    },

    async fetchStudentById(id: number) {
      this.loading = true
      try {
        const response = await axios.get(`${apiUrl}/students/${id}`)
        this.currentStudent = response.data
        return response.data
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Erro ao carregar aluno'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createStudent(student: Omit<Student, 'id'>) {
      try {
        const response = await axios.post(`${apiUrl}/students`, student)
        this.students.push(response.data)
        return response.data
      } catch (error: any) {
        throw error.response?.data || { message: 'Erro ao criar aluno' }
      }
    },

    async updateStudent(id: number, student: Partial<Student>) {
      try {
        await axios.put(`${apiUrl}/students/${id}`, student)
        const index = this.students.findIndex((s) => s.id === id)
        if (index !== -1) {
          this.students[index] = { ...this.students[index], ...student }
        }
      } catch (error: any) {
        throw error.response?.data || { message: 'Erro ao atualizar aluno' }
      }
    },

    async deleteStudent(id: number) {
      try {
        await axios.delete(`${apiUrl}/students/${id}`)
        this.students = this.students.filter((s) => s.id !== id)
      } catch (error: any) {
        throw error.response?.data || { message: 'Erro ao excluir aluno' }
      }
    },

    clearCurrentStudent() {
      this.currentStudent = null
    },
  },
})
