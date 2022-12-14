import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Radio,
  Textarea,
} from "@material-tailwind/react";
import { Fragment, useState } from "react";

import PeriodTrackerSupportForm from "./PeriodTrackerSupportForm";

export default function ClueDialog() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      {/* <Button onClick={handleOpen} variant="gradient">
        Not using Clue?
      </Button> */}
      <a
        className="underline hover:opacity-80 ml-1 mt-1 cursor-pointer"
        onClick={handleOpen}
      >
        Not using Clue?
      </a>
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader className="text-lg">Not Using Clue?</DialogHeader>
        <DialogBody divider className="mx-10">
          <div className="mx-10 sm:mx-0 flex flex-col justify-center items-center">
            <h2 className="uppercase text-md mb-4 font-bold">
              Is your period tracker not supported?
            </h2>
            <p className="font-normal">
              Please help us by answering a few questions so we can improve our
              service. ❤️
            </p>
            <div className="flex flex-col gap-2 mt-4 w-full sm:w-[300px]">
              <Input label="your email"></Input>
              <Input label="your tracker name"></Input>
              <div className="">
                <p className="font-normal text-sm pt-2">
                  I could be interested in changing my current period tracker
                  app.
                </p>
                <div className="flex gap-10 text-sm">
                  <Radio
                    id="yesTracker"
                    name="type"
                    label="Yes"
                    defaultChecked
                  />
                  <Radio id="noTracker" name="type" label="No" />
                </div>
              </div>
              <div className="">
                <p className="font-normal text-sm mb-1">
                  Please share any feedback that you have
                </p>
                <Textarea></Textarea>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-between">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="indigo" onClick={handleOpen}>
            <span>Notify me please</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
