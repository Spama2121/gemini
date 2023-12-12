const db = require("../model")
const auth_config = require("../config/auth_config")
const User = db.user
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//post register - post register
exports.register = (req, res) => {
    const tabel_user =  {
        nama: req.body.nama,
        email: req.body.email,
        noHp: req.body.noHp,
        password : bcrypt.hashSync(req.body.password, 8),
    }

    User.create(tabel_user)
    .then(data => {
        res.status(200).send({
            statusCode : 200,
            message : "Register Berhasil",
            data : {
                id : data.id,
                nama : data.nama,
                email : data.email,
                noHp : data.noHp,
                password: data.password,


            }
        });
    })
    .catch(err => {
        res.status(404).send({
        statusCode : 404,
        message: "Failed Get Data User" || err
        });
    });
};

//get login user
exports.login = (req, res) => {
    User.findOne({
        where:{
            email : req.body.email
        }
    })
    .then(data => {
        if(!data){
            return res.status(404).send({
                statusCode: 404,
                message: "user not found."
            })
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            data.password
        ) 

        if(!passwordIsValid){
            return res.status(401).send({
                statusCode: 401,
                message: "Invalid Password"
            })
        }

        const token = jwt.sign(
            {id: data.id},
            auth_config.secret,
            {
                algorithm : 'HS256',
            allowInsecureKeySizes: true,
            expiresIn:86400, //24 HOURS            
            }
        );

        res.status(200).send({
            statusCode: 200,
            message: "Login Successful",
            data:{
                nama: data.nama,
                email: data.email,
                noHp: data.noHp,
                token : token
            }
        });
    })
    .catch(err => {
        res.status(500).send({
            statusCode: 500,
            message:"Some error occurred while login the User."
        })
    })
};

//get data user - Get userProfile
exports.findAlluserProfile = (req, res) => {
    User.findAll()
        .then(data => {
            res.status(200).send({
                statusCode : 200,
                message: "Succes Get Data user",
                data : data,
            })
        })
        .catch(err => {
            res.status(500).send({
                statusCode : 500,
                message:
                err.message || "Failed Get Data User"
            })
        })
};

//GET one userprofile by id 
exports.findoneuserProfileById = (req,res) => {
    const id = req.params.id;

    User.findByPk(id)
    .then(data =>{
        if(data){
            res.status(200).send({
                statusCode: 200,
                message: "Succes Get My Profile by Id",
                data:{
                    id: data.id,
                    nama: data.nama,
                    email: data.email,
                    noHp: data.noHp
                }
            })
        }else {
            res.status(404).send({
                statusCode: 404,
                message: `Cannot find user profile with id=${id}.`
            })
        }
    })
    .catch(error => {
        res.status(500).send({
            statusCode: 500,
            message: " Error retrieving user profile with id=" + id || error 
        });
    });
}

//proses edit profil - PUT Edit profile
exports.editProfile = (req, res) => {
    User.update(req.body,{
        where:{ 
            id: req.params.id
        }
    })
    .then(result => {
        if(result[0]) {
            User.findByPk(req.params.id)

            .then(user => {
                const formattedData = {
                    id: user.id,
                    nama: user.nama,
                    email: user.email,
                    nohp: user.noHp
                };
                
                res.status(200).send({
                    statusCode: 200,
                    message: "Profile update Succesful",
                    data: formattedData
                });
            })
            .catch(error => {
                res.status(500).send({
                    statusCode: 500,
                    message: error.message || "Some error occurred while retrieving the User."
                });
            });
        } else {
            res.status(404).send({
                statusCode : 404,
                message: `Cannot update profile with id=${req.params.id}. Maybe profile was not found or req.body is empty!`
            });
        }
    })
    .catch(error => {
        res.status(500).send({
            statusCode : 500,
            message: error.message || "Some error occurred while updating the User."
        });
    });
}

//Proses penggantian Password - PUT Edit profil
exports.changePassword =(req,res) =>{
    const id= req.params.id;
    const{ password, newPassword, confirmPassword } = req.body;

    // Validasi bahwa newPassword dan confirmPassword sama
    if (newPassword !== confirmPassword) {
        return res.status(400).send({
            statusCode : 400,
            message: "New password and confirm password do not match."
        });
    }

    User.findByPk(id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    statusCode : 404,
                    message: `User with id=${id} not found.`
                });
            }

            // Validasi bahwa password lama sesuai
            const passwordIsValid = bcrypt.compareSync(password, data.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    statusCode : 401,
                    message: "Invalid current password."
                });
            }

            // Enkripsi newPassword
            const hashedNewPassword = bcrypt.hashSync(newPassword, 8);

            // Update password baru ke dalam database
            User.update(
                {   password: hashedNewPassword, },
                {   where: { id: id } }
            )
            .then(() => {
                res.status(200).send({
                    statusCode : 200,
                    message: "Password updated successfully."
                });
            })
            .catch(err => {
                res.status(500).send({
                    statusCode : 500,
                    message: err.message || "Some error occurred while updating the password."
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                statusCode : 400,
                message: err.message || "Some error occurred while retrieving the User."
            });
        });
};

    