'use client'

export default function CartActions({
  onBack,
  onCheckout,
  disabled,
}: {
  onBack: () => void
  onCheckout: () => void
  disabled: boolean
}) {
  return (
    <div className="mt-6 flex justify-between">
      <button
        onClick={onBack}
        className="px-6 py-2 bg-[#B88E2F] text-white rounded hover:bg-yellow-600"
      >
        Kembali
      </button>

      <button
        onClick={onCheckout}
        disabled={disabled}
        className="px-6 py-2 bg-[#B88E2F] text-white rounded hover:bg-yellow-600 disabled:opacity-50"
      >
        Checkout Sekarang
      </button>
    </div>
  )
}