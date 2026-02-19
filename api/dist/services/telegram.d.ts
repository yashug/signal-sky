import type { Signal } from "../engine/types.js";
/**
 * Telegram alert service.
 * Sends formatted signal cards to users via the Telegram Bot API.
 * Uses grammy in production; this service abstracts the messaging.
 */
export declare class TelegramService {
    private botToken;
    constructor();
    get isConfigured(): boolean;
    /**
     * Format a signal into a Telegram-friendly card message.
     */
    formatSignalCard(signal: Signal): string;
    /**
     * Send a signal alert to a Telegram chat.
     */
    sendAlert(chatId: string, signal: Signal): Promise<boolean>;
}
//# sourceMappingURL=telegram.d.ts.map