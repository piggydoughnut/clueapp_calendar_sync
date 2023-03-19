import Benefits from "@components/Benefits";
import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Layout from "@components/nav/Layout";
import Link from "next/link";
import PeriodTrackerSupportForm from "@components/PeriodTrackerSupportForm";
import QA from "@components/QA";
import SupportedTrackers from "@components/SupportedTrackers";
import calendar from "../public/calendar.svg";
import { useRouter } from "next/router";

export default function Welcome() {
  const router = useRouter();
  return (
    <Layout bgImage="bg-[url('/top-bg.svg')] bg-contain">
      <div className="pt-24 sm:pt-[10rem]">
        <div className="flex flex-col sm:flex-row space-between gap-[10rem] justify-center">
          <div className="flex flex-col mx-4 sm:mx-0">
            <h1 className="text-xl lg:text-xl font-bold max-w-xl leading-10">
              Sync your{" "}
              <span className="text-pu text-secondaryButton">
                Google Calendar
              </span>{" "}
              with your cycle for higher productivity and balance.
            </h1>
            <h2 className="hidden sm:block text-sm max-w-sm opacity-70 mt-2">
              Increase your productivity by hacking your cycle. Schedule
              meetings on the days your are a rockstar and use the slow days for
              easy monotonus tasks.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-12 sm:mt-4">
              <div className="sm:hidden flex justify-center pt-4">
                <Image
                  src={calendar}
                  alt="calendar"
                  width={325}
                  height={348}
                  className="w-[325px]"
                />
              </div>
              <h2 className="block sm:hidden ml-2 sm:ml-0 text-sm max-w-sm opacity-70 mt-8 sm:mt-2">
                Increase your productivity by hacking your cycle. Schedule
                meetings on the days your are a rockstar and use the slow days
                for easy monotonus tasks.
              </h2>
              <Button
                className="bg-secondaryButton w-full sm:w-36 h-14 sm:h-11 capitalize font-plusJakarta mt-12 sm:mt-0"
                onClick={() => router.push("#whydoit")}
              >
                Why?{" "}
              </Button>
              <Button
                className="bg-primaryButton w-full sm:w-36 h-14 sm:h-11 capitalize font-plusJakarta"
                onClick={() => router.push("sync")}
              >
                How?
              </Button>

              <Link href="/signup">
                <Button
                  variant="outlined"
                  className="w-full sm:hidden h-14 sm:h-11  uppercase text-sm font-plusJakarta"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
            <SupportedTrackers />
          </div>
          <div className="hidden sm:flex pt-4 items-start">
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
      <div className="mt-40 flex justify-center">
        <Benefits />
      </div>

      <div className="mt-40 scroll-smooth scroll-m-10" id="whydoit">
        {[
          {
            title: "Why would I want to sync with my cycle?",
            key: "benefits",
            content: (
              <p className="mx-8 sm:mx-0 scroll scroll-mt-36">
                Syncing your life with your menstrual cycle as a woman can have
                numerous benefits, including an increase in professional
                productivity. By tracking your cycle and taking note of how you
                feel at different points, you can plan your schedule and
                activities accordingly. <br />
                <br /> For example, if you know that you tend to feel more tired
                and irritable during your premenstrual phase, you may want to
                schedule less demanding tasks and activities during that time.
                Additionally, by understanding the hormonal changes that occur
                during your cycle, you can make lifestyle and dietary
                adjustments that may improve your physical and mental health,
                which can translate to increased productivity in the workplace.
                <br />
                <br /> Syncing your cycle can also be beneficial for your
                reproductive health and fertility, which can be useful for
                people trying to conceive or trying to avoid pregnancy.
              </p>
            ),
          },
          {
            title: "What is the science behind it?",
            key: "science",
            content: (
              <div className="flex flex-col justify-center items-center">
                <div className="mx-8 sm:mx-0 ">
                  <p>
                    The menstrual cycle can be broken down into four phases: the
                    dream phase, the do phase, the give phase, and the take
                    phase.{" "}
                  </p>
                  <p className="font-bold mt-6 mb-2">
                    The Dream phase <span>(3-7 days)</span>
                  </p>
                  <p>
                    Your hormones level off as you prepare for menstruation.
                    It`&apos;`s a good time to find a peaceful place to relax
                    and reflect. Allow yourself to slow down, and focus on
                    self-care, as your body needs rest. This is an opportunity
                    to focus on self-love and to conserve energy for the next
                    cycle. Listen to your intuition and think about the past
                    month, reflect on your experiences, and emotions. Consider
                    how you feel about the progress you`&apos;`ve made, and what
                    you want to achieve in the next cycle.
                  </p>
                  <p className="mt-4 opacity-70 text-sm">
                    <span className="uppercase text-tiny">Facts:</span> <br />
                    This phase is also known as the menstrual phase, is when the
                    uterus sheds its lining, resulting in menstrual bleeding. It
                    is characterized by low levels of estrogen and progesterone.
                    During this phase, women may experience cramps, bloating,
                    and fatigue.
                  </p>
                  <br />
                  <br />
                  <div className="flex flex-col justify-center items-center">
                    <Image
                      src="/female-hormones.png"
                      alt="hormones"
                      width={500}
                      height={200}
                    />
                    <p className="text-tiny text-center">
                      Image source:{" "}
                      {/* <a href="https://www.researchgate.net/publication/270406731_Money_Status_and_the_Ovulatory_Cycle"> */}
                      Period Queen, Lucy Peach
                      {/* </a> */}
                    </p>
                  </div>
                  <p className="font-bold mt-8 mb-2">
                    The Do phase <span>(6-14 days)</span>
                  </p>
                  <p>
                    Once menstruation is over, estrogen levels start to rise
                    again. This is a time of renewed energy, and a feeling of
                    readiness to tackle new challenges. This phase is often
                    associated with a sense of empowerment and the ability to
                    accomplish anything you set your mind to.
                  </p>
                  <p className="mt-4 opacity-70 text-sm">
                    <span className="uppercase text-tiny">Facts:</span> <br />
                    The Do phase is also known as the follicular phase. During
                    this phase, the body begins to prepare for ovulation by
                    increasing the levels of estrogen. This is the time when the
                    lining of the uterus thickens, and the body releases
                    follicle-stimulating hormone (FSH) to start growing an egg.
                  </p>
                  <p className="font-bold mt-8 mb-2">
                    The Give phase <span>(about 6 days)</span>
                  </p>
                  <div>
                    <p>
                      This is the peak of the menstrual cycle! Take the time to
                      appreciate and celebrate all the beauty that surrounds
                      you, both inside and outside of yourself. You have a surge
                      of hormones after ovulation, which can make you feel
                      energized and full of life. This energy can make you feel
                      like embracing every opportunity that comes your way and
                      giving back to the world around you.
                    </p>

                    <p className="mt-4 opacity-70 text-sm">
                      <span className="uppercase text-tiny">Facts:</span> <br />
                      The Give phase, also known as the ovulation phase, is when
                      the egg is released from the ovary. This phase is
                      triggered by a surge in luteinizing hormone (LH) and
                      typically occurs around day 14 of a 28-day cycle.
                    </p>
                  </div>
                  <p className="font-bold mt-8 mb-2">
                    The Take phase <span>(7+ days)</span>
                  </p>
                  <p>
                    As the cycle comes to an end, it`&apos;`s a time for
                    reflection and taking note of the progress made during the
                    previous weeks. The body naturally prepares for the next
                    cycle by shedding the lining of the uterus and releasing the
                    egg that was not fertilized. It`&apos;`s a time to take care
                    of oneself, to rest and recharge for the next cycle.
                  </p>
                  <p className="mt-4 opacity-70 text-sm">
                    <span className="uppercase text-tiny">Facts:</span> <br />
                    The Take phase is characterized by a decrease in estrogen
                    and progesterone levels. During this phase, women may
                    experience physical and emotional changes such as cramps,
                    bloating, fatigue, irritability, breast tenderness, mood
                    swings, anxiety and depression.
                  </p>
                  <br />
                  <br />
                  <p className="text-sm">
                    It`&apos;`s worth noting that these are not scientific terms
                    and they may not be commonly used across the scientific or
                    medical communities. Also, the way each woman experience the
                    menstrual cycle differently and some may experience a
                    different pattern of energy levels than what is described
                    here. Some women may experience no change in energy levels
                    throughout the cycle, while others may experience a more
                    dramatic change.
                  </p>
                  <p className="text-sm mt-4">
                    More information: <br />
                    <a
                      className="underline"
                      href="https://helloclue.com/articles/cycle-a-z/the-menstrual-cycle-more-than-just-the-period"
                    >
                      What is the menstrual cycle? - Clue
                    </a>
                  </p>
                </div>
              </div>
            ),
          },
          {
            title: "Sources",
            key: "sources",
            content: (
              <div className="mx-8 sm:mx-0 ">
                There are many books written on the topic.
                <ul className="list-inside flex flex-col gap-2 mt-4 ">
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
                <div className="mt-8">
                  <p className="text-sm">
                    {" "}
                    Some more reputable sources that provide detailed
                    information about hormones during the menstrual cycle:
                  </p>
                  <ul className="mt-4">
                    <li className="mt-2">
                      <a
                        className="underline"
                        href="https://www.womenshealth.gov/menstruation"
                      >
                        {" "}
                        The Office on Women`&apos;`s Health, part of the U.S.
                        Department of Health and Human Services
                      </a>
                    </li>
                    <li className="mt-2">
                      <a
                        className="underline"
                        href="https://www.acog.org/patient-resources/faqs/menstruation"
                      >
                        The American College of Obstetricians and Gynecologists
                        (ACOG)
                      </a>
                    </li>
                    <li className="mt-2">
                      <a
                        className="underline"
                        href="https://www.nichd.nih.gov/health/topics/menstruation"
                      >
                        The National Institute of Child Health and Human
                        Development (NICHD)
                      </a>
                    </li>
                  </ul>
                  {/* <p>
                    It is important to keep in mind that these sources provide
                    general information and some of the details may not apply to
                    every individual. Always consult with a healthcare
                    professional for personalized advice.
                  </p> */}
                </div>
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
        <div id="periodtrackerform" className="mt-42">
          <PeriodTrackerSupportForm />
        </div>
      </div>
    </Layout>
  );
}
