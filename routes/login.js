const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require("../db/models/user");


router.post('/', async (req, res, next) => {

        const {email, password} = req.body;
        if(!email || !password){
            res.json({
                "message": "Brak loginu lub hasła"
            })
        }
        const user = await User.findOne({
            email
        });

            bcrypt.compare(password, user.hash, function (err, pas) {
                if (pas) {
                    const payload = {
                        email: user.email,
                        bic: user.id
                    }

                    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn:300});
                    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: 526500});

                    res.cookie("authToken", {accessToken, refreshToken}, {httpOnly: true}, ).end();
                } else {
                    res.json({
                        "message": "Błędny login lub hasło"
                    })
                }
            });


})
    .post('/refresh', async (req,res) => {
    const refreshToken = req.body.token;

    if (!refreshToken) res.sendStatus(401);

    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
            if(err)res.json({"message": "cośnie tak"}).sendStatus(403);
            const payload = {
                "email": data.email,
                "role": data.role
            }
            const accessToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: 526500});

            res.json({accessToken});
        });

    } catch (e) {
        return res.sendStatus(403)
    }

})
module.exports = router;