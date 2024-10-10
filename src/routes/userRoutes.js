const express = require('express');
const { register, login } = require('../controllers/authController');
const { getProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

// module.exports = router;
export default router; // Экспорт по умолчанию