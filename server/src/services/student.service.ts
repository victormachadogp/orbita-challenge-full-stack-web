import { Op } from "sequelize";
import Student from "../models/student.model";
import { IStudent } from "../interfaces/student.interface";
import { ConflictError, NotFoundError } from "../errors/CustomError";
class StudentService {
  private async checkExistingStudent(
    data: Partial<IStudent>,
    excludeId?: number
  ) {
    const whereClause: any = {
      [Op.or]: [] as any[],
    };

    if (data.email) {
      whereClause[Op.or].push({ email: data.email });
    }
    if (data.ra) {
      whereClause[Op.or].push({ ra: data.ra });
    }
    if (data.cpf) {
      whereClause[Op.or].push({ cpf: data.cpf });
    }

    if (excludeId) {
      whereClause.id = { [Op.ne]: excludeId };
    }

    const existingStudent = await Student.findOne({ where: whereClause });

    if (existingStudent) {
      if (existingStudent.email === data.email) {
        throw new ConflictError("Email já cadastrado");
      }
      if (existingStudent.ra === data.ra) {
        throw new ConflictError("RA já cadastrado");
      }
      if (existingStudent.cpf === data.cpf) {
        throw new ConflictError("CPF já cadastrado");
      }
    }
  }

  async create(studentData: IStudent): Promise<Student> {
    await this.checkExistingStudent(studentData);
    return await Student.create(studentData);
  }

  async findAll(): Promise<Student[]> {
    return await Student.findAll();
  }

  async findById(id: number): Promise<Student> {
    const student = await Student.findByPk(id);
    if (!student) {
      throw new NotFoundError("Aluno não encontrado");
    }
    return student;
  }

  async update(id: number, studentData: Partial<IStudent>): Promise<Student> {
    const student = await Student.findByPk(id);
    if (!student) {
      throw new NotFoundError("Aluno não encontrado");
    }
    await student.update(studentData);
    return student.reload();
  }

  async delete(id: number): Promise<void> {
    const student = await this.findById(id);
    await student.destroy();
  }
}

export default new StudentService();
