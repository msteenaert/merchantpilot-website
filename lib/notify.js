// Sends a short WhatsApp alert to the owner through CallMeBot (free, unofficial).
// Set CALLMEBOT_PHONE (digits, with country code) and CALLMEBOT_APIKEY in Railway. Without them nothing is sent.
export async function notify(text) {
  const phone = (process.env.CALLMEBOT_PHONE || "").replace(/\D/g, "");
  const apikey = process.env.CALLMEBOT_APIKEY;
  if (!phone || !apikey) return;
  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;
    await fetch(url, { signal: AbortSignal.timeout(4000) });
  } catch (e) {
    console.error("notify failed", e?.message);
  }
}
