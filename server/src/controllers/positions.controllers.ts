import { Position } from "../models/positions.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import WrapAsync from "../utils/WrapAsync";

interface StockQuote {
  symbol: string;
  close: number | null;
  found: boolean;
}

const getAllPositions = WrapAsync(async (req, res) => {
  const positions = await Position.find({
    owner: req.user?._id,
  }).sort({
    createdAt: -1,
  });
  
  if (positions.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "All positions fetched successfully"));
  }

  const symbols = positions.map((position) => position.symbol);

  const apiKey = process.env.WATCHLIST_API_KEY;

  if (!apiKey) {
    throw new ApiError(500, "Watchlist API key is not configured");
  }

  const queryParams = new URLSearchParams({
    symbols: symbols.join(","),
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
    throw new ApiError(response.status, "Failed to fetch stock quotes");
  }

  const quotes = (await response.json()) as StockQuote[];

  const quoteMap = new Map(
    quotes
      .filter((quote) => quote.found && quote.close !== null)
      .map((quote) => [quote.symbol, quote.close]),
  );

  const updatedPositions = positions.map((position) => ({
    ...position.toObject(),
    price: quoteMap.get(position.symbol) ?? position.price,
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedPositions, "All positions fetched successfully"),
    );
});

const getPositionById = WrapAsync(async (req, res) => {
  const { id } = req.params;

  const position = await Position.findOne({
    _id: id,
    owner: req.user?._id,
  });

  if (!position) {
    throw new ApiError(404, "Position not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, position, "Position fetched successfully"));
});

export { getAllPositions, getPositionById };
