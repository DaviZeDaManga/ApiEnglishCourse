import { Router } from "express";
const server = Router();

import Joi from "Joi";
import multer from "multer"; 
import { inserirSala } from "../repository/professorRepository.js";

// Configuração do Multer
const upload = multer({
    dest: 'uploads/images'
});

server.post('/professor/:idprofessor/novo/sala', upload.single('imagem'), async (req, resp) => {
    try {
        const { idprofessor } = req.params;
        const idschema = Joi.number().integer().positive();
        const { error: errorId } = idschema.validate(idprofessor);
        if (errorId) {
            return resp.status(400).send({ erro: 'O parâmetro "id" do professor é obrigatório.' });
        }

        const schema = Joi.object({
            nome: Joi.string().required(),
            desc: Joi.string().required()
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            return resp.status(400).send({ erro: 'Os parâmetros da resposta estão incorretos.', detalhes: error.details });
        }

        const imagemPath = req.file ? req.file.path : null;
        if (!imagemPath) {
            return resp.status(400).send({ erro: 'Imagem é obrigatória.' });
        }

        const dados = { ...value, imagem: imagemPath };
        const resposta = await inserirSala(idprofessor, dados);
        if (resposta.affectedRows === 0) {
            return resp.status(400).send({ erro: 'Nada foi adicionado.' });
        }
        return resp.send(resposta);
    } 
    catch (err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor', detalhes: err.message });
    }
});

export default server;
