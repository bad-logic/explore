const { express } = require('./../../config');
const router = express.Router();
const controller = require('./user.controller');
const { verifySession } = require('./../../middlewares/verify');
router.route('/')
    /**
     * POST REQUEST 
     * Purpose: Sign Up
     */
    .post(controller.signUp)
router.route('/login')
    /**
     * POST REQUEST
     * purpose: login
     */
    .post(controller.login)

/**
 * GET REQUEST
 * purpose: get access token
 */
router.get('/valid/access-token', verifySession, controller.getAccessToken);

module.exports = router;