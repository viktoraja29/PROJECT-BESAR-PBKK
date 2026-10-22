@extends('layouts.app')
@section('title', 'Halaman tidak ditemukan')

@section('content')
    <p class="muted">URL <code>/{{ request()->path() }}</code> tidak ada.</p>
    <p><a class="btn" href="{{ route('beranda') }}">Kembali ke beranda</a></p>
@endsection
