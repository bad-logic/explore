module.exports = function(req, db_obj) {
    if (req.first_name)
        db_obj.first_name = req.first_name;
    if (req.last_name)
        db_obj.last_name = req.last_name;
    if (req.phone)
        db_obj.phone = req.phone;
}