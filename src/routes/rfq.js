const express = require('express');
const router = express.Router();

const rfqController = require('../controllers/rfq.controller');
const { ensureAuth } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');

router.post('/', ensureAuth, rfqController.createRFQ);
router.get('/', ensureAuth, rfqController.listMyRFQs);

router.get('/admin/all', ensureAuth, requireRole('admin'), rfqController.listAllRFQs);
router.post('/:id/respond', ensureAuth, requireRole('admin'), rfqController.respondToRFQ);

module.exports = router;
