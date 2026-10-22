<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DosenController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

// "/" dan "/profil"
Route::get('/', [PageController::class, 'beranda'])->name('beranda');
Route::get('/profil', [PageController::class, 'profil'])->name('profil');

// Daftar dosen
Route::get('/dosen', [DosenController::class, 'index'])->name('dosen.index');

// NIDN harus 10 digit angka. Jika tidak cocok, Laravel otomatis menampilkan 404.
Route::get('/dosen/{nidn}', [DosenController::class, 'show'])
    ->where('nidn', '[0-9]{10}')
    ->name('dosen.show');

// Parameter opsional, default "terbaru" ada di BeritaController
Route::get('/berita/{kategori?}', [BeritaController::class, 'index'])->name('berita');

// Grup dengan prefix admin
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/pengaturan', [AdminController::class, 'pengaturan'])->name('pengaturan');
});

// Response JSON
Route::get('/api/dosen', [DosenController::class, 'api'])->name('api.dosen');
