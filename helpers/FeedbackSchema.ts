import * as Yup from "yup";

const FeedbackSchema = Yup.object().shape({
  youremail: Yup.string().email().required(),
  trackerName: Yup.string().max(250).required(),
  whychange: Yup.string().max(500),
  changeTracker: Yup.boolean().required(),
  feedback: Yup.string().max(1000).required(),
});

export default FeedbackSchema;
