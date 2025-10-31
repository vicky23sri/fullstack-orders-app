import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        email: 'john@example.com',
        name: 'John Doe',
      },
    }),
    prisma.user.upsert({
      where: { email: 'jane@example.com' },
      update: {},
      create: {
        email: 'jane@example.com',
        name: 'Jane Smith',
      },
    }),
    prisma.user.upsert({
      where: { email: 'bob@example.com' },
      update: {},
      create: {
        email: 'bob@example.com',
        name: 'Bob Johnson',
      },
    }),
  ]);

  console.log('Created users:', users.length);

  // Create products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Laptop',
        description: 'High-performance laptop for developers',
        price: 999.99,
        stock: 50,
      },
    }),
    prisma.product.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse',
        price: 29.99,
        stock: 100,
      },
    }),
    prisma.product.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with blue switches',
        price: 89.99,
        stock: 75,
      },
    }),
    prisma.product.upsert({
      where: { id: 4 },
      update: {},
      create: {
        name: 'Monitor',
        description: '27-inch 4K monitor',
        price: 349.99,
        stock: 30,
      },
    }),
    prisma.product.upsert({
      where: { id: 5 },
      update: {},
      create: {
        name: 'Headphones',
        description: 'Noise-cancelling wireless headphones',
        price: 199.99,
        stock: 40,
      },
    }),
  ]);

  console.log('Created products:', products.length);

  // Create some sample orders
  const sampleOrders = [
    {
      userId: users[0].id,
      items: [
        { productId: 1, quantity: 1 },
        { productId: 2, quantity: 2 },
      ],
    },
    {
      userId: users[1].id,
      items: [
        { productId: 3, quantity: 1 },
        { productId: 4, quantity: 1 },
      ],
    },
    {
      userId: users[2].id,
      items: [
        { productId: 5, quantity: 1 },
        { productId: 2, quantity: 1 },
      ],
    },
  ];

  for (const orderData of sampleOrders) {
    let total = 0;
    const orderItems: { productId: number; quantity: number; price: number; }[] = [];

    for (const item of orderData.items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      
      if (product) {
        const itemTotal = Number(product.price) * item.quantity;
        total += itemTotal;

        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: Number(product.price),
        });
      }
    }

    await prisma.order.create({
      data: {
        userId: orderData.userId,
        total,
        status: 'CONFIRMED',
        orderItems: {
          create: orderItems,
        },
      },
    });
  }

  console.log('Created sample orders');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });