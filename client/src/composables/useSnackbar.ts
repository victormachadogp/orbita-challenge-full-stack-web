import { ref } from 'vue'

export interface SnackbarState {
  show: boolean
  text: string
  color: 'success' | 'error' | 'info' | 'warning'
}

export function useSnackbar() {
  const snackbar = ref<SnackbarState>({
    show: false,
    text: '',
    color: 'success',
  })

  const showMessage = (text: string, color: SnackbarState['color'] = 'success') => {
    snackbar.value = {
      show: true,
      text,
      color,
    }
  }

  const showError = (message: string) => {
    showMessage(message, 'error')
  }

  const showSuccess = (message: string) => {
    showMessage(message, 'success')
  }

  return {
    snackbar,
    showMessage,
    showError,
    showSuccess,
  }
}
