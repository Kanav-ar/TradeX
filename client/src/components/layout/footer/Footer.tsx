import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { ArrowUpRight } from "lucide-react";

const platformLinks = [
  { text: "Dashboard", href: "/dashboard" },
  { text: "Orders", href: "/dashboard/orders" },
  { text: "Holdings", href: "/dashboard/holdings" },
  { text: "Positions", href: "/dashboard/positions" },
  { text: "Funds", href: "/dashboard/funds" },
];

const exploreLinks = [
  { text: "Pricing", href: "/pricing" },
  { text: "Education", href: "/#education" },
  { text: "Support", href: "/support" },
  { text: "About", href: "/about" },
];

const accountLinks = [
  { text: "Profile", href: "/profile" },
  { text: "Login", href: "/login" },
  { text: "Create account", href: "/signup" },
];

export default function Footer() {
  return (
    <footer className=" bg-gray-100 dark:bg-blue-950/20 text-gray-400">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <a
              href="/"
              className="inline-block text-3xl text-black font-bold tracking-tight dark:text-white"
            >
              Trade<span className="text-blue-500">X</span>
            </a>

            <p className="mt-5 text-sm leading-7 text-gray-500">
              A modern trading workspace built to explore markets, place trades,
              and manage your portfolio from one connected platform.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <SocialLink href="https://github.com/Kanav-ar" label="GitHub">
                <FaGithub />
              </SocialLink>

              <SocialLink href="https://www.linkedin.com/in/ar-kanav/" label="LinkedIn">
                <FaLinkedinIn />
              </SocialLink>

              <SocialLink href="https://x.com/ar_kanav" label="X">
                <FaXTwitter />
              </SocialLink>
            </div>
          </div>

          <FooterColumn heading="Platform" links={platformLinks} />

          <FooterColumn heading="Explore" links={exploreLinks} />

          <FooterColumn heading="Account" links={accountLinks} />
        </div>

        <div className="my-12 h-px bg-gray-300 dark:bg-gray-800" />

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs leading-6 text-gray-500">
              <span className="font-medium text-gray-400">
                TradeX is a portfolio project
              </span>{" "}
              created for demonstration and educational purposes. It is not a
              registered stock broker, investment adviser, or financial service.
            </p>
          </div>

          <a
            href="https://github.com/Kanav-ar"
            target="_blank"
            rel="noopener noreferrer"
            className=" group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-blue-400 dark:text-gray-300"
          >
            Built by me
            <ArrowUpRight
              className="
                h-4
                w-4
                transition-transform
                duration-200
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </a>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-gray-300 dark:border-gray-800 pt-6 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TradeX. All rights reserved.</p>

          <div className="flex gap-6">
            <a
              href="/privacy"
              className="transition-colors hover:text-gray-300"
            >
              Privacy
            </a>

            <a href="/terms" className="transition-colors hover:text-gray-300">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: { text: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold dark:text-white">{heading}</h3>

      <div className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link.text}
            href={link.href}
            className=" w-fit text-sm text-gray-500 transition-all duration-200 hover:translate-x-0.5 hover:text-blue-400
            "
          >
            {link.text}
          </a>
        ))}
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
 
}: {
  href: string;
  label: string;
  children: React.ReactNode;
 
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={` flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 dark:bg-gray-900/50 text-gray-500 transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400`}
    >
      {children}
    </a>
  );
}
