import { Switch } from "@material-tailwind/react";
const LegendItem = ({
  title,
  color,
  on,
  onChecked,
  emailVersion = false,
}: {
  title: string;
  color: string;
  on: boolean;
  onChecked: () => void;
  emailVersion: boolean;
}) => {
  console.log(title, " - my on is ", on);
  const bgColor = `bg-${color}`;
  if (emailVersion && !on) {
    return <></>;
  } else
    return (
      <div className="flex flex-row items-center gap-2">
        {!emailVersion && (
          <Switch
            id={title}
            className={bgColor}
            checked={on}
            onChange={() => onChecked()}
          />
        )}
        <div className="flex justify-center"></div>
        <div
          className={`${color} pt-2 h-4 w-4 ${
            emailVersion ? "mt-3" : ""
          } rounded-3xl`}
        ></div>
        <p className="text-tiny uppercase">{title}</p>
      </div>
    );
};

export default LegendItem;
