import FAQ from "@components/FAQ";
import Image from "next/image";
import Layout from "@components/nav/Layout";

type Question = {
  question: string;
  answer: string | Array<React.ReactNode>;
};

const scienceQuestions: Array<Question> = [
  {
    question: "Why would I want to sync with my cycle?",
    answer: [
      <p className="mx-8 sm:mx-0 scroll scroll-mt-36" key="sync">
        Syncing your life with your menstrual cycle as a woman can have numerous
        benefits, including an increase in professional productivity. By
        tracking your cycle and taking note of how you feel at different points,
        you can plan your schedule and activities accordingly. <br />
        <br /> For example, if you know that you tend to feel more tired and
        irritable during your premenstrual phase, you may want to schedule less
        demanding tasks and activities during that time.
      </p>,
      <p key="cycle-phases">
        The menstrual cycle can be broken down into four phases:
        <ul className="list-disc list-inside">
          <li>the dream phase</li>
          <li>the do phase</li>
          <li>the give phase</li>
          <li>the take phase</li>
        </ul>
      </p>,
    ],
  },
  {
    question: "How do the phases map to my cycle?",
    answer: [
      <div key="graph" className="flex flex-col justify-center items-center">
        <Image
          src="/female-hormones.png"
          alt="hormones"
          className="h-contain w-auto"
          width={500}
          height={300}
        />
        <p className="text-tiny text-center">
          Image source: Period Queen, Lucy Peach
          {/* </a> */}
        </p>
      </div>,
    ],
  },
  {
    question: "The Dream phase (3 - 7 days)",
    answer: [
      <p key="dream-hormones">
        Your hormones level off as you prepare for menstruation. It is a good
        time to find a peaceful place to relax and reflect. Allow yourself to
        slow down, and focus on self-care, as your body needs rest.
        <br /> <br />
        This is an opportunity to focus on self-love and to conserve energy for
        the next cycle. Listen to your intuition and think about the past month,
        reflect on your experiences, and emotions. Consider how you feel about
        the progress you have made, and what you want to achieve in the next
        cycle.
      </p>,
      <p key="dream-facts" className="mt-4 opacity-70 text-sm">
        <span className="uppercase text-tiny">Facts:</span> <br />
        This phase is also known as the menstrual phase, is when the uterus
        sheds its lining, resulting in menstrual bleeding. It is characterized
        by low levels of estrogen and progesterone. During this phase, women may
        experience cramps, bloating, and fatigue.
      </p>,
    ],
  },
  {
    question: "The Do phase (6 - 14 days)",
    answer: [
      <p key="do-about">
        Once menstruation is over, estrogen levels start to rise again. This is
        a time of renewed energy, and a feeling of readiness to tackle new
        challenges. This phase is often associated with a sense of empowerment
        and the ability to accomplish anything you set your mind to.
      </p>,
      <p className="mt-4 opacity-70 text-sm" key="do-facts">
        <span className="uppercase text-tiny">Facts:</span> <br />
        The Do phase is also known as the follicular phase. During this phase,
        the body begins to prepare for ovulation by increasing the levels of
        estrogen. This is the time when the lining of the uterus thickens, and
        the body releases follicle-stimulating hormone (FSH) to start growing an
        egg.
      </p>,
    ],
  },
  {
    question: "The Give phase (about 6 days)",
    answer: [
      <p key="give-about">
        This is the peak of the menstrual cycle! Take the time to appreciate and
        celebrate all the beauty that surrounds you, both inside and outside of
        yourself. You have a surge of hormones after ovulation, which can make
        you feel energized and full of life. This energy can make you feel like
        embracing every opportunity that comes your way and giving back to the
        world around you.
      </p>,

      <p className="mt-4 opacity-70 text-sm" key="give-facts">
        <span className="uppercase text-tiny">Facts:</span> <br />
        The Give phase, also known as the ovulation phase, is when the egg is
        released from the ovary. This phase is triggered by a surge in
        luteinizing hormone (LH) and typically occurs around day 14 of a 28-day
        cycle.
      </p>,
    ],
  },
  {
    question: "The Take phase (7+ days)",
    answer: [
      <p key="take-about">
        As the cycle comes to an end, it`&apos;`s a time for reflection and
        taking note of the progress made during the previous weeks. The body
        naturally prepares for the next cycle by shedding the lining of the
        uterus and releasing the egg that was not fertilized. It`&apos;`s a time
        to take care of oneself, to rest and recharge for the next cycle.
      </p>,
      <p className="mt-4 opacity-70 text-sm" key="take-facts">
        <span className="uppercase text-tiny">Facts:</span> <br />
        The Take phase is characterized by a decrease in estrogen and
        progesterone levels. During this phase, women may experience physical
        and emotional changes such as cramps, bloating, fatigue, irritability,
        breast tenderness, mood swings, anxiety and depression.
      </p>,
    ],
  },
  {
    question: "Is this hardcore science?",
    answer: [
      <p className="text-sm" key="note">
        The phase names are not scientific terms and they may not be commonly
        used across the scientific or medical communities. Also, the way each
        woman experience the menstrual cycle differently and some may experience
        a different pattern of energy levels than what is described here. Some
        women may experience no change in energy levels throughout the cycle,
        while others may experience a more dramatic change.
      </p>,
      <p key="info">
        It is important to keep in mind that these sources provide general
        information and some of the details may not apply to every individual.
        Always consult with a healthcare professional for personalized advice.
      </p>,
      <p className="text-sm mt-4" key="more-info">
        More information: <br />
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          href="https://helloclue.com/articles/cycle-a-z/the-menstrual-cycle-more-than-just-the-period"
        >
          What is the menstrual cycle? - Clue
        </a>
      </p>,
    ],
  },
  {
    question: "Where does this information come from?",
    answer: [
      <div className="mx-8 sm:mx-0 " key="sources">
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
            Some more reputable sources that provide detailed information about
            hormones during the menstrual cycle:
          </p>
          <ul className="mt-4">
            <li className="mt-2">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                href="https://www.womenshealth.gov/menstruation"
              >
                {" "}
                The Office on Women`&apos;` Health, part of the U.S. Department
                of Health and Human Services
              </a>
            </li>
            <li className="mt-2">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                href="https://www.acog.org/patient-resources/faqs/menstruation"
              >
                The American College of Obstetricians and Gynecologists (ACOG)
              </a>
            </li>
            <li className="mt-2">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                href="https://www.nichd.nih.gov/health/topics/menstruation"
              >
                The National Institute of Child Health and Human Development
                (NICHD)
              </a>
            </li>
          </ul>
        </div>
      </div>,
    ],
  },
];

export default function FAQPage() {
  return (
    <Layout title="Hack Your Cycle: FAQ">
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-[600px]">
          <FAQ questions={scienceQuestions} />
        </div>
      </div>
    </Layout>
  );
}
