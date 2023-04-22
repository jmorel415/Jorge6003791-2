const themes_propertiesController = require('../../controller/themes_properties/themes_properties.controller');
module.exports = function (app){
    app.get("/themes_properties/list", themes_propertiesController.listar);
    app.get("/themes_properties/:id", themes_propertiesController.consultarPorCodigo);
    app.post("/themes_properties/update", themes_propertiesController.actualizar);
   app.delete("/themes_properties/delete/:id", themes_propertiesController.eliminar);
}
