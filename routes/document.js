var Document = require("../models/document");



module.exports = {
    getDocumentProperties: getDocumentProperties,
    addDocumentProperties: addDocumentProperties
}

// fetching Document based on id
function getDocumentProperties(req, res) {
    Document.find({ $and: [{ "assignedToDomain.domainSource": req.params.assignedToDomain }, { "_id": req.params._id }] },
        (err, result) => {
            if (err) {
                res.json({ err: "fail to get DomainDetails " });
            } else {
                const obj = {
                    "dc.Date": result[0].Date,
                    "documentType": result[0].documentType,
                    "documentSubType": result[0].documentSubType,
                    "datePublished": result[0].datePublished,
                    "dc.Title": result[0].Title,
                    "dateUpdated": result[0].dateUpdated,
                    "path": result[0].path,
                    "_id": result[0]._id,
                    "datePublished": result[0].datePublished,
                    "language": result[0].language,
                    "path": result[0].path,
                    "assignedToDomain": result[0]
                }
                res.send(obj);
            }
        });
};



//initialising post Document
function addDocumentProperties(req, res, next) {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }

    let newDomain = new Document({
        Title: req.body.Title,
        language: req.body.language,
        "assignedToDomain": {
            domainSource: req.body.domainSource,
            domains: req.body.domains,
            redirectTo: req.body.redirectTo
        }
    });
    // calling save functionality
    newDomain.save((err, result) => {
        if (err) {
            res.json(err);
        } else {

            const obj = {
                "dc.Date": result.Date,
                "documentType": result.documentType,
                "documentSubType": result.documentSubType,
                "datePublished": result.datePublished,
                "dc.Title": result.Title,
                "dateUpdated": result.dateUpdated,
                "path": result.path,
                "_id": result._id,
                "datePublished": result.datePublished,
                "language": result.language,
                "path": result.path,
                "assignedToDomain": {
                    "domainSource": result.domainSource,
                    "domains": result.domains,
                    "redirectTo": result.redirectTo
                }
            }
            res.send(obj);
        }

    });

};