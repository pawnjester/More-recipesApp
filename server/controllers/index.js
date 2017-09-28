import express from 'express';
let router = express.Router();

router.use(require('./recipes'))

export default router;
