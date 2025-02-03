import { Sequelize } from "sequelize";
import Student from "../models/student.model";

describe("Student Model", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    // Sincronizar o modelo com o banco
    await sequelize.authenticate();
    await Student.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("deve criar um estudante válido", async () => {
    const studentData = {
      name: "João Silva",
      email: "joao@email.com",
      ra: "12345",
      cpf: "123.456.789-00",
    };

    const student = await Student.create(studentData);
    expect(student.name).toBe(studentData.name);
    expect(student.email).toBe(studentData.email);
    expect(student.ra).toBe(studentData.ra);
    expect(student.cpf).toBe(studentData.cpf);
  });

  it("não deve criar estudante sem campos obrigatórios", async () => {
    try {
      await Student.create({
        name: "João Silva",
        email: "joao@email.com",
        ra: "12345",
        cpf: "123.456.789-00",
      });
      fail("Deveria ter lançado um erro");
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
