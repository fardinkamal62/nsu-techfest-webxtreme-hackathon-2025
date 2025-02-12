import jwt from 'jsonwebtoken';

const middlewares = {};

middlewares.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

middlewares.authenticate = (req, res, next) => {
    try {
        const header = req.headers['authorization']
        const token = header && header.split(' ')[1]
        if (token === undefined) {
            res.json({code: 401, message: 'Unauthorised'})
        }
        return jwt.verify(token, process.env.secret, (err, user) => {
            if (err) {
                console.log(err)
                res.json({code: 403, message: 'Mismatch'})
            }
            req.user = user
            next()
        })
    } catch (e) {
        console.log(e)
        res.json({data: "Please Contact Admin", code: 500})
    }
}

export default middlewares;
