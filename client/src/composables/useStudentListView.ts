import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/studentStore'
import { useDialog } from './useDialog'
import { useSnackbar } from './useSnackbar'
import type { Student } from '@/types/student'

export function useStudentListView() {
  const router = useRouter()
  const studentStore = useStudentStore()
  const { dialog, showDialog, hideDialog, setLoading } = useDialog()
  const { snackbar, showError, showSuccess } = useSnackbar()

  const loadStudents = async () => {
    try {
      await studentStore.fetchStudents()
    } catch (error: any) {
      showError(error.message || 'Erro ao carregar alunos')
    }
  }

  const navigateToCreate = () => {
    router.push('/student-form')
  }

  const handleDeleteRequest = (student: Student) => {
    showDialog(student.id)
  }

  const handleDeleteConfirm = async () => {
    if (!dialog.value.data) return

    setLoading(true)
    try {
      const deleted = await studentStore.deleteStudent(dialog.value.data)
      if (deleted) {
        showSuccess('Aluno excluído com sucesso!')
        hideDialog()
      }
    } catch (error: any) {
      showError(error.message || 'Erro ao excluir aluno')
    } finally {
      setLoading(false)
    }
  }

  onMounted(loadStudents)

  return {
    dialog,
    snackbar,
    navigateToCreate,
    handleDeleteRequest,
    handleDeleteConfirm,
    hideDialog,
  }
}
