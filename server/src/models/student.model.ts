import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { IStudent } from "../interfaces/student.interface";

class Student extends Model<IStudent> implements IStudent {
  public id!: number;
  public name!: string;
  public email!: string;
  public ra!: string;
  public cpf!: string;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ra: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Student",
    tableName: "students",
  }
);

export default Student;
