'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function CartItem({
  item,
  isSelected,
  onSelect,
  onQuantityChange,
  onDelete,
}: {
  item: any
  isSelected: boolean
  onSelect: () => void
  onQuantityChange: (qty: number) => void
  onDelete: () => void
}) {
  const [localQty, setLocalQty] = useState(item.quantity)

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = Math.max(1, parseInt(e.target.value) || 1)
    setLocalQty(newQty)
    onQuantityChange(newQty)
  }

  return (
    <div className="relative flex items-center gap-4 bg-white p-4 rounded shadow text-black">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition"
        title="Hapus produk"
      >
        🗑️
      </button>

      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelect}
        className="w-5 h-5 text-yellow-500"
      />

      <Image
        src={item.product?.image_url || '/placeholder.png'}
        alt={item.product?.name}
        width={80}
        height={80}
        className="rounded object-cover"
      />

      <div className="flex-1">
        <h2 className="font-semibold">{item.product?.name || 'Produk tidak ditemukan'}</h2>
        <div className="flex items-center gap-2">
          <label htmlFor={`qty-${item.id}`} className="text-sm text-gray-600">
            Jumlah:
          </label>
          <input
            id={`qty-${item.id}`}
            type="number"
            value={localQty}
            onChange={handleQtyChange}
            className="w-16 border px-2 py-1 rounded text-center text-sm"
            min={1}
          />
        </div>
        <p className="text-sm mt-1 text-gray-700">
          Harga: Rp {Number(item.product?.price).toLocaleString('id-ID')}
        </p>
      </div>
    </div>
  )
}