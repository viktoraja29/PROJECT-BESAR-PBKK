# PROJECT WEBSITE PROFIL PROGRAM STUDI
Mata Kuliah : Pemrograman Berbasis Kerangka Kerja

Tugas Kelompok :
1. Viktor_2443085
2. Julivian Dodi_2443028
3. Muhammad Farhan_2443027
4. Shanjay Wijaya Indra Kirana_2443014
5. Muhammad Syahreza_2443039

## Struktur
- `express/` : versi Express
- `laravel/` : versi Laravel

## Menjalankan Express (Node.js 20+)
```bash
cd express
npm install
npm run dev
```
Buka http://localhost:3000

## Menjalankan Laravel (PHP 8.2+ dan Composer)
```bash
cd laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```
Buka http://127.0.0.1:8000. Daftar route: `php artisan route:list`

## Daftar route
| Route | Keterangan |
|---|---|
| `/`, `/profil` | Beranda, visi dan misi |
| `/dosen?keahlian=...` | Daftar dosen + filter keahlian |
| `/dosen/{nidn}` | Profil dosen, NIDN 10 digit, selain itu 404 |
| `/berita/{kategori?}` | Berita, default "terbaru" |
| `/admin/dashboard`, `/admin/pengaturan` | Grup dengan prefix admin |
| `/api/dosen` | Response JSON |
| URL lain | Halaman 404 kustom |
