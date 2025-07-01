import express from "express";
import {
    form_login,
    form_register,
    get_users,
} from "../controllers/Users.Controller.js";

const router = express.Router();

router.get('/login',
    form_login);

router.route('/users')
    .get(get_users)
    .post(form_register);

router.route('*')
    .get(function (req, res) {
        res.status(404).json({ msg: 'Not Found' });
    });

export default router;