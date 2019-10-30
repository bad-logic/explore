const { express } = require('./../../config');
const router = express.Router();
const listController = require('./list.controller');
const { authenticate } = require('./../../middlewares/verify');

router.route('/')
    /**
     * GET REQUEST to get all the lists from database that belong to the authenticated user
     */
    .get(authenticate, listController.getlists)
    /**
     * POST REQUEST to insert new list to the database
     */
    .post(authenticate, listController.insertlist);

router.route('/:id')
    /**
     * GET REQUEST to get a particular list by ID
     */
    .get(authenticate, listController.getlistById)
    /** 
     * PUT REQUEST to edit/update the list corresponding the given id
     */
    .put(authenticate, listController.editlistById)
    /**
     * DELETE REQUEST to delete the given lists and all the tasks associated with it
     */
    .delete(authenticate, listController.deletelistById);

module.exports = router;