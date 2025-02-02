import { ref } from 'vue'

export interface DialogState {
  show: boolean
  loading: boolean
  data: any
}

export function useDialog() {
  const dialog = ref<DialogState>({
    show: false,
    loading: false,
    data: null,
  })

  const showDialog = (data: any = null) => {
    dialog.value.data = data
    dialog.value.show = true
  }

  const hideDialog = () => {
    dialog.value.show = false
    dialog.value.loading = false
    dialog.value.data = null
  }

  const setLoading = (loading: boolean) => {
    dialog.value.loading = loading
  }

  return {
    dialog,
    showDialog,
    hideDialog,
    setLoading,
  }
}
