// prisma/seed.mjs
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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

    // админ-пользователь (пароль хранишь хешем в реальном проекте)
    await prisma.user.upsert({
        where: { email: 'admin@bg.local' },
        update: {},
        create: {
            email: 'admin@bg.local',
            passwordHash: 'dev_only_change_me',
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

        await prisma.order.create({
            data: {
                number: 'BG-2025-0001',
                status: 'PAID',
                paymentMethod: 'KASPI_QR',
                paymentRef: 'demo-payment-1',
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
