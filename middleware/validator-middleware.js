// validator middleware

const ErrorHandler = require("../utils/errorHandler");

const authValidate = (schema) => async(req, res, next) => {
    console.log(req.body);
    try{
        const parseBody  =await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    }
    catch(err){
        
        console.log(err);
        next(new ErrorHandler(err.errors[0].message, 400));
    }
}

module.exports = authValidate;