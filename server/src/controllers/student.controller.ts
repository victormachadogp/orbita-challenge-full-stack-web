import { Request, Response } from "express";
import StudentService from "../services/student.service";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../validations/student.validation";

class StudentController {
  async create(req: Request, res: Response) {
    try {
      const { error } = createStudentSchema.validate(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const student = await StudentService.create(req.body);
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar aluno" });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const students = await StudentService.findAll();
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar alunos" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { error } = updateStudentSchema.validate(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const [updated] = await StudentService.update(
        Number(req.params.id),
        req.body
      );
      if (updated) {
        res.json({ message: "Aluno atualizado com sucesso" });
      } else {
        res.status(404).json({ error: "Aluno não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar aluno" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = await StudentService.delete(Number(req.params.id));
      if (deleted) {
        res.json({ message: "Aluno excluído com sucesso" });
      } else {
        res.status(404).json({ error: "Aluno não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir aluno" });
    }
  }
}

export default new StudentController();
