var tp = require("tedious-promises");
var TYPES = require("tedious").TYPES;
module.exports = {
  index: async (req, res) => {
    res.render("index", { title: "LiveU - Cadastro" });
  },

  create: async (req, res) => {
    const { nome, sobrenome, email, token } = req.body;
    const [, codNome, codSobrenome, codEmail] = token.split(/\D+/);
 

    await tp
      .sql(
        `INSERT INTO tbs_nome ( nome, cod) VALUES ('${sobrenome}', '${codSobrenome}')`
      )
  
      .execute();

    await tp
      .sql(
        `INSERT INTO tbs_sobrenome ( sobrenome, cod) VALUES ( '${sobrenome}', '${codSobrenome}')`
      )

      .execute();

    await tp
      .sql(
        `INSERT INTO tbs_email ( email, cod) VALUES ( '${email}', '${codEmail}')`
      )

      .execute();

    const arrayNome = tp
      .sql(`SELECT * FROM tbs_cod_nome WHERE cod = '${codNome}'`)
      .execute();

    const arraySobrenome = tp
      .sql(`SELECT * FROM tbs_cod_sobrenome WHERE cod = '${codSobrenome}'`)
      .execute();

    const arrayEmail = tp
      .sql(`SELECT * FROM tbs_cod_email WHERE cod = '${codEmail}'`)
      .execute();

    const [
      [{ soma: somaNome }],
      [{ soma: somaSobrenome }],
      [{ soma: somaEmail }],
    ] = await Promise.all([arrayNome, arraySobrenome, arrayEmail]);

    const total =
      parseInt(codNome) +
      parseInt(somaNome) +
      parseInt(codSobrenome) +
      parseInt(somaSobrenome) +
      parseInt(codEmail) +
      parseInt(somaEmail);
   

    const dados = await tp
      .sql(
        `SELECT tbs_animais.animal, tbs_cores.cor, tbs_paises.pais  
      FROM tbs_animais 
      JOIN tbs_cores ON (tbs_cores.total =  '${total}')
      JOIN tbs_paises ON (tbs_paises.total = '${total}')
      LEFT JOIN tbs_cores_excluidas ON (tbs_cores_excluidas.cor = tbs_cores.cor) 
      WHERE tbs_animais.total = '${total}' AND tbs_cores_excluidas.id IS NULL
  
     `
      )
      .execute();

    res.send(dados[0]);
  },
};
