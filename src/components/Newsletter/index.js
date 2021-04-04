import React from "react";
import SubscribeCard from "react-subscribe-card";
import "./styles.scss";

const mailchimpURL = `https://gmail.us19.list-manage.com/subscribe/post?u=12e320693f4d7e394167fe5cd&amp;id=b52b4de677`;

const Newsletter = () => (
  <div className="newsletter">
    <SubscribeCard
      mailchimpURL={mailchimpURL}
      title="Join Our Newsletter"
      description="Subscribe in order to be always up to date with our latest news"
    />
  </div>
);

export default Newsletter;
