const router = require('express').Router();
const contactModel = require('./../models/contact.model.js');
const mapContact = require('./../helpers/contactobjectMapper.js');
router.get('/', function(req, res, next) {
    res.send('landing page');
});

router.route('/contact')
    //retrieve contacts
    .get(function(req, res, next) {
        var condition = {};
        contactModel.find(condition)
            .exec(function(err, contacts) {
                if (err) {
                    return next(err);
                }
                res.status(200).json(contacts);
            });
    })
    // add contacts
    .post(function(req, res, next) {
        console.log('request object >>', req.body);
        let new_contact = new contactModel({});
        mapContact(req.body, new_contact);
        console.log("saved data>>>", new_contact);
        new_contact.save(function(err, done) {
            if (err) {
                return next(err);
            }
            res.status(200).json(done)
        });
    });
// get contact by id 
router.route('/contact/:id')
    .get(function(req, res, next) {
        contactModel.findById(req.params.id, function(err, contact) {
            if (err) {
                return next(err);
            }
            res.status(200).json(contact);
        });
    })
    // update the contact by id
    .put(function(req, res, next) {
        console.log("req body>>", req.body);
        console.log("req params>>", req.params.id);
        contactModel.findById(req.params.id, function(err, contact) {
            if (err) {
                return next(err);
            }
            mapContact(req.body, contact);
            console.log("data to be updated>>>", contact);
            contact.save(function(err, done) {
                if (err) {
                    return next(err);
                }
                return res.status(200).json(done);
            });
        });
    })
    // delete contact by id
    .delete(function(req, res, next) {
        console.log(req.params.id);
        contactModel.findById(req.params.id, function(err, contact) {
            if (err) {
                return next(err);
            }
            if (!contact) {
                return next({
                    msg: 'no such contact available in database'
                });
            }
            contact.remove(function(err, done) {
                if (err) {
                    return next(err);
                }
                res.status(200).json(done);
            });
        });
    });


module.exports = router;