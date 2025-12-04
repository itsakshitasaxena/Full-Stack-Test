const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const { ensureAuth } = require('../middleware/auth.middleware');
const { requireRole } = require('../middleware/role.middleware');

router.get('/dashboard', ensureAuth, requireRole('admin'), adminController.getDashboardStats);

router.post('/accounts/:id/approve', ensureAuth, requireRole('admin'), adminController.approveAccount);
router.post('/accounts/:id/reject', ensureAuth, requireRole('admin'), adminController.rejectAccount);

router.post('/credit/:retailerId/set', ensureAuth, requireRole('admin'), adminController.setCreditLimit);
router.get('/credit/:retailerId', ensureAuth, requireRole('admin'), adminController.getCreditInfo);

router.post('/pricing/tiers', ensureAuth, requireRole('admin'), adminController.createGlobalTier);
router.put('/pricing/tiers/:id', ensureAuth, requireRole('admin'), adminController.updateGlobalTier);
router.delete('/pricing/tiers/:id', ensureAuth, requireRole('admin'), adminController.deleteGlobalTier);

module.exports = router;
