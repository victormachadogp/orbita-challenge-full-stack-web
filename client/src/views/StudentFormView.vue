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
              <v-text-field v-model="formData.name" :rules="nameRules" label="Nome" required variant="outlined"
                density="comfortable" />

              <v-text-field v-model="formData.email" :rules="emailRules" label="Email" required variant="outlined"
                density="comfortable" />

              <v-text-field v-model="formData.ra" :rules="raRules" label="RA" required :readonly="isEditing"
                variant="outlined" density="comfortable" />

              <v-text-field v-model="formData.cpf" :rules="cpfRules" label="CPF" required :readonly="isEditing"
                variant="outlined" density="comfortable" v-maska="'###.###.###-##'" @input="handleCPFInput" />

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

        <!-- Snackbar para mensagens -->
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStudentStore } from '@/stores/studentStore'
import type { Student } from '@/types/student'
import { vMaska } from "maska/vue"


const route = useRoute()
const router = useRouter()
const studentStore = useStudentStore()

const form = ref()
const isValid = ref(false)
const loading = ref(false)

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

const formData = ref<Partial<Student>>({
  name: '',
  email: '',
  ra: '',
  cpf: ''
})

const isEditing = computed(() => !!route.params.id)

// Regras de validação
const nameRules = [
  (v: string) => !!v || 'Nome é obrigatório',
  (v: string) => v.length >= 3 || 'Nome deve ter no mínimo 3 caracteres'
]

const emailRules = [
  (v: string) => !!v || 'Email é obrigatório',
  (v: string) => /.+@.+\..+/.test(v) || 'Email deve ser válido'
]

const raRules = [
  (v: string) => !!v || 'RA é obrigatório',
  (v: string) => /^\d+$/.test(v) || 'RA deve conter apenas números'
]

const cpfRules = [
  (v: string) => !!v || 'CPF é obrigatório',
  (v: string) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(v) || 'CPF inválido'
]

// Carrega dados do aluno se estiver editando
onMounted(async () => {
  if (isEditing.value && route.params.id) {
    loading.value = true
    try {
      const student = await studentStore.fetchStudentById(Number(route.params.id))
      formData.value = { ...student }
    } catch (error: any) {
      snackbar.value = {
        show: true,
        text: error.message || 'Erro ao carregar dados do aluno',
        color: 'error'
      }
      router.push('/students')
    } finally {
      loading.value = false
    }
  }
})

// Adiciona onUnmounted para limpar o estudante atual
onUnmounted(() => {
  studentStore.clearCurrentStudent()
})

// Remove formatação do CPF antes de enviar
const cleanCPF = (cpf: string) => cpf.replace(/\D/g, '')

const handleCPFInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  if (value.length > 11) value = value.slice(0, 11)

  formData.value.cpf = value.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4'
  )
}

const handleSubmit = async () => {
  if (!form.value?.validate()) return

  loading.value = true
  try {
    const studentData = {
      ...formData.value,
      cpf: cleanCPF(formData.value.cpf || '')
    }

    if (isEditing.value) {
      // Enviando apenas os campos editáveis
      const updateData = {
        name: studentData.name,
        email: studentData.email
      }
      await studentStore.updateStudent(Number(route.params.id), updateData)
      snackbar.value = {
        show: true,
        text: 'Aluno atualizado com sucesso!',
        color: 'success'
      }
    } else {
      await studentStore.createStudent(studentData as Omit<Student, 'id'>)
      snackbar.value = {
        show: true,
        text: 'Aluno criado com sucesso!',
        color: 'success'
      }
    }
    router.push('/students')
  } catch (error: any) {
    snackbar.value = {
      show: true,
      text: error.message || 'Erro ao salvar aluno',
      color: 'error'
    }
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  router.push('/students') // Rota da listagem
}
</script>
