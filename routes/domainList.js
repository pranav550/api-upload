var DomainList = require("../models/DomainList");

module.exports = {
    getDomainList: getDomainList,
    addDomain: addDomain
}

// all domains
function getDomainList(req, res, next) {

    DomainList.find((err, domains) => {
        if (domains.length == 0) {
            res.json({ msg: "Domain Not Found" });
        } else {
            res.send(domains);
        }
    });
};

// initialising post DomainList
function addDomain(req, res) {
    DomainList.findOne({ domainName: req.body.domainName }, (err, result) => {
        if (result) {
            res.json({ msg: "Domain already added." });
        } else {
            let newDomain = new DomainList({
                domainId: req.body.domainId,
                domainName: req.body.domainName
            });
            //calling save functionality
            newDomain.save((err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    res.send(result);
                }

            });
        }
    });
};