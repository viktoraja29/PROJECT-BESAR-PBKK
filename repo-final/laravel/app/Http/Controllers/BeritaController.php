<?php

namespace App\Http\Controllers;

class BeritaController extends Controller
{
    // Jika kategori kosong, nilai default-nya "terbaru"
    public function index(?string $kategori = 'terbaru')
    {
        return view('berita', [
            'kategori' => $kategori,
            'daftar' => ['terbaru', 'akademik', 'kegiatan'],
        ]);
    }
}
