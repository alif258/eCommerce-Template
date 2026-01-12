import React from "react";
import settingsData from "../data/settings.json";

// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import Container from "./Container";

const Footer = () => {
  const { footer, social, contact } = settingsData;

  return (
    <footer className="bg-primary text-white py-8 mt-12">
      <Container className=" mx-auto px-4 lg:px-0 flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
        
        {/* Store Info */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src={settingsData.logo}
            alt={settingsData.storeName}
            className="h-12 mb-2"
          />
          <h2 className="text-xl font-bold">{settingsData.storeName}</h2>
          <p className="text-sm mt-1">{contact.address}</p>
          <p className="text-sm">Phone: {contact.phone}</p>
          <p className="text-sm">Email: {contact.email}</p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold mb-2">Links</h3>
          <ul>
            {footer.links.map((link, idx) => (
              <li key={idx} className="mb-1 hover:text-accent">
                <a href={link.url}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 text-lg">
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            )}
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            )}
            {social.twitter && (
              <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            )}
          </div>
        </div>
      </Container>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-white/20 pt-4 text-center text-sm">
        {footer.text}
      </div>
    </footer>
  );
};

export default Footer;
