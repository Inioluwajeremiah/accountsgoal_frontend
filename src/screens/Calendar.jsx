import React, { useState } from "react";
import 'add-to-calendar-button';
import { PopupButton } from 'react-calendly';
import calendlyImageNew from '../assets/calendlyImageNew.png';
//import { IoMdClose } from "react-icons/io";


const CalendarScreen = () => {

  /*const [showModal, setShowModal] = useState(false);
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };*/



  return (
    <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
    <div style={{ marginTop: 200 }}>
    <button className="bg-[#e4e4e4] rounded-full text-white font-inter font-semibold flex items-center justify-center p-2 my-4">
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={calendlyImageNew} alt="Calendly Logo" className="w-10 h-10 mr-2" />
        <PopupButton
          url="https://calendly.com/admin-czdj" 
          rootElement={document.getElementById('root')}
          text="Calendly"
        />
      </div>
      </button>









<add-to-calendar-button
  name="[Reminder] Test the Add to Calendar Button"
  startDate="2024-06-02"
  startTime="10:15"
  endTime="23:30"
  timeZone="America/Los_Angeles"
  description="Check out the maybe easiest way to include Add to Calendar Buttons to your web projects:[br]→ [url]https://add-to-calendar-button.com/|Click here![/url]"
  options="Google"
  label='Google'
  buttonStyle="round"
  lightMode="bodyScheme"
></add-to-calendar-button>


<add-to-calendar-button
  name="[Reminder] Test the Add to Calendar Button"
  startDate="2024-06-02"
  startTime="10:15"
  endTime="23:30"
  timeZone="America/Los_Angeles"
  description="Check out the maybe easiest way to include Add to Calendar Buttons to your web projects:[br]→ [url]https://add-to-calendar-button.com/|Click here![/url]"
  options="Outlook.com"
  label='Outlook'
  buttonStyle="round"
  lightMode="bodyScheme"
></add-to-calendar-button>

<add-to-calendar-button
  name="[Reminder] Test the Add to Calendar Button"
  startDate="2024-06-02"
  startTime="10:15"
  endTime="23:30"
  timeZone="America/Los_Angeles"
  description="Check out the maybe easiest way to include Add to Calendar Buttons to your web projects:[br]→ [url]https://add-to-calendar-button.com/|Click here![/url]"
  options="Microsoft Teams"
  label='Teams'
  buttonStyle="round"
  lightMode="bodyScheme"
></add-to-calendar-button>

<add-to-calendar-button
  name="[Reminder] Test the Add to Calendar Button"
  startDate="2024-06-02"
  startTime="10:15"
  endTime="23:30"
  timeZone="America/Los_Angeles"
  description="Check out the maybe easiest way to include Add to Calendar Buttons to your web projects:[br]→ [url]https://add-to-calendar-button.com/|Click here![/url]"
  options="Office.365"
  label=''
  buttonStyle="round"
  lightMode="bodyScheme"
></add-to-calendar-button>



    </div>
    </div>

  );
};

export default CalendarScreen;