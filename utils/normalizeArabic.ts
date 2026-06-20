export function normalizeArabic(text: string): string {
  return text
    .replace(/[أإآا]/g, 'ا')  
    .replace(/[ةه]/g, 'ه')    
    .replace(/[\u064B-\u065F]/g, '') 
    .trim()
}