import { Request, Response, Router } from "express";

export const router = Router();

// /api/v1/projects
router.get("/", async (req: Request, res: Response) => {
  res.render('home');
  // res.json({
  //   status: 'ok', 
  //   message:'Your app is ready'
  // });
});
