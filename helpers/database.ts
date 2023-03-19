import * as User from "@db/models/user";

/* @ts-ignore */
export const getUser = async (condition) => User.findOne(condition);
