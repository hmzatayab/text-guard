const spamPatterns: RegExp[] = [
  /https?:\/\/\S+/g,

  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,

  /[A-Z]{5,}/,

  /\b(buy now|click here|free money|crypto|bitcoin|invest now)\b/gi,

  /\d{10,}/,
];

export default spamPatterns;
