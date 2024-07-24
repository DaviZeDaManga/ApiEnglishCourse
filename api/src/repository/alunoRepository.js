import { conx } from "./connection.js";
import bcrypt from "bcrypt"

//cadastro aluno
export async function cadastroAluno(dados) {
    const comando = `
        INSERT INTO tb_alunos (nm_nome, ds_email, ds_senha, img_imagem, ds_numero, ds_tipo, dt_nascimento)
        VALUES (?, ?, ?, ?, ?, ?, ?);`;

    try {
        const hash = await bcrypt.hash(dados.senha, 10);
        const [linhas] = await conx.query(comando, [dados.nome, dados.email, hash, dados.imagem, dados.numero, dados.tipo, dados.nascimento]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar cadastro do aluno:', error);
        throw error;
    }
}

//login aluno
export async function loginAluno(email) {
    const comando = `
    SELECT 
    ta.id_aluno AS id,
    ta.nm_nome AS nome, 
    ta.ds_email AS email, 
    ta.ds_tipo AS tipo
    FROM tb_alunos ta
    WHERE ta.ds_email = ?`

    try {
        const [linhas] = await conx.query(comando, [email]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar login do aluno:', error);
        throw error; 
    }
}

//verificar login
export async function verificarLoginAluno(email) {
    const comando = `
    SELECT 
    ta.ds_email AS email, 
    ta.ds_senha AS senha
    FROM tb_alunos ta
    WHERE ta.ds_email = ?;`

    try {
        const [linhas] = await conx.query(comando, [email]);
        return linhas.length > 0 ? linhas[0] : null; 
    } catch (error) {
        console.error('Erro ao executar verificação do login do aluno:', error);
        throw error; 
    }
} 

//dados aluno
export async function dadosAluno(idaluno) {
    const comando = `
    SELECT 
    ta.id_aluno AS id,
    ta.nm_nome AS nome,
    ta.ds_email AS email,
    ta.img_imagem AS imagem,
    ta.ds_numero AS numero,
    ta.ds_tipo AS tipo,
    ta.dt_nascimento AS nascimento,
    ts.id_sala AS idSala
    FROM tb_alunos ta
    LEFT JOIN tb_salas_alunos tsa ON ta.id_aluno = tsa.id_aluno
    LEFT JOIN tb_salas ts ON tsa.id_sala = ts.id_sala
    WHERE ta.id_aluno = ?`

    try {
        const [linhas] = await conx.query(comando, [idaluno]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados do aluno:', error);
        throw error; 
    }
}

//veridicar codigo da sala
export async function verificarCodigoSala(codigo) {
    const comando = `
    SELECT 
    id_sala AS sala,
    id_professor AS professor
    FROM tb_salas
    WHERE ds_codigo = ?`

    try {
        const [resposta] = await conx.query(comando, [codigo]);
        return resposta.length > 0 ? resposta[0] : null;
    } catch (error) {
        console.error('Erro ao verificar código da sala:', error);
        throw error; 
    }
}

//sair sala
export async function sairSala(idaluno) {
    const comando = `
    DELETE FROM tb_salas_alunos 
    where id_aluno = ?`

    try {
        const [resposta] = await conx.query(comando, [idaluno]);
        return resposta;
    } catch (error) {
        console.error('Erro ao retirar aluno da sala:', error);
        throw error; 
    }
}

//entrar sala
export async function entrarSala(idaluno, dados) {
    const comando = `
    INSERT INTO tb_salas_alunos (id_professor, id_sala, id_aluno, ds_status)
    VALUES (?, ?, ?, "Ativo")`

    try {
        const [resposta] = await conx.query(comando, [dados.professor, dados.sala, idaluno]);
        return resposta;
    } catch (error) {
        console.error('Erro ao inserir aluno na sala:', error);
        throw error; 
    }
}

//minhasala
export async function dadosMinhaSala(idaluno) {
    const comando = `
    SELECT 
    ts.id_sala AS id,
    ts.id_professor AS professor, 
    ts.nm_nome AS nome, 
    ts.ds_descricao AS descricao, 
    ts.img_imagem AS imagem, 
    ts.dt_criado AS criado,
    tsa.ds_status AS statusAluno    
    FROM tb_salas ts
    INNER JOIN tb_salas_alunos tsa ON ts.id_sala = tsa.id_sala
    WHERE tsa.id_aluno = ?`

    try {
        const [linhas] = await conx.query(comando, [idaluno]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados da sala:', error);
        throw error; 
    }
}




//proxima atividade
export async function proximaAtividade(idaluno, idatividade) {
    const comando = `
    INSERT INTO tb_alunos_feitos (id_aluno, id_atividade, bt_conteudo, bt_licoes, ds_status)
    VALUES (?, ?, false, false, "Fazendo");`

    const [resposta] = await conx.query(comando, [idaluno, idatividade])
    return resposta
}

//inserir feito conteudo
export async function inserirFeitoConteudo(idaluno, idativdade) {
    const comando = `
    UPDATE tb_alunos_feitos
    SET
    bt_conteudo = true
    WHERE id_aluno = ?
    AND id_atividade = ?;`

    const [resposta] = await conx.query(comando, [idaluno, idativdade])
    return resposta
}

//inserir feito licoes
export async function inserirFeitoLicoes(idaluno, idativdade) {
    const comando = `
    UPDATE tb_alunos_feitos
    SET
    bt_licoes = true
    WHERE id_aluno = ?
    AND id_atividade = ?;`

    const [resposta] = await conx.query(comando, [idaluno, idativdade])
    return resposta
}

//inserir resposta
export async function inserirResposta(idaluno, idlicao, dados) {
    const comando = `
    INSERT INTO tb_alunos_respostas (id_aluno, id_licao, id_alternativa, ds_escrita, ds_nota)
    VALUES (?, ?, ?, ?, ?);`

    const [resposta] = await conx.query(comando, [idaluno, idlicao, dados.idalternativa, dados.escrita, dados.nota])
    return resposta
}