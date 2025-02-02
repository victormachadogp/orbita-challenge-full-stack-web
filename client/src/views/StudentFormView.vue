<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            {{ isEditing ? 'Editar Aluno' : 'Cadastrar Aluno' }}
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="isValid" @submit.prevent="handleSubmit">
              <v-text-field v-model="formData.name" :rules="validation.nameRules" label="Nome" required
                variant="outlined" density="comfortable" />

              <v-text-field v-model="formData.email" :rules="validation.emailRules" label="Email" required
                variant="outlined" density="comfortable" />

              <v-text-field v-model="formData.ra" :rules="validation.raRules" label="RA" required :readonly="isEditing"
                variant="outlined" density="comfortable" />

              <v-text-field v-model="formData.cpf" :rules="validation.cpfRules" label="CPF" required
                :readonly="isEditing" variant="outlined" density="comfortable" v-maska="'###.###.###-##'"
                @input="handleCPFInput" />

              <v-card-actions>
                <v-spacer />
                <v-btn color="error" variant="text" @click="handleCancel">
                  Cancelar
                </v-btn>
                <v-btn color="primary" :loading="loading" :disabled="!isValid" @click="handleSubmit">
                  {{ isEditing ? 'Atualizar' : 'Salvar' }}
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>

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
import { onMounted, onUnmounted } from 'vue'
import { useStudentStore } from '@/stores/studentStore'
import { useStudentForm } from '@/composables/useStudentForm'
import { vMaska } from "maska/vue"

const studentStore = useStudentStore()
const {
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
  loadStudent
} = useStudentForm()

onMounted(loadStudent)
onUnmounted(() => {
  studentStore.clearCurrentStudent()
})
</script>
