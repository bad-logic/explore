const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ContactSchema = new schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    }
    },
    {
        timestamps:true
    }

);
const ContactModel = mongoose.model('contact', ContactSchema);
module.exports = ContactModel;