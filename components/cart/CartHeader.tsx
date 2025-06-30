'use client'

export default function CartHeader({ allSelected, onSelectAll, totalCount }: any) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-[#B88E2F]">Keranjang Belanja</h1>
      <button
        onClick={onSelectAll}
        className="text-sm text-right cursor-pointer text-gray-600 hover:underline"
      >
        {allSelected ? 'Batalkan Pilih Semua' : 'Pilih Semua'}
      </button>
    </div>
  )
}