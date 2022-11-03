import * as Yup from "yup";
const AVG_CYCLE_MSG = "Average cycle length is 21-45 days.";

const AVG_PERIOD_MSG = "Average period length is 1-9 days.";

const FormSchema = Yup.object().shape({
  periodLength: Yup.number()
    .required("A number between 1 and 9 is required")
    .max(9, AVG_PERIOD_MSG)
    .min(1, AVG_PERIOD_MSG)
    .typeError("A number between 1 and 9 is required"),
  cycleLength: Yup.number()
    .required("Required")
    .max(45, AVG_CYCLE_MSG)
    .min(21, AVG_CYCLE_MSG)
    .typeError("A number between 21 and 45 is required"),
  start: Yup.date().required("Please enter period start date."),
});

export default FormSchema;
