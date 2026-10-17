import bcrypt, { compare } from "bcrypt";


async function passwordHash(pass){
    return await bcrypt.hash(pass,10)
}


async function checkPassword(userPssword,hashPassword){
    return await compare(userPssword,hashPassword);
}

export {passwordHash,checkPassword}