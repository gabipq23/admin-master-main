export function formatPhoneNumber(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");

  // Com DDI 55 (deve vir antes para não conflitar com os demais)
  if (cleaned.length === 13 && cleaned.startsWith("55")) {
    return cleaned.replace(/(55)(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");
  }
  if (cleaned.length === 12 && cleaned.startsWith("55")) {
    return cleaned.replace(/(55)(\d{2})(\d{4})(\d{4})/, "+$1 ($2) $3-$4");
  }

  // Com DDD
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  // Sem DDD
  if (cleaned.length === 9) {
    return cleaned.replace(/(\d{5})(\d{4})/, "$1-$2");
  }
  if (cleaned.length === 8) {
    return cleaned.replace(/(\d{4})(\d{4})/, "$1-$2");
  }

  return phone;
}
