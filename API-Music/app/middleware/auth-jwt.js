const jwt = require("jsonwebtoken")
const configJwt = require("../config/auth_config.js")

verifikasiToken = (req, res, next) => {
    let token = req.headers["x-access-token"]

    if(!token) {
        return res.status(403).send({
            message: "Not token provided!"
        })
    }

    jwt.verify(token, configJwt.secret, (err) =>{
        if(err) {
            return res. status(401).send({
                message: "Unauthorized"
            })
        }
        next()
    })
}

const authjwt = {
    verifikasiToken : verifikasiToken,
}

module.exports = authjwt