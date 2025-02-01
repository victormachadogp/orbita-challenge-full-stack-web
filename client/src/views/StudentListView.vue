<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            Consulta de Alunos
            <v-spacer />
            <v-btn color="primary" prepend-icon="mdi-plus" @click="router.push('/student-form')">
              Cadastrar Aluno
            </v-btn>
          </v-card-title>

          <v-card-text>
            <StudentList @delete-student="showDeleteDialog" />
          </v-card-text>
        </v-card>

        <!-- Delete Confirmation Dialog -->
        <v-dialog v-model="deleteDialog.show" max-width="500px">
          <v-card>
            <v-card-title>Confirmar Exclusão</v-card-title>
            <v-card-text>
              Tem certeza que deseja excluir este aluno? Esta ação não pode ser desfeita.
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="error" variant="text" @click="deleteDialog.show = false">
                Cancelar
              </v-btn>
              <v-btn color="primary" variant="text" :loading="deleteDialog.loading" @click="confirmDelete">
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Snackbar for messages -->
        <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
          {{ snackbar.text }}
          <template v-slot:actions>
            <v-btn variant="text" @click="snackbar.show = false">
              Fechar
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/studentStore'
import StudentList from '@/components/StudentList.vue'
import type { Student } from '@/types/student'

const router = useRouter()
const studentStore = useStudentStore()

const deleteDialog = ref({
  show: false,
  loading: false,
  studentId: null as number | null
})

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

onMounted(async () => {
  try {
    await studentStore.fetchStudents()
  } catch (error: any) {
    showError(error.message || 'Erro ao carregar alunos')
  }
})

const showError = (message: string) => {
  snackbar.value = {
    show: true,
    text: message,
    color: 'error'
  }
}

const showSuccess = (message: string) => {
  snackbar.value = {
    show: true,
    text: message,
    color: 'success'
  }
}

const showDeleteDialog = (student: Student) => {
  deleteDialog.value.studentId = student.id ?? null
  deleteDialog.value.show = true
}

const confirmDelete = async () => {
  if (!deleteDialog.value.studentId) return;

  deleteDialog.value.loading = true;
  try {
    const deleted = await studentStore.deleteStudent(deleteDialog.value.studentId);
    if (deleted) {
      showSuccess('Aluno excluído com sucesso!');
      deleteDialog.value.show = false;
    }
  } catch (error: any) {
    showError(error.message || 'Erro ao excluir aluno');
  } finally {
    deleteDialog.value.loading = false;
    deleteDialog.value.studentId = null;
  }
}
</script>
