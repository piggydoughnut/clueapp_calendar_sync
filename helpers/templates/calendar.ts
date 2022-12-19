import { compile } from "handlebars";
const calendar = compile(
  `<mjml>
  <mj-head>
    <mj-font name="helvetica" href="https://fonts.googleapis.com/css?family=helvetica" />
  </mj-head>
  <mj-body>
    <mj-section full-width="full-width" background-color="#FDF5ED">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" align="center" padding-bottom="0">Your personalized Cycle Calendar</mj-text>
        <mj-text font-size="16px" align="center">
          <p style="opacity: 0.5; margin: 0;">from Hack Your Cycle Team 🖤</p>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text font-size="16px" color="#342525" font-family="helvetica" padding-top="60px">Hello there dear human!</mj-text>
        <mj-text font-size="16px" color="#342525" font-family="helvetica">Here is your personalized cycle calendar. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </mj-text>
        <mj-text font-size="16px" color="#342525" font-family="helvetica">Cursus risus at ultrices mi. Amet est placerat in egestas erat. Diam donec adipiscing tristique risus nec.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding-bottom="100px" padding-top="50px">
      <mj-column>
      <mj-text align="center"> <img style="border: 1px solid  #F1B87E; border-radius: 4px; padding: 12px;" alt="image" id="1" width="400px" src="cid:calendar.png"/></mj-text>



        <mj-text align="center" padding-top="60px">
          <div style="display: inline-block;">
            <div style="border-radius: 50px; height: 24px; width: 24px; background-color: #F8CFD3;"></div>
          </div>

          <p style="font-size: 18px; text-transform: uppercase; font-family: helvetica;">Stillness</p>
        </mj-text>
        <mj-text color="#342525" font-family="helvetica" font-size="16px">This is the time to take extra care of yourself. This is the time to take extra care of yourself. This is the time to take extra care of yourself.</mj-text>
        <mj-text color="#342525" font-family="helvetica" font-size="16px">
          Best course of action <br />
          <ul>
            <li>est placerat in egestas erat.stique risu</li>
            <li>adipiscing tristique risus nec egestas erat.stique risu</li>
            <li>egestas est placerat in egestas erat.est placerat in egestas era</li>
            <li>adipiscing tristique risus nec</li>
          </ul>
        </mj-text>
        <mj-text align="center" padding-top="60px">
          <div style="display: inline-block;">
            <div style="border-radius: 50px; height: 24px; width: 24px; background-color: #91C8C3;"></div>
          </div>

          <p style="font-size: 18px; text-transform: uppercase; font-family: helvetica;">Ready to tackle the world</p>
        </mj-text>

        <mj-text color="#342525" font-family="helvetica" font-size="16px">This is the time to take extra care of yourself. This is the time to take extra care of yourself. This is the time to take extra care of yourself.</mj-text>
        <mj-text color="#342525" font-family="helvetica" font-size="16px">
          Best course of action <br />
          <ul>
            <li>est placerat in egestas erat.stique risu</li>
            <li>adipiscing tristique risus nec egestas erat.stique risu</li>
            <li>egestas est placerat in egestas erat.est placerat in egestas era</li>
            <li>adipiscing tristique risus nec</li>
          </ul>
        </mj-text>


        <mj-text align="center" padding-top="60px">
          <div style="display: inline-block;">
            <div style="border-radius: 50px; height: 24px; width: 24px; background-color: #FEFACA;"></div>
          </div>

          <p style="font-size: 18px; text-transform: uppercase; font-family: helvetica;">HIGHEST ENERGY</p>
        </mj-text>


        <mj-text color="#342525" font-family="helvetica" font-size="16px">This is the time to take extra care of yourself. This is the time to take extra care of yourself. This is the time to take extra care of yourself.</mj-text>
        <mj-text color="#342525" font-family="helvetica" font-size="16px">
          Best course of action <br />
          <ul>
            <li>est placerat in egestas erat.stique risu</li>
            <li>adipiscing tristique risus nec egestas erat.stique risu</li>
            <li>egestas est placerat in egestas erat.est placerat in egestas era</li>
            <li>adipiscing tristique risus nec</li>
          </ul>
        </mj-text>

        <mj-text align="center" padding-top="60px">
          <div style="display: inline-block;">
            <div style="border-radius: 50px; height: 24px; width: 24px; background-color: #A0A7D6;"></div>
          </div>

          <p style="font-size: 18px; text-transform: uppercase; font-family: helvetica;">TIME TO SLOW DOWN</p>
        </mj-text>

        <mj-text color="#342525" font-family="helvetica" font-size="16px">This is the time to take extra care of yourself. This is the time to take extra care of yourself. This is the time to take extra care of yourself.</mj-text>
        <mj-text color="#342525" font-family="helvetica" font-size="16px">
          Best course of action <br />
          <ul>
            <li>est placerat in egestas erat.stique risu</li>
            <li>adipiscing tristique risus nec egestas erat.stique risu</li>
            <li>egestas est placerat in egestas erat.est placerat in egestas era</li>
            <li>adipiscing tristique risus nec</li>
          </ul>
        </mj-text>

      </mj-column>
    </mj-section>

    <mj-section padding-bottom="100px">
      <mj-column>
        <mj-text align="center" font-size="16px" color="#342525" font-family="helvetica">Learn more about your cycle with <a style="font-weight:700;" href="https://hack-your-cycle.com">Hack Your Cycle</a></mj-text>
        <mj-text font-size="16px" color="#342525" font-family="helvetica" align="center">Much Love, Hack Your Cycle Team. 🖤</mj-text>
        
          <mj-text font-size="16px" color="#342525" font-family="helvetica" padding-top="42px" align="center"><p style="opacity: 0.5">Feel free to reply to this email if you have any questions.</p></mj-text>
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

export default calendar;
