const mongoose = require("mongoose");
const {WAMessage} = require("./wa-message");


const WhatsAppBusinessApi = mongoose.model(
  "WhatsAppBusinessApi",
  new mongoose.Schema(
    {
      waNumber: { type: String, index: true, required: true },
      orderIndex: { type: Number, default: 0 },
      waMessage: [WAMessage],
      text: {type: String},
      sendMessage: { type: Boolean, default: false },
      isTemplete: { type: Boolean, default: false },
      status: { type: Number, default: 1 },
      orgId: mongoose.Schema.Types.ObjectId,
      appId: mongoose.Schema.Types.ObjectId,
      userId: mongoose.Schema.Types.ObjectId,
    },
    { timestamps: true }
  )
);

exports.WhatsAppBusinessApiSchema = WhatsAppBusinessApi;
