import { Button, Input, Radio, Textarea } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import { use, useState } from "react";

import FeedbackSchema from "../helpers/FeedbackSchema";
import Loading from "./Loading";
import axios from "axios";

const initialValues = {
  youremail: "",
  trackerName: "",
  whychange: "",
  changeTracker: "",
  feedback: "",
};

export default function PeriodTrackerSupportForm() {
  const [params, setParams] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const message =
    "Thank you for your feedback.❤️ We will update you on the new developments.";

  return (
    <div className="mx-10 sm:mx-0 mt-24 flex flex-col justify-center items-center">
      <h2 className="uppercase text-md mb-4 font-bold">
        Is your period tracker not supported?
      </h2>
      {loading && <Loading />}
      {showMessage && <p>{message}</p>}
      {!loading && !showMessage && (
        <div className="flex flex-col gap-2 mt-4 w-full sm:w-[300px]">
          <p className="font-normal">
            Please let us know and we will notify you once we integrate it! ❤️
          </p>
          <Formik
            initialValues={params}
            enableReinitialize
            validationSchema={FeedbackSchema}
            onSubmit={async (vs) => {
              setParams(vs);
              console.log(vs);
              setLoading(true);
              await axios.post("/api/emails/feedback", { ...vs });
              setLoading(false);
              setShowMessage(true);
            }}
          >
            {({ values, errors, handleChange, touched }) => (
              <Form className="flex flex-col gap-4">
                <div>
                  <Input
                    id="youremail"
                    name="youremail"
                    width={20}
                    title="Your email"
                    label="Your email"
                    type="email"
                    value={values.youremail}
                    onChange={handleChange}
                    error={Boolean(errors.youremail)}
                  ></Input>
                </div>
                <div>
                  <Input
                    id="trackerName"
                    name="trackerName"
                    title="Tracker name"
                    label="Tracker name"
                    type="text"
                    value={values.trackerName}
                    onChange={handleChange}
                    error={Boolean(errors.trackerName)}
                  ></Input>
                </div>
                <div className="">
                  <p className="font-normal text-sm pt-2">
                    I could be interested in changing my current period tracker
                    app.
                  </p>
                  <div className="flex gap-10 text-sm">
                    <Radio
                      id="yesTracker"
                      name="changeTracker"
                      label="Yes"
                      value="true"
                      onChange={handleChange}
                    />
                    <Radio
                      id="noTracker"
                      name="changeTracker"
                      label="No"
                      value="false"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  {values.changeTracker === "false" && (
                    <Textarea
                      id="whychange"
                      label={`Please explain why`}
                      name="whychange"
                      rows={5}
                      onChange={handleChange}
                    />
                  )}
                </div>
                <div>
                  <Textarea
                    id="feedback"
                    label="Please share any feedback that you have"
                    name="feedback"
                    rows={5}
                    onChange={handleChange}
                  />
                </div>

                <div className="h-8 text-tiny text-red-300 text-center">
                  {Object.values(errors)[0] && "Please fill in all the fields"}
                  <br />
                  {Object.values(errors)[0]}
                </div>
                <Button
                  type="submit"
                  className="bg-secondaryButton w-full h-11 capitalize"
                >
                  Notify me please
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
