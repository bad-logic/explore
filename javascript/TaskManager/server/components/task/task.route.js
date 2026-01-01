const { express } = require('./../../config');
const router = express.Router();
const taskController = require('./task.controller');
const { authenticate } = require('./../../middlewares/verify');

router.route('/:listId/')
    /**
     * GET REQUEST to get all the tasks of the given list Id
     */
    .get(authenticate, taskController.getTasks)
    /**
     * POST REQUEST to add/insert tasks to the given list Id
     */
    .post(authenticate, taskController.insertTask);

router.route('/:listId/:taskId')
    /**
     * GET REQUEST to get a particular task by ID
     */
    .get(authenticate, taskController.getTaskById)
    /**
     * PUT REQUEST to update/edit the task of the given taskID
     */
    .put(authenticate, taskController.editTaskById)
    /**
     * DELETE REQUEST to delete the task corresponding to given task ID
     */
    .delete(authenticate, taskController.deleteTaskById);

module.exports = router;