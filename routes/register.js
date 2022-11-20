const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const {User} = require("../db/models/user");


router.post('/', async (req, res) => {

    try {
        const {email, password, role} = req.body;
        const hash = await bcrypt.hashSync(password, 10);
        const user = new User({
            email,
            hash,
            role
        })
        await user.save()
        res.json({
            "message": "Dodano do bazy danych"
        })
    }catch (e) {
        res.json({
            "message": `Błąd podczas dodawania do bazy...`,
            "errors": e.errors
        });
    }
});

module.exports = router;