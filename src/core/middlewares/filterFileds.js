export const filterExtraFields = (allowedField) => (req,res,next) =>{
    const filteredBody = {};
    for( const field of allowedField){
        if (req.body[field] !== undefined){
            filteredBody[field] = req.body[field];
        }
    }

    req.body = filteredBody;
    next()
};
