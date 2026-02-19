import yahooFinance from "yahoo-finance2";
export class YahooFinanceProvider {
    name = "yahoo-finance";
    async fetchBars(symbol, from, to) {
        const result = await yahooFinance.historical(symbol, {
            period1: from,
            period2: to,
            interval: "1d",
        });
        const exchange = symbol.endsWith(".NS") ? "NSE" : "US";
        return result.map((bar) => ({
            symbol,
            exchange,
            date: bar.date.toISOString().split("T")[0],
            open: bar.open,
            high: bar.high,
            low: bar.low,
            close: bar.close,
            volume: bar.volume,
            adjustmentFactor: bar.adjClose ? bar.adjClose / bar.close : undefined,
        }));
    }
    async fetchQuote(symbol) {
        const result = await yahooFinance.quote(symbol);
        if (!result)
            return null;
        const exchange = symbol.endsWith(".NS") ? "NSE" : "US";
        return {
            symbol,
            exchange,
            price: result.regularMarketPrice ?? 0,
            change: result.regularMarketChange ?? 0,
            changePercent: result.regularMarketChangePercent ?? 0,
            volume: result.regularMarketVolume ?? 0,
            timestamp: new Date().toISOString(),
        };
    }
    async searchSymbols(query) {
        const result = await yahooFinance.search(query);
        return (result.quotes || [])
            .filter((q) => q.quoteType === "EQUITY")
            .map((q) => ({
            symbol: q.symbol,
            name: q.shortname || q.longname || q.symbol,
            exchange: q.exchange || "UNKNOWN",
        }));
    }
}
//# sourceMappingURL=yahoo.js.map