import express, { Request, Response, NextFunction } from "express";
import sequelize from "./config/database";
import studentRoutes from "./routes/student.routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", studentRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    error: "Erro interno do servidor",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
