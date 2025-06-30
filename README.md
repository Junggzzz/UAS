# 🪑 Toko Furniture Online — Tugas Akhir

Ini adalah proyek Tugas Akhir berupa aplikasi web toko furniture online. Dibangun menggunakan teknologi modern: **Next.js (App Router)**, **Supabase**, dan **Tailwind CSS**.

Website ini memungkinkan pengguna untuk:
- Melihat daftar produk
- Menambahkan produk ke keranjang
- Menyimpan ke wishlist
- Melakukan checkout
- Login dan registrasi akun

## 🔧 Teknologi yang Digunakan

- [Next.js](https://nextjs.org/) — Framework React modern
- [Supabase](https://supabase.com/) — Backend (database, authentication, API)
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- React Icons, Heroicons — Ikon UI

## 🚀 Fitur Utama

- **Halaman Home**: Menampilkan banner, produk unggulan, dan fitur toko
- **Halaman Shop**: Daftar semua produk dengan fitur filter & sort
- **Halaman Product Detail**: Info lengkap produk dan tombol tambah ke cart/wishlist
- **Halaman Wishlist**: Menyimpan produk favorit pengguna
- **Halaman Cart**: Menampilkan produk yang akan dibeli
- **Checkout**: Simulasi proses pembelian
- **Auth**: Login & Register (Supabase Auth)
- **Stok Otomatis**: Produk dengan stok 0 tidak dapat dibeli dan ditandai “Out of Stock”

## 🛠️ Cara Menjalankan

1. Clone repo ini:

```bash
git clone https://github.com/Junggzzz/toko-furniture-ta.git
cd toko-furniture-ta
```

2. Install dependencies:

```bash
npm install
```

3. Buat file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Jalankan server development:

```bash
npm run dev
```

5. Buka browser dan akses: [http://localhost:3000](http://localhost:3000)

## 📁 Struktur Folder Penting

```
/app
  /products/[id]    → Halaman detail produk
  /shop             → Halaman daftar produk
  /wishlist         → Wishlist pengguna
  /cart             → Keranjang pengguna
  /checkout         → Checkout pengguna
/components         → Komponen reusable (header, footer, dsb)
/lib/supabase.ts    → Inisialisasi Supabase client
/public             → Asset statis (gambar, logo)
```

## 🧪 Supabase Setup

1. Buat project baru di [supabase.com](https://supabase.com)
2. Upload CSV ke tabel `products`
3. Tambahkan tabel `cart`, `wishlist`, `checkout` sesuai skema
4. Aktifkan Auth (Email + Password)
5. Dapatkan `anon key` dan `url` untuk `.env.local`

## 👩‍💻 Kontribusi

Proyek ini merupakan tugas akhir, namun Anda bisa melakukan fork atau adaptasi untuk kebutuhan pribadi maupun bisnis.

## 📄 Lisensi

MIT — Bebas digunakan dan dimodifikasi.