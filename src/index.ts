import badWords from "./rules/bad-words";
import offensiveWords from "./rules/offensive-words";
import spamPatterns from "./rules/spam-patterns";
import { findRepeatedCharacters, findSpamPatterns } from "./rules/patterns";

interface ToxicityResult {
  toxic: boolean;
  score: number;
  words: string[];
}

interface ToxicityConfig {
  BAD_WORD?: number;
  OFFENSIVE_WORD?: number;
  CUSTOM_WORD?: number;
  REPEATED_CHAR?: number;
  SPAM_PATTERN?: number;
  TOXICITY_THRESHOLD?: number;

  customWords?: string[];
  allowAllUrls?: boolean;
  bannedUrls?: string[];

  useDefaultBadWords?: boolean;
  useDefaultOffensiveWords?: boolean;
}

const DEFAULT_CONFIG: ToxicityConfig = {
  BAD_WORD: 0.1,
  OFFENSIVE_WORD: 0.3,
  CUSTOM_WORD: 0.3,
  REPEATED_CHAR: 0.2,
  SPAM_PATTERN: 0.6,
  TOXICITY_THRESHOLD: 0.5,
  customWords: [],
  allowAllUrls: false,
  bannedUrls: [],
  useDefaultBadWords: true,
  useDefaultOffensiveWords: true,
};

/**
 * Input text ko toxic words aur patterns ke liye check karta hai.
 * @param text - Woh text jise check karna hai.
 * @param config - Configuration object to define custom rules and weights.
 * @returns ToxicityResult object.
 */
export function checkToxicity(
  text: string,
  config: ToxicityConfig = {}
): ToxicityResult {
  const originalText = text;

  const currentConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const {
    BAD_WORD,
    OFFENSIVE_WORD,
    CUSTOM_WORD,
    REPEATED_CHAR,
    SPAM_PATTERN,
    TOXICITY_THRESHOLD,
    customWords,
    allowAllUrls,
    bannedUrls,
    useDefaultBadWords,
    useDefaultOffensiveWords,
  } = currentConfig;

  const cleanedText = originalText
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  const words = cleanedText.split(/\s+/);

  let totalScore: number = 0;
  const foundWords: string[] = [];
  const matchedWordsSet: Set<string> = new Set();

  const allWordLists: {
    list: string[] | undefined;
    weight: number | undefined;
  }[] = [];

  if (useDefaultBadWords) {
    allWordLists.push({ list: badWords, weight: BAD_WORD });
  }

  if (useDefaultOffensiveWords) {
    allWordLists.push({ list: offensiveWords, weight: OFFENSIVE_WORD });
  }

  if (CUSTOM_WORD !== undefined) {
    const processedCustomWords = customWords!.map((word) => word.toLowerCase());
    allWordLists.push({ list: processedCustomWords, weight: CUSTOM_WORD });
  }

  for (const { list, weight } of allWordLists) {
    if (!list || list.length === 0 || weight === undefined) continue;

    for (const word of words) {
      if (list.includes(word) && !matchedWordsSet.has(word)) {
        totalScore += weight;
        const tag = weight === CUSTOM_WORD ? `Custom:${word}` : word;

        foundWords.push(tag);
        matchedWordsSet.add(word);
      }
    }
  }

  if (REPEATED_CHAR !== undefined) {
    const repeatedMatches = findRepeatedCharacters(originalText);
    if (repeatedMatches.length > 0) {
      totalScore += REPEATED_CHAR;
      repeatedMatches.forEach((match) => {
        const tag = `Pattern:RPT:${match}`;
        if (!matchedWordsSet.has(tag)) {
          foundWords.push(tag);
          matchedWordsSet.add(tag);
        }
      });
    }
  }

  if (SPAM_PATTERN !== undefined && !allowAllUrls) {
    let shouldCheckStaticSpam = true;

    if (bannedUrls && bannedUrls.length > 0) {
      shouldCheckStaticSpam = false;

      bannedUrls.forEach((bannedUrl) => {
        if (originalText.includes(bannedUrl)) {
          const tag = `BannedURL:${bannedUrl}`;
          if (!matchedWordsSet.has(tag)) {
            totalScore += SPAM_PATTERN;
            foundWords.push(tag);
            matchedWordsSet.add(tag);
          }
        }
      });
    }

    if (shouldCheckStaticSpam) {
      const spamMatches = findSpamPatterns(originalText, spamPatterns);
      if (spamMatches.length > 0) {
        totalScore += SPAM_PATTERN;
        spamMatches.forEach((match) => {
          const tag = `Pattern:SPAM:${match}`;
          if (!matchedWordsSet.has(tag)) {
            foundWords.push(tag);
            matchedWordsSet.add(tag);
          }
        });
      }
    }
  }

  const finalScore = parseFloat(Math.min(totalScore, 1.0).toFixed(2));

  return {
    toxic: finalScore >= TOXICITY_THRESHOLD!,
    score: finalScore,
    words: foundWords,
  };
}
