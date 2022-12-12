import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
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
      <a className="underline hover:opacity-80 ml-1 mt-1" onClick={handleOpen}>
        Not using Clue?
      </a>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Not Using Clue?</DialogHeader>
        <DialogBody divider>
          <PeriodTrackerSupportForm />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
