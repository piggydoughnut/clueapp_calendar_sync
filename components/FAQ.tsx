import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";

import { useState } from "react";

const FAQElement = ({
  openMe,
  handleOpen,
  question,
  answer,
}: {
  openMe: boolean;
  handleOpen: () => void;
  question: string;
  answer: string | (string | JSX.Element)[];
}) => {
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

export default function FAQ({
  questions,
}: {
  questions: Array<{
    question: string;
    answer: string | Array<React.ReactNode>;
  }>;
}) {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div id="faq">
      {" "}
      <h1 className="md:text-md lg:text-xl font-bold text-center mt-10 mb-8 pt-[5rem] pb-[2rem]">
        Frequently Asked Questions
      </h1>
      {questions.map((el, idx) => (
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
