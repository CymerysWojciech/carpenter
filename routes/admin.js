const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middelwere/authenticate')
const isAdmin = require('../middelwere/isAdmin')


router.get('/',authenticate,isAdmin,(req, res) => {
    res.send(`${req.user.email}`)


})
    .put('/login', function(req, res, next) {
    res.send('login');
})
    .post('/register', ((req, res) => {
        const {email, password, role, date} = req.body;
        const salt = "jsiwuekaieonnn";
        const hash = bcrypt.hashSync(password, salt);

        res.send(`Login: ${email}\n Hasło: ${password} \n ${typeof salt}`)
    }))

module.exports = router;