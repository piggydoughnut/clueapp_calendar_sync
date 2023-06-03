import mongoose, { Model } from "mongoose";

import { User as UserInerface } from "./types";

const User: Model<Document & UserInerface> =
  mongoose.models.users ??
  mongoose.model(
    "users",
    new mongoose.Schema({
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
      googleEvents: [],
      signupTokens: [
        {
          token: String,
          used: Number,
        },
      ],
    })
  );

export default User;
