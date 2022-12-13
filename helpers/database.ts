import * as User from "../db/models/user";

export const getUser = async (condition) => User.findOne(condition);
