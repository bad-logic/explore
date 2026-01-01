const { mongoose } = require('./../../config/db.config');
const schema = mongoose.Schema;

const taskSchema = new schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _listid: {
        type: schema.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const taskModel = mongoose.model('task', taskSchema);
module.exports = taskModel;