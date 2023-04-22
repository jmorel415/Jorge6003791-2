const { sequelize } = require("../../connection");
const { TopicsModel } = require("../../model/topics.model");
const TopicsService = require("../../service/topics.service");

const listar = async function (req, res) {

    console.log("Lista de topicos");

    try {
        const topics = await TopicsService.listar(req.query.filtro || '');

        if (topics) {
            res.json({
                success: true,
                topicos: topics[0]
            });

        } else {
            res.json({
                success: true,
                topicos: []
            });

        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });

    }

};

const consultarPorCodigo = async function (req, res) {
    console.log("Consulta de 1 topico por codigo");

    try {
        const topicsModelResult = await TopicsService.consultarPorCodigo(req.params.id);

        if (topicsModelResult) {
            res.json({
                success: true,
                topicos: topicsModelResult
            });

        } else {
            res.json({
                success: true,
                topicos: null
            });

        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });

    }

};

const actualizar = async function (req, res) {
    console.log("Actualizar topicos");
    
    let topicoRetorno = null; //guarda el topico que se va incluir o editar;

    try {
        let topicoRetorno = await TopicsService.actualizar(
        req.body.id,
        req.body.create_date,
        req.body.name,
        req.body.topic_id,
        req.body.order,
        req.body.priority,
        req.body.color,
        req.body.owner_user_id
        );
       
        res.json({
            success: true,
            topics: topicoRetorno
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
};

const eliminar = async function (req, res) {
    console.log("Eliminar topicos");

    try {
        const topicoRetorno = await TopicsService.eliminar(req.params.id);
        res.json({
            success: topicoRetorno,
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });


    }
};

module.exports = {
    listar, consultarPorCodigo, actualizar, eliminar
};