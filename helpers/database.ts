import User from "@db/models/user";

export const getUser = async (condition: any) => User.findOne(condition);
