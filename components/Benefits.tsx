import Image from "next/image";
import balance from "../public/balance.svg";
import cal from "../public/calendar-icon.svg";
import eq from "../public/eq.svg";
import heart from "../public/heart-pulse.svg";
import plus from "../public/plus.svg";

const Title = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <p className="uppercase text-sm font-bold text-center mb-4">
    {title}
    <br />{" "}
    <span className="text-gray-500 capitalize font-normal text-tiny">
      {subtitle}
    </span>
  </p>
);

export default function Benefits() {
  return (
    <div className="flex flex-col items-center sm:items-even md:flex-row gap-6">
      <div className="flex flex-col items-center gap-2 p-4">
        <div className="h-[40px] w-[40px] bg-pink-50 rounded-full border-2 border-blue-gray-900 flex items-center justify-center">
          <Image src={heart} width={24} height={24} alt="heart" />
        </div>
        <div>
          <Title title="Your cycle data" subtitle="Personal data" />
          <ul className="list-disc list-inside text-sm">
            <li>your personal slow days</li>
            <li>days when you can put extra work in</li>
            <li>extra self care days</li>
            <li>days when you can be impatient</li>
            <li>days not made for social interaction</li>
          </ul>
        </div>
      </div>
      <Image src={plus} width={24} height={24} alt="plus" />
      <div className="flex flex-col items-center gap-2 p-4">
        <div className="h-[40px] w-[40px] bg-green-50 rounded-full border-2 border-blue-gray-900 flex items-center justify-center">
          <Image src={cal} width={24} height={24} alt="heart" />
        </div>
        <Title
          title="Your Google Calendar"
          subtitle="Your life/work schedule"
        />

        <ul className="list-disc list-inside text-sm">
          <li>plan your work mettings</li>
          <li>schedule dates</li>
          <li>add reminders for events to attend</li>
          <li>receive call invitations</li>
          <li>create travel plans</li>
        </ul>
      </div>
      <Image src={eq} width={24} height={24} alt="eq" />{" "}
      <div className="flex flex-col items-center gap-2 p-4">
        <div className="h-[40px] w-[40px] bg-pink-50 rounded-full border-2 border-blue-gray-900 flex items-center justify-center">
          <Image src={balance} width={24} height={24} alt="heart" />
        </div>
        <Title title="Balance" subtitle="Less stress, more life" />
        <ul className="list-disc list-inside text-sm">
          <li>You know when to schedule busy days.</li>
          <li>You know when to take it slow.</li>
          <li>You are in tune with yourself.</li>
          <li>You are less stressed.</li>
          <li>You are confident in yourself.</li>
        </ul>
      </div>
    </div>
  );
}
