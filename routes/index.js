var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Test Raspi-io'
    });
});

router.get('/voice', function(req, res) {
    res.render('voice', {
        title: 'Test Raspi-io With Voice'
    });
});

module.exports = router;
