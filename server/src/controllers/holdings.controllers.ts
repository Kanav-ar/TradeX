import { Holding } from "../models/holdings.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import WrapAsync from "../utils/WrapAsync";

interface StockQuote {
  symbol: string;
  close: number | null;
  found: boolean;
}

const getAllHoldings = WrapAsync(async (req, res) => {
  const holdings = await Holding.find({
    owner: req.user?._id,
  }).sort({
    createdAt: -1,
  });

  if (holdings.length === 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          [],
          "All Holdings fetched successfully!",
        ),
      );
  }


  const symbols = holdings.map((holding) => holding.symbol);

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
    throw new ApiError(
      response.status,
      "Failed to fetch stock quotes",
    );
  }

  const quotes = (await response.json()) as StockQuote[];

  const quoteMap = new Map(
    quotes
      .filter((quote) => quote.found && quote.close !== null)
      .map((quote) => [quote.symbol, quote.close]),
  );

  const updatedHoldings = holdings.map((holding) => ({
    ...holding.toObject(),
    price: quoteMap.get(holding.symbol) ?? holding.price,
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedHoldings,
        "All Holdings fetched successfully!",
      ),
    );
});

const addHolding = WrapAsync(async (req, res) => {
  const { holding } = req.body;

  const newHolding = await Holding.create({
    symbol: holding.symbol,
    exchange: holding.exchange,
    isin: holding.isin,
    name: holding.name,
    price: holding.price,
    qty: holding.qty,
    avg: holding.avg,
    owner: req.user?._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newHolding, "New holding has been created"));
});

const deleteHolding = WrapAsync(async (req, res) => {
  const { id } = req.params;

  const existingHolding = await Holding.findById(id);

  if (!existingHolding) {
    throw new ApiError(
      404,
      "The holding you are trying to delete doesn't exist",
    );
  }

  if (!req.user?._id.equals(existingHolding.owner)) {
    throw new ApiError(403, "You are not the owner of this holding");
  }

  const deletedHolding = await Holding.findByIdAndDelete(existingHolding._id);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedHolding },
        `Holding with id ${id} has been deleted successfully`,
      ),
    );
});

export { getAllHoldings, addHolding, deleteHolding };
