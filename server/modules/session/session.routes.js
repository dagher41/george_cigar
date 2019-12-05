import { Router } from 'express';
import db from '../../models';
import sessionStrategry from './session.passport';
import passport from 'passport';

const router = new Router();
router
    .route('/login')
    .get((req, res) => {
        res.render('pages/session/new', {infoMessage: req.flash('info')})
    });

router
    .route('/login')    
    .post(function(req, res, next) {
        return passport.authenticate('local', function(err, user, info) {
            if (err) {
                req.flash('info', err)
                return next(err);
            }
            if (!user) { 
                req.flash('info', 'Invalid username or password')
                return res.redirect('/admin/login'); 
            }
          return req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/admin/cigars/products');
          });
        })(req, res, next);
      });

export default router;    