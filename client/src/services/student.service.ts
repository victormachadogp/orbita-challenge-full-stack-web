export class StudentService {
  static cleanCPF(cpf: string): string {
    return cpf.replace(/\D/g, '')
  }

  static formatCPF(value: string): string {
    let cleaned = value.replace(/\D/g, '')
    if (cleaned.length > 11) cleaned = cleaned.slice(0, 11)
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
}
