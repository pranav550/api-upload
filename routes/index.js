var express = require("express");
var router = express.Router();
var multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })



const domainPropertiesController = require('./domainProperties')
const domainListController = require('./domainList')
const documentListController = require('./documentList')
const documentPropertiesController = require('./document')
router.get("/domain/:domainName", domainPropertiesController.getDomainProperties)
router.post("/addDomainProperties", upload.single('domainLogo'), domainPropertiesController.addDomainProperties)
router.post("/addDomain", domainListController.addDomain)
router.get("/domains/list", domainListController.getDomainList)
router.get("/:domainName/list", documentListController.getDocumentList)
router.post("/addDocumentList", upload.single('domainLogo'), documentListController.addDocumentList)
router.get("/:assignedToDomain/:_id", documentPropertiesController.getDocumentProperties)
router.post("/addDocument", upload.single('domainLogo'), documentPropertiesController.addDocumentProperties)
module.exports = router