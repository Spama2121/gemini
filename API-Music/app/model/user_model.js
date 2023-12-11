module.exports = (sequelizedb, Sequelize) =>{
    const User = sequelizedb.define("tabel_user",{
        nama:{
            type: Sequelize.STRING
        },
        email:{
            type: Sequelize.STRING
        },
        noHp:{
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        rePassword: {
            type: Sequelize.STRING
        },
        token: {
            type : Sequelize.STRING(100)
        }
    },{
        tableName :"tabel_user"
    })
    return User
}