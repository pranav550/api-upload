const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DomainListSchema = new Schema({
    domainId: {
        type: Number,
        required: true
    },
    domainName: {
        type: String,
        required: true
    }


});

module.exports = mongoose.model("DomainList", DomainListSchema);