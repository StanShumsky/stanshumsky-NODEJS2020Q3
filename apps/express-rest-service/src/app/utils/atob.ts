export function atob(encoded: string): string {
  return Buffer.from(encoded, 'base64').toString();
}
