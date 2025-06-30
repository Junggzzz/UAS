'use client'

export default function CartSummary({ total }: { total: number }) {
  return (
    <div className="mt-6 text-right font-semibold text-black">
      Total Harga: Rp {total.toLocaleString('id-ID')}
    </div>
  )
}