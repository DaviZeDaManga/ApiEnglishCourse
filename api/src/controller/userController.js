import { Router } from "express";
const server = Router();

import Joi from "Joi"
import { dadosSalas } from "../repository/userRepository.js";

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

export default server;