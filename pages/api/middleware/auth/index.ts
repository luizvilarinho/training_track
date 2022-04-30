import { Jwt } from "jsonwebtoken";
var jwt = require('jsonwebtoken');

export function Auth(token:string){

    if(!token) {
       return {error: 'unauthorized'}
        
    };

    var decoded = jwt.verify(token, process.env.JWTSECRET);
    //colocar logica para refresh token
    return decoded.data
}