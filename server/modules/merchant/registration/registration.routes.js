import { Router } from 'express';
import bcrypt from 'bcrypt';

import { User, Role } from '../../../models';

const saltRounds = 10;
const numAllowedUsers = 2;
const router = new Router();
router
    .route('/signup')
    .get(async (req, res) => {
        res.render('pages/registration/new', { infoMessage: req.flash('info'), catalog: req.catalog })
    });

router
    .route('/registrations')
    .post(async (req, res) => {
        const { email, password, passwordConfirmation } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            req.flash('info', 'Invalid Email address provided');
            return res.redirect('/merchant/signup');
        }
        if (password.length < 8) {
            req.flash('info', 'Password must be at least 8 characters');
            return res.redirect('/merchant/signup');
        }
        if (password != passwordConfirmation) {
            req.flash('info', 'Password does not match password confirmation');
            return res.redirect('/merchant/signup');
        }
        const numUsers = await User.count();
        if (numUsers == numAllowedUsers) {
            req.flash('info', 'No more users are allowed to sign up');
            return res.redirect('/merchant/signup');
        }

        return bcrypt.hash(password, saltRounds, async (err, password) => {
            const user = await User.create({ email, password })
            const role = await Role.findOne({ where: { code: Role.ROLE_CODES.merchant } });
            await user.addRole(role);
            return req.login(user, function (err) {
                if (err) {
                    console.log('ERROR: ', err);
                }

                return res.redirect('/merchant/login')
            });
        });
    });

export default router;