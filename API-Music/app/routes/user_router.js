// const { authjwt } = require ("../middleware");
// const { verifikasiRegister } = require("../middleware");
// console.log(__dirname)

module.exports = app => {
    const authjwt = require ("../middleware/auth-jwt.js");
    const verifikasiRegister  = require("../middleware/verifikasi_register.js");
    console.log('lOKASI:', __dirname)
    const controller = require("../controller/user_controller.js");
    const router= require("express").Router()

    app.use((req,res,next)=> {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //route awal semua api User
    app.use("/api", router)

    //POST untuk register user
    router.post(    "/register", 
                    [verifikasiRegister.checkDuplicateDataUser], 
                    controller.register)
    
    //GET ALL profile user
    router.get(     "/get-profile",
                    [authjwt.verifikasiToken],
                    controller.findAlluserProfile)

    //GET ALL profile user
    router.get(     "/get-profile/:id",
                    [authjwt.verifikasiToken],
                    controller.findoneuserProfileById)

    //GET Login User
    router.post(    "/login",
                    controller.login)

    //PUT profile user by id
    router.put(     "/editprofile/:id",
                    [authjwt.verifikasiToken],
                    controller.editProfile)

    //PUT change Password by id
    router.put(     "/change_password/:id",
                    [authjwt.verifikasiToken],
                    controller.changePassword)

};