var connection = require('../config/database'),
    resSchema = require('../models/reservation'),
    Reservation = connection.model('Reservation', resSchema);

exports.createReservation = function (req, res) {
    var tel = Number(req.body.tel);
    var rezervace = Reservation({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        table: req.body.tableId,
        name: req.body.jmeno,
        surname: req.body.prijmeni,
        email: req.body.email,
        phone: tel
    });
    rezervace.save(function (err, data) {
        if(err) {
            console.log(err);
            res.send(err);
        }
    });
};
exports.findAll = function (req, res) {
    Reservation.find(function (err, data) {
        if(err) { res.send(err);}
        res.json(data);
    });
};

exports.deleteReservation = function (req, res) {
    Reservation.findByIdAndRemove(req.params.id, function (err) {
        if (err) { res.send(err); }
    });
};
exports.editReservation = function (req, res) {
    Reservation.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err) {
        if (err) { res.send(err); }
    });
};