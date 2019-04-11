var DomainProperites = require("../models/DomainProperties");


module.exports = {
    getDomainProperties: getDomainProperties,
    addDomainProperties: addDomainProperties
}



// Get Domain Properies
function getDomainProperties(req, res) {
    DomainProperites.find({ domainName: req.params.domainName }, (err, result) => {
        if (err) {
            res.json({ err: "fail to get DomainDetails " });
        } else {
            res.send(result);
        }
    });
};
// initialising post method to add domain properties
function addDomainProperties(req, res) {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return false
    }
    let newDomain = new DomainProperites({
        domainId: req.body.domainId,
        domainName: req.body.domainName,
        domainURLScheme: req.body.domainURLScheme,
        domainTitle: req.body.domainTitle,
        domainLogo: file.path,
        domainSNSIcon: file.path
    });
    newDomain.save((err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log('hihii')
            var domainSNSIcon = file.path
            var mergedObj = {...file, ...result._doc };
            res.send(mergedObj);
        }
    })
}