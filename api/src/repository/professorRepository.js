import { conx } from "./connection.js";

//acoes sobre CONTA

//login
export async function loginProfessor(email, senha) {
    const comando = `
    SELECT 
    id_professor 	id,
    nm_nome 		nome,
    ds_email 		email
    FROM tb_professor
    WHERE ds_email = ?
    AND   ds_senha = ?;`
}