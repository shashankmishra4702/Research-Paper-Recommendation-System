import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      //Required means that you cannot add a user without adding its username
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },

  },
  
  //Timestamp stores the time of creation and time of edit of the user in mongoDB
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;