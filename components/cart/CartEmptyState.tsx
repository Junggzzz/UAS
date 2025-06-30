'use client'

type CartEmptyStateProps = {
  onBack: () => void
}

export default function CartEmptyState({ onBack }: CartEmptyStateProps) {
  return (
    <div className="flex flex-col justify-center items-center text-center min-h-[50vh] text-gray-700">
      <p className="mb-4">Keranjang kamu kosong.</p>
      <button
        onClick={onBack}
        className="px-6 py-2 bg-[#B88E2F] text-white rounded hover:bg-yellow-600"
      >
        Kembali
      </button>
    </div>
  )
}