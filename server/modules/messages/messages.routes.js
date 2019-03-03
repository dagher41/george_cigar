import { Router } from 'express';
import axios from 'axios';

const router = new Router();
router
    .route('/messages')
    .post((req, res) => {
        axios({
            method: 'get',
            url: 'https://script.google.com/macros/s/AKfycbyLv0aUKEVjlLbcM7rYjueRCd5VDE_7qze9qg3RW1q-vRxj7bPe/exec',
            params: Object.assign({}, req.body, { timestamp: (new Date()).toString() })
        })
            .then(response => {
                res.json(response.data)
            })

    })

export default router;