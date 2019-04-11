var DocumentList = require("../models/documentList");


module.exports = {
    getDocumentList: getDocumentList,
    addDocumentList: addDocumentList
}


// get all DocumentList
function getDocumentList(req, res, next) {
    DocumentList.find({ domainName: req.params.Title }, (err, result) => {
        var array = []
        if (err) {
            res.json({ err: "fail to get DomainDetails " });
        } else {
            for (let i = 0; i < result.length; i++) {
                array.push(obj = {
                    "dc.Date": result[i].Date,
                    "documentType": result[i].documentType,
                    "isPublished": result[i].isPublished,
                    "dc.Title": result[i].Title,
                    "path": result[i].path,
                    "_id": result[i]._id,
                    "datePublished": result[i].datePublished
                })

                if (result.length === i + 1) {
                    res.send(array);
                }

            }

        }
    });
};


// initialising post DocumentList
function addDocumentList(req, res, next) {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)

    }
    let newDocumentList = new DocumentList({
        Title: req.body.Title,
        path: file.path,
    });

    //calling save functionality
    newDocumentList.save((err, result) => {
        if (err) {
            res.json(err);
        } else {
            const obj = {
                "dc.Date": result.Date,
                "documentType": result.documentType,
                "isPublished": result.isPublished,
                "dc.Title": result.Title,
                "path": file.path,
                "_id": result._id,
                "datePublished": result.datePublished,

            }
            res.send(obj);
        }

    });

};