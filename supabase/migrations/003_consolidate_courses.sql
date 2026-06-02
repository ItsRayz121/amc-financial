-- Consolidate all courses into one "Complete Trading Course 2026" entry.
-- Other course rows are reset to placeholder so they are filtered out by the frontend.

UPDATE site_links
SET
  label       = 'Trading Complete Course 2026',
  url         = 'https://youtube.com/playlist?list=PL6vBZVBtg6KYq5sZKVK85tHoH7qXyHt3C&si=gcqPa1DeOa9-cAK5',
  description = 'Zero to Pro Trader — complete masterclass covering Crypto, Forex, Gold, and Stocks. Proven strategies, risk management, live trading examples.'
WHERE key = 'course_beginner';

UPDATE site_links SET url = 'PLACEHOLDER_YOUTUBE_FOREX'  WHERE key = 'course_forex';
UPDATE site_links SET url = 'PLACEHOLDER_YOUTUBE_CRYPTO' WHERE key = 'course_crypto';
UPDATE site_links SET url = 'PLACEHOLDER_YOUTUBE_GOLD'   WHERE key = 'course_gold';
