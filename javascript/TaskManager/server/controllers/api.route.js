const { express } = require('./../config/index');
const router = express.Router();
const listroutes = require('../components/list/list.route');
const taskroutes = require('../components/task/task.route');
const userroutes = require('./../components/user/user.route');

router.use('/user', userroutes);
router.use('/list', listroutes);
router.use('/task', taskroutes);
module.exports = router;