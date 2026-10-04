// prisma/seed.mjs
import "dotenv/config";
import prismaPkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "../server/utils/password.ts";

const { PrismaClient } = prismaPkg;
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    // категории
    const cat = await prisma.category.upsert({
        where: { slug: 'potolki' },
        update: {},
        create: { name: 'Потолки', slug: 'potolki' }
    })

    // товар
    await prisma.product.upsert({
        where: { slug: 'panel-premium' },
        update: {},
        create: {
            title: 'Панель потолочная Premium',
            slug: 'panel-premium',
            price: 199900, // 1999.00 тг в тиинах
            stock: 25,
            images: [],
            attrs: { color: 'white', size: '600x600' },
            isActive: true,
            categoryId: cat.id
        }
    })

    // промокод
    await prisma.promoCode.upsert({
        where: { code: 'WELCOME10' },
        update: {},
        create: {
            code: 'WELCOME10',
            type: 'PERCENT',
            value: 10,
            appliesTo: 'ALL',
            usageLimit: 100
        }
    })

    // админ-пользователь
    const adminEmail = process.env.ADMIN_SEED_EMAIL || 'admin@bg.local'
    const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'admin12345'
    const adminPasswordHash = hashPassword(adminPassword)

    await prisma.user.upsert({
        where: { email: adminEmail },
        update: { passwordHash: adminPasswordHash },
        create: {
            email: adminEmail,
            passwordHash: adminPasswordHash,
            role: 'ADMIN',
            name: 'Admin'
        }
    })

    // тестовый заказ
    const product = await prisma.product.findUnique({ where: { slug: 'panel-premium' } })
    if (product) {
        const subtotal = product.price * 2
        const discount = Math.floor(subtotal * 10 / 100)
        const total = subtotal - discount

        await prisma.order.upsert({
            where: { number: 'BG-2025-0001' },
            update: {
                status: 'PAID',
                paymentStatus: 'PAID',
                paymentMethod: 'KASPI_QR',
                paymentRef: 'demo-payment-1',
                customerName: 'Demo Client',
                customerPhone: '+77001234567',
                subtotal,
                discountTotal: discount,
                total,
                items: {
                    deleteMany: {},
                    create: [{
                        productId: product.id,
                        title: product.title,
                        sku: null,
                        price: product.price,
                        qty: 2
                    }]
                }
            },
            create: {
                number: 'BG-2025-0001',
                status: 'PAID',
                paymentStatus: 'PAID',
                paymentMethod: 'KASPI_QR',
                paymentRef: 'demo-payment-1',
                customerName: 'Demo Client',
                customerPhone: '+77001234567',
                subtotal,
                discountTotal: discount,
                total,
                items: {
                    create: [{
                        productId: product.id,
                        title: product.title,
                        sku: null,
                        price: product.price,
                        qty: 2
                    }]
                }
            }
        })
    }
}

main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
