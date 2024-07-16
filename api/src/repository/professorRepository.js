import { conx } from "./connection.js";

//inserir sala
export async function inserirSala(idprofessor, dados) {
    const comando = `
    INSERT INTO tb_salas (id_professor, nm_nome, ds_descricao, img_imagem, dt_criado)
    VALUES (?, ?, ?, ?, curdate());`

    try {
        const [resposta] = await conx.query(comando, [idprofessor, dados.nome, dados.desc, dados.imagem])
        return resposta
    }
    catch (error) {
        console.error('Erro ao inserir uma nova sala:', error);
        throw error; 
    }
}



//dados trilhas professor
export async function dadosTrilhasProfessor(idprofessor) {
    const comando = `
    SELECT 
    tt.id_trilha AS id,
    tt.id_professor AS professor, 
    tt.nm_nome AS nome, 
    tt.ds_descricao AS descricao, 
    tt.img_imagem AS imagem, 
    tt.dt_criado AS criado
    FROM tb_trilhas tt
    WHERE tt.id_professor = ?`

    try {
        const [linhas] = await conx.query(comando, [idprofessor]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados das trilhas:', error);
        throw error; 
    }
}

//insert trilha
export async function inserirTrilha(idprofessor, dados) {
    const comando = `
    INSERT INTO tb_trilhas (id_professor, nm_nome, ds_descricao, img_imagem, dt_criado)
    VALUES (?, ?, ?, ?, CURDATE())`

    try {
        const [resposta] = await conx.query(comando, [idprofessor, dados.nome, dados.desc, dados.imagem])
        return resposta
    }
    catch (error) {
        console.error('Erro ao inserir uma nova trilha:', error);
        throw error; 
    }
}



//dados avisos professor
export async function dadosAvisosProfessor(idprofessor) {
    const comando = `
    SELECT 
    ta.id_aviso AS id,
    ta.id_professor AS professor, 
    ta.nm_nome AS nome, 
    ta.ds_descricao AS descricao, 
    ta.img_imagem AS imagem, 
    ta.dt_criado AS criado
    FROM tb_avisos ta
    WHERE ta.id_professor = ?`

    try {
        const [linhas] = await conx.query(comando, [idprofessor]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados dos avisos:', error);
        throw error; 
    }
}

//insert aviso
export async function inserirAviso(idprofessor, dados) {
    const comando = `
    INSERT INTO tb_avisos (id_professor, nm_nome, ds_descricao, img_imagem, url_video, bt_comentarios, ds_status, dt_criado)
    VALUES (?, ?, ?, ?, ?, ?, CURDATE())`

    try {
        const [resposta] = await conx.query(comando, [idprofessor, dados.nome, dados.desc, dados.imagem, dados.video, dados.comentarios, dados.status])
        return resposta
    }
    catch (error) {
        console.error('Erro ao inserir um novo aviso:', error);
        throw error; 
    }
}



//dados transmissoes professor
export async function dadosTransmissoesProfessor(idprofessor) {
    const comando = `
    SELECT 
    tt.id_transmissao AS id,
    tt.id_professor AS professor, 
    tt.nm_nome AS nome, 
    tt.ds_descricao AS descricao, 
    tt.img_imagem AS imagem, 
    tt.dt_criado AS criado
    FROM tb_transmissoes tt
    WHERE tt.id_professor = ?`

    try {
        const [linhas] = await conx.query(comando, [idprofessor]);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados das transmissões:', error);
        throw error; 
    }
}

//insert transmissao
export async function inserirTransmissao(idprofessor, dados) {
    const comando = `
    INSERT INTO tb_transmissoes (id_professor, nm_nome, ds_descricao, img_imagem, url_video, bt_comentarios, ds_status, dt_criado)
    VALUES (?, ?, ?, ?, ?, ?, CURDATE())`

    try {
        const [resposta] = await conx.query(comando, [idprofessor, dados.nome, dados.desc, dados.imagem, dados.video, dados.comentarios, dados.status])
        return resposta
    }
    catch (error) {
        console.error('Erro ao inserir uma nova transmissão:', error);
        throw error; 
    }
}