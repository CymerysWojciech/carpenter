const {User} = require("../db/models/user");

module.exports = async function isAdmin(req, res, next){
     const id = req.user.bic;
    const user = await User.findOne({
        _id: id
    }).exec()
    if(user.role === "admin"){
        next();
    }else {
        res.sendStatus(403,"kkkkkk")
    }
}