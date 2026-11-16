export const NUTRITIONIST_CONTACT = {
  whatsappDigits: '557196663579',
  whatsappDisplay: '+55 71 9666-3579',
  schemaTelephone: '+55-71-9666-3579',
};

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${NUTRITIONIST_CONTACT.whatsappDigits}?text=${encodeURIComponent(message)}`;
}
