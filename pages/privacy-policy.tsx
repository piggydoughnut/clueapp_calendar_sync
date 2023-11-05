import { H1, H2, H3 } from "@components/core/Text";

import Layout from "@components/nav/Layout";
import { LinkTo } from "@components/core/LinkTo";
import { PageHeader } from "@components/core/PageHeader";

const emailUs = (
  <LinkTo
    url="mailto:privacy@hack-your-cycle.com"
    name="privacy@hack-your-cycle.com"
  />
);

export default function PrivacyPolicyPage() {
  return (
    <Layout title="Hack Your Cycle: Privacy Policy">
      <div className="flex flex-col justify-center items-center">
        <PageHeader>Privacy Policy</PageHeader>
        <div className="max-w-[600px]">
          <p>Effective Date: 5.11.2023</p>
          <H2> 1. Introduction</H2>
          <p>
            This Privacy Policy explains how [Your Company/Service Name] ("we,"
            "us," "our") collects, uses, and protects your personal information
            when you use our services, including our menstrual cycle tracking
            and productivity tool. We are committed to protecting your privacy
            and ensuring the security of your data.
          </p>
          <H2> 2. Information We Collect</H2>
          <H3>a. Google Email Address</H3>
          <p>
            When you use our service, we collect your Google email address in
            order to send you very occasional emails related to our product,
            updates, and important notifications.
          </p>
          <H3>b. Google Tokens</H3>
          <p>
            We store your Google tokens to facilitate the seamless updating of
            your calendar without requiring you to repeatedly authorize our
            access to your Google Calendar. These tokens help improve the user
            experience.
          </p>
          <H3>c. Google Calendar Id</H3>
          <p>
            We store the Google Calendar Id associated with your
            MyCycle-generated calendar. This information is used to ensure the
            proper functioning of our service and to provide you with accurate
            menstrual cycle and productivity information.
          </p>
          <H2> 3. How We Use Your Information</H2>
          <p>We use the collected information for the following purposes:</p>
          <H3>a. Sending Occasional Emails</H3>
          <p>
            We use your Google email address to send you very occasional emails,
            such as product updates and important notifications related to our
            service.
          </p>
          <H3>b. Calendar Integration</H3>
          <p>
            Your Google tokens and CalendarId are used to integrate and interact
            with your Google Calendar. This allows you to efficiently manage
            your menstrual cycle-related events and productivity goals.
          </p>
          <H2> 4. Data Security</H2>
          <p>
            We take the security of your data seriously and implement reasonable
            safeguards to protect it from unauthorized access, disclosure,
            alteration, or destruction. However, please be aware that no data
            transmission over the internet or data storage system is 100%
            secure, and we cannot guarantee the absolute security of your
            information.
          </p>
          <H2> 5. Data Retention</H2>
          <p>
            We retain your data for as long as necessary to fulfill the purposes
            outlined in this Privacy Policy. You may request the removal of your
            data by contacting us at {emailUs}.
          </p>
          <H2>6. Sharing Your Information</H2>
          <p>
            We do not share your personal information with third parties, except
            when required by law or as described in this Privacy Policy.{" "}
          </p>
          <H2>7. Your Rights</H2>
          You have the right to: - Access the personal information we hold about
          you. - Correct any inaccuracies in your personal information. - Delete
          your personal information. - Object to the processing of your personal
          information.
          <p>
            To exercise these rights or for any questions regarding your data,
            please contact us at {emailUs}.
          </p>
          <H2>8. Changes to this Privacy Policy</H2>
          <p>
            We may update this Privacy Policy to reflect changes in our data
            practices or legal requirements. The updated Privacy Policy will be
            posted on our website with the revised effective date.
          </p>
          <H2>9. Contact Us</H2>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at {emailUs}.
          </p>
          <p className="mt-8">Yours, Hack Your Cycle Team.</p>
        </div>
      </div>
    </Layout>
  );
}
