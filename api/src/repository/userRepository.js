import { conx } from "./connection.js";

//dados SALAS
export async function dadosSalas(iduser) {
    const comando = `
    SELECT 
    ts.id_sala AS id,
    ts.id_professor AS professor, 
    ts.nm_nome AS nome, 
    ts.ds_descricao AS descricao, 
    ts.img_imagem AS imagem, 
    ts.dt_criado AS criado
    FROM tb_salas ts
    INNER JOIN tb_salas_alunos tsa ON ts.id_sala = tsa.id_sala
    WHERE (tsa.id_aluno = ? OR ts.id_professor = ?)`

    try {
        const [linhas] = await conx.query(comando, [iduser, iduser]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados das salas:', error);
        throw error; 
    }
}

//daods SALA
export async function dadosSala(idsala, iduser) {
    const comando = `
    SELECT 
    ts.id_sala AS id,
    ts.id_professor AS professor, 
    ts.nm_nome AS nome, 
    ts.ds_descricao AS descricao, 
    ts.img_imagem AS imagem, 
    ts.dt_criado AS criado
    FROM tb_salas ts
    INNER JOIN tb_salas_alunos tsa ON ts.id_sala = tsa.id_sala
    WHERE tsa.id_sala = ? AND (tsa.id_aluno = ? OR ts.id_professor = ?)`

    try {
        const [linhas] = await conx.query(comando, [idsala, iduser, iduser]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados da sala:', error);
        throw error; 
    }
}




//dados TRILHAS
export async function dadosTrilhas(idsala, iduser) {
    const comando = `
    SELECT 
    tt.id_trilha AS id,
    tt.id_professor AS professor, 
    tt.nm_nome AS nome, 
    tt.ds_descricao AS descricao, 
    tt.img_imagem AS imagem, 
    tt.url_video AS video,
    tt.dt_criado AS criado
    FROM tb_trilhas tt
    INNER JOIN tb_trilhas_salas tts ON tt.id_trilha = tts.id_trilha
    INNER JOIN tb_salas_alunos tsa ON tts.id_sala = tsa.id_sala
    WHERE tts.id_sala = ? 
    AND (tsa.id_aluno = ? OR tts.id_professor = ?);`

    try {
        const [linhas] = await conx.query(comando, [idsala, iduser, iduser]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados das trilhas:', error);
        throw error; 
    }
}

//dados TRILHA
export async function dadosTrilha(idsala, idtrilha, iduser) {
    const comando = `
    SELECT 
    tt.id_trilha AS id,
    tt.id_professor AS professor, 
    tt.nm_nome AS nome, 
    tt.ds_descricao AS descricao, 
    tt.img_imagem AS imagem, 
    tt.url_video AS video,
    tt.dt_criado AS criado
    FROM tb_trilhas tt
    INNER JOIN tb_trilhas_salas tts ON tt.id_trilha = tts.id_trilha
    INNER JOIN tb_salas_alunos tsa ON tts.id_sala = tsa.id_sala
    WHERE tts.id_sala = ?
    AND tts.id_trilha = ?
    AND (tsa.id_aluno = ? OR tts.id_professor = ?)`

    try {
        const [linhas] = await conx.query(comando, [idsala, idtrilha, iduser, iduser]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados da trilha:', error);
        throw error; 
    }
}

//dados ATIVIDADES
export async function dadosAtividades(idsala, idtrilha, iduser) {
    const comando = `
    SELECT 
    ta.id_atividade AS id,
    ta.id_professor AS professor, 
    ta.nm_nome AS nome, 
    ta.ds_descricao AS descricao, 
    ta.img_imagem AS imagem, 
    ta.dt_criado AS criado,
    COALESCE(taf.bt_conteudo, false) AS conteudo,
    COALESCE(taf.bt_licoes, false) AS licoes,
    COALESCE(taf.ds_status, "Não feita.") AS status
    FROM tb_atividades ta
    LEFT JOIN tb_alunos_feitos taf ON ta.id_atividade = taf.id_atividade

    INNER JOIN tb_atividades_trilhas tat ON ta.id_atividade = tat.id_atividade
    INNER JOIN tb_trilhas_salas tas ON tat.id_trilha = tas.id_trilha
    INNER JOIN tb_salas_alunos tsa ON tas.id_sala = tsa.id_sala
    WHERE tsa.id_sala = ?
    AND tat.id_trilha = ?
    AND (tsa.id_aluno = ? OR tat.id_professor = ?)`

    try {
        const [linhas] = await conx.query(comando, [idsala, idtrilha, iduser, iduser]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados das atividades:', error);
        throw error; 
    }
}

//dados ATIVIDADE
export async function dadosAtividade(idsala, idtrilha, idativdade, iduser) {
    const comando = `
    SELECT 
    ta.id_atividade AS id,
    ta.id_professor AS professor, 
    ta.nm_nome AS nome, 
    ta.ds_descricao AS descricao, 
    ta.img_imagem AS imagem, 
    ta.url_video AS video,
    ta.bt_comentarios AS comentarios,
    ta.dt_criado AS criado,
    COALESCE(taf.bt_conteudo, false) AS conteudo,
    COALESCE(taf.bt_licoes, false) AS licoes,
    COALESCE(taf.ds_status, "Nao feita.") AS status
    FROM tb_atividades ta
    LEFT JOIN tb_alunos_feitos taf ON ta.id_atividade = taf.id_atividade

    INNER JOIN tb_atividades_trilhas tat ON ta.id_atividade = tat.id_atividade
    INNER JOIN tb_trilhas_salas tas ON tat.id_trilha = tas.id_trilha
    INNER JOIN tb_salas_alunos tsa ON tas.id_sala = tsa.id_sala
    WHERE tsa.id_sala = ?
    AND tat.id_trilha = ?
    AND ta.id_atividade = ?
    AND (tsa.id_aluno = ? OR tat.id_professor = ?)`

    try {
        const [linhas] = await conx.query(comando, [idsala, idtrilha, idativdade, iduser, iduser]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados da atividade:', error);
        throw error; 
    }
}

//dados PALAVRAS
export async function dadosPalavras(idsala, idtrilha, idativdade, iduser) {
    const comando = `
    SELECT 
    tp.id_palavra AS id,
    tp.id_professor AS professor, 
    tp.nm_nome AS nome, 
    tp.ds_descricao AS descricao, 
    tp.dt_criado AS criado
    FROM tb_palavras tp
    INNER JOIN tb_palavras_atividades tpa ON tp.id_palavra = tpa.id_palavra
    INNER JOIN tb_atividades_trilhas tat ON tpa.id_atividade = tat.id_atividade
    INNER JOIN tb_trilhas_salas tas ON tat.id_trilha = tas.id_trilha
    INNER JOIN tb_salas_alunos tsa ON tas.id_sala = tsa.id_sala
    WHERE tsa.id_sala = ?
    AND tat.id_trilha = ?
    AND tat.id_atividade = ?
    AND (tsa.id_aluno = ? OR tat.id_professor = ?)`

    try {
        const [linhas] = await conx.query(comando, [idsala, idtrilha, idativdade, iduser, iduser]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados da atividade:', error);
        throw error; 
    }
}

//dados LICOES
export async function dadosLicoes(idsala, idtrilha, idatividade, iduser) {
    const comando = `
    SELECT 
        tl.id_licao AS id,
        tl.id_professor AS professor, 
        tl.nm_nome AS nome, 
        tl.ds_descricao AS descricao, 
        tl.ds_pergunta AS pergunta,
        tl.ds_tipo AS tipo,
        tar.id_alternativa AS alternativa,
        tar.ds_escrita AS escrita,
        tar.ds_nota AS nota,
        tl.dt_criado AS criado
    FROM tb_licoes tl
    LEFT JOIN tb_alunos_respostas tar ON tl.id_licao = tar.id_licao
    INNER JOIN tb_licoes_atividades tla ON tl.id_licao = tla.id_licao
    INNER JOIN tb_atividades_trilhas tat ON tla.id_atividade = tat.id_atividade
    INNER JOIN tb_trilhas_salas tas ON tat.id_trilha = tas.id_trilha
    INNER JOIN tb_salas_alunos tsa ON tas.id_sala = tsa.id_sala
    WHERE tsa.id_sala = ?
    AND tat.id_trilha = ?
    AND tat.id_atividade = ?
    AND (tsa.id_aluno = ? OR tat.id_professor = ?)`;

    const comando2 = `
    SELECT 
        ta.id_alternativa AS id,
        ta.nm_nome AS nome, 
        ta.ds_descricao AS descricao,
        ta.bt_correto AS correto,
        tar.ds_nota AS nota
    FROM tb_alternativas ta
    LEFT JOIN tb_alunos_respostas tar ON ta.id_alternativa = tar.id_alternativa AND tar.id_licao = ?
    WHERE ta.id_licao = ?`;

    try {
    const resposta = [];
    const [licoes] = await conx.query(comando, [idsala, idtrilha, idatividade, iduser, iduser]);

    for (let i = 0; i < licoes.length; i++) {
        const idLicao = licoes[i].id;

        const [alternativas] = await conx.query(comando2, [idLicao, idLicao]);

        resposta.push({
        licao: licoes[i],
        alternativas: alternativas
        });
    }

    return resposta;
    } catch (error) {
    console.error('Erro ao executar consulta dos dados da atividade:', error);
    throw error; 
    }
}
  





//dados AVISOS
export async function dadosAvisos(idsala, iduser) {
    const comando = `
    SELECT 
    ta.id_aviso AS id,
    ta.id_professor AS professor, 
    ta.nm_nome AS nome, 
    ta.ds_descricao AS descricao, 
    ta.img_imagem AS imagem, 
    ta.url_video AS video,
    ta.dt_criado AS criado
    FROM tb_avisos ta
    INNER JOIN tb_avisos_salas tas ON ta.id_aviso = tas.id_aviso
    INNER JOIN tb_salas_alunos tsa ON tas.id_sala = tsa.id_sala
    WHERE tas.id_sala = ?
    AND (tsa.id_aluno = ? OR tas.id_professor = ?)`

    try {
        const [linhas] = await conx.query(comando, [idsala, iduser, iduser]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados dos avisos:', error);
        throw error; 
    }
}

//dados AVISO
export async function dadosAviso(idsala, idaviso, iduser) {
    const comando = `
    SELECT 
    ta.id_aviso AS id,
    ta.id_professor AS professor, 
    ta.nm_nome AS nome, 
    ta.ds_descricao AS descricao, 
    ta.img_imagem AS imagem, 
    ta.url_video AS video,
    ta.bt_comentarios AS comentarios,
    ta.ds_status AS status,
    ta.dt_criado AS criado
    FROM tb_avisos ta
    INNER JOIN tb_avisos_salas tas ON ta.id_aviso = tas.id_aviso
    INNER JOIN tb_salas_alunos tsa ON tas.id_sala = tsa.id_sala
    WHERE tas.id_sala = ?
    AND tas.id_aviso = ?
    AND (tsa.id_aluno = ? OR tas.id_professor = ?)`

    try {
        const [linhas] = await conx.query(comando, [idsala, idaviso, iduser, iduser]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados do aviso:', error);
        throw error; 
    }
}




//dados TRANSMISSOES
export async function dadosTransmissoes(idsala, iduser) {
    const comando = `
    SELECT 
    tt.id_transmissao AS id,
    tt.id_professor AS professor, 
    tt.nm_nome AS nome, 
    tt.ds_descricao AS descricao, 
    tt.img_imagem AS imagem, 
    tt.url_video AS video,
    tt.dt_criado AS criado
    FROM tb_transmissoes tt
    INNER JOIN tb_transmissoes_salas tts ON tt.id_transmissao = tts.id_transmissao
    INNER JOIN tb_salas_alunos tsa ON tts.id_sala = tsa.id_sala
    WHERE tts.id_sala = ?
    AND (tsa.id_aluno = ? OR tts.id_professor = ?)`

    try {
        const [linhas] = await conx.query(comando, [idsala, iduser, iduser]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados das transmissoes:', error);
        throw error; 
    }
}

//dados TRANSMISSAO
export async function dadosTransmissao(idsala, idtransmissao, iduser) {
    const comando = `
    SELECT 
    tt.id_transmissao AS id,
    tt.id_professor AS professor, 
    tt.nm_nome AS nome, 
    tt.ds_descricao AS descricao, 
    tt.img_imagem AS imagem, 
    tt.url_video AS video,
    tt.bt_comentarios AS comentarios,
    tt.ds_status AS status,
    tt.dt_criado AS criado
    FROM tb_transmissoes tt
    INNER JOIN tb_transmissoes_salas tts ON tt.id_transmissao = tts.id_transmissao
    INNER JOIN tb_salas_alunos tsa ON tts.id_sala = tsa.id_sala
    WHERE tts.id_sala = ?
    AND tts.id_transmissao = ?
    AND (tsa.id_aluno = ? OR tts.id_professor = ?)`

    try {
        const [linhas] = await conx.query(comando, [idsala, idtransmissao, iduser, iduser]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados da transmissao:', error);
        throw error; 
    }
}