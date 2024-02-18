import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 120
  },
  url: {
    type: String,
    default: 'none'
  },
  rating: {
    type: Number,
    default: 1
  },
  status: {
    type: Number,
    default: 1
  },
  notes: {
    type: String,
    default: ''
  },
  companyID: {
    type: String
  },
  userId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const application = mongoose.model('Application', applicationSchema)

export default application