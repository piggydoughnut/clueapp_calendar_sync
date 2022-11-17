import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

import { useState } from "react";

export default function FAQ() {
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div id="faq">
      {" "}
      <h1 className="md:text-md lg:text-xl font-bold text-center mt-10 mb-8 pt-[5rem] pb-[2rem]">
        Frequently Asked Questions
      </h1>
      <Accordion open={open === 1}>
        <AccordionHeader className="text-md" onClick={() => handleOpen(1)}>
          How does billing work?
        </AccordionHeader>
        <AccordionBody className="font-normal">
          It is a monthly subscription. By paying the subscription you receive a
          service and we get to keep running our service and improving it.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader className="text-md" onClick={() => handleOpen(2)}>
          How will my cycle predictions stay updated?
        </AccordionHeader>
        <AccordionBody className="font-normal">
          We will periodically check in with your tracking up if there has been
          any changes to the start of your cycle. If we detect any changes we
          will reschedule existing events so you stay up to date.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader className="text-md" onClick={() => handleOpen(3)}>
          How can I cancel?
        </AccordionHeader>
        <AccordionBody className="font-normal">
          If you want to cancel, just{" "}
          <a
            href="mailto:hello@dariah.dev"
            className="underline hover:opacity-70 text-secondaryButton underline-offset-4 font-bold underline-4 decoration-2"
          >
            email me
          </a>{" "}
          and I will cancel your subscription. Currently, automated cancelling
          mechanism haven't been implemented yet. I am working on it.
        </AccordionBody>
      </Accordion>
    </div>
  );
}
