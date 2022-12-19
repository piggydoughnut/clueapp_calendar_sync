import { compile } from "handlebars";
const confirmation = compile(
  `<mjml>
  <mj-head>
    <mj-font name="helvetica" href="https://fonts.googleapis.com/css?family=helvetica" />
  </mj-head>
  <mj-body>
    <mj-section full-width="full-width" background-color="#FDF5ED">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" align="center" padding-bottom="0">Welcome to Hack Your Cycle</mj-text>
        <mj-text font-size="16px" align="center">
          <p style="opacity: 0.5; margin: 0;">from Hack Your Cycle Team 🖤</p>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text font-size="16px" color="#342525" font-family="helvetica" padding-top="60px">Thank you for signing up, dear human!</mj-text>
        <mj-text font-size="16px" color="#342525" font-family="helvetica">We are excited that you have decided to take your cycle under control and leverage your beautiful cylic nature.</mj-text>
        <mj-text font-size="16px" color="#342525" font-family="helvetica">We have created a new calendar for you where we have synced your cycle data for the current and coming month.</mj-text>
        
        <mj-text align="left" padding-top="36px" font-size="16px" color="#342525" font-family="helvetica">1. Open you calendar <a style="font-weight:700;" href="https://calendar.google.com">Google Calendar</a></mj-text>
        
        <mj-text align="left" padding-top="12px" font-size="16px" color="#342525" font-family="helvetica">2. Find your new calendar in the left column under "My calendars". It is called "My Cycle". You can turn it on and off to your liking. </mj-text>
        
        <mj-image width="200px" src="https://i.ibb.co/TqyQ7dP/my-cycle.png"></mj-image>
                <mj-text align="left" padding-top="12px" font-size="16px" color="#342525" font-family="helvetica">We will update your calendar according to the data you enter in Clue. That way it will always be up to date with your cycle data. If your next period comes earlier or later, we will make sure to update your Google Calendar accordingly.</mj-text>
      </mj-column>
    </mj-section>


    <mj-section padding-bottom="100px">
      <mj-column>
        <mj-text align="center" font-size="16px" color="#342525" font-family="helvetica">Learn more about your cycle with <a style="font-weight:700;" href="https://hack-your-cycle.com">Hack Your Cycle</a></mj-text>
        <mj-text font-size="16px" color="#342525" font-family="helvetica" align="center">Much Love, Hack Your Cycle Team. 🖤</mj-text>

        <mj-text font-size="16px" color="#342525" font-family="helvetica" padding-top="42px" align="center">
          <p style="opacity: 0.5">Feel free to reply to this email if you have any questions.</p>
        </mj-text>
      </mj-column>
    </mj-section>


    <mj-section full-width="full-width" background-color="#FDF5ED" padding-top="36px">
      <mj-column>
        <mj-text font-size="16px">
          Hack Your Cycle <a href="mailto:hello@hackthecyle.com">hello@hackthecyle.com</a>
        </mj-text>
      </mj-column>
      <mj-column>

        <mj-navbar base-url="https://hack-your-cycle.com">
          <mj-navbar-link href="/" color="#342525" font-family="helvetica">Home</mj-navbar-link>
          <mj-navbar-link href="/" color="#342525" font-family="helvetica">Science</mj-navbar-link>
          <mj-navbar-link href="/pricing" color="#342525" font-family="helvetica">Pricing</mj-navbar-link>
          <mj-navbar-link href="/#faq" color="#342525" font-family="helvetica">FAQ</mj-navbar-link>
        </mj-navbar>
      </mj-column>
    </mj-section>
    <mj-section full-width="full-width" background-color="#FDF5ED">

      <mj-column>
        <mj-text>
          <p style="opacity: 0.4">
            DISCLAIMER <br />
            The content presented in this email is meant for inspiration and informational purposes only. The user of this email understands that the creator is not a medical professional, and the information contained within this email is not intended to replace medical advice or to be relied upon to treat, cure or prevent any disease, illness or medical condition. It is understood that you will seek full medical clearance by a licensed physician before making any changes mentioned in this email. The author claims no responsibility to any person or entity for any liability, loss or damage caused or alleged to be caused directly or indirectly as a result of the use, application or interpretation of the material on this email.

          </p>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
);

export default confirmation;
