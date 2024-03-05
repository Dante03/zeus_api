import express from "express";
import { form_login, form_register } from "../controllers/Users.Controller.js";

const router = express.Router();

/* router.get('/', function(req, res){
    res.json({msg:'Index'});
});

router.post('/', function(req, res){
    res.json({msg:'Index'});
}); */
router.get('/login', form_login);
router.get('/register', form_register);

router.get('/faq', (req, res) => {
    res.json({ msg: 'Faq' });
});

router.route('/')
    .get(function (req, res) {
        res.json({ msg: 'Index get' });
    })
    .post(function (req, res) {
        res.json({ msg: 'Index post' });
    });

router.route('*')
    .get(function (req, res) {
        res.status(404).json({ msg: 'Not Found' });
    });

export default router;