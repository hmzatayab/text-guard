const repeatedCharPattern = /(.)\1{2,}/g;

/**
 * Check for repeated characters in text.
 * @param text - The input text.
 * @returns {string[]} - Array of matched repeated character sequences.
 */
export function findRepeatedCharacters(text: string): string[] {
  const matches = text.toLowerCase().match(repeatedCharPattern);
  return matches || [];
}

/**
 * Check for spam patterns (URLs, Emails, etc.)
 * @param text - The input text.
 * @param patterns - Array of RegExp patterns (from spam-patterns.ts)
 * @returns {string[]} - Array of pattern descriptions found.
 */
export function findSpamPatterns(text: string, patterns: RegExp[]): string[] {
  const matchedDescriptions: string[] = [];
  const textToCheck = text.toLowerCase();

  if (patterns[0].test(textToCheck)) {
    matchedDescriptions.push("URL Detected");
  }
  if (patterns[1].test(textToCheck)) {
    matchedDescriptions.push("Email Detected");
  }
  if (patterns[2].test(text)) {
    matchedDescriptions.push("Excessive Caps");
  }
  if (patterns[3].test(textToCheck)) {
    matchedDescriptions.push("Financial Keywords");
  }
  if (patterns[4].test(textToCheck)) {
    matchedDescriptions.push("Long Number Sequence");
  }

  return matchedDescriptions;
}
