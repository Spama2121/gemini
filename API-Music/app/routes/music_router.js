module.exports = (app) => {
 const controller = require("../controller/music_controller.js");
 const router = require("express").Router();

    

    //router awal api musik
    app.use("/api/music",router)

    //get allmusik
    router.get("/get_all_music", controller.getAllSong)

    //get musikbyId
    router.get("/getOne/:id",
    controller.getOnemusic)

    //post savemusic
    router.post("/savemusic",
    controller.postSaveMusic)

    //put updatemusikbyId
    router.put("/update/:id",
    controller.putUpdateMusic)

    //delete musik
    router.delete("/deletemusik/:id",
    controller.deletemusic)

    //getFavoriteSongs
    router.get("/getFavouritesmusic",
    controller.getfavoriteMusic)

}
