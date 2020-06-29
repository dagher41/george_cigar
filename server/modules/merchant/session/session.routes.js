import { Router } from 'express';
import { CatalogPage, MerchantPage } from '../../../models';
import sessionStrategry from './session.passport'; // <-- include this so that the code loads.
import passport from 'passport';

const router = new Router();
router
    .route('/login')
    .get(async (req, res) => {
        if (req.isAuthenticated()) {
            const redirectPage = await MerchantPage.findOne({
                order: [['position', 'ASC']],
                limit: 1,
                include: {
                    model: CatalogPage,
                    as: 'catalogPage',
                    where: { catalogId: req.catalog.id },
                }
            })
            return res.redirect(redirectPage.getMerchantPath());
        }
        res.render('pages/session/new', { catalog: req.catalog, infoMessage: req.flash('info') })
    });

router
    .route('/login')
    .post((req, res, next) => {
        return passport.authenticate('local', function (err, user, info) {
            if (err) {
                req.flash('info', err)
                return next(err);
            }
            if (!user) {
                req.flash('info', 'Invalid username or password')
                return res.redirect('/merchant/login');
            }
            return req.logIn(user, async function (err) {
                if (err) { return next(err); }

                const page = await MerchantPage.findOne({
                    order: [['position', 'ASC']],
                    limit: 1,
                    include: {
                        model: CatalogPage,
                        as: 'catalogPage',
                        where: { catalogId: req.catalog.id },
                    }
                })
                return res.redirect(page.getMerchantPath());
            });
        })(req, res, next);
    });

router
    .route('/logout')
    .delete((req, res) => {
        req.logOut();
        return res.redirect('/merchant/login');
    })
export default router;