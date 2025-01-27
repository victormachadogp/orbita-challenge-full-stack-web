import express from "express";
import StudentController from "../controllers/student.controller";
import asyncHandler from "../middlewares/asyncHandler";

const router = express.Router();

router.post("/students", asyncHandler(StudentController.create));
router.get("/students", asyncHandler(StudentController.findAll));
router.put("/students/:id", asyncHandler(StudentController.update));
router.delete("/students/:id", asyncHandler(StudentController.delete));

export default router;
