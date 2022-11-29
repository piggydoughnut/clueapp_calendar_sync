import Image from "next/image";
import minus from "../public/minus-circle-outline.svg";
import plus from "../public/check-circle.svg";

const PriceTag = ({ price }: { price: string }) => {
  return (
    <div className="pl-4 pr-4 h-[35px] pt-1 rounded border border-black text-center text-sm font-bold uppercase">
      <p>{price}</p>
    </div>
  );
};

const ReasonRow = ({ sign, text }) => {
  return (
    <p className="flex flex-row items-start gap-2 text-sm">
      <Image className="w-6 h-6" src={sign} alt={"sign"} />
      <p>{text}</p>
    </p>
  );
};

export default function Pricing({
  type,
  title,
  price,
  reasons,
  children,
  highlight = false,
}) {
  return (
    <div
      className={`rounded-md drop-shadow-md border pt-12 pb-8 pl-7 pr-7 bg-white w-[370px] ${
        highlight ? "shadow-deep-orange-300 border-deep-orange-300" : ""
      }`}
    >
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-md font-bold mb-4 text-center h-12">{title}</h3>
        <PriceTag price={price} />
        {/* <p className="uppercase font-bold text-sm mt-6 mb-6">{title}</p> */}
        <div className="flex flex-col gap-3 mt-6">
          {reasons.map((line) => (
            <ReasonRow
              key={line.text}
              text={line.text}
              sign={line.adv ? plus : minus}
            />
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
