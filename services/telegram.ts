export async function sendTelegramMessage(chatId: string, text: string) {
  const TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}