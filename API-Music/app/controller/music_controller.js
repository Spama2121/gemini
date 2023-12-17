const db = require("../model");
const music = db.music

exports.getAllSong = async (req, res) => {
    
    try {
        const option ={
            sort:{ createdAt : 1},
        };

        const cursor = await music.findAll({}, null, option);

        if(cursor.length> 0) {
            res.status(200).send({
                statusCode:200,
                message:"Success Get All Songs",
                data:cursor
            });
        }else{
            res.status(404).send({
                statusCode: 404,
                message:"No Data Found",
                data:[]
            })      
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            statusCode:500,
            message:"Failed Get All Songs" 
        });

    }
}

exports.getOnemusic = async(req, res) =>{
    const id = {_id: req.params.getOne}
    const cursor = await music.findOne(id)

    if(cursor) {
        res.status(200).send({
            statusCode:200,
            data:cursor
        })
    }else{
        res.status(404).send({
            statusCode:404,
            message:"No Data Found"
        });
    }
}

exports.postSaveMusic = async(req,res) =>{
    const newMusic = new music({
        judul : req.body.judul,
        image_url : req.body.image_url,
        album : req.body.album,
        artist : req.body.artist,
        durasi : req.body.durasi,
        genre : req.body.genre,
        music_url :req.body.music_url,
    });
    try{
        const savedMusic = await newMusic.save();
        res.status(200).send({ 
            statusCode:200,
            song: savedMusic});
    }catch(error) {
        console.error(error);

        res.status(400).send({
            statusCode:400,
            message:" no music are saved",
            error: error.message 
        })
    }
}


exports.putUpdateMusic = async(req,res) => {
    const id =  req.params.id;
    // const options = {
    //   upsert: true,
    //   new: true,
    // };
    try {
      const [changedRowCount, updatedRows]= await music.update(
        {
            judul : req.body.judul,
            image_url: req.body.image_url,
            album: req.body.album,
            artist: req.body.artist,
            durasi: req.body.durasi,
            genre: req.body.genre,
            music_url : req.body.music_url
        },
        {
            where: {id : id},
            returning : true
        }
      );
      res.status(200).send({
        statusCode:200,
        message:"updated successfull"
      })

    } catch (error) {
        console.error(error);
        res.status(400).send({ 
            statusCode:400,
            message:" updated failed",
      })
    }
  };
exports.deletemusic = async(req,res) => {
    const id = req.params.id

    try {

        const existingmusic = await music.findByPk(id);

        if(!existingmusic){
            return res.status(400).send({
                statusCode:400,
                message:"Data not found",
            });
        }
        const deletedRowCount = await music.destroy({
            where:{id : id}
        });

        if(deletedRowCount > 0) {
            res.status(200).send({
                statusCode:200,
                message:"Data deleted successful",
            });
        }else{
            res.status(400).send({
                statusCode:400,
                message:" no data deleted"
            });
        }
    }catch(error){
        console.error(error);
        res.status(400).send({
            statusCode:400,
            message: "deleted failed",
            error:error.message,
        });
    }

    
    // const result = await music.deleteOne(id);

    // if(result.deleteCount === 1) {
    //     res.status(200).send({
    //         statusCode: 200,
    //         message:"data deleted"
    //     })
        
    // }else{
    //     res.status(400).send({
    //         statusCode:400,
    //         message:"data not found"
    //     })
    // }
}

exports.getfavoriteMusic = async (req,res) => {
    const query = req.query.songId;
    res.send(query);
}