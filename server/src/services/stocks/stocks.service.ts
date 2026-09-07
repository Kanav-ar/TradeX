import ApiError from "../../utils/ApiError";

export interface StockQuote {
  symbol: string;
  company_name: string | null;
  trade_date: string | null;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  prev_close: number | null;
  change_pct: number | null;
  volume: number | null;
  found: boolean;
}

interface CachedQuote {
  quote: StockQuote;
  expiresAt: number;
}

const quoteCache = new Map<string, CachedQuote>();

const QUOTE_CACHE_TTL = 5 * 60 * 1000;
const MAX_SYMBOLS_PER_REQUEST = 50;

export async function getStockQuotes(
  symbols: string[],
): Promise<StockQuote[]> {
  const uniqueSymbols = [
    ...new Set(
      symbols
        .map((symbol) => symbol.trim().toUpperCase())
        .filter(Boolean),
    ),
  ];

  if (uniqueSymbols.length === 0) {
    return [];
  }

  const now = Date.now();

  const cachedQuotes: StockQuote[] = [];
  const symbolsToFetch: string[] = [];

  for (const symbol of uniqueSymbols) {
    const cached = quoteCache.get(symbol);

    if (cached && cached.expiresAt > now) {
      cachedQuotes.push(cached.quote);
    } else {
      symbolsToFetch.push(symbol);
    }
  }

  if (symbolsToFetch.length === 0) {
    return cachedQuotes;
  }

  const apiKey = process.env.WATCHLIST_API_KEY;

  if (!apiKey) {
    throw new ApiError(
      500,
      "Watchlist API key is not configured",
    );
  }

  const freshQuotes: StockQuote[] = [];

  for (
    let i = 0;
    i < symbolsToFetch.length;
    i += MAX_SYMBOLS_PER_REQUEST
  ) {
    const batch = symbolsToFetch.slice(
      i,
      i + MAX_SYMBOLS_PER_REQUEST,
    );

    const queryParams = new URLSearchParams({
      symbols: batch.join(","),
    });

    const response = await fetch(
      `https://bharatstockapi.com/v1/stocks/quotes?${queryParams.toString()}`,
      {
        headers: {
          "X-API-Key": apiKey,
        },
      },
    );

    if (!response.ok) {
      throw new ApiError(
        response.status,
        "Failed to fetch stock quotes",
      );
    }

    const quotes = (await response.json()) as StockQuote[];

    for (const quote of quotes) {
      quoteCache.set(quote.symbol, {
        quote,
        expiresAt: now + QUOTE_CACHE_TTL,
      });

      freshQuotes.push(quote);
    }
  }

  return [...cachedQuotes, ...freshQuotes];
}