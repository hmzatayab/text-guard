# 🛡️ Text Guard: Lightweight Text Moderation Engine

[![NPM Version](https://img.shields.io/npm/v/text-guard)](https://www.npmjs.com/package/text-guard) 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/hmzatayab/text-guard/blob/main/LICENSE) 
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Minified Size](https://img.shields.io/bundlephobia/minzip/text-guard)](https://bundlephobia.com/package/text-guard)
[![NPM Downloads](https://img.shields.io/npm/dt/text-guard)](https://www.npmjs.com/package/text-guard)

![WhatsApp Image 2025-12-03 at 22 46 11_8f183aab](https://github.com/user-attachments/assets/1bb3913f-b547-4d3e-bb0f-01f844b71592)

`text-guard` is a powerful, dependency-free, and highly customizable text analysis and moderation utility written in TypeScript. It helps you quickly detect toxicity, spam, and banned content in user input (like chat messages or comments) before it reaches your server or database.

## ✨ Features

* 📏 **Score-Based Detection:** Calculates a numerical Toxicity Score (0.0 to 1.0) based on matched rules.

* ⚖️ **Customizable Weights:** Adjust the severity (weight) of different violation types (e.g., make custom words count more than general bad words).

* 🚫 **Custom Banning:** Easily define your own lists of banned words and banned URLs.

* ✅ **Rule Toggles:** Enable or disable the package's built-in lists of Bad Words and Offensive Words.

* ⚡ **Spam Pattern Check:** Automatically detects and scores spam indicators like excessive capitalization, repeating characters, and generic URL patterns.

* 🔒 **Type-Safe:** Fully typed for reliable integration into TypeScript and JavaScript projects.

## 📦 Installation

Install `text-guard` using npm or yarn:
```bash
npm install text-guard
# or
yarn add text-guard
```

## 🚀 Quick Start (Basic Usage)

The main function is `checkToxicity(text, config?)`. It returns an object detailing the score, the decision, and what rules were matched.

### 1. Basic Check (Using Default Rules)

By default, the package uses a Threshold of 0.5 and includes the built-in bad/offensive word lists.

#### TypeScript

```ts
import { checkToxicity } from 'text-guard';

const text1 = "You are an absolute idiot and a loser.";
const text2 = "Hey, check out this great link: http://example.com/free";

const result1 = checkToxicity(text1);
const result2 = checkToxicity(text2); 

console.log(result1);
/*
{ 
  toxic: true, 
  score: 0.60, // Score is above the default 0.5 threshold
  words: ['offensive:idiot', 'bad:loser'] 
}
*/
```
### 2. Full Customization Example

You can override all default settings, including the required score (Threshold) and which built-in lists to use.

```ts
import { checkToxicity } from 'text-guard';

const myConfig = {
  // Set a strict threshold, requiring a score of 0.8 or higher to be toxic
  TOXICITY_THRESHOLD: 0.8, 
  
  // Custom weights (optional): Make spam patterns count a lot!
  SPAM_PATTERN: 0.9, 
  
  // Custom Lists
  customWords: ['president', 'companyname'],
  bannedUrls: ['google.com', 'example.net'],

  // Rule Toggles: Disable all built-in rules
  useDefaultBadWords: false,
  useDefaultOffensiveWords: false,
};

const inputText = "The **companyname** is running a big SCAM!!! check out google.com";

const result = checkToxicity(inputText, myConfig);

console.log(result);
/*
// Since the score will likely be high (custom word + spam) and is > 0.8
{
  toxic: true, 
  score: 0.9 + [other custom weights], 
  words: ['Custom:companyname', 'BannedURL:google.com', 'Pattern:SPAM:caps']
}
*/
```

## ⚙️ Configuration Options (`ToxicityConfig`)

If you pass a `config` object to `checkToxicity`, any omitted weight or rule will fall back to its default value.

### 1. Score & Weight Configuration
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`TOXICITY_THRESHOLD`** | `number` | `0.5` | The minimum score (0.0 to 1.0) required for text to be marked `toxic: true`. |
| **`SPAM_PATTERN`** | `number` | `0.6` | Weight assigned to general spam patterns (URLs, excessive caps, repetition). |
| **`BAD_WORD  `** | `number` | `0.1` | Weight for words in the default Bad Words list. |
| **`OFFENSIVE_WORD`** | `number` | `0.3` | Weight for words in the default Offensive Words list. |
| **`CUSTOM_WORD`** | `number` | `0.3` | Weight for words defined in the `customWords` list. |
| **`REPEATED_CHAR`** | `number` | `0.2` | Weight for patterns like `Heeeeelllooo`. |

### 2. Rule List Configuration
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`customWords`** | `string[]` | `[]` | Array of your own banned terms (case-insensitive). |
| **`bannedUrls`** | `string[]` | `[]` | Array of specific domain names/URLs to block (e.g., `spam.net`). |
| **`useDefaultBadWords`** | `boolean` | `true` | If `false`, the built-in list of general bad words is ignored. |
| **`useDefaultOffensiveWords`** | `boolean` | `true` | If `false`, the built-in list of highly offensive words is ignored. |
| **`allowAllUrls`** | `boolean` | `false` | If `true`, the default spam check for URLs is skipped (but `bannedUrls` are still checked). |

## 👤 Author & Contributor

This package is maintained and developed by **Hamza Tayyab**. I am passionate about creating clean, efficient, and secure frontend tools. Feel free to connect or check out my other projects!

| Platform | Link |
| :--- | :--- |
| **🌐 Portfolio** | https://linktr.ee/hm.za |
| **📧 Email** | hmzatayab@gmail.com  |
| **💻 GitHub** | Follow me on GitHub https://github.com/hmzatayab |
| **🎁 Other Packages** | Check out my other open-source projects https://www.npmjs.com/~hamzatayab |

## 📄 License
MIT License

Copyright (c) [2025] [Hamza Tayyab]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
