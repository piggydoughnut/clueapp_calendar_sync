import { compile } from "handlebars";
const feedback = compile(`
  <mjml>
    <mj-head>
      <mj-font
        name="helvetica"
        href="https://fonts.googleapis.com/css?family=helvetica"
      />
    </mj-head>
    <mj-body>
      <mj-section full-width="full-width" background-color="#FDF5ED">
        <mj-column>
          <mj-text
            font-size="24px"
            font-weight="700"
            align="center"
            padding-bottom="0"
          >
            Hack Your Cycle Feedback Form
          </mj-text>
          <mj-text font-size="16px" align="center">
            <p style="opacity: 0.5; margin: 0">from Hack Your Cycle Team 🖤</p>
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-text font-size="24px">Feedback Form</mj-text>
          <mj-text font-size="16px">email: {{ youremail }} </mj-text>
          <mj-text font-size="16px">tracker name: {{ trackerName }} </mj-text>
          <mj-text font-size="16px">
            Will change tracker: {{ changeTracker }}
          </mj-text>
          <mj-text font-size="16px">Feedback: {{ feedback }} </mj-text>
        </mj-column>
      </mj-section>

      <mj-section
        full-width="full-width"
        background-color="#FDF5ED"
        padding-top="36px"
      >
        <mj-column>
          <mj-text font-size="16px">
            Hack Your Cycle
            <a href="mailto:hello@hackthecyle.com">hello@hackthecyle.com</a>
          </mj-text>
        </mj-column>
        <mj-column>
          <mj-navbar base-url="https://hack-your-cycle.com">
            <mj-navbar-link href="/" color="#342525" font-family="helvetica">
              Home
            </mj-navbar-link>
            <mj-navbar-link href="/" color="#342525" font-family="helvetica">
              Science
            </mj-navbar-link>
            <mj-navbar-link
              href="/pricing"
              color="#342525"
              font-family="helvetica"
            >
              Pricing
            </mj-navbar-link>
            <mj-navbar-link
              href="/#faq"
              color="#342525"
              font-family="helvetica"
            >
              FAQ
            </mj-navbar-link>
          </mj-navbar>
        </mj-column>
      </mj-section>
      <mj-section full-width="full-width" background-color="#FDF5ED">
        <mj-column>
          <mj-text>
            <p style="opacity: 0.4">
              DISCLAIMER <br />
              The content presented in this email is meant for inspiration and
              informational purposes only. The user of this email understands
              that the creator is not a medical professional, and the
              information contained within this email is not intended to replace
              medical advice or to be relied upon to treat, cure or prevent any
              disease, illness or medical condition. It is understood that you
              will seek full medical clearance by a licensed physician before
              making any changes mentioned in this email. The author claims no
              responsibility to any person or entity for any liability, loss or
              damage caused or alleged to be caused directly or indirectly as a
              result of the use, application or interpretation of the material
              on this email.
            </p>
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`);

export default feedback;
