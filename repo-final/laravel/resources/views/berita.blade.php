@extends('layouts.app')
@section('title', 'Berita')

@section('content')
    <div class="chips">
        @foreach ($daftar as $k)
            <a class="chip {{ $k === $kategori ? 'chip-on' : '' }}"
               href="{{ $k === 'terbaru' ? route('berita') : route('berita', $k) }}">{{ $k }}</a>
        @endforeach
    </div>
    <p class="muted">Kategori: <strong>{{ $kategori }}</strong></p>
@endsection
