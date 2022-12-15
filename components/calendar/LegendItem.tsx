import { Switch } from "@material-tailwind/react";
const LegendItem = ({
  title,
  color,
  on,
  onChecked,
}: {
  title: string;
  color: string;
  on: boolean;
  onChecked: () => void;
}) => {
  const bgColor = `bg-${color}`;
  return (
    <div className="flex flex-row items-center gap-2">
      <Switch
        id={title}
        className={`${bgColor} not-for-email`}
        checked={on}
        onChange={() => onChecked()}
      />
      <div className="flex justify-center"></div>
      <div className={`${color} pt-2 h-4 w-4 rounded-3xl`}></div>
      <p className="text-tiny uppercase">{title}</p>
    </div>
  );
};

export default LegendItem;
