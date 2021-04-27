import React from "react";
import emailjs from "emailjs-com";
import "./styles.scss";

function ContactForm() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3l2qg4g",
        "template_w617gwk",
        e.target,
        "user_a240LKzfL07ZdxDief2go"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <div className="contatForm ">
      <h2 className="text-center pt-32 font-bold ">Get in Touch</h2>
      <form className="w-6/12 m-auto		self-auto " onSubmit={sendEmail}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2"
              for="grid-first-name"
            >
              First Name
            </label>
            <input
              className=" form-control appearance-none text-base block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
              id="grid-first-name"
              type="text"
              placeholder="Your First Name"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2"
              for="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="form-control appearance-none text-base block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
              id="grid-last-name"
              type="text"
              placeholder="Name"
              name="name"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2"
              for="grid-password"
            >
              E-mail
            </label>
            <input
              className="appearance-none text-base block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-orange-500"
              id="email"
              type="email"
              placeholder="Email Address"
              name="email"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2"
              for="grid-password"
            >
              Message
            </label>
            <textarea
              className="form-control no-resize appearance-none text-base block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-orange-500 h-48 resize-none"
              id="message"
              placeholder="Your message"
              name="message"
            ></textarea>
          </div>
        </div>
        <div className="align-middle ">
          <div className="md">
            <button
              className="shadow w-full flex-auto content-center bg-orange-400 text-base  hover:bg-gray-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              value="Send Message"
            >
              Send Message
            </button>
          </div>
          <div className="md"></div>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
