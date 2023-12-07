module.exports =(sequelizeDB, Sequelize) => {
    const Music = sequelizeDB.define("tabel_lagu",{
        judul: {
            type: Sequelize.STRING
        },
        image_url: {
            type: Sequelize.STRING
        },
        album: {
            type: Sequelize.STRING
        },
        artist: {
            type: Sequelize.STRING
        },
        durasi: {
            type: Sequelize.TIME
        },
        genre: {
            type: Sequelize.STRING
        },
        music_url: {
            type: Sequelize.STRING
        }
    }, {
        tableName: "tabel_lagu"
    });

    return Music;
};