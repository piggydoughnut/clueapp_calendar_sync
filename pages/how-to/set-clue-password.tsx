import Image from "next/image";
import Layout from "../../components/nav/Layout";

export default function SetCluePassword() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg md:text-md lg:text-xl font-bold text-center mt-10 mb-8 pt-[2rem] pb-[2rem]">
          How to Set password for Clue App
        </h1>
        <div className="flex flex-col">
          <ol className="list-decimal list-inside">
            <li className="mt-10 text-lg">
              <>
                Open Clue App
                <Image alt="step1" className="mt-6" src="/howto/step1.png" />
              </>
            </li>
            <li className="mt-10 text-lg">
              <>
                Open Settings
                <Image
                  alt="step2"
                  className="mt-6"
                  src="/howto/step2.png"
                  width={300}
                />
              </>
            </li>
            <li className="mt-10 text-lg">
              <>
                Enter Profile Tab
                <Image
                  alt="step3"
                  className="mt-6"
                  src="/howto/step3.png"
                  width={300}
                />
              </>
            </li>
            <li className="mt-10 text-lg">
              <>
                Click on Password section
                <Image
                  alt="step4"
                  className="mt-6"
                  src="/howto/step4.png"
                  width={300}
                />
              </>
            </li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}
