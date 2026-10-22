@extends('layouts.app')
@section('title', $d['nama'])

@section('content')
    <a class="back" href="{{ route('dosen.index') }}">&larr; Semua dosen</a>

    <div class="profil">
        <div class="profil-side card">
            <span class="avatar avatar-lg">{{ \App\Data\Dosen::inisial($d['nama']) }}</span>
            <h2>{{ $d['nama'] }}</h2>
            <span class="tag">{{ $d['keahlian'] }}</span> {{-- DITAMBAHKAN --}}
            <p class="muted">NIDN {{ $d['nidn'] }}</p>
        </div>

        <div class="profil-main card">
            <h3>Informasi</h3>
            <ul class="kontak">
                <li><span class="k-label">Keahlian</span> <span>{{ $d['keahlian'] ?: '-' }}</span></li> {{-- DITAMBAHKAN --}}
                <li><span class="k-label">Email</span> <span>{{ $d['email'] ?: '-' }}</span></li>
                <li><span class="k-label">WhatsApp</span> <span>{{ $d['wa'] ?: '-' }}</span></li>
                <li><span class="k-label">Instagram</span> <span>{{ $d['instagram'] ?: '-' }}</span></li>
                <li><span class="k-label">LinkedIn</span> <span>{{ $d['linkedin'] ?: '-' }}</span></li>
                <li><span class="k-label">Alamat</span> <span>{{ $d['alamat'] ?: '-' }}</span></li>
            </ul>
        </div>
    </div>
@endsection
