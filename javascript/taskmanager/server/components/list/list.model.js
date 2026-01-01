const { mongoose } = require('../../config/db.config');
const schema = mongoose.Schema;

const listSchema = new schema({
    title: {
        type: String,
        require: true,
        minlength: 1,
        trim: true // to remove the whitespace at the end and start of the string
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const listModel = mongoose.model('list', listSchema);
module.exports = listModel;