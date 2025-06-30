import FavoriteButton from './FavoriteButton'

const formatPrice = (n: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

export default function ProductInfo({ product }: { product: any }) {
  return (
    <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-12 text-left">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <FavoriteButton productId={product.id} />
      </div>

      <div className="text-xl text-[#B88E2F] mt-4">
        {formatPrice(product.price)}
        {product.old_price && product.old_price > product.price && (
          <span className="line-through text-gray-400 ml-2">
            {formatPrice(product.old_price)}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 mt-4">{product.description}</p>
      <p className="mt-2 text-sm text-gray-500">Stok: {product.stock ?? 'Tidak diketahui'}</p>
    </div>
  )
}