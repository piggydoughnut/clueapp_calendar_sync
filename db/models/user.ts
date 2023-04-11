// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  refreshToken: String,
  scope: String,
  idToken: String,
  accessToken: String,
  calendarId: String,
  clue: {
    accessDetails: {
      email: String,
      password: String,
    },
    data: [
      {
        completed: Boolean,
        start: String,
        end: String,
        excluded: Boolean,
        expectedLength: Number,
        isValid: Boolean,
        length: Number,
        phases: [],
        predicted: Boolean,
      },
    ],
  },
  signupTokens: [
    {
      token: String,
      used: Number,
    },
  ],
});

// encrypt ClueData, refreshToken

let User;
try {
  User = mongoose.model("users");
} catch {
  const UserSchema = new mongoose.Schema({
    // ...
  });

  User = mongoose.model("users", UserSchema);
}

export default User;
