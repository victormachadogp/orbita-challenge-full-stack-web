<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            Consulta de Alunos
            <v-spacer />
            <v-btn color="primary" prepend-icon="mdi-plus" @click="navigateToCreate">
              Cadastrar Aluno
            </v-btn>
          </v-card-title>

          <v-card-text>
            <StudentList @delete-student="handleDeleteRequest" />
          </v-card-text>
        </v-card>

        <DeleteConfirmationDialog v-model="dialog.show" :loading="dialog.loading" @confirm="handleDeleteConfirm" />

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
import StudentList from '../components/StudentList.vue'
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog.vue'
import { useStudentListView } from '@/composables/useStudentListView'

const {
  dialog,
  snackbar,
  navigateToCreate,
  handleDeleteRequest,
  handleDeleteConfirm
} = useStudentListView()
</script>
