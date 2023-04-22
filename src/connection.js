const { Sequelize } = require("sequelize/types");

const sequelize = new Sequelize("db_study_app", 'postgres', 'admin', {
    host : 'localhost',
    port : '5432',
    dialect : 'postgres'
});

const testConnection = function (){
    try {
        sequelize.authenticate();
        console.log("Conexion con Exito!");
    } catch (error) {
        console.log("Error de conexion", error);
    }
}
module.exports = {
    Sequelize,
    sequelize
}
testConnection();