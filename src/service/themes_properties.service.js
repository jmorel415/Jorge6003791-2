const { sequelize } = require("../connection");
const { ThemesPropertiesModel } = require("../model/themes_properties.model");


const listar = async function (textoBuscar) {

    console.log("Listar temas/propiedades");

    try {
        const themes_properties = await sequelize.query(`SELECT *
        FROM themes_properties
        WHERE 1=1
        AND UPPER (property_name) LIKE UPPER ('%${textoBuscar}%')
        ORDER BY id`);

        if (themes_properties && themes_properties[0]) {
            return themes_properties[0];
        } else {
            return [];
        }

    } catch (error) {
        console.log(error);
        throw error;
    }

};

const consultarPorCodigo = async function (id) {

    console.log("Consulta de 1 tema/propiedad por codigo");

    try {
        const themes_propertiesModelResult = await ThemesPropertiesModel.findByPk(id);

        if (themes_propertiesModelResult) {
            return themes_propertiesModelResult;

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
    theme_id,
    property_name,
    property_value
) {
    console.log("actualizar temas/propiedades");
    let tema_propiedadRetorno = null; 
    const data = {
    id,
    theme_id,
    property_name,
    property_value}; 

    try {
        let tema_propiedadExiste = null;
        if (id) {
            tema_propiedadExiste = await ThemesPropertiesModel.findByPk(id);
        }
        if (tema_propiedadExiste) {
            tema_propiedadRetorno = await ThemesPropertiesModel.update(data, { where: { id: id } });
            tema_propiedadRetorno = data;
        } else {
            tema_propiedadRetorno = await ThemesPropertiesModel.create(data);
        }
        return tema_propiedadRetorno;
    } catch (error) {
        console.log(error);
        throw error;
    }
}; 


const eliminar = async function (id) {
    console.log("Eliminar temas/propiedades");

    try {
        await ThemesPropertiesModel.destroy({ where: { id: id } });
        return true;
    } catch (error) {
        console.log(error);
        throw error;
    }
}; 
module.exports = {
    listar, consultarPorCodigo, actualizar, eliminar
};