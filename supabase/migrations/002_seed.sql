-- ============================================================
-- AMC Financial — Seed Data
-- Real links from Aasim Majeed AMC
-- ============================================================

-- ============================================================
-- COMMUNITIES
-- ============================================================
insert into site_links (key, label, url, description, category, icon, sort_order) values
('whatsapp_community', 'WhatsApp Community',
 'https://whatsapp.com/channel/0029Va8axQ6HQbSAok7MRS0O',
 'Join for daily market insights, trading setups and investment tips',
 'community', 'MessageCircle', 1),

('telegram_community', 'Telegram Community',
 'https://t.me/aasimmajeedkhawaja',
 'Live trading signals and market analysis on Telegram',
 'community', 'Send', 2),

('instagram_community', 'Instagram',
 'https://www.instagram.com/reel/DY8mcLEIxiI/?igsh=NWxlY20xbHU5ZGRs',
 'Follow for trading reels, market tips and financial content',
 'community', 'Instagram', 3),

('airdrop_community', 'Crypto Airdrop Channel',
 'PLACEHOLDER_AIRDROP_CHANNEL',
 'Exclusive crypto airdrop alerts and opportunities',
 'community', 'Zap', 4),

('gold_community', 'Gold Trading Community',
 'PLACEHOLDER_GOLD_COMMUNITY',
 'Dedicated community for gold traders and XAU/USD analysis',
 'community', 'CircleDollarSign', 5)

on conflict (key) do update set
  label = excluded.label,
  url = excluded.url,
  description = excluded.description,
  icon = excluded.icon,
  sort_order = excluded.sort_order;

-- ============================================================
-- SUPPORT
-- ============================================================
insert into site_links (key, label, url, description, category, icon, sort_order) values
('whatsapp_support', 'WhatsApp Support',
 'https://wa.me/923486222404',
 'Contact Husnain Abass — Our Support Team',
 'support', 'Headphones', 1)

on conflict (key) do update set
  label = excluded.label,
  url = excluded.url,
  description = excluded.description;

-- ============================================================
-- COURSES
-- ============================================================
insert into site_links (key, label, url, description, category, icon, sort_order) values
('course_live', 'Live Trading Session',
 'https://youtube.com/live/MNsdGMnzGI4?feature=share',
 'Watch Aasim trade live — real market, real decisions',
 'course', 'Youtube', 1),

('course_beginner', 'Beginner Trading Course',
 'PLACEHOLDER_YOUTUBE_BEGINNER',
 'Complete foundation course — start your trading journey from zero',
 'course', 'BookOpen', 2),

('course_forex', 'Forex Trading Course',
 'PLACEHOLDER_YOUTUBE_FOREX',
 'Master currency markets with proven forex strategies',
 'course', 'TrendingUp', 3),

('course_crypto', 'Crypto Trading Course',
 'PLACEHOLDER_YOUTUBE_CRYPTO',
 'Navigate crypto markets — from Bitcoin to altcoins',
 'course', 'Bitcoin', 4),

('course_gold', 'Gold Trading Course',
 'PLACEHOLDER_YOUTUBE_GOLD',
 'XAU/USD analysis and gold trading strategies',
 'course', 'CircleDollarSign', 5)

on conflict (key) do update set
  label = excluded.label,
  url = excluded.url,
  description = excluded.description,
  icon = excluded.icon,
  sort_order = excluded.sort_order;

-- ============================================================
-- AFFILIATES
-- ============================================================
insert into site_links (key, label, url, description, category, icon, sort_order) values
('affiliate_bitget', 'Bitget',
 'https://partner.bitget.site/bg/xsvyzhvw',
 'Leading crypto derivatives exchange with copy trading',
 'affiliate', 'BarChart2', 1),

('affiliate_okx', 'OKX',
 'https://okx.ac/join/AASIM',
 'Global crypto exchange with advanced trading tools — use code AASIM',
 'affiliate', 'Activity', 2),

('affiliate_binance', 'Binance',
 'PLACEHOLDER_BINANCE_AFFILIATE',
 'World''s largest crypto exchange by volume',
 'affiliate', 'TrendingUp', 3),

('affiliate_bybit', 'Bybit',
 'https://partner.bybit.com/b/142207',
 'Professional crypto derivatives and spot trading platform',
 'affiliate', 'BarChart', 4),

('affiliate_exness', 'Exness',
 'https://one.exnessonelink.com/a/zp4te4zwc7?source=app&platform=mobile&pid=mobile_share',
 'Receive $10,000 in virtual funds and learn how to trade with a market leader',
 'affiliate', 'DollarSign', 5)

on conflict (key) do update set
  label = excluded.label,
  url = excluded.url,
  description = excluded.description,
  icon = excluded.icon,
  sort_order = excluded.sort_order;

-- ============================================================
-- SITE CONTENT
-- ============================================================
insert into site_content (key, label, value, type, group_name) values
-- Hero
('hero_headline', 'Hero Headline', 'Master the Markets. Build Your Wealth.', 'text', 'hero'),
('hero_subheadline', 'Hero Sub-headline', 'Free trading education, live market insights, and thriving communities — by Aasim Majeed AMC, Financial Consultant with 5 years of experience.', 'textarea', 'hero'),
('hero_cta_primary', 'Hero Primary CTA', 'Join WhatsApp Community', 'text', 'hero'),
('hero_cta_secondary', 'Hero Secondary CTA', 'Watch Free Courses', 'text', 'hero'),

-- About
('about_name', 'Full Name', 'Aasim Majeed AMC', 'text', 'about'),
('about_title', 'Professional Title', 'Financial Consultant & Finance Educator', 'text', 'about'),
('about_bio', 'Biography', 'Aasim Majeed AMC is a leading finance educator sharing expert insights on crypto, stocks, forex, and mutual funds. He delivers daily updates on trading setups, market trends, and profitable opportunities — with smart investing strategies, SIP planning, and in-depth market analysis. Whether you''re a beginner or advanced trader, Aasim''s mission is to help you grow wealth with practical knowledge and build consistent income streams.', 'textarea', 'about'),
('about_mission', 'Mission Statement', 'Democratize financial education. Make expert trading knowledge accessible to everyone — completely free.', 'textarea', 'about'),
('about_vision', 'Vision Statement', 'A financially literate community where every individual can make informed investment decisions and achieve financial freedom.', 'textarea', 'about'),

-- Stats
('stat_years', 'Years of Experience', '5', 'number', 'stats'),
('stat_members', 'Community Members', '2289', 'number', 'stats'),
('stat_courses', 'Free Courses', '4', 'number', 'stats'),
('stat_platforms', 'Partner Platforms', '5', 'number', 'stats'),

-- General
('site_name', 'Site Name', 'Aasim Majeed AMC', 'text', 'general'),
('site_tagline', 'Site Tagline', 'Free Financial Education for Everyone', 'text', 'general'),
('site_description', 'Site Description (SEO)', 'Free trading education, live market insights, and thriving communities — by Aasim Majeed AMC, Financial Consultant with 5 years of experience.', 'textarea', 'general'),
('support_agent_name', 'Support Agent Name', 'Husnain Abass', 'text', 'general'),
('support_phone', 'Support Phone', '+92 348 6222404', 'text', 'general')

on conflict (key) do update set
  label = excluded.label,
  value = excluded.value,
  type = excluded.type,
  group_name = excluded.group_name;
