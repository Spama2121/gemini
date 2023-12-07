module.exports =(sequelizeDB, Sequelize) => {
    const Music = sequelizeDB.define("tabel_album",{
        name: {
            type: Sequelize.STRING
        },
        image_url: {
            type: Sequelize.STRING
        },
    }, {
        tableName: "tabel_album"
    });
    

    return Music;
};