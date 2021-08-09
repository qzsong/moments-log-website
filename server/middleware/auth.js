import jwt from 'jsonwebtoken';

const auth=async (req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        const isCustomAuth=token.length<500;

        let decodedData;

        if(token && isCustomAuth){
            //our own login
            decodedData=jwt.verify(token,process.env.KEYSTRING);
            //same secret as created in controllers
            req.userId=decodedData?.id;
        }else{
            //google OAuth
            decodedData=jwt.decode(token);
            req.userId=decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;