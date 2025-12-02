import React, { useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Feautures from "./Features";
import AboutUs from "./AboutUs";
import Pricing from "./Pricing";
import FAQ from "./FAQ";
import Chatbot from "./chatbot/Chatbot";

const PrivacyPolicy = () => {
  const supportChatRef = useRef();

  return (
    <div>
      <Navbar isPrivacyPolicy={true} />
      <Chatbot ref={supportChatRef} />

      <br />
      <br />
      <br />
      <div className="max-w-4xl mx-auto p-6">
        <header className="bg-blue-900 text-white p-6 text-center rounded-lg">
          <h1 className="text-2xl font-bold">
            AccountsGoal-Terms and Conditions
          </h1>
          <br />
          <p className="mt-1 text-gray">
            These Terms of Service(Terms) constitute a legacy binding agreement
            between <br />
            AccountsGoal("accountsgoal", "we", "us", or "our") and you, the user
            of AccountsGoal <br />
            app ("you", "your", or "user"){" "}
          </p>
        </header>
        <div className="mt-6 space-y-6">
          <section>
            <h2 className="text-xl font-bold">Introduction</h2>
            <br />
            <p className="text-x">
              {" "}
              These General Terms and Conditions (Terms), together with our
              Privacy Policy referred to below is a legal agreement between you
              as a guest, prospective customer or a registered user of
              Accountsgoal services and Accountsgoal (accountsgoal, 'we', 'us'
              or 'our' and shall govern your access to and use of accountsgoal’s
              services which include all pages within the Accountsgoal
              website(www.accountsgoal.com), mobile applications, and other
              products and services (collectively referred to as the
              “Services”). Please read these Terms carefully as these Terms
              apply in full force and effect to your use of the Services and by
              using any of the Services, you expressly accept all terms and
              conditions contained herein in full and without limitation or
              qualification, including our Privacy Policy. You must not use any
              of the Services, if you have any objection to any of these Terms
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold">Prohibited Uses</h2>
            <br />
            <h3 className="text-x">You may not use our Services:</h3>

            <p className="text-x">
              a) in any way that breaches any applicable local, national or
              international law or regulation;
              <br />
              b) in any way that is unlawful or fraudulent, or has any unlawful
              or fraudulent purpose or effect; or
              <br />
              c) to harm or attempt to harm minors in any way.
            </p>
            <br />

            <h3 className="text-x">You agree that you will not:</h3>

            <p className="text-x">
              a) reproduce, duplicate, copy or sell any part of our Services in
              contravention of these Terms; and;
              <br />
              b) access without authority, interfere with, damage or disrupt
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>any part of our Services</li>
              <li>
                any equipment or network on which our Services are stored; or
              </li>
              <li>any software used in the provision of our Services</li>
            </ul>
          </section>
          <br />
          <section>
            <h1 className="text-xl font-bold">Disclaimer</h1>
            <br />
            <h1 className="text-xl font-bold">
              YOUR USE OF OUR SERVICES IS AT YOUR OWN RISK AND YOU ALONE WILL BE
              RESPONSIBLE FOR ANY DAMAGE THAT RESULTS IN LOSS OF DATA OR DAMAGE
              TO YOUR COMPUTER SYSTEM. NO ADVICE OR INFORMATION, WHETHER ORAL OR
              WRITTEN OBTAINED BY YOU FROM OUR WEBSITE OR OUR SERVICES WILL
              CREATE ANY WARRANTY OR CONDITION NOT EXPRESSLY STATED. You are
              responsible for configuring your information technology, computer
              programmes and platform in order to access our Services. Please
              ensure you use your virus protection software or application as we
              cannot guarantee that our Services will be free from viruses or
              bugs.
            </h1>
          </section>
          <br />
          <section>
            <h2 className="text-xl font-bold">Intellectual Property Rights</h2>
            <br />
            <p>
              Unless otherwise specified, the copyright and other intellectual
              property rights in the materials used to provide our Services are
              owned or licensed to accountsgoal. Any permission to reproduce
              material from this Website under this condition does not extend to
              any material on this site that is identified as being the
              copyright of a third party outside of our organisarion.
              Authorisation to reproduce such material must be obtained from the
              copyright holders concerned. Any material reproduced in accordance
              with this condition must be reproduced accurately and not used in
              a misleading context
            </p>
          </section>
          <br />
          <section>
            <h2 className="text-xl font-bold">Information About us</h2>
            <br />
            <p>
              At Accountsgoal, we are dedicated to empowering medical sales
              professionals with the tools they need to succeed. Our platform is
              designed specifically for the unique challenges of the medical
              sales industry, offering a suite of features that streamline
              workflow, enhance productivity, and drive growth. With
              cutting-edge technology and a user-friendly interface, our account
              management solutions provide everything from geo-client mapping
              and AI-driven insights to advanced goal-setting and
              synchronization with Excel and email. We are committed to helping
              you achieve unparalleled success by optimizing your sales
              processes and allowing you to focus on what truly matters—building
              strong relationships and exceeding your targets.
            </p>
          </section>
          <br />
          <section>
            <h2 className="text-xl font-bold">Limitation of Liability</h2>
            <br />
            <p>
              Your use of the Accountsgoal website and services is at your own
              risk. You agree to the limitation of liability clause to the
              maximum extent permitted by applicable law. Accountsgoal will in
              no way be liable for any direct, indirect, incidental, punitive,
              consequential, special or exemplary damages or any damages
              including damages resulting from:
              <br />
              a) revenue loss;
              <br />
              b) profit loss;
              <br />
              c) use;
              <br />
              d) loss of data;
              <br />
              e) loss of goodwill;
              <br />
              f) business interruption; or
              <br />
              g) any other intangible losses (whether Accountsgoal has been
              advised of the possibility of such damages or not) arising out of
              accountsgoal’s website or services (including, without limitation
              to inability to use, or arising from the result of use of
              accountsgoal’s website or services) whether such damages are based
              on warranty, tort, contract, statute or any other legal theory.
              Some jurisdictions do not allow exclusion of certain warranties or
              limitations on the scope and duration of such warranties, so the
              above disclaimers may not apply to you in their entirety, but will
              apply to the maximum extent permitted by applicable law.
            </p>
          </section>

          <br />
          <section>
            <h2 className="text-xl font-bold">
              Viruses, Hacking and other Offenses
            </h2>
            <br />
            <p>
              Viruses, Hacking and other Offenses You must not misuse our
              platforms by knowingly introducing viruses, trojans, worms, logic
              bombs or other material that is malicious or technologically
              harmful. You must not attempt to gain unauthorised access to our
              Services, the server on which our Services are stored or any
              server, computer or database connected to our Website. You must
              not attack our platforms via a denial-of-service attack or a
              distributed denial-of-service attack. By breaching this provision,
              you would commit a criminal offence under the Cybercrimes
              (prohibition, Prevention, etc.) Act 2015. We will report any such
              breach to the relevant law enforcement authorities, and we will
              cooperate with those authorities by disclosing your identity to
              them. In the event of such a breach, your right to use our
              Services will cease immediately. We will not be liable for any
              loss or damage caused by a distributed denial-of-service attack,
              viruses or other technologically harmful material that may infect
              your computer equipment, computer programs, data or other
              proprietary material due to your use of our platforms or to your
              downloading of any material posted on it, or on any website linked
              to it.
            </p>
          </section>

          <br />
          <section>
            <h2 className="text-xl font-bold">
              Linking to and from Our Platforms
            </h2>
            <br />
            <p>
              Our platforms provide web-links (and other contact details) to
              other websites which we think may be of interest to you. Some of
              these websites are operated in conjunction with other
              companies/organisations and some are operated solely by
              independent companies/organisations. We have no control over such
              websites and resources, and we accept no liability for any
              products, services, materials or information contained on or
              available through linked websites or otherwise provided by any
              other company/ organisation referred to on our platforms. These
              links are provided purely for your convenience, but we do not
              endorse the material on these websites. No linked websites are
              covered by these Terms; therefore, you should check what terms
              cover the use of these websites before using them.
            </p>
          </section>
          <br />
          <section>
            <h2 className="text-xl font-bold">Language</h2>
            <br />
            <p>
              The governing language of these terms and all communication
              between AccountsGoaland you will be English language.
            </p>
          </section>
          <br />
          <section>
            <h2 className="text-xl font-bold">
              Information About You and Your Visits to Our App
            </h2>
            <br />
            <p>
              We process information about you in accordance with our privacy
              policy. By using our Services, you consent to such processing, and
              you warrant that all data provided by you is accurate.
            </p>
          </section>
          <br />

          <section>
            <h2 className="text-xl font-bold">Accessing Our Services</h2>
            <br />
            <p>
              We grant you a non-assignable, non-exclusive, and revocable
              license to use our Services in the manner permitted by these
              Terms. This license grant includes all updates, upgrades, new
              versions and replacement software for your use in connection with
              our Services. Access to our Services is permitted on a temporary
              basis, and we reserve the right to withdraw or amend the Services
              we provide on any of our Services without notice. We will not be
              liable if for any reason any of our Services is unavailable at any
              time or for any period. From time to time, we may restrict access
              to some parts or all of our Services, to users who have registered
              with us. If you choose, or you are provided with, a user
              identification code, password or any other piece of information as
              part of our security procedures, you must treat such information
              as confidential, and you must not disclose it to any third party.
              We have the right to disable any user identification code or
              password, whether chosen by you or allocated by us, at any time,
              if, in our opinion, you have failed to comply with any of the
              provisions of these terms of use. You are responsible for making
              all arrangements necessary for you to have access to our Services.
              You are also responsible for ensuring that all persons who access
              our Services through your internet connection are aware of these
              terms of use, and that they comply with them.
            </p>
          </section>
          <br />

          <section>
            <h2 className="text-xl font-bold">Indemnification</h2>
            <br />
            <p>
              You hereby indemnify Accountsgoal and undertake to keep
              AccountsGoal, its staff and affiliates indemnified against any
              losses, damages, costs, liabilities and expenses (including
              without limitation reasonable legal fees and expenses) arising out
              of any breach by you of any provision of these Terms, or arising
              out of any claim that you have breached any provision of these
              Terms. You will indemnify and hold Accountsgoal harmless from and
              against any claim, suit or proceedings brought against
              Accountsgoal arising from or in connection with violations of
              intellectual property or other rights of third parties in relation
              to your use of the Services.
            </p>
          </section>
          <br />

          <section>
            <h2 className="text-xl font-bold">Suspension and Termination</h2>
            <br />
            <p>
              We will determine, in our discretion, whether there has been a
              breach of these terms and conditions. When a breach of these terms
              and conditions has occurred, we may take such action as we deem
              appropriate.
            </p>
          </section>
          <br />
          <section>
            <h2 className="text-xl font-bold">Our Website Changes Regularly</h2>
            <br />
            <p>
              We aim to update our Services regularly and may change the content
              at any time. If the need arises, we may suspend access to our
              Services or close it indefinitely. Any of the material on our
              platforms may be out of date at any given time, and we are under
              no obligation to update such material.
            </p>
          </section>
          <br />
          <section>
            <h2 className="text-xl font-bold">Cookies</h2>
            <br />
            <p>
              Like many other websites, we use cookies to identify you as a user
              and to customize and improve our Services. A cookie is a small
              data file that is transferred to your computer or mobile device.
              It enables us to remember your account log-in information, IP
              addresses, web traffic, number of times you visit, date and time
              of visits. Please refer to our Cookies Notice for more
              information. Some browsers may automatically accept cookies, while
              some can be modified to decline cookies or alert you when a
              website wants to place a cookie on your computer. If you do choose
              to disable cookies, it may limit your ability to use our website.
            </p>
          </section>
          <br />
          <section>
            <h2 className="text-xl font-bold">Changes to the general terms</h2>
            <br />
            <p>
              We may revise these Terms at any time by amending this page. You
              are expected to check this page from time to time to take notice
              of any changes we made, as they are binding on you. Some of the
              provisions contained in these terms of use may also be superseded
              by provisions or notices published elsewhere on our platforms.{" "}
            </p>
          </section>
          <br />
          <section>
            <h2 className="text-xl font-bold">Waiver</h2>
            <br />
            <p>
              No failure or delay by us to exercise any right or remedy provided
              under these terms of use or by law shall constitute a waiver of
              that or any other right or remedy, nor shall it preclude or
              restrict the further exercise of that or any other right or
              remedy. No single or partial exercise of such right or remedy
              shall preclude or restrict the further exercise of that or any
              other right or remedy.
            </p>
          </section>
          <br />
          <section>
            <h2 className="text-xl font-bold">Complaints</h2>
            <br />
            <p>
              If you have any complaints about us and our Services, you may
              contact us at support@accountsgoal.com
            </p>
          </section>
          <br />

          <section>
            {/* <h2 className="text-xl font-bold">Accountsgoal </h2> */}
            <br />
            <h2 className="text-xl font-bold">
              Accountsgoal 
              <br />
              Email Address: support@accountsgoal.com
              <br></br>
              Address: 14175 DALLAS PKWY APT 1525, FARMERS, DALLAS, TX,
              <br /> 75254-4424{" "}
            </h2>
          </section>
        </div>
        {/*<footer className="bg-gray-100 p-6 text-center rounded-lg mt-6">
        <p>Contact us at <a href="mailto:support@accountsgoal.com" className="text-blue-600">support@accountsgoal.com</a> if you have any questions or concerns about our privacy practices.</p>
        <p className="mt-2">Accountsgoal<br />
          Email Address: <a href="mailto:support@accountsgoal.com" className="text-blue-600">support@accountsgoal.com</a><br />
          Address: 14175 DALLAS PKWY APT 1525, FARMERS, DALLAS, TX, 75254-4424
        </p>
      </footer>*/}
      </div>
      <Footer page={true} supportChatRef={supportChatRef} />
    </div>
  );
};

export default PrivacyPolicy;
