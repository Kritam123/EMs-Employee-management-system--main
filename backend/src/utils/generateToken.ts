import jwt from "jsonwebtoken"

interface TokenProps {
    email?:string
    id:string
}

const getAccessToken =  ({email,id}:TokenProps)=>{
        return jwt.sign(
            {
                id:id,
                email,
            },
            process.env.ACCESSTOKEN_SECRET!,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXIPERY
            }
        )

}
const getRefreshToken =  ({id}:TokenProps)=>{
        return jwt.sign(
            {
                id:id,
                
            },
            process.env.REFRESHTOKEN_SECRET!,
            {
                expiresIn:process.env.REFRESHTOKEN_EXIPERY
            }
        )

}



export {getAccessToken,getRefreshToken}