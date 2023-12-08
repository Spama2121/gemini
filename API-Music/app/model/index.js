const dbconfig = require("../config/dbconfig.js")

const Sequelize = require("sequelize")
const sequelizedb = new Sequelize(dbconfig.DATABASE, dbconfig.USER, dbconfig.PASSWORD, {

    host :dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorsAliases:false

})

const db = {};
db.Sequelize = Sequelize
db.sequelizeDB = sequelizedb

db.user = require("./user_model.js")(sequelizedb, Sequelize)
db.music = require("./music_model.js")(sequelizedb,Sequelize)
db.album = require("./album_model.js")(sequelizedb,Sequelize)


module.exports = db