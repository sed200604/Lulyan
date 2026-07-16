import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// We load the .env.local file explicitly
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Assuming this runs with tsx or similar that handles the TS imports
import { products } from '../src/data/products';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Wait, actually anon key has RLS, but new project has no RLS enabled by default or we can use Service Role key. Let's use Anon key.

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Seeding products...");
  
  for (const product of products) {
    const { data, error } = await supabase
      .from('products')
      .upsert({
        id: product.id,
        slug: product.slug,
        name: product.name,
        subtitle: product.subtitle,
        collection: product.collection,
        category: product.category,
        style: product.style,
        price: product.price,
        currency: product.currency,
        description: product.description,
        short_description: product.shortDescription,
        features: product.features,
        fabric_details: product.fabricDetails,
        fabric: product.fabric,
        uv_protection: product.uvProtection,
        care_instructions: product.careInstructions,
        in_stock: product.inStock,
        stock_quantity: product.stockQuantity,
        rating: product.rating,
        review_count: product.reviewCount,
        tags: product.tags,
        is_new: product.isNew,
        is_bestseller: product.isBestseller,
        is_featured: product.isFeatured,
        colors: product.colors,
        sizes: product.sizes,
        images: product.images
      });
      
    if (error) {
      console.error(`Error inserting product ${product.id}:`, error.message);
    } else {
      console.log(`Successfully inserted ${product.name}`);
    }
  }
  
  console.log("Seeding complete.");
}

seed();
