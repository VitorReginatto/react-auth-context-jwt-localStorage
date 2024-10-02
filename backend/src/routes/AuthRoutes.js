const router = require("express").Router();
const rateLimit = require('express-rate-limit');
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Limite de 5 tentativas
    message: 'Muitas tentativas de login. Tente novamente mais tarde.'
});

const AuthController = require('../controllers/AuthController');
router.post("/signin", AuthController.signin)
router.get("/getUserAuth", AuthController.getUserAuth)


module.exports = router
