import express from 'express'
import { approveBook, getAllPendingBooks, signupAdmin } from '../Controller/admin.controller.js';

const router = express.Router()

router.post("/signup",signupAdmin);
router.get("/pending-books", getAllPendingBooks);
router.post("/approve-book", approveBook);

export default router;