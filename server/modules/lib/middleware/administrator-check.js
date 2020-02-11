
export default async (req, _, next) => {
    if (!req.user || await !req.user.isAdmin()) {
        return next(new Error('Unauthorized Access'));
    }
    next();
}