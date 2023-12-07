const db = require("../model")
const User = db.user

checkDuplicateDataUser = (req, res, next) => {
    //email
    User.findOne({
        where:{
            email: req.body.email
        }
    }).then(data => {
        if(data) {
            res.status(400).send({
                message:"Failed! email is alreadey in use"
            })
            return
        }

        //nama
        User.findOne({
            where:{
                nama:req.body.nama
            }
        }).then(data => {
            if(data){
                res.status(400).send({
                    message:"Failed! Name is already in use"
                })
                return
            }
            next()
        })
    })
}

const verifikasiRegister = {
    checkDuplicateDataUser : checkDuplicateDataUser
}

module.exports = verifikasiRegister