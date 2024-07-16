import { Router } from "express";
const server = Router();

import Joi from "Joi";
import multer from "multer"; 
import { dadosAvisosProfessor, dadosTransmissoesProfessor, dadosTrilhasProfessor, inserirAviso, inserirSala, inserirTransmissao, inserirTrilha } from "../repository/professorRepository.js";

// Configuração do Multer
const upload = multer({
    dest: 'uploads/images'
});

//inserir sala
server.post('/professor/:idprofessor/novo/sala', upload.single('imagem'), async (req, resp) => {
    try {
        const {idprofessor} = req.params;
        const idschema = Joi.number().integer().positive();
        const {error: errorId} = idschema.validate(idprofessor);
        if (errorId) { return resp.status(400).send({ erro: 'O parâmetro "id" do professor é obrigatório.' }); }

        const schema = Joi.object({
            nome: Joi.string().required(),
            desc: Joi.string().required()
        });
        const {error, value} = schema.validate(req.body);
        if (error) { return resp.status(400).send({ erro: 'Os parâmetros da resposta estão incorretos.', detalhes: error.details });}

        const imagemPath = req.file ? req.file.path : null;
        if (!imagemPath) { return resp.status(400).send({ erro: 'Imagem é obrigatória.' });}

        const dados = {...value, imagem: imagemPath};
        const resposta = await inserirSala(idprofessor, dados);
        if (resposta.affectedRows === 0) { return resp.status(400).send({ erro: 'Nada foi adicionado.' }); }
        return resp.send(resposta);
    } 
    catch (err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor', detalhes: err.message });
    }
});



//dados TRILHAS professor
server.get("/professor/:idprofessor/dados/trilhas", async (req, resp)=> {
    try {
        const {idprofessor} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error} = idschema.validate(idprofessor)
        if (error) { return resp.status(400).send({ erro: 'O parâmetro "id" do usuário é obrigatório.'})}

        const resposta = await dadosTrilhasProfessor(idprofessor)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhuma trilha foi retornada.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

//insert trilha
server.post('/professor/:idprofessor/novo/trilha', upload.single('imagem'), async (req, resp)=> {
    try {
        const {idprofessor} = req.params;
        const idschema = Joi.number().integer().positive();
        const {error: errorId} = idschema.validate(idprofessor);
        if (errorId) { return resp.status(400).send({ erro: 'O parâmetro "id" do professor é obrigatório.' }); }

        const schema = Joi.object({
            nome: Joi.string().required(),
            desc: Joi.string().required()
        })
        const {error, value} = schema.validate(req.body);
        if (error) { return resp.status(400).send({ erro: 'Os parâmetros da resposta estão incorretos.', detalhes: error.details });}

        const imagemPath = req.file ? req.file.path : null;
        if (!imagemPath) { return resp.status(400).send({ erro: 'Imagem é obrigatória.' });}

        const dados = {...value, imagem: imagemPath};
        const resposta = await inserirTrilha(idprofessor, dados);
        if (resposta.affectedRows === 0) { return resp.status(400).send({ erro: 'Nada foi adicionado.' }); }
        return resp.send(resposta);
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor', detalhes: err.message });
    }
})



//dados AVISOS professor
server.get("/professor/:idprofessor/dados/avisos", async (req, resp)=> {
    try {
        const {idprofessor} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error} = idschema.validate(idprofessor)
        if (error) { return resp.status(400).send({ erro: 'O parâmetro "id" do usuário é obrigatório.'})}

        const resposta = await dadosAvisosProfessor(idprofessor)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhum aviso foi retornado.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

//inserir aviso
server.post('/professor/:idprofessor/novo/aviso', upload.single('imagem'), async (req, resp)=> {
    try {
        const {idprofessor} = req.params;
        const idschema = Joi.number().integer().positive();
        const {error: errorId} = idschema.validate(idprofessor);
        if (errorId) { return resp.status(400).send({ erro: 'O parâmetro "id" do professor é obrigatório.' }); }

        const schema = Joi.object({
            nome: Joi.string().required(),
            desc: Joi.string().required(),
            video: Joi.string().required(),
            comentarios: Joi.boolean().required(),
            status: Joi.string().required()
        })
        const {error, value} = schema.validate(req.body);
        if (error) { return resp.status(400).send({ erro: 'Os parâmetros da resposta estão incorretos.', detalhes: error.details });}

        const imagemPath = req.file ? req.file.path : null;
        if (!imagemPath) { return resp.status(400).send({ erro: 'Imagem é obrigatória.' });}

        const dados = {...value, imagem: imagemPath};
        const resposta = await inserirAviso(idprofessor, dados);
        if (resposta.affectedRows === 0) { return resp.status(400).send({ erro: 'Nada foi adicionado.' }); }
        return resp.send(resposta);
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor', detalhes: err.message });
    }
})



//dados TRANSMISSOES professor
server.get("/professor/:idprofessor/dados/transmissoes", async (req, resp)=> {
    try {
        const {idprofessor} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error} = idschema.validate(idprofessor)
        if (error) { return resp.status(400).send({ erro: 'O parâmetro "id" do usuário é obrigatório.'})}

        const resposta = await dadosTransmissoesProfessor(idprofessor)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhuma transmissão foi retornada.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

//inserir transmissao
server.post('/professor/:idprofessor/novo/transmissao', upload.single('imagem'), async (req, resp)=> {
    try {
        const {idprofessor} = req.params;
        const idschema = Joi.number().integer().positive();
        const {error: errorId} = idschema.validate(idprofessor);
        if (errorId) { return resp.status(400).send({ erro: 'O parâmetro "id" do professor é obrigatório.' }); }

        const schema = Joi.object({
            nome: Joi.string().required(),
            desc: Joi.string().required(),
            video: Joi.string().required(),
            comentarios: Joi.boolean().required(),
            status: Joi.string().required()
        })
        const {error, value} = schema.validate(req.body);
        if (error) { return resp.status(400).send({ erro: 'Os parâmetros da resposta estão incorretos.', detalhes: error.details });}

        const imagemPath = req.file ? req.file.path : null;
        if (!imagemPath) { return resp.status(400).send({ erro: 'Imagem é obrigatória.' });}

        const dados = {...value, imagem: imagemPath};
        const resposta = await inserirTransmissao(idprofessor, dados);
        if (resposta.affectedRows === 0) { return resp.status(400).send({ erro: 'Nada foi adicionado.' }); }
        return resp.send(resposta);
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor', detalhes: err.message });
    }
})

export default server;