import { Position } from "../models/positions.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import WrapAsync from "../utils/WrapAsync";
import { getStockQuotes as fetchStockQuotes } from "../services/stocks/stocks.service";

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

  let quoteMap = new Map<string, number | null>();

  const symbols = positions.map((position) => position.symbol);

  try {
    const quotes = await fetchStockQuotes(symbols);

    quoteMap = new Map(
      quotes
        .filter((quote) => quote.found && quote.close !== null)
        .map((quote) => [quote.symbol, quote.close]),
    );
  } catch (error) {
    console.error("Failed to fetch position quotes:", error);
  }

  const updatedPositions = positions.map((position) => ({
    ...position.toObject(),
    price: quoteMap.get(position.symbol) ?? position.price,
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedPositions,
        "All positions fetched successfully",
      ),
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
