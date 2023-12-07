module.exports =(app) => {
 const controller = require("../controller/album_controller.js");
 const router = require("express").Router();


    //router awal api album
    app.use("/api/album",router)

    //getAll album
    router.get("/get_all_album",controller.getAll)

    //getOne album
    router.get("/getOnealbum/:id",controller.GetOne)

    //Postsave album
    router.post("/savealbum",controller.postSaveAlbum)

    //Put Update album
    router.put("/updatealbum/:id",controller.putUpdateAlbum)

    //delete album
    router.delete("/deletealbum/:id",controller.deletealbum)
}