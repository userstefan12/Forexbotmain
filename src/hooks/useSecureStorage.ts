import { useState, useEffect } from 'react';

// Generate browser fingerprint for security
function generateFingerprint(): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('ForexBot Security', 2, 2);
  }
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
    navigator.hardwareConcurrency || 0,
    navigator.deviceMemory || 0
  ].join('|');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
}

// Encrypt data using simple XOR cipher with fingerprint
function encryptData(data: string, key: string): string {
  let result = '';
  for (let i = 0; i < data.length; i++) {
    result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(result);
}

// Decrypt data
function decryptData(encryptedData: string, key: string): string {
  try {
    const data = atob(encryptedData);
    let result = '';
    for (let i = 0; i < data.length; i++) {
      result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  } catch {
    return '';
  }
}

// Session validation
function validateSession(): boolean {
  const sessionData = localStorage.getItem('forexBotSession');
  if (!sessionData) return true; // First time user
  
  try {
    const session = JSON.parse(sessionData);
    const now = Date.now();
    
    // Session expires after 24 hours
    if (now - session.created > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('forexBotSession');
      return true;
    }
    
    // Check for suspicious activity (too many rapid requests)
    if (session.requests && session.requests.length > 100) {
      const recentRequests = session.requests.filter((time: number) => now - time < 60 * 60 * 1000);
      if (recentRequests.length > 50) {
        console.warn('Suspicious activity detected');
        return false;
      }
    }
    
    return true;
  } catch {
    localStorage.removeItem('forexBotSession');
    return true;
  }
}

// Log request for rate limiting
function logRequest(): void {
  const sessionData = localStorage.getItem('forexBotSession');
  const now = Date.now();
  
  let session = {
    created: now,
    requests: [now]
  };
  
  if (sessionData) {
    try {
      session = JSON.parse(sessionData);
      session.requests = session.requests || [];
      session.requests.push(now);
      
      // Keep only last 100 requests
      if (session.requests.length > 100) {
        session.requests = session.requests.slice(-100);
      }
    } catch {
      // Reset on error
    }
  }
  
  localStorage.setItem('forexBotSession', JSON.stringify(session));
}

export function useSecureStorage<T>(key: string, initialValue: T) {
  const fingerprint = generateFingerprint();
  
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Validate session first
      if (!validateSession()) {
        console.warn('Session validation failed');
        return initialValue;
      }
      
      const item = localStorage.getItem(key);
      if (!item) return initialValue;
      
      // First, try to decrypt the data
      const decrypted = decryptData(item, fingerprint);
      
      if (decrypted) {
        // If decryption succeeded, try to parse the decrypted data
        try {
          return JSON.parse(decrypted);
        } catch {
          // If decrypted data is not valid JSON, fall through to try raw data
        }
      }
      
      // If decryption failed or decrypted data wasn't valid JSON,
      // try to parse the raw item as plain JSON
      try {
        return JSON.parse(item);
      } catch {
        // If all parsing attempts fail, remove the corrupted item and return initial value
        console.warn(`Corrupted data found for key "${key}", clearing and using initial value`);
        localStorage.removeItem(key);
        return initialValue;
      }
    } catch (error) {
      console.error(`Error reading secure storage key "${key}":`, error);
      // Clear corrupted data to prevent future errors
      localStorage.removeItem(key);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      if (!validateSession()) {
        console.warn('Cannot save: Session validation failed');
        return;
      }
      
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Encrypt sensitive data
      const dataString = JSON.stringify(valueToStore);
      const encrypted = encryptData(dataString, fingerprint);
      
      localStorage.setItem(key, encrypted);
      
      // Log this action for rate limiting
      logRequest();
      
    } catch (error) {
      console.error(`Error setting secure storage key "${key}":`, error);
    }
  };

  // Verify fingerprint hasn't changed (device/browser change detection)
  useEffect(() => {
    const storedFingerprint = localStorage.getItem('forexBotFingerprint');
    if (storedFingerprint && storedFingerprint !== fingerprint) {
      console.warn('Device fingerprint changed - clearing data for security');
      localStorage.clear();
    }
    localStorage.setItem('forexBotFingerprint', fingerprint);
  }, [fingerprint]);

  return [storedValue, setValue] as const;
}