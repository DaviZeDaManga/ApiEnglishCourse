import { Router } from "express";
const server = Router();

import Joi from "Joi"
import { dadosAtividade, dadosAtividades, dadosAviso, dadosAvisos, dadosLicoes, dadosPalavras, dadosSala, dadosSalas, dadosTransmissao, dadosTransmissoes, dadosTrilha, dadosTrilhas } from "../repository/userRepository.js";

//dados SALAS
server.get("/user/dados/salas", async (req, resp)=> {
    try {
        const resposta = await dadosSalas()
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhuma sala foi retornada.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

//dados SALA id
server.get("/user/:iduser/dados/sala/:idsala", async (req, resp)=> {
    try {
        const {idsala, iduser} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error: error1} = idschema.validate(idsala)
        const {error: error2} = idschema.validate(iduser)
        if (error1 || error2) { return resp.status(400).send({ erro: 'O parâmetro "id" da sala e do usuário é obrigatório.'})}

        const resposta = await dadosSala(idsala, iduser)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhuma sala foi retornada.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})




//dados TRILHAS
server.get("/user/:iduser/dados/sala/:idsala/trilhas", async (req, resp)=> {
    try {
        const {idsala, iduser} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error: error1} = idschema.validate(idsala)
        const {error: error2} = idschema.validate(iduser)
        if (error1 || error2) { return resp.status(400).send({ erro: 'O parâmetro "id" da sala e do usuário é obrigatório.'})}

        const resposta = await dadosTrilhas(idsala, iduser)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhuma trilha foi retornada.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

//dados TRILHA
server.get("/user/:iduser/dados/sala/:idsala/trilha/:idtrilha", async (req, resp)=> {
    try {
        const {iduser, idsala, idtrilha} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error: error1} = idschema.validate(idsala)
        const {error: error2} = idschema.validate(iduser)
        const {error: error3} = idschema.validate(idsala)
        if (error1 || error2 || error3) { return resp.status(400).send({ erro: 'O parâmetro "id" da sala, do usuário e da trilha é obrigatório.'})}

        const resposta = await dadosTrilha(idsala, idtrilha, iduser)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhuma trilha foi retornada.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

//dados ATIVIDADES
server.get("/user/:iduser/dados/sala/:idsala/trilha/:idtrilha/atividades", async (req, resp)=> {
    try {
        const {iduser, idsala, idtrilha} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error: error1} = idschema.validate(idsala)
        const {error: error2} = idschema.validate(iduser)
        const {error: error3} = idschema.validate(idsala)
        if (error1 || error2 || error3) { return resp.status(400).send({ erro: 'O parâmetro "id" da sala, do usuário e da trilha é obrigatório.'})}

        const resposta = await dadosAtividades(idsala, idtrilha, iduser)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhuma atividade foi retornada.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

//dados ATIVIDADE
server.get("/user/:iduser/dados/sala/:idsala/trilha/:idtrilha/atividade/:idatividade", async (req, resp)=> {
    try {
        const {iduser, idsala, idtrilha, idatividade} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error: error1} = idschema.validate(idsala)
        const {error: error2} = idschema.validate(iduser)
        const {error: error3} = idschema.validate(idsala)
        const {error: error4} = idschema.validate(idatividade)
        if (error1 || error2 || error3 || error4) { return resp.status(400).send({ erro: 'O parâmetro "id" da sala, do usuário, da trilha e da atividade é obrigatório.'})}

        const resposta = await dadosAtividade(idsala, idtrilha, idatividade, iduser)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhuma atividade foi retornada.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

//dados PALAVRAS
server.get("/user/:iduser/dados/sala/:idsala/trilha/:idtrilha/atividade/:idatividade/palavras", async (req, resp)=> {
    try {
        const {iduser, idsala, idtrilha, idatividade} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error: error1} = idschema.validate(idsala)
        const {error: error2} = idschema.validate(iduser)
        const {error: error3} = idschema.validate(idsala)
        const {error: error4} = idschema.validate(idatividade)
        if (error1 || error2 || error3 || error4) { return resp.status(400).send({ erro: 'O parâmetro "id" da sala, do usuário, da trilha e da atividade é obrigatório.'})}

        const resposta = await dadosPalavras(idsala, idtrilha, idatividade, iduser)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhuma palavra foi retornada.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

//dados LICOES
server.get("/user/:iduser/dados/sala/:idsala/trilha/:idtrilha/atividade/:idatividade/licoes", async (req, resp)=> {
    try {
        const {iduser, idsala, idtrilha, idatividade} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error: error1} = idschema.validate(idsala)
        const {error: error2} = idschema.validate(iduser)
        const {error: error3} = idschema.validate(idsala)
        const {error: error4} = idschema.validate(idatividade)
        if (error1 || error2 || error3 || error4) { return resp.status(400).send({ erro: 'O parâmetro "id" da sala, do usuário, da trilha e da atividade é obrigatório.'})}

        const resposta = await dadosLicoes(idsala, idtrilha, idatividade, iduser)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhuma lição foi retornada.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})




//dados AVISOS
server.get("/user/:iduser/dados/sala/:idsala/avisos", async (req, resp)=> {
    try {
        const {idsala, iduser} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error: error1} = idschema.validate(idsala)
        const {error: error2} = idschema.validate(iduser)
        if (error1 || error2) { return resp.status(400).send({ erro: 'O parâmetro "id" da sala e do usuário é obrigatório.'})}

        const resposta = await dadosAvisos(idsala, iduser)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhum aviso foi retornado.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

//dados AVISO
server.get("/user/:iduser/dados/sala/:idsala/aviso/:idaviso", async (req, resp)=> {
    try {
        const {iduser, idsala, idaviso} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error: error1} = idschema.validate(idsala)
        const {error: error2} = idschema.validate(iduser)
        const {error: error3} = idschema.validate(idaviso)
        if (error1 || error2 || error3) { return resp.status(400).send({ erro: 'O parâmetro "id" da sala, do usuário e do aviso é obrigatório.'})}

        const resposta = await dadosAviso(idsala, idaviso, iduser)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhum aviso foi retornado.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})




//dados TRANSMISSOES
server.get("/user/:iduser/dados/sala/:idsala/transmissoes", async (req, resp)=> {
    try {
        const {idsala, iduser} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error: error1} = idschema.validate(idsala)
        const {error: error2} = idschema.validate(iduser)
        if (error1 || error2) { return resp.status(400).send({ erro: 'O parâmetro "id" da sala e do usuário é obrigatório.'})}

        const resposta = await dadosTransmissoes(idsala, iduser)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhuma transmissão foi retornada.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

//dados TRANSMISSAO
server.get("/user/:iduser/dados/sala/:idsala/transmissao/:idtransmissao", async (req, resp)=> {
    try {
        const {iduser, idsala, idtransmissao} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error: error1} = idschema.validate(idsala)
        const {error: error2} = idschema.validate(iduser)
        const {error: error3} = idschema.validate(idtransmissao)
        if (error1 || error2 || error3) { return resp.status(400).send({ erro: 'O parâmetro "id" da sala, do usuário e da transmissão é obrigatório.'})}

        const resposta = await dadosTransmissao(idsala, idtransmissao, iduser)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhum transmissão foi retornada.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

export default server;