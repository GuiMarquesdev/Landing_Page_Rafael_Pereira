export const NUTRITIONIST_CONTACT = {
  whatsappDigits: '557196663579',
  whatsappDisplay: '+55 71 9666-3579',
  schemaTelephone: '+55-71-9666-3579',
  instagramUrl: 'https://www.instagram.com/rafaelpsnutri?fqnt=azVjN3FoeHl1Mm05',
};

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${NUTRITIONIST_CONTACT.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppWithMessage(message: string): void {
  const url = buildWhatsAppUrl(message);
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
