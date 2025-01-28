import express, { Request, Response, NextFunction } from "express";
import sequelize from "./config/database";
import studentRoutes from "./routes/student.routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(studentRoutes);

// Middleware de erro global
app.use(errorHandler);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
