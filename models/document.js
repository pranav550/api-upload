const mongoose = require("mongoose");
require('mongoose-uuid2')(mongoose);
var UUID = mongoose.Types.UUID;
var moment = require("moment");
var uuidv4 = require('uuid/v4');
const Schema = mongoose.Schema;



const DocumentSchema = new Schema({
    _id: { type: UUID, default: uuidv4 },

    Title: {
        type: String
    },

    Date: {
        type: Array,
        default: moment(new Date(Date.now())).format('YYYY,MM,DD ')

    },

    datePublished: {
        type: String,
        default: Date.now
    },

    dateUpdated: {
        type: String,
        default: Date.now
    },

    documentType: {
        type: Array,
        default: "post"

    },

    documentSubType: {
        type: Array,
        default: ["call",
            "competiton"
        ],
    },

    assignedToDomain: {
        type: Object,
        domainSource: { type: Array },
        domains: { type: Array },
        redirectTo: { type: Array }
    },

    path: {
        type: String

    },
    language: {
        type: String,
    }



});

module.exports = mongoose.model("Document", DocumentSchema);