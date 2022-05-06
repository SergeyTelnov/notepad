const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    headerTask: { type: String, required: true },
    contentTask: { type: String, required: true },
    // user page with comment
    pageId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // the user who wrote the comment
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

module.exports = model("Task", schema);
