const mongoose = require("mongoose");
var uuidv4 = require('uuid/v4');
require('mongoose-uuid2')(mongoose);
var UUID = mongoose.Types.UUID;

var moment = require("moment");
const Schema = mongoose.Schema;



const DocumentListSchema = new Schema({
    _id: { type: UUID, default: uuidv4 },

    Title: {
        type: String
    },

    Date: {
        type: Array,
        default: moment(new Date(Date.now())).format('YYYY,MM,DD ')
    },

    documentType: {
        type: String,
        default: 'get'
    },
    datePublished: {
        type: String,
        default: Date.now
    },
    isPublished: {
        type: String,
        enum: ['published',
            'needs_review', 'not published'
        ],
        default: 'published'
    },
    path: {
        type: String

    }



});

module.exports = mongoose.model("DocumentList", DocumentListSchema);