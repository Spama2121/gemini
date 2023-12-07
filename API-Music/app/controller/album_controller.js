const db= require("../model")
const album = db.album

exports.getAll =  async(req,res) => {
    const option ={
        sort: { createdAt : 1},
    };

    const cursor = await album.findAll(option);
    if(cursor) {
        res.status(200).send({
            statusCode:200,
            message:"success Get All Album",
            data: cursor
        });
    }else{
        res.status(400).send({
            statusCode:400,
            message:"No data Found"
        });
    }
};

exports.GetOne = async (req,res) => {
    const id ={_id: req.params.GetOne}
    const cursor = await album.findOne(id)

    if(cursor){
        res.status(200).send({
            statusCode:200,
            data:cursor
        });
    }else{
        res.status(400).send({
            statusCode:400,
            message:"No Data Found"
        });
    }
};

exports.postSaveAlbum = async (req,res) => {
    const newAlbum = new album({
        name :req.body.name,
        image_url : req.body.image_url,
    });
    try{
        const savedAlbum = await newAlbum.save();
        res.status(200).send({
            album: savedAlbum
        });
    }catch (error) {
        console.error(error),
        res.status(400).send({
            statusCode:400,
            message:error
        });
    }
};

exports.putUpdateAlbum = async (req,res) => {
    const id = req.params.id;
    try {
        const [changedRowCount, updatedRows]= await album.update(
          {
              name : req.body.name,
              image_url: req.body.image_url,
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
        });
    }
};

exports.deletealbum = async (req,res) => {
    const id = req.params.id

    try {

        const existingalbum = await album.findByPk(id);

        if(!existingalbum){
            return res.status(400).send({
                statusCode:400,
                message:"Data not found",
            });
        }
        const deletedRowCount = await album.destroy({
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
}
