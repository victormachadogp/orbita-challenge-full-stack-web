import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/studentStore'
import type { Student } from '@/types/student'
import { StudentService } from '@/services/student.service'

export function useStudentForm() {
  const route = useRoute()
  const router = useRouter()
  const studentStore = useStudentStore()

  const form = ref()
  const isValid = ref(false)
  const loading = ref(false)

  const formData = ref<Partial<Student>>({
    name: '',
    email: '',
    ra: '',
    cpf: '',
  })

  const snackbar = ref({
    show: false,
    text: '',
    color: 'success',
  })

  const isEditing = computed(() => !!route.params.id)

  const validation = {
    nameRules: [
      (v: string) => !!v || 'Nome é obrigatório',
      (v: string) => v.length >= 3 || 'Nome deve ter no mínimo 3 caracteres',
    ],
    emailRules: [
      (v: string) => !!v || 'Email é obrigatório',
      (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido',
    ],
    raRules: [
      (v: string) => !!v || 'RA é obrigatório',
      (v: string) => /^\d+$/.test(v) || 'RA deve conter apenas números',
    ],
    cpfRules: [
      (v: string) => !!v || 'CPF é obrigatório',
      (v: string) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v) || 'CPF inválido',
    ],
  }

  const showMessage = (text: string, color: 'success' | 'error' = 'success') => {
    snackbar.value = {
      show: true,
      text,
      color,
    }
  }

  const handleCPFInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    formData.value.cpf = StudentService.formatCPF(input.value)
  }

  const loadStudent = async () => {
    if (isEditing.value && route.params.id) {
      loading.value = true
      try {
        const student = await studentStore.fetchStudentById(Number(route.params.id))
        formData.value = { ...student }
      } catch (error: any) {
        showMessage(error.message || 'Erro ao carregar dados do aluno', 'error')
        router.push('/students')
      } finally {
        loading.value = false
      }
    }
  }

  const handleSubmit = async () => {
    if (!form.value?.validate()) return

    loading.value = true
    try {
      const studentData = {
        ...formData.value,
        cpf: StudentService.cleanCPF(formData.value.cpf || ''),
      }

      if (isEditing.value) {
        const updateData = {
          name: studentData.name,
          email: studentData.email,
        }
        await studentStore.updateStudent(Number(route.params.id), updateData)
        showMessage('Aluno atualizado com sucesso!')
      } else {
        await studentStore.createStudent(studentData as Omit<Student, 'id'>)
        showMessage('Aluno criado com sucesso!')
      }
      router.push('/students')
    } catch (error: any) {
      showMessage(error.message || 'Erro ao salvar aluno', 'error')
    } finally {
      loading.value = false
    }
  }

  const handleCancel = () => {
    router.push('/students')
  }

  return {
    form,
    formData,
    isValid,
    loading,
    snackbar,
    isEditing,
    validation,
    handleSubmit,
    handleCancel,
    handleCPFInput,
    loadStudent,
  }
}
