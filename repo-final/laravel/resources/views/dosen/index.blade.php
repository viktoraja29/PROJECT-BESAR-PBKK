@extends('layouts.app')
@section('title', 'Dosen')

@section('content')
    {{-- DITAMBAHKAN: form filter keahlian --}}
    <form class="filter" action="{{ route('dosen.index') }}" method="get">
        <select name="keahlian">
            <option value="">Semua keahlian</option>
            @foreach ($daftarKeahlian as $k)
                <option value="{{ $k }}" @selected($keahlian === $k)>{{ $k }}</option>
            @endforeach
        </select>
        <button class="btn" type="submit">Filter</button>
    </form>

    <p class="muted">
        Menampilkan {{ count($dosen) }} dosen@if ($keahlian !== '') dengan keahlian <strong>{{ $keahlian }}</strong>@endif.
    </p>

    <div class="grid">
        @forelse ($dosen as $d)
            <a class="card dosen-card" href="{{ route('dosen.show', $d['nidn']) }}">
                <span class="avatar">{{ \App\Data\Dosen::inisial($d['nama']) }}</span>
                <span class="dosen-nama">{{ $d['nama'] }}</span>
                <span class="tag">{{ $d['keahlian'] }}</span> {{-- DITAMBAHKAN --}}
                <span class="muted">NIDN {{ $d['nidn'] }}</span>
                <span class="lihat">Lihat profil &rarr;</span>
            </a>
        @empty
            <p class="muted">Tidak ada data.</p>
        @endforelse
    </div>
@endsection
