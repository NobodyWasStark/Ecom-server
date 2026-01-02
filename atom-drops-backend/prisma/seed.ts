import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Electronics', slug: 'electronics', description: 'Electronic devices and gadgets' },
  { name: 'Clothing', slug: 'clothing', description: 'Fashion and apparel' },
  { name: 'Home & Garden', slug: 'home-garden', description: 'Home decor and gardening' },
  { name: 'Beauty', slug: 'beauty', description: 'Beauty and personal care' },
  { name: 'Sports', slug: 'sports', description: 'Sports and outdoor activities' },
  { name: 'Books', slug: 'books', description: 'Books and stationery' },
  { name: 'Toys', slug: 'toys', description: 'Toys and games' },
  { name: 'Accessories', slug: 'accessories', description: 'Watches, bags, and accessories' },
];

async function main() {
  console.log('🌱 Seeding database...');

  for (const category of categories) {
    const existing = await prisma.category.findUnique({
      where: { slug: category.slug },
    });

    if (!existing) {
      await prisma.category.create({
        data: category,
      });
      console.log(`✅ Created category: ${category.name}`);
    } else {
      console.log(`⏭️  Category already exists: ${category.name}`);
    }
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
