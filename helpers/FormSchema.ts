import * as Yup from "yup";
const AVG_CYCLE_MSG = "Average cycle length is 21-45 days.";

const AVG_PERIOD_MSG = "Average period length is 1-9 days.";

const FormSchema = Yup.object().shape({
  periodLength: Yup.number()
    .required(AVG_PERIOD_MSG)
    .max(9, AVG_PERIOD_MSG)
    .min(1, AVG_PERIOD_MSG),
  cycleLength: Yup.number()
    .required(AVG_CYCLE_MSG)
    .max(45, AVG_CYCLE_MSG)
    .min(21, AVG_CYCLE_MSG),
  start: Yup.date().required("Please enter period start date."),
});

export default FormSchema;
