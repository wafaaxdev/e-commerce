exports.isAdmin = (req,res,next)=>{
    if(req.session.isAdmin) {console.log(req.session.isAdmin); next();}
    else console.log('you are not admin')
}