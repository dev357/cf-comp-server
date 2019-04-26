import mongoose, { Schema } from 'mongoose';
const { ObjectId } = Schema.Types;

const divisionSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const competitorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  division: ObjectId
});

const competitionSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    divisions: [divisionSchema],
    competitors: [competitorSchema]
  },
  {
    timestamps: true
  }
);

const Competition = mongoose.model('Competition', competitionSchema);

export default Competition;
