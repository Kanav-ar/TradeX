import {
  BarChart3,
  ChevronDown,
  CircleDollarSign,
  LockKeyhole,
  Search,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { useState } from "react";

type FAQ = {
  id: number;
  category: string;
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    id: 1,
    category: "Account",
    question: "How do I create a TradeX account?",
    answer:
      "Create an account using the TradeX signup flow with your name, email, username, and password. Once registration is complete, you can verify your email and sign in to your TradeX workspace.",
  },
  {
    id: 2,
    category: "Account",
    question: "How do I verify my email address?",
    answer:
      "After registration, TradeX sends a verification link to your registered email address. Open the link to complete verification and continue using your account.",
  },
  {
    id: 3,
    category: "Security",
    question: "I forgot my password. What should I do?",
    answer:
      "Use the Forgot Password option on the login page. Enter your registered email address and follow the password reset link sent to you.",
  },
  {
    id: 4,
    category: "Security",
    question: "Can I change my password?",
    answer:
      "Yes. Once you're logged in, you can change your password from your account settings by providing your current password and setting a new one.",
  },
  {
    id: 5,
    category: "Trading",
    question: "How do I place a buy or sell order?",
    answer:
      "Select a stock from the watchlist and open the order window. Choose BUY or SELL, enter the required quantity and price, select the product type, and submit the order.",
  },
  {
    id: 6,
    category: "Trading",
    question: "What is the difference between CNC and MIS?",
    answer:
      "CNC is used for delivery-based equity trades and updates your holdings. MIS is used for intraday trading and is tracked as a position with margin usage.",
  },
  {
    id: 7,
    category: "Trading",
    question: "Why did my order fail?",
    answer:
      "An order can fail when the required funds or margin are unavailable, the requested quantity is invalid, or the trade does not satisfy the application's trading rules.",
  },
  {
    id: 8,
    category: "Portfolio",
    question: "How is my portfolio P&L calculated?",
    answer:
      "P&L is calculated by comparing the current market value of your holdings with their total investment value. The current value is based on the latest available market price.",
  },
  {
    id: 9,
    category: "Portfolio",
    question: "What is the difference between holdings and positions?",
    answer:
      "Holdings represent delivery-based investments purchased through CNC. Positions represent active intraday trades made through MIS.",
  },
  {
    id: 10,
    category: "Funds",
    question: "How do I add funds to TradeX?",
    answer:
      "Open the Funds section of your dashboard, choose Add Funds, enter a valid amount, and confirm the transaction.",
  },
  {
    id: 11,
    category: "Funds",
    question: "How do I withdraw funds?",
    answer:
      "Open the Funds section, select Withdraw Funds, enter the amount you want to withdraw, and confirm the request.",
  },
  {
    id: 12,
    category: "Watchlist",
    question: "Why is a stock price unavailable?",
    answer:
      "Some securities may not have an available quote from the market-data source. When a quote is unavailable, TradeX displays the stock without a current market price.",
  },
];

const categories = [
  {
    name: "Account",
    icon: ShieldCheck,
  },
  {
    name: "Trading",
    icon: BarChart3,
  },
  {
    name: "Portfolio",
    icon: CircleDollarSign,
  },
  {
    name: "Funds",
    icon: Wallet,
  },
  {
    name: "Watchlist",
    icon: Search,
  },
  {
    name: "Security",
    icon: LockKeyhole,
  },
];

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openId, setOpenId] = useState<number | null>(null);

  const filteredFAQs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <>
      <div className="mb-12 text-center mx-auto w-full max-w-6x">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-500">
          Help Center
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Find the answers you need.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
          Browse common questions about your TradeX account, trading, portfolio,
          funds, and market data.
        </p>
      </div>

      <div className="mb-12 flex flex-wrap justify-center gap-4">
        <CategoryButton
          name="All"
          active={activeCategory === "All"}
          onClick={() => {
            setActiveCategory("All");
            setOpenId(null);
          }}
        />

        {categories.map((category) => {
          const Icon = category.icon;

          return (
            <button
              key={category.name}
              type="button"
              onClick={() => {
                setActiveCategory(category.name);
                setOpenId(null);
              }}
              className={` group flex min-h-[82px] min-w-[100px] flex-col items-center justify-center gap-2 cursor-pointer rounded-xl border p-3 text-center transition-all duration-300
                ${
                  activeCategory === category.name
                    ? "border-blue-500 bg-blue-500 text-white shadow-md"
                    : "border-gray-200 bg-white text-gray-600 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-[#0d1421] dark:text-gray-300 dark:hover:border-blue-500"
                }
                  `}
            >
              <Icon className="h-5 w-5" />

              <span className="text-xs font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Frequently asked questions
          </h3>

          <span className="text-xs text-gray-400 dark:text-gray-500">
            {filteredFAQs.length} questions
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#0d1421]">
          {filteredFAQs.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={
                  index !== filteredFAQs.length - 1
                    ? "border-b border-gray-100 dark:border-gray-800"
                    : ""
                }
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/40
                  "
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <span
                      className={`mt-0.5 hidden h-7 min-w-7 items-center justify-center rounded-full text-[10px] font-semibold sm:flex
                        ${
                          isOpen
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                        }
                        `}
                    >
                      {String(faq.id).padStart(2, "0")}
                    </span>

                    <div>
                      <p
                        className={`
                          text-sm
                          font-medium
                          transition-colors
                          ${
                            isOpen
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-800 dark:text-gray-200"
                          }
                          `}
                      >
                        {faq.question}
                      </p>

                      <span className="mt-1 block text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        {faq.category}
                      </span>
                    </div>
                  </div>

                  <ChevronDown
                    className={`
                      h-5
                      w-5
                      shrink-0
                      text-gray-400
                      transition-transform
                      duration-300
                      ${isOpen ? "rotate-180 text-blue-500" : ""}
                      `}
                  />
                </button>

                <div
                  className={`
                    grid
                    transition-all
                    duration-300
                    ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pl-[4.75rem] pr-8">
                      <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-12  overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/70 p-8 dark:border-blue-900/50 dark:bg-blue-950/20 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Still need help?
            </p>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              TradeX is a portfolio project built to explore modern full stack
              trading workflows. You can reach out through these links.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="YOUR_GITHUB_URL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-500 transition-colors hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400"
            >
              GitHub ↗
            </a>

            <a
              href="YOUR_LINKEDIN_URL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-500 transition-colors hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-700"
            >
              LinkedIn ↗
            </a>

            <a
              href="YOUR_PORTFOLIO_URL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-500 transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
            >
              X ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function CategoryButton({
  name,
  active,
  onClick,
}: {
  name: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={` flex min-h-[82px] min-w-[100px] flex-col cursor-pointer items-center justify-center rounded-xl border p-3 transition-all duration-300
        ${
          active
            ? "border-blue-500 bg-blue-500 text-white shadow-md"
            : "border-gray-200 bg-white text-gray-600 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-[#0d1421] dark:text-gray-300 dark:hover:border-blue-500"
        }
      `}
    >
      <span className="text-md">{name}</span>
    </button>
  );
}

//  <a
//             href="/"
//             className="
//             inline-flex
//             shrink-0
//             items-center
//             justify-center
//             rounded-lg
//             bg-blue-600
//             px-5
//             py-3
//             text-sm
//             font-medium
//             text-white
//             transition-all
//             duration-200
//             hover:bg-blue-700
//             hover:shadow-lg
//             "
//           >
//             Back to TradeX
//           </a>
