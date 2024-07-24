import { Router } from "express";
const server = Router()

import Joi from "Joi"
import multer from "multer";
import bcrypt from "bcrypt"
import { proximaAtividade, inserirResposta, inserirFeitoConteudo, inserirFeitoLicoes, dadosAluno, dadosMinhaSala, loginAluno, verificarLoginAluno, cadastroAluno, entrarSala, verificarCodigoSala, sairSala } from "../repository/alunoRepository.js";

const uploadPerfil = multer({
    dest: "uploads/images/alunos/perfil"
})

//cadastro aluno
server.post("/aluno/cadastro", uploadPerfil.single("imagem"), async (req, resp)=> {
    try {
        const schema = Joi.object({
            nome: Joi.string().required().min(3).max(30),
            email: Joi.string().email().required(),
            senha: Joi.string().required().min(6).max(20),
            numero: Joi.string().required().min(8).max(15),
            tipo: Joi.string().valid("Iniciante", "Intermediário", "Avançado").required(),
            nascimento: Joi.string().required()
        })
        const {error, value} = schema.validate(req.body)
        if (error) { return resp.status(400).send({ erro: 'Os parâmetros da resposta estão incorretos.', detalhes: error.details });}

        const alunoExistente = await verificarLoginAluno(value.email);
        if (alunoExistente) {return resp.status(400).send({ erro: "Esse email já está sendo usado." });}

        const imagemPath = req.file ? req.file.path : null
        if (!imagemPath) { return resp.status(400).send({ erro: 'Imagem é obrigatória.'})}

        const dados = {...value, imagem: imagemPath}
        const resposta = await cadastroAluno(dados)
        if (!resposta) { return resp.status(400).send({ erro: 'Cadastro não efetuado.'})}
        else { return resp.send({ message: "Usuário adicionado!"})}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

//login aluno
server.post("/aluno/login", async (req, resp)=> {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            senha: Joi.string().required()
        })
        const {error, value} = schema.validate(req.body)
        if (error) { return resp.status(400).send({ erro: 'O parâmetro "email" e "senha" do aluno é obrigatório.'})}

        const aluno = await verificarLoginAluno(value.email)
        if (!aluno) { return resp.status(400).send({ erro: "Nenhum aluno encontrado."})}
        
        const senhaCorreta = await bcrypt.compare(value.senha, aluno.senha)
        if (!senhaCorreta) { return resp.status(400).send({ erro: "Senha incorreta."})}

        const resposta = await loginAluno(value.email)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhum dado foi retornado.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

//dados aluno
server.get("/aluno/:idaluno/dados", async (req, resp)=> {
    try {
        const {idaluno} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error} = idschema.validate(idaluno)
        if (error) { return resp.status(400).send({ erro: 'O parâmetro "id" do aluno é obrigatório.'})}

        const resposta = await dadosAluno(idaluno)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhum dado foi retornada.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})

//entrar sala
server.post('/aluno/:idaluno/entrar/sala', async (req, resp)=> {
    try {
        const {idaluno} = req.params;
        const idSchema = Joi.number().integer().positive()
        const {error: errorid} = idSchema.validate(idaluno);
        if (errorid) { return resp.status(400).send({ erro: 'O parâmetro "id" do aluno é obrigatório.'})}

        const schema = Joi.object({
            codigo: Joi.string().required().min(10).max(25)
        })
        const {error, value} = schema.validate(req.body)
        if (error) { return resp.status(400).send({ erro: 'O parâmetro "código" da sala é obrigatório.'})}

        const value2 = await verificarCodigoSala(value.codigo)
        if (!value2) { return resp.status(400).send({ erro: "Código inválido."})}

        const value3 = await dadosMinhaSala(idaluno)
        if (value3.length > 0) {
            const value4 = await sairSala(idaluno)
            if (!value4) { return resp.status(400).send({ erro: "Aluno não retirado da outra sala."})}
        }

        const resposta = await entrarSala(idaluno, value2);
        if (resposta.affectedRows === 0) { return resp.status(400).send({ erro: 'Nada foi adicionado.' }); }
        return resp.send(resposta);
    } 
    catch (err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor', detalhes: err.message });
    }
});

//minhasala
server.get("/aluno/:idaluno/dados/minhasala", async (req, resp)=> {
    try {
        const {idaluno} = req.params;
        const idschema = Joi.number().integer().positive().required()
        const {error} = idschema.validate(idaluno)
        if (error) { return resp.status(400).send({ erro: 'O parâmetro "id" do aluno é obrigatório.'})}

        const resposta = await dadosMinhaSala(idaluno)
        if (!resposta) { return resp.status(400).send({ erro: 'Nada foi retornado.'})}
        else if (resposta.length == 0) { return resp.status(400).send({ erro: 'Nenhuma sala foi retornada.'})}
        else { return resp.send(resposta)}
    }
    catch(err) {
        console.error('Erro interno no servidor:', err);
        resp.status(500).send({ erro: 'Erro interno no servidor' });
    }
})



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