create table if not exists public.journal_articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  dek text,                        -- subheadline / lede
  category text not null,          -- 'Style' | 'Culture' | 'Voyage' | etc.
  author_name text not null,
  author_bio text,
  author_photo_url text,
  read_time_min integer not null default 5,
  published_at timestamptz not null default now(),

  hero_image_url text not null,
  hero_image_prompt text,          -- ← saved for regen if needed

  body_markdown text not null,     -- article body in Markdown
  inline_images jsonb,             -- [{position, url, prompt, caption}]
  pull_quotes jsonb,               -- [{text, attribution}]
  linked_products jsonb,           -- [{sku, name, price, thumbnail_url}]

  is_featured boolean default false,
  is_published boolean default false,
  seo_title text,
  seo_description text,
  seo_og_image_url text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.journal_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  display_order integer default 0
);

-- RLS configuration
alter table public.journal_articles enable row level security;
alter table public.journal_categories enable row level security;

create policy "Journal articles are public" on public.journal_articles for select using (is_published = true);
create policy "Journal categories are public" on public.journal_categories for select using (true);
