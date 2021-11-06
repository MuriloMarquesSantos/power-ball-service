import routes from "./routes";

import express, { Request, Response, NextFunction } from "express";

import AppError from "./errors/app-error";

// Create Express App
const app = express();

// Routes
app.use("/", routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    console.error(error);

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

export default app;
