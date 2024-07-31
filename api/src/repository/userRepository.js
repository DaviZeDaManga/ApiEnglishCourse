import { conx } from "./connection.js";

//dados SALAS
export async function dadosSalas() {
    const comando = `
    SELECT 
    ts.id_sala AS id,
    ts.id_professor AS professor, 
    ts.nm_nome AS nome, 
    ts.ds_descricao AS descricao, 
    ts.img_imagem AS imagem, 
    ts.ds_status AS status,
    ts.dt_criado AS criado
    FROM tb_salas ts
    WHERE ts.ds_status = "Ativo"`

    try {
        const [linhas] = await conx.query(comando);
        return linhas;
    } catch (error) {
        console.error('Erro ao executar consulta dos dados das salas:', error);
        throw error; 
    }
}