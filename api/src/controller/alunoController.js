import { Router } from "express";
const server = Router()

import Joi from "Joi"
import { proximaAtividade, inserirResposta, inserirFeitoConteudo, inserirFeitoLicoes } from "../repository/alunoRepository.js";

//proxima atividade
server.post('/aluno/:idaluno/proxima/atividade/:idatividade', async (req, resp)=> {
    try {
        const {idaluno, idatividade} = req.params;
        const idSchema = Joi.number().integer().positive()
        const {error: error1} = idSchema.validate(idaluno);
        const {error: error2} = idSchema.validate(idatividade);
        if (error1 || error2) { return resp.status(400).send({ erro: 'Os parâmetros "id" do aluno e da atividade é obrigatório.'})}

        const resposta = await proximaAtividade(idaluno, idatividade);
        if (resposta.affectedRows === 0) { return resp.status(400).send({ erro: 'Nada foi adicionado.' }); }
        return resp.send(resposta);
    } 
    catch (err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor', detalhes: err.message });
    }
});

//inserir feito conteudo
server.post('/aluno/:idaluno/feito/atividade/:idatividade/conteudo', async (req, resp)=> {
    try {
        const {idaluno, idatividade} = req.params;
        const idSchema = Joi.number().integer().positive()
        const {error: error1} = idSchema.validate(idaluno);
        const {error: error2} = idSchema.validate(idatividade);
        if (error1 || error2) { return resp.status(400).send({ erro: 'Os parâmetros "id" do aluno e da atividade é obrigatório.'})}

        const resposta = await inserirFeitoConteudo(idaluno, idatividade);
        if (resposta.affectedRows === 0) { return resp.status(400).send({ erro: 'Nada foi adicionado.' }); }
        return resp.send(resposta);
    } 
    catch (err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor', detalhes: err.message });
    }
});

//inserir feito licoes
server.post('/aluno/:idaluno/feito/atividade/:idatividade/licoes', async (req, resp)=> {
    try {
        const {idaluno, idatividade} = req.params;
        const idSchema = Joi.number().integer().positive()
        const {error: error1} = idSchema.validate(idaluno);
        const {error: error2} = idSchema.validate(idatividade);
        if (error1 || error2) { return resp.status(400).send({ erro: 'Os parâmetros "id" do aluno e da atividade é obrigatório.'})}

        const resposta = await inserirFeitoLicoes(idaluno, idatividade);
        if (resposta.affectedRows === 0) { return resp.status(400).send({ erro: 'Nada foi adicionado.' }); }
        return resp.send(resposta);
    } 
    catch (err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor', detalhes: err.message });
    }
});

//inserir resposta
server.post('/aluno/:idaluno/responder/licao/:idlicao', async (req, resp)=> {
    try {
        const {idaluno, idlicao} = req.params;
        const idSchema = Joi.number().integer().positive()
        const {error: error1} = idSchema.validate(idaluno);
        const {error: error2} = idSchema.validate(idlicao);
        if (error1 || error2) { return resp.status(400).send({ erro: 'Os parâmetros "id" do aluno e da atividade é obrigatório.'})}

        const schema = Joi.object({
            idalternativa: Joi.number().integer().positive(),
            escrita: Joi.string().required(),
            nota: Joi.number().required()
        });
        const { error, value } = schema.validate(req.body);
        if (error) { return resp.status(400).send({ erro: 'Os parâmetros da resposta estão incorretos.', detalhes: error.details }); }

        const resposta = await inserirResposta(idaluno, idlicao, value);
        if (resposta.affectedRows === 0) { return resp.status(400).send({ erro: 'Nada foi adicionado.' }); }
        return resp.send(resposta);
    } 
    catch (err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor', detalhes: err.message });
    }
});

export default server;