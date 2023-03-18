import Link from "next/link";

const Footer = ({ menu }) => (
  <div className="bg-white mt-20 pl-4 sm:pl-20 pr-4 sm:pr-20 pt-8 pb-8 ml-2 mr-2 mb-2 rounded-md border-peachy border-4">
    <div className="flex flex-col-reverse sm:flex-row justify-center text-center sm:text-left sm:justify-between">
      <div className="flex flex-col">
        <h3 className="font-bold mb-2">Hack the Cycle</h3>
        <p>
          Be efficient with your cycle and <br /> schedule like a pro
        </p>
        <a href="mailto:me" className="mt-4 underline hover:opacity-70">
          hello@hackthecyle.com
        </a>
      </div>
      <div className="flex flex-row justify-center sm:justify-end gap-12 mb-8 sm:mb-0">
        {menu.map((item) => (
          <Link
            key={item.name}
            className="text-sm underline hover:underline hover:underline-offset-4 hover:decoration-2 transition-all hover:ease-in-out"
            href={item.url}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
    <div className="mt-12 opacity-50 text-tiny">
      <p className="font-bold uppercase">DISCLAIMER</p>
      <p>
        The information provided on this website is intended to be used for
        educational and inspirational purposes only, it`&apos;`s not intended to
        be a substitute for professional medical advice, diagnosis, or
        treatment. The website`&apos;`s creator is not a medical professional,
        and the information contained on this website should not be used to
        diagnose or treat any health issues. It`&apos;`s important to seek
        advice from a licensed physician or healthcare professional before
        making any changes to your health regimen. The author of this website
        cannot be held responsible for any damages or losses that may occur as a
        result of using, interpreting or applying the information provided on
        this website.
      </p>
    </div>
  </div>
);

export default Footer;