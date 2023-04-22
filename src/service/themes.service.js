const { sequelize } = require("../connection");
const { ThemesModel } = require("../model/themes.model");

const listar = async function (textoBuscar) {

    console.log("Listar temas");

    try {
        const themes = await sequelize.query(`SELECT *
        FROM themes
        WHERE 1=1
        AND UPPER (name) LIKE UPPER ('%${textoBuscar}%')
        ORDER BY id`);

        if (themes && themes[0]) {
            return themes[0];
        } else {
            return [];
        }

    } catch (error) {
        console.log(error);
        throw error;
    }

};

const consultarPorCodigo = async function (id) {

    console.log("Consulta de 1 tema por codigo");

    try {
        const themesModelResult = await ThemesModel.findByPk(id);

        if (themesModelResult) {
            return themesModelResult;

        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }

};

const actualizar = async function (
    id,
    create_date,
    name,
    description,
    keywords,
    owner_user_id
) {
    console.log("Actualizar temas");
    let temaRetorno = null; 
    const data = {
        id, create_date, name, description, keywords,
        owner_user_id
    }; 

    try {
        let temaExiste = null;
        if (id) {
            temaExiste = await ThemesModel.findByPk(id);
        }
        if (temaExiste) {
            temaRetorno = await ThemesModel.update(data, { where: { id: id } });
            temaRetorno = data;
        } else {
            temaRetorno = await ThemesModel.create(data);
        }
        return temaRetorno;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const eliminar = async function (id) {
    console.log("Eliminar temas");

    try {
        await ThemesModel.destroy({ where: { id: id } });
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    listar, consultarPorCodigo, actualizar, eliminar
};
