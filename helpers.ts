import { format } from "date-fns";

export const getDateFormat = (d: string) => format(new Date(d), "do MMM yyyy");
