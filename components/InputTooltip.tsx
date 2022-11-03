import Image from "next/image";
import { Tooltip } from "@material-tailwind/react";
import help from "../public/help-circle.svg";

export default function InputToolTip({ content }: { content: string }) {
  return (
    <Tooltip content={content}>
      <button className="w-24 right-4 absolute mt-[-33px]">
        <Image src={help} alt="helper" />
      </button>
    </Tooltip>
  );
}
