var connection = require('../config/database'),
    resSchema = require('../models/reservation'),
    Reservation = connection.model('Reservation', resSchema);

Date.prototype.ddmmyyyy = function () {
    var dd = this.getDate();
    var mm = parseInt(this.getMonth())+1;
    var yyyy = this.getFullYear();
    if (mm<10) { mm = '0'+mm; }
    if (dd<10) { dd = '0'+dd; }
    return [dd, '.', mm, '.', yyyy].join('');
};

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
    rezervace.save(function (err, status) {
        if(err) {
            //console.log(err);
            //res.send('CHYBA SERVER ', err);
            res.sendStatus(400);
        }
        else { res.sendStatus(200);}
    });
};
exports.findAll = function (req, res) {
    Reservation.find(function (err, data) {
        if(err) { res.send(err);}
        res.json(data);
    });
};
exports.findForDay = function (req, res) {
    var arr = [];
    Reservation.find(function (err, data) {
        if (err) { res.send(err); }
        for (var i=0; i<data.length; i++) {
            if (data[i].startDate.ddmmyyyy() === req.params.date) {
                arr.push(data[i]);
            }
        }
        res.send(arr);
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