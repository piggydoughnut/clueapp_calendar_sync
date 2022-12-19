import { Button, Input, Radio, Textarea } from "@material-tailwind/react";
import { Form, Formik } from "formik";

import Loading from "./Loading";
import axios from "axios";
import { useState } from "react";

const initialValues = {
  youremail: "",
  trackerName: "",
  changeTracker: "",
  feedback: "",
};

export default function PeriodTrackerSupportForm() {
  const [params, setParams] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  return (
    <div className="mx-10 sm:mx-0 mt-24 flex flex-col justify-center items-center">
      <h2 className="uppercase text-md mb-4 font-bold">
        Is your period tracker not supported?
      </h2>
      <p className="font-normal">
        Please let us know and we will notify you once we integrate it! ❤️
      </p>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-2 mt-4 w-full sm:w-[300px]">
          <Formik
            initialValues={params}
            enableReinitialize
            onSubmit={async (vs) => {
              setParams(vs);
              console.log(vs);
              setLoading(true);
              await axios.post("/api/emails/feedback", { ...vs });
              setLoading(false);
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
                      value="yes"
                      onChange={handleChange}
                    />
                    <Radio
                      id="noTracker"
                      name="changeTracker"
                      label="No"
                      value={"no"}
                      onChange={handleChange}
                    />
                  </div>
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

                <div className="h-4 text-tiny text-red-300 text-center">
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
