import FAQ from "../components/FAQ";
import Layout from "../components/Layout";
import PricingOptions from "../components/PricingOptions";
import { useState } from "react";

export default function Pricing() {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center">
        <h1 className="md:text-md lg:text-xl font-bold text-center mt-10 mb-8 pt-[5rem] pb-[2rem]">
          Sync with your cycle and schedule like a pro.
        </h1>
        <h2 className="text-center uppercase font-bold text-md mb-4">
          Our pricing
        </h2>
        <p className="mb-20 max-w-[500px] text-center">
          It is up to you how efficient you want to get with your cycle. Our
          billing is monthly and can be cancelled at any time. Please see{" "}
          <a className="underline hover:opacity-70" href="#faq">
            FAQ
          </a>{" "}
          or{" "}
          <a
            className="underline hover:opacity-70"
            href="mailto:hello@dariah.dev"
          >
            email us
          </a>{" "}
          if you have any questions.
        </p>
        <PricingOptions />
        <div className="max-w-[600px]">
          <FAQ />
        </div>
      </div>
    </Layout>
  );
}
