import { ChatTier } from '../types';

export const CHAT_TIERS: ChatTier[] = [
  { 
    key: "10", 
    label: "Basic Analysis (10 Credits)", 
    limit: 10, 
    password: null 
  },
  { 
    key: "30", 
    label: "Pro Analysis (30 Credits)", 
    limit: 30, 
    password: import.meta.env.VITE_PASSWORD_30 || "" 
  },
  { 
    key: "50", 
    label: "Elite Analysis (50 Credits)", 
    limit: 50, 
    password: import.meta.env.VITE_PASSWORD_50 || "" 
  }
];

// Stripe URLs - using environment variables for security
export const STRIPE_URLS = {
  "30": import.meta.env.VITE_STRIPE_30_URL || "",
  "50": import.meta.env.VITE_STRIPE_50_URL || ""
};

// Webhook URLs - using environment variables for security
export const WEBHOOK_URLS = [
  import.meta.env.VITE_WEBHOOK_URL || ""
].filter(Boolean); // Remove empty URLs

export const FIXED_AI_RESPONSE = "Your Analysis is being process and on its way to your E-mail Inbox! It may takes 2 minutes for you to receive them in your inbox!";

export const LOCAL_STORAGE_KEYS = {
  EMAIL: "forexBotEmail",
  COUNTS: "forexBotCounts", 
  HISTORY: "forexBotHistory",
  SESSION: "forexBotSession",
  FINGERPRINT: "forexBotFingerprint"
};