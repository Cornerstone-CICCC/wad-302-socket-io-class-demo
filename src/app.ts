import express from "express";
import { apiRouter } from "./routes/api";
import path from "path";

export const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());

app.use("/", apiRouter);
