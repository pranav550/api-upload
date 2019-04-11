const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DomainPropertiesSchema = new Schema({
    domainId: {
        type: Number,
        required: true
    },
    domainName: {
        type: String,
        required: true
    },
    domainURLScheme: {
        type: String,
        required: true
    },
    domainTitle: {
        type: String,
        required: true
    },
    domainLogo: {
        type: String,
        required: true
    },
    domainSNSIcon: {
        type: String,

    }


});

module.exports = mongoose.model("DomainProperties", DomainPropertiesSchema);