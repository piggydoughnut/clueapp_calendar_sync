import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Layout from "../components/Layout";
import PeriodTrackerSupportForm from "../components/PeriodTrackerSupportForm";
import QA from "../components/QA";
import calendar from "../public/calendar.svg";
import { useRouter } from "next/router";

export default function Welcome() {
  const router = useRouter();
  return (
    <Layout bgImage="bg-[url('/top-bg.svg')] bg-contain">
      <div className="pt-[10rem]">
        <div className="flex space-between gap-[10rem] justify-center">
          <div className="flex flex-col">
            <h1 className="md:text-md lg:text-xl font-bold max-w-xl leading-10">
              Sync your{" "}
              <span className="text-pu text-secondaryButton">
                Google Calendar
              </span>{" "}
              with your cycle for higher productivity and balance.
            </h1>
            <h2 className="text-sm max-w-md opacity-70 mt-2">
              Increase your productivity by hacking your cycle. Schedule
              meetings on the days your are a rockstar and use the slow days for
              easy monotonus tasks.
            </h2>
            <div className="flex flex-row gap-8 mt-4">
              <Button
                className="bg-secondaryButton w-36 h-11 capitalize font-plusJakarta"
                onClick={() => router.push("#whydoit")}
              >
                Why?{" "}
              </Button>
              <Button
                className="bg-primaryButton w-36 h-11 capitalize font-plusJakarta"
                onClick={() => router.push("sync")}
              >
                How?
              </Button>
            </div>
            <div className="mt-6">
              <h2 className="uppercase text-tiny mt-2 mb-2 opacity-60">
                Supported period trackers
              </h2>
              <Image
                src="/clue.png"
                width={120}
                height={40}
                alt="exteralSource"
              />
              <p className="max-w-[400px] text-sm opacity-70">
                If you are not using Clue,{" "}
                <a
                  className="underline hover:opacity-70"
                  href="#periodtrackerform"
                >
                  please let us know which period tracker you use
                </a>
                . We are working on integrating more period trackers.
              </p>
            </div>
          </div>
          <div className="flex pt-4">
            <Image
              src={calendar}
              alt="calendar"
              width={325}
              height={348}
              className="w-[325px]"
            />
          </div>
        </div>
      </div>
      <div className="mt-40 scroll-smooth scroll-m-10" id="whydoit">
        {[
          {
            title: "Why would I want to sync with my cycle?",
            key: "benefits",
            content: (
              <p className="scroll scroll-mt-36">
                There are many benefits to living in sync with one's cycle. If
                you learn how your cycle works aka how you work, you can
                understand which days suit better for which tasks. You can use
                that knowledge to your advantage. You will know when to schedule
                important calls or presentations and when it is better to stay
                low and work on that writting assignment that you have been
                postponing.
              </p>
            ),
          },
          {
            title: "How does it work?",
            key: "work",
            content: (
              <div className="flex flex-col justify-center items-center">
                <p className="mb-16">
                  Women go through certain hormonal changes during their cycle.
                  Those hormones are responsible for changes in energy levels,
                  concentration, etc.
                </p>
                <Image
                  src="/female-hormones.png"
                  alt="hormones"
                  width={500}
                  height={200}
                />
                <p className="text-tiny underline">
                  Source:{" "}
                  <a href="https://www.researchgate.net/publication/270406731_Money_Status_and_the_Ovulatory_Cycle">
                    Money, Status, and the Ovulatory Cycle
                  </a>
                </p>
              </div>
            ),
          },
          {
            title: "What is the science behind it?",
            key: "science",
            content: (
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nis
              </p>
            ),
          },
          {
            title: "Sources",
            key: "sources",
            content: (
              <div>
                There are many books written on the topic.
                <ul className="list-inside flex flex-col gap-2 mt-4">
                  {[
                    {
                      title:
                        "Period Power: Harness your hormones and get your cycle working for you",
                      author: "Maisie Hill",
                    },
                    {
                      title: "Period Queen",
                      author: "Lucy Peach",
                    },
                    {
                      title:
                        "Blood Relations: Menstruation and the origins of culture by",
                      author: "Chris Knight",
                    },
                    {
                      title: "How To Be a Woman",
                      author: "Caitlin Moran",
                    },
                    {
                      title:
                        "Cunt: A declaration of independence by Inga Muscio Women’s Bodies, Women’s Wisdom: Creating physical and emotional health and healing",
                      author: "Christiane Northrup",
                    },
                    {
                      title:
                        "Her Blood is Gold: Awakening to the wisdom of menstruation",
                      author: "Lara Owen",
                    },
                    {
                      title:
                        "Period Repair Manual: Natural treatment for better hormones and better period",
                      author: "Dr Lara Briden",
                    },

                    {
                      title:
                        "Women Who Run With the Wolves: Myths and stories of the wild woman archetype",
                      author: "Clarissa Pinkola Estés",
                    },

                    {
                      title: "Fight Like a Girl",
                      author: "Clementine Ford",
                    },

                    {
                      title:
                        "Big Magic: Creative living beyond fear by Elizabeth Gilbert The Optimized Woman: Using your menstrual cycle to achieve success and fulfillment",
                      author: "Miranda Gray",
                    },

                    {
                      title:
                        "The Fifth Vital Sign: Master your cycles & optimize your fertility",
                      author: "Lisa Hendrickson-Jack",
                    },
                  ].map((item) => (
                    <li key={item.author}>
                      <div className="uppercase text-tiny opacity-70 font-bold">
                        {item.author}
                      </div>
                      <span className="italic">- {item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          },
        ].map((a, idx) => (
          <div key={a.key} className="mb-16 mx-auto max-w-[600px]">
            <QA title={a.title} idx={idx}>
              {a.content}
            </QA>
          </div>
        ))}
        <div id="periodtrackerform">
          <PeriodTrackerSupportForm />
        </div>
      </div>
    </Layout>
  );
}
