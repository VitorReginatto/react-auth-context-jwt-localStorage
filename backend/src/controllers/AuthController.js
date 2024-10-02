const AuthService = require('../service/AuthService')
const jwt = require("jsonwebtoken");

module.exports = class AuthController {

    static async signin(req, res) {
        try {
            const data = req.body
            const authResponse = await AuthService.signin(data)
            res.status(201).json({ message: "Login efetuado com sucesso", ...authResponse })
        } catch (error) {
            if (error.message === 'Nenhum usuário encontrado com esse e-mail.') {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === 'Email/Senha inválidos!') {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: "Erro ao logar", error: error.message });
        }
    }
    static async getUserAuth(req, res) {
        try {
            const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "Acesso Negado. Token Ausente" });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return res.status(200).json(req.user = decoded); 
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: "Token Inválido" });
        }
    }

}; 