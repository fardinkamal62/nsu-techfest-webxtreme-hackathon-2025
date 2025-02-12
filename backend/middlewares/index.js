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
            res.status(401).json({message: 'Unauthorised'})
        }
        return jwt.verify(token, process.env.secret, (err, user) => {
            if (err) {
                console.log(err)
                res.status(401).json({message: 'Mismatch'})
            }
            req.user = user
            next()
        })
    } catch (e) {
        console.log(e)
        res.status(401).json({data: "Please Contact Admin"})
    }
}

middlewares.isAdmin = (req, res, next) => {
    if (req.user.role === 2) {
        return next();
    }
    res.status(401).json({message: 'Unauthorised'})
};

export default middlewares;
