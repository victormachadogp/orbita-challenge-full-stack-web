import StudentService from "../services/student.service";
import Student from "../models/student.model";

jest.mock("../models/student.model");

describe("Student Service", () => {
  test("Deve criar um estudante", async () => {
    const mockStudent = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      ra: "123456",
      cpf: "123.456.789-00",
    };

    (Student.create as jest.Mock).mockResolvedValue(mockStudent);

    const result = await StudentService.create(mockStudent);
    expect(result).toEqual(mockStudent);
  });

  test("Deve listar estudantes", async () => {
    const students = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        ra: "123456",
        cpf: "123.456.789-00",
      },
    ];

    (Student.findAll as jest.Mock).mockResolvedValue(students);

    const result = await StudentService.findAll();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("John Doe");
  });
});
