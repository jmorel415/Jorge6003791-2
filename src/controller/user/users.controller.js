const { sequelize } = require("../../connection");
const { UserModel } = require("../../model/user.model");

const listar = async function (req, res) {
    console.log("listar usuarios");

    try {
        const users = await sequelize.query("SELECT * FROM users WHERE deleted IS false ");

        if (users && users[0]) {
            // En users[0] se encuentra el listado de lo que se recupera desde el SQL
            res.json({
                success: true,
                usuarios: users[0]
            });
        } else {
            res.json({
                success: true,
                usuarios: []
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
    console.log("consultar 1 usuario por codigo");

    try {
        // Buscar en la base de datos por codigo
        const userModelResult = await UserModel.findByPk(req.params.id);

        if (userModelResult) {
            res.json({
                success: true,
                usuario: userModelResult
            });
        } else {
            res.json({
                success: true,
                usuario: null
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
    console.log("actualizar usuarios");


    // res.send("actualiza los usuarios")
    // variables
    let usuarioRetorno = null; // guarda el usuario que se va incluir o editar
    const data = req.body; // se optiene los datos del cuerpo de la peticion 
    const id = req.body.id;

    try {
        
    let usrExiste = null;
    if (id) {
        usrExiste = await UserModel.findByPk(id);

    }
    if (usrExiste) {
        // asegurar que el usuario existe, entonces actualizar
        usuarioRetorno = await UserModel.update(data, { where : {id:id}});
        usuarioRetorno = data;

    } else { // incluir
        usuarioRetorno = await UserModel.create(data);

    }
    res.json({
        success: true,
        user: usuarioRetorno
    });


    } catch (error) {
        console.log(error);

         res.json({
        success: false,
        error: error.message
    });
};
}


const eliminar = async function (req, res) {
    console.log("eliminar usuarios");

    // borrado fisico
   //  UserModel.destroy(req.params.id);
    try {

        await sequelize.query("UPDATE users SET deleted = true WHERE id=  " + req.params.id);
        res.json({
            success: true
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error : error.message
        });
    }
};


module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};