const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as an admin');
    }
};

const retailer = (req, res, next) => {
    if (req.user && req.user.role === 'retailer') {
        next();
    } else {
        res.status(403);
        throw new Error('Not authorized as a retailer');
    }
};

module.exports = { admin, retailer };
