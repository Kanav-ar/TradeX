export interface ChargesExplained {
  title: string;
  description: string[];
}

export const leftCharges: ChargesExplained[] = [
  {
    title: "Securities/Commodities transaction tax",
    description: [
      "Tax by the government when transacting on the exchanges. Charged as above on both buy and sell sides when trading equity delivery. Charged only on selling side when trading intraday or on F&O.",
    ],
  },
  {
    title: "Transaction/Turnover Charges",
    description: [
      "Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.",
      "BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to ₹10,000 per crore w.e.f. 01.01.2016. (XC and XD groups have been merged into a new group X w.e.f. 01.12.2017)",
      "BSE has revised transaction charges in SS and ST groups to ₹1,00,000 per crore of gross turnover.",
      "BSE has revised transaction charges for group A, B and other non-exclusive scrips to ₹375 per crore of turnover on a flat-rate basis w.e.f. December 1, 2022.",
      "BSE has revised transaction charges in M, MT, TS and MS groups to ₹275 per crore of gross turnover.",
    ],
  },
  {
    title: "Call & Trade",
    description: [
      "Additional charges of ₹50 per order for orders placed through a dealer at Zerodha, including auto square-off orders.",
    ],
  },
  {
    title: "Stamp Charges",
    description: [
      "Stamp charges by the Government of India as per the Indian Stamp Act of 1899 for transacting in instruments on the stock exchanges and depositories.",
    ],
  },
  {
    title: "NRI Brokerage Charges",
    description: [
      "For a non-PIS account, 0.5% or ₹50 per executed order for equity and F&O (whichever is lower).",
      "For a PIS account, 0.5% or ₹200 per executed order for equity (whichever is lower).",
      "₹500 + GST as yearly account maintenance charges (AMC).",
    ],
  },
  {
    title: "Account with Debit Balance",
    description: [
      "If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20.",
    ],
  },
  {
    title: "Charges for Investor's Protection Fund Trust (IPFT) by NSE",
    description: [
      "Equity & Futures: ₹0.01 per crore + GST of traded value.",
      "Options: ₹0.01 per crore + GST of premium value.",
      "Currency: ₹0.05 per lakh + GST of turnover for Futures and ₹2 per lakh + GST of premium for Options.",
    ],
  },
  {
    title: "Margin Trading Facility (MTF)",
    description: [
      "MTF Interest: 0.04% per day (₹40 per lakh) on the funded amount.",
      "MTF Brokerage: 0.3% or ₹20 per executed order, whichever is lower.",
      "MTF Pledge Charge: ₹15 + GST per pledge and unpledge request per ISIN.",
    ],
  },
];

export const rightCharges: ChargesExplained[] = [
  {
    title: "GST",
    description: [
      "18% GST on (brokerage + SEBI charges + transaction charges).",
    ],
  },
  {
    title: "SEBI Charges",
    description: [
      "₹10 per crore + GST charged by SEBI for regulating the markets.",
    ],
  },
  {
    title: "DP (Depository Participant) Charges",
    description: [
      "₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) when stocks are sold.",
      "Female first holders receive a ₹0.25 discount on the CDSL fee.",
      "Mutual fund & bond debit transactions receive an additional ₹0.25 discount on the CDSL fee.",
    ],
  },
  {
    title: "Pledging Charges",
    description: ["₹30 + GST per pledge request per ISIN."],
  },
  {
    title: "AMC (Account Maintenance Charges)",
    description: [
      "Free for the first year on all new resident individual accounts.",
      "BSDA accounts: Zero charges if holdings are below ₹4 lakh.",
      "Non-BSDA accounts: ₹300/year + 18% GST charged quarterly.",
    ],
  },
  {
    title: "Corporate Action Order Charges",
    description: [
      "₹20 + GST for OFS, buyback, takeover and delisting orders placed through Console.",
    ],
  },
  {
    title: "Off-market Transfer Charges",
    description: ["₹25 per transaction."],
  },
  {
    title: "Physical CMR Request",
    description: [
      "First request is free.",
      "Subsequent requests: ₹20 + ₹100 courier charges + 18% GST.",
    ],
  },
  {
    title: "Payment Gateway Charges",
    description: ["₹9 + GST (not applicable for UPI transfers)."],
  },
  {
    title: "Delayed Payment Charges",
    description: [
      "Interest is charged at 18% per annum (0.05% per day) on debit balances in the trading account.",
    ],
  },
  {
    title: "Trading using 3-in-1 account with block functionality",
    description: [
      "Delivery & MTF Brokerage: 0.5% per executed order.",
      "Intraday Brokerage: 0.05% per executed order.",
    ],
  },
];
