import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactMessageSchema = z.object({
  name: z.string().trim().min(1).max(100),
  telegram: z
    .string()
    .trim()
    .transform((value) =>
      value
        .replace(/^(?:https?:\/\/)?(?:www\.)?(?:t\.me|telegram\.me)\//i, "")
        .split(/[/?#]/, 1)[0]
        .replace(/^@/, ""),
    )
    .pipe(z.string().regex(/^[A-Za-z0-9_]{5,32}$/)),
  message: z.string().trim().min(1).max(4000),
});

export const sendTelegramMessage = createServerFn({ method: "POST" })
  .validator((data) => contactMessageSchema.parse(data))
  .handler(async ({ data }) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      throw new Error("Telegram contact form is not configured.");
    }

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `New portfolio message\n\nName: ${data.name}\nTelegram: @${data.telegram}\n\nMessage:\n${data.message}`,
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      throw new Error("Telegram could not deliver the contact message.");
    }

    return { sent: true };
  });
