export async function healthRoutes(app) {
    app.get("/health", async () => {
        return {
            status: "ok",
            service: "signal-sky-api",
            timestamp: new Date().toISOString(),
            version: "0.1.0",
        };
    });
}
//# sourceMappingURL=health.js.map