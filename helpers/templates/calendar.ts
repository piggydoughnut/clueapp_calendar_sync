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
        <mj-text font-size="16px" color="#342525" font-family="helvetica">Here is your personalized cycle calendar. It will guide you through your month. </mj-text>
        <mj-text font-size="16px" color="#342525" font-family="helvetica">Everyone's experience with their menstrual cycle is unique, and it's important to honor your own needs and preferences. Remember, it's okay to listen to your body and adjust your routine as needed, and self-care looks different for everyone.</mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding-bottom="100px" padding-top="50px">
      <mj-column>
      <mj-text align="center"> <img style="border: 1px solid  #F1B87E; border-radius: 4px; padding: 12px;" alt="image" id="1" width="400px" src="cid:calendar.png"/></mj-text>



        <mj-text align="center" padding-top="60px">
          <div style="display: inline-block;">
            <div style="border-radius: 50px; height: 24px; width: 24px; background-color: #F8CFD3;"></div>
          </div>

          <p style="font-size: 18px; text-transform: uppercase; font-family: helvetica;">Self-care time</p>
        </mj-text>
        <mj-text color="#342525" font-family="helvetica" font-size="16px">Take it easy and prioritize self-care activities that help you feel relaxed and nurtured during this time of physical and emotional release. Listen to your body and give yourself permission to slow down and rest. The way you spend this phase will dictate how the rest of your month goes.</mj-text>
        <mj-text color="#342525" font-family="helvetica" font-size="16px">
          Best course of action <br />
          <ul>
            <li>Focus on self-love and to conserve energy for the next cycle.</li>
            <li>Listen to your intuition and think about the past month, reflect on your experiences, and emotions.</li>
            <li>Consider how you feel about the progress you have made, and what you want to achieve in the next cycle.</li>
          </ul>
        </mj-text>
        <mj-text align="center" padding-top="60px">
          <div style="display: inline-block;">
            <div style="border-radius: 50px; height: 24px; width: 24px; background-color: #91C8C3;"></div>
          </div>

          <p style="font-size: 18px; text-transform: uppercase; font-family: helvetica;">Ready to tackle the world</p>
        </mj-text>

        <mj-text color="#342525" font-family="helvetica" font-size="16px">You're feeling renewed and motivated, so take advantage of this energy to set goals and build healthy habits.</mj-text>
        <mj-text color="#342525" font-family="helvetica" font-size="16px">
          Best course of action <br />
          <ul>
            <li>Plan and set goals for the upcoming weeks and months.</li>
            <li>Schedule important meetings or events during this time.</li>
            <li>Tackle new challenges.</li>
          </ul>
        </mj-text>


        <mj-text align="center" padding-top="60px">
          <div style="display: inline-block;">
            <div style="border-radius: 50px; height: 24px; width: 24px; background-color: #FEFACA;"></div>
          </div>

          <p style="font-size: 18px; text-transform: uppercase; font-family: helvetica;">MOST PRODUCTIVE</p>
        </mj-text>


        <mj-text color="#342525" font-family="helvetica" font-size="16px">Your communication skills and focus are heightened during this time, so use this opportunity to tackle challenging projects and make new connections. Remember to take breaks and nurture yourself, as pushing too hard can lead to burnout.</mj-text>
        <mj-text color="#342525" font-family="helvetica" font-size="16px">
          Best course of action <br />
          <ul>
            <li>Prioritize challenging or creative work projects that require focus and attention.</li>
            <li>Take advantage of heightened communication skills to initiate conversations or negotiations. This is great time for job interviews, salary negotiations or any other important communication.</li>
            <li>Connect with others, network, and attend social events to make new connections.</li>
          </ul>
        </mj-text>

        <mj-text align="center" padding-top="60px">
          <div style="display: inline-block;">
            <div style="border-radius: 50px; height: 24px; width: 24px; background-color: #A0A7D6;"></div>
          </div>

          <p style="font-size: 18px; text-transform: uppercase; font-family: helvetica;">TIME TO SLOW DOWN</p>
        </mj-text>

        <mj-text color="#342525" font-family="helvetica" font-size="16px">It's important to be gentle with yourself during this time of fluctuating emotions and physical discomfort. Remember, this is a natural part of your cycle and will pass in due time.</mj-text>
        <mj-text color="#342525" font-family="helvetica" font-size="16px">
          Best course of action <br />
          <ul>
            <li>Practice self-compassion and avoid over-scheduling or taking on too much work.</li>
            <li>Incorporate relaxation techniques like meditation or deep breathing to reduce stress and anxiety.</li>
            <li>Reconsider attending busy and socially strenuous events.</li>
            <li>Prioritize activities that promote rest and rejuvenation, such as getting enough sleep, spending time in nature, and taking warm baths.</li>
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
