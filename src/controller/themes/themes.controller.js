const { sequelize } = require("../../connection");

require("../../connection");

const listar = async function(req, res){
    console.log("Listar usuarios");

    try{
        const themes = await sequelize.query("SELECT * FROM themes");

        if( themes && themes[0]){
            res.json({
                success : true,
                usuarios : themes[0]
            });
        } else{
            res.json({
                success : true,
                usuarios : []
            });
        }
    } catch(error){
        res.json({
            success : false,
            error : error.message
        });
    }
};


const consultarPorCodigo = async function (req, res) {
    console.log("consultar por codigo");

    try {
            const themes = await sequelize.query(`SELECT * 
        FROM themes 
         WHERE 1=1 
         AND id = ${req.params.id}
         `);
         /*
         users = [1,2]
            registros, metadata
            users = [[{id:1, name: 'jose'}{..}], {}]
            */
        if(themes && themes [0] && themes [0][0]){
            res.json({
                success : true,
                usuario : themes [0][0]
            });
        }else{
            res.json({
                success : true,
                usuario : null
            });
        }
    }catch(error){
        console,log(error);
        res.json({
            success : false,
            error : error.message
        });
        };
};



const actualizar =  async function(req, res){
    console.log("Actualizar usuarios");

    try{ // ANHADO EL TRY CATCH

        let usuarioRetorno = null;
        const data = req.body;
        const id = req.body.id;

        let themeExiste = null;
        if(id){
            themeExiste = await sequelize.query("SELECT * FROM themes WHERE id=" + id);
        }
        if(themeExiste && themeExiste[0] && themeExiste[0][0] && themeExiste[0][0].id){
            const retornoUpdate = await sequelize.query(`UPDATE themes SET
                                                        name = '${data.name}',
                                                        last_name = '${data.last_name}',
                                                        avatar = '${data.avatar}',
                                                        email = '${data.email}',
                                                        password = '${data.password}',
                                                        deleted = '${data.deleted}
                                                        WHERE id = ${id}`);
        usuarioRetorno = await sequelize.query("SELECT * FROM themes WHERE id= " + themeExiste[0][0].id);
        usuarioRetorno = usuarioRetorno[0][0];
                                                                                                                                                                                                                                            
        } else {
            const retornoInsert = await sequelize.query(`INSERT INTO themes (name, last_name, avatar, email, password, deleted) VALUES (
                '${data.name}', '${data.last_name}', '${data.avatar}', '${data.email}', '${data.password}', false )
                RETURNING id;`);
                usuarioRetorno = await sequelize.query("SELECT * FROM themes WHERE id= " + retornoInsert[0][0].id);
                usuarioRetorno = usuarioRetorno[0][0];
                res.json({
                    success : true,
                    user : usuarioRetorno
                });
            
        }
    } catch (error){
        res.json({
            success : false,
            error : error.message
        });
    }
};

const eliminar = async function(req, res){
    console.log("Eliminar usuarios");

try{

    await sequelize.query("UPDATE themes SET deleted = true WHERE id=  "+req.params.id);
    res.json({
        success: true
    });
} catch(error){
 res.json({
    success : true,
    user : usuarioRetorno
 });
}

};

module.exports = {
    listar, busquedaPorCodigo: consultarPorCodigo, actualizar, eliminar
};