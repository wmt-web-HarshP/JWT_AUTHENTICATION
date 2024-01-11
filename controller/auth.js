const {expressjwt} = require('express-jwt');

function authJwt() {
    const secret = process.env.SECRET;
    const api=process.env.API_URL;
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            `${api}/users/login`,
            `${api}/users/register`,
        ] 
    }) 
}

async function isRevoked(req, jwt) {

    const payload = jwt.payload
    if (!payload.isAdmin) {  
      return true
    }
    return false
}
module.exports = authJwt