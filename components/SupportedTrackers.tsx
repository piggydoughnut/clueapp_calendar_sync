import Image from "next/image";
export default function SupportedTrackers({}: {}) {
  return (
    <div className="text-center sm:text-left mt-6">
      <h2 className="uppercase text-md sm:text-tiny mt-2 mb-4 sm:mb-2 opacity-60">
        Supported trackers
      </h2>
      <Image
        src="/clue.png"
        width={120}
        height={40}
        alt="exteralSource"
        className="m-auto sm:m-0"
      />
      <p className="mr-8 ml-8 sm:ml-0 sm:mr-0 max-w-[400px] text-sm opacity-70 mt-4 sm:mt-0">
        <a
          className="underline hover:opacity-80 ml-1 mt-1 text-md sm:text-tiny"
          href="#periodtrackerform"
        >
          Not using Clue?
        </a>
      </p>
    </div>
  );
}
