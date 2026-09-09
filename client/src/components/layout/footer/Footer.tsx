import FooterSubSection from "./FooterSubSection";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import logo from "../../../assets/logo.svg";
import playstore from "../../../assets/googlePlayBadge.svg";
import appstore from "../../../assets/appstoreBadge.svg";

export const accountLinks = [
  { text: "Open demat account", href: "#" },
  { text: "Minor demat account", href: "#" },
  { text: "NRI demat account", href: "#" },
  { text: "HUF demat account", href: "#" },
  { text: "Commodity", href: "#" },
  { text: "Dematerialisation", href: "#" },
  { text: "Fund transfer", href: "#" },
  { text: "MTF", href: "#" },
];

export const supportLinks = [
  { text: "Contact us", href: "#" },
  { text: "Support portal", href: "#" },
  { text: "How to file a complaint?", href: "#" },
  { text: "Status of your complaints", href: "#" },
  { text: "Bulletin", href: "#" },
  { text: "Circular", href: "#" },
  { text: "Z-Connect blog", href: "#" },
  { text: "Downloads", href: "#" },
];

export const companyLinks = [
  { text: "About", href: "#" },
  { text: "Philosophy", href: "#" },
  { text: "Press & media", href: "#" },
  { text: "Careers", href: "#" },
  { text: "Zerodha Cares (CSR)", href: "#" },
  { text: "Zerodha.tech", href: "#" },
  { text: "Open source", href: "#" },
  { text: "Referral program", href: "#" },
];

export const quickLinks = [
  { text: "Upcoming IPOs", href: "#" },
  { text: "Brokerage charges", href: "#" },
  { text: "Market holidays", href: "#" },
  { text: "Economic calendar", href: "#" },
  { text: "Calculators", href: "#" },
  { text: "Markets", href: "#" },
  { text: "Sectors", href: "#" },
  { text: "Gift Nifty", href: "#" },
];

export default function Footer() {
  return (
    <div className="text-gray-500 bg-gray-100 dark:bg-gray-950 py-8 space-y-8 transition-all duration-1000">
      <div className="flex md:flex-row flex-col md:gap-8 xl:gap-32 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex-1 flex flex-col gap-8">
          {/* <img className="w-50" src={logo} alt="zerodha logo" /> */}

          <p className="text-sm">
            © 2010 - 2026, Zerodha Broking Ltd. All rights reserved.
          </p>
          <div className="flex gap-4 text-xl">
          
          </div>
        
          <div className="flex gap-4">
            <img className="w-20 lg:w-25" src={playstore} alt="playstore" />
            <img className="w-20 lg:w-25" src={appstore} alt="appstore" />
          </div>
        </div>
        <div className="flex md:flex-row flex-col flex-3 gap-8 lg:gap-12 xl:gap-16 lg:pt-0 lg:pb-0 pt-16 pb-8">
          <FooterSubSection heading="Account" links={accountLinks} />

          <FooterSubSection heading="Support" links={supportLinks} />

          <FooterSubSection heading="Company" links={companyLinks} />

          <FooterSubSection heading="Quick links" links={quickLinks} />
        </div>
      </div>

      <div className="flex flex-col mx-auto text-xs gap-4 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p>
         
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center max-w-5xl mx-auto ">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#387ed1]"
          href="https://www.nseindia.com/"
        >
          NSE
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#387ed1]"
          href="http://bseindia.com/"
        >
          BSE
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#387ed1]"
          href="https://www.mcxindia.com/"
        >
          MCX
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#387ed1]"
          href="https://mseindia.com/"
        >
          Terms & conditions
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#387ed1]"
          href=""
        >
          Policies & procedures
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#387ed1]"
          href=""
        >
          Privacy policy
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#387ed1]"
          href=""
        >
          Disclosure
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#387ed1]"
          href=""
        >
          For Investor's attention
        </a>
        <a className="hover:text-[#387ed1]" href="">
          Investor charter
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#387ed1]"
          href=""
        >
          Sitemap
        </a>
      </div>
    </div>
  );
}
