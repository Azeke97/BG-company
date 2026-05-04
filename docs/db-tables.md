# Database Tables (Current Prisma Schema)

Core tables for mini shop/admin:

1. `Category`
- Hierarchy via `parentId` (self relation)
- Fields: `name`, `slug`
- Used for products and promo targeting

2. `Product`
- Catalog item
- Fields: `title`, `slug`, `price`, `stock`, `isActive`, `images`, `attrs`
- Optional `categoryId`

3. `PromoCode`
- Promo entity with code and discount rules
- Fields: `code`, `type`, `value`, `appliesTo`, `categoryId`, `productIds`, `usageLimit`, `used`, date windows

4. `Order`
- Customer order aggregate
- Fields: `number`, `status`, totals, optional `userId`, payment fields

5. `OrderItem`
- Order lines linked to `Order`, optional link to `Product`
- Stores snapshot fields: `title`, `price`, `qty`

6. `User`
- Minimal user model (`email`, `passwordHash`, `role`)

Enums:
- `Role`, `OrderStatus`, `PromoType`, `AppliesTo`, `PaymentMethod`
