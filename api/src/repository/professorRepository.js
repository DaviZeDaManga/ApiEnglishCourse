import { conx } from "./connection.js";

//inserir sala
export async function inserirSala(idprofessor, dados) {
    const comando = `
    INSERT INTO tb_salas (id_professor, nm_nome, ds_descricao, img_imagem, dt_criado)
    VALUES (?, ?, ?, ?, curdate());`

    const [resposta] = await conx.query(comando, [idprofessor, dados.nome, dados.desc, dados.imagem])
    return resposta
}