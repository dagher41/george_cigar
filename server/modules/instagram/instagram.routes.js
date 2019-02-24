import { Router } from 'express';
import instagram from './services/instagram-client';
import db from '../../models';
import * as imageProcessor from './services/image-fetch';

const { Integration } = db;

const router = new Router();
router
   .route('/auth/instagram')
   .get((req, res) => {
      res.redirect(
         instagram.getAuthorizationUrl(
            process.env.INSTAGRAM_AUTH_CALLBACK,
            {
               scope: ['basic'],
            }
         )
      );
   });

router.route('/auth/instagram/callback')
   .get((req, res) => {
      const code = req.query.code;
      instagram.authorizeUser(code, process.env.INSTAGRAM_AUTH_CALLBACK)
         .then(data => {
            return new Promise((resolve, reject) => {
               Integration.findOne({ where: { accessToken: data.access_token } })
                  .then(integration => {
                     resolve({ response: data, integration })
                  })
                  .catch(reject);
            })

         })
         .then(data => {
            if (!data.integration) {
               return Integration.create({
                  source: 'instagram',
                  sourceUserId: data.response.user.id,
                  accessToken: data.response.access_token,
                  status: 1
               });
            }
            return data.integration;
         })
         .then(integration => {


            res.json(integration);
         })
         .catch(error => {
            res.status(500).json(error);
         });
   });

router.route('/instagram/fetch_images')
   .get((req, res) => {
      Integration.findByPk(1)
         .then(integration => {
            imageProcessor.processImages(integration.accessToken)
               .then(result => {
                  res.json(result);
               })
               .catch(error => {
                  res.json(error);
               })
         })
   })


export default router;
