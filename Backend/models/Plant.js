const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plant name is required'],
    trim: true,
    maxlength: [100, 'Plant name cannot exceed 100 characters']
  },
  species: {
    type: String,
    required: [true, 'Species is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  light: {
    type: String,
    required: [true, 'Light requirement is required'],
    enum: {
      values: ['Low', 'Medium', 'Bright', 'Bright indirect'],
      message: '{VALUE} is not a valid light requirement'
    }
  },
  water: {
    type: String,
    required: [true, 'Water requirement is required'],
    enum: {
      values: ['Weekly', 'Bi-weekly', 'Monthly', 'When dry'],
      message: '{VALUE} is not a valid water requirement'
    }
  },
  temp: {
    type: String,
    required: [true, 'Temperature range is required'],
    validate: {
      validator: function(v) {
        return /^\d+-\d+°[CF]$/.test(v);
      },
      message: props => `${props.value} is not a valid temperature range (e.g., '18-24°C')`
    }
  },
  humidity: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/300?text=Plant+Image',
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\..+/.test(v);
      },
      message: props => `${props.value} is not a valid URL`
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Plant', plantSchema);