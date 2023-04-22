const { sequelize } = require("../connection");
const { TopicsModel } = require("../model/topics.model");


const listar = async function (textoBuscar) {

    console.log("Listar topicos");

    try {
        const topics = await sequelize.query(`SELECT * 
        FROM topics
        WHERE 1=1 
        AND UPPER (name) LIKE UPPER ('%${textoBuscar}%')
        ORDER BY id`);

        if (topics && topics[0]) {
            return topics[0];
        } else {
            return [];

        }
    } catch (error) {
        console.log(error);
        throw error;
    }

};

const consultarPorCodigo = async function (id) {
    console.log("Consulta de 1 topico por codigo");

    try {
        const topicsModelResult = await TopicsModel.findByPk(id);

        if (topicsModelResult) {
            return topicsModelResult;
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
    topic_id,
    order,
    priority,
    color,
    owner_user_id
) {
    console.log("Actualizar topicos");
    
    let topicoRetorno = null;
    const data = {
        id,
        create_date,
        name,
        topic_id,
        order,
        priority,
        color,
        owner_user_id
    };

    try {
        let topicoExiste = null;
        if (id) {
            topicoExiste = await TopicsModel.findByPk(id);
        }
        if (topicoExiste) {
            topicoRetorno = await TopicsModel.update(data, { where: { id: id } });
            topicoRetorno = data;
        } else {
            topicoRetorno = await TopicsModel.create(data);

        }
        return topicoRetorno;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const eliminar = async function (id) {
    console.log("Eliminar topicos");

    try {
        await TopicsModel.destroy({ where: { id: id } });
        return true;
    } catch (error) {

        console.log(error);
        throw error;


    }
};

module.exports = {
    listar, consultarPorCodigo, actualizar, eliminar
};
