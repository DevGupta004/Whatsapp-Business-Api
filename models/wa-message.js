const { string } = require("joi");
const mongoose = require("mongoose");

/**
 * @description - Schema for storing video and folder item
 * @property {string} id - id
 * @property {string} text - txt
 * @property {string} mime_type - type
 * @property {objectId} userId - userId for the banner
 * @property {number} status - [0: inactive, 1: active, 2: deleted]
 */

const WAMessage = new mongoose.Schema(
  {
    id: String,
    text: String,
    mime_type: String,
    sha256: String,
    status: { type: Number, default: 1 },
  },
  { timestamps: true }
);

exports.WAMessage = WAMessage;
