import { conx } from "./connection.js";

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