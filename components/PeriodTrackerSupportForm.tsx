import { Button, Input, Radio, Textarea } from "@material-tailwind/react";

export default function PeriodTrackerSupportForm() {
  return (
    <div className="mt-24 flex flex-col justify-center items-center">
      <h2 className="uppercase text-lg mb-4 font-bold">
        Is your period tracker not supported?
      </h2>
      <p className="font-normal">
        Please let us know and we will notify you once we integrate it! ❤️
      </p>
      <div className="flex flex-col gap-2 mt-4 w-[300px]">
        <Input label="your email"></Input>
        <Input label="your tracker name"></Input>
        <div className="">
          <p className="font-normal text-sm pt-2">
            I could be interested in changing my current period tracker app.
          </p>
          <div className="flex gap-10 text-sm">
            <Radio id="yesTracker" name="type" label="Yes" defaultChecked />
            <Radio id="noTracker" name="type" label="No" />
          </div>
        </div>
        <div className="">
          <p className="font-normal text-sm mb-1">
            Please share any feedback that you have
          </p>
          <Textarea></Textarea>
        </div>
        <Button
          className="bg-secondaryButton w-full h-11 capitalize"
          color={"indigo"}
          // onClick={() => setEmailVersion(true)}
        >
          Notify me please
        </Button>
      </div>
    </div>
  );
}
