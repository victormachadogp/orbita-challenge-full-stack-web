import Student from "../models/student.model";
import { IStudent } from "../interfaces/student.interface";

class StudentService {
  async create(studentData: IStudent): Promise<Student> {
    return await Student.create(studentData);
  }

  async findAll(): Promise<Student[]> {
    return await Student.findAll();
  }

  async findById(id: number): Promise<Student | null> {
    return await Student.findByPk(id);
  }

  async update(
    id: number,
    studentData: Partial<IStudent>
  ): Promise<[number, Student[]]> {
    return await Student.update(studentData, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number): Promise<number> {
    return await Student.destroy({ where: { id } });
  }
}

export default new StudentService();
