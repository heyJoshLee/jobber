import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 120
  },
  url: {
    type: String
  },
  notes: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 1
  },
  phone: {
    type: String
  },
  addressLine1: {
    type: String
  },
  addressLine2: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: String
  },
  country: {
    type: String,
  },
  userId: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const company = mongoose.model('Company', companySchema)

export default company