import { Request, Response, NextFunction } from "express";
import StudentService from "../services/student.service";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../validations/student.validation";

class StudentController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { error } = createStudentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const student = await StudentService.create(req.body);
      res.status(201).json(student);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const students = await StudentService.findAll();
      res.json(students);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const student = await StudentService.findById(Number(req.params.id));
      if (student) {
        res.json(student);
      } else {
        res.status(404).json({ error: "Aluno não encontrado" });
      }
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { error } = updateStudentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const updatedStudent = await StudentService.update(
        Number(req.params.id),
        req.body
      );
      if (updatedStudent) {
        res.json({
          message: "Aluno atualizado com sucesso",
          student: updatedStudent,
        });
      } else {
        res.status(404).json({ error: "Aluno não encontrado" });
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await StudentService.delete(Number(req.params.id));
      if (deleted) {
        res.json({ message: "Aluno excluído com sucesso" });
      } else {
        res.status(404).json({ error: "Aluno não encontrado" });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentController();
