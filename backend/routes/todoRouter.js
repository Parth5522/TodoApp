import express from "express";
import { getAlltodos, posttodo, updatetodo, deletetodo, getAlltodosbyPriority, getAlltodosbyCrDate, getAlltodosbyDate, getAlltodosbyFavourite, getTotaltodos, getTotaltodosFavourite, getTotaltodosNotFavourite, getTotaltodosComplete, getTotaltodosNotcomplete, getTotaltodosbyPriority,  getTotaltodosCrbyDate, getTotaltodosbyDate, getSingleTodo} from "../controllers/todoController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/gettodo", isAuthenticated, getAlltodos);
router.post("/post", isAuthenticated, posttodo);
router.put("/update/:id", isAuthenticated, updatetodo);
router.delete("/delete/:id", isAuthenticated, deletetodo);
router.get("/gettodo/priority", isAuthenticated, getAlltodosbyPriority);
router.get("/gettodo/createdAt", isAuthenticated, getAlltodosbyCrDate);
router.get("/gettodo/cdate", isAuthenticated, getAlltodosbyDate);
router.get("/gettodo/favourite", isAuthenticated, getAlltodosbyFavourite);
router.get("/gettotal", isAuthenticated, getTotaltodos);
router.get("/gettotal/favourite", isAuthenticated, getTotaltodosFavourite);
router.get("/gettotal/notfavourite", isAuthenticated, getTotaltodosNotFavourite);
router.get("/gettotal/complete", isAuthenticated, getTotaltodosComplete);
router.get("/gettotal/umcomplete", isAuthenticated, getTotaltodosNotcomplete);
router.get("/gettotal/priority", isAuthenticated, getTotaltodosbyPriority);
router.get("/gettotal/createdAt", isAuthenticated, getTotaltodosCrbyDate);
router.get("/gettotal/cdate", isAuthenticated, getTotaltodosbyDate);
router.get("/:id", isAuthenticated, getSingleTodo);

export default router;