import { Router } from 'express';
import bcrypt from 'bcrypt';

import db from '../../models';

const {User} = db;
const saltRounds = 10;
const numAllowedUsers = 1;
const router = new Router();
router
    .route('/signup')
    .get(async (req, res) => {
        res.render('pages/registration/new', { infoMessage: req.flash('info')})
    });

router
    .route('/registrations')
    .post(async (req, res) => {
        const {email, password, passwordConfirmation} = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            req.flash('info', 'Invalid Email address provided');
            res.redirect('/admin/signup');
            return;
        } 
        if (password.length < 8){
            req.flash('info', 'Password must be at least 8 characters');
            res.redirect('/admin/signup');
            return;
        }
        if (password != passwordConfirmation) {
            req.flash('info', 'Password does not match password confirmation');
            res.redirect('/admin/signup');
            return;
        }
        const numUsers = await User.count();
        if (numUsers == numAllowedUsers) {
            req.flash('info', 'No more users are allowed to sign up');
            res.redirect('/admin/signup');
            return;
        }

        return bcrypt.hash(password, saltRounds, async (err, password) => {
            const user = await User.create({email, password})
            return req.login(user, function(err) {
                if (err) {
                  console.log('ERROR: ', err);
                }
                
                return res.redirect('/admin/cigars/products')
            });
        });
    });

export default router;    