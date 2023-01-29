import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

import { useState } from "react";

const faqQuestions = [
  {
    question: "How does billing work?",
    answer:
      "It is a monthly subscription. By paying the subscription you receive a service and we get to keep running our service and improving it.",
  },
  {
    question: "How will my cycle predictions stay updated?",
    answer:
      "We will periodically check in with your tracking up if there has been any changes to the start of your cycle. If we detect any changes we will reschedule existing events so you stay up to date.",
  },
  {
    question: "How can I cancel?",
    answer: [
      "If you want to cancel, just ",
      <a
        key="emailme"
        href="mailto:hello@dariah.dev"
        className="underline hover:opacity-70 text-secondaryButton underline-offset-4 font-bold underline-4 decoration-2"
      >
        email me
      </a>,
      "and I will cancel your subscription. Currently, automated cancelling mechanism haven't been implemented yet. I am working on it.",
    ],
  },
];

const FAQElement = ({ openMe, handleOpen, question, answer }) => {
  return (
    <Accordion open={openMe}>
      <AccordionHeader
        className="text-md text-start"
        onClick={() => handleOpen()}
      >
        {question}
      </AccordionHeader>
      <AccordionBody className="font-normal">{answer}</AccordionBody>
    </Accordion>
  );
};

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
      {faqQuestions.map((el, idx) => (
        <FAQElement
          openMe={open === idx + 1}
          handleOpen={() => handleOpen(idx + 1)}
          key={el.question}
          question={el.question}
          answer={el.answer}
        />
      ))}
    </div>
  );
}
