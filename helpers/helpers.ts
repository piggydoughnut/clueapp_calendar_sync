import { format } from "date-fns";
import openssl from "openssl-nodejs";

export const getDateFormat = (d: string) => format(new Date(d), "do MMM yyyy");

export const getRando = () =>
  new Promise((resolve, reject) => {
    openssl(
      ["rand", "-base64", "24"],
      function (err: Array<unknown>, buffer: string) {
        if (err.length > 0) {
          return reject(err);
        }
        return resolve(buffer[0].toString());
      }
    );
  });
