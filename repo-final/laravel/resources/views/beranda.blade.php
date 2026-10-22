@extends('layouts.app')
@section('title', 'Beranda')

@section('hero')
    <section class="hero">
        <div class="wrap">
            <p class="eyebrow">Program Studi</p>
            <h1>Informatika</h1>
            <p class="lead">Membangun lulusan yang mampu merancang, mengembangkan, dan mengelola solusi teknologi informasi.</p>
            <p>
                <a class="btn btn-light" href="{{ route('profil') }}">Visi dan misi</a>
                <a class="btn btn-outline" href="{{ route('dosen.index') }}">Kenali dosen</a>
            </p>
        </div>
    </section>
@endsection

@section('content')
    <div class="grid">
        <div class="card"><h3>Pembelajaran</h3><p class="muted">Kurikulum berbasis proyek dan industri.</p></div>
        <div class="card"><h3>Penelitian</h3><p class="muted">Jaringan, basis data, dan pengembangan web.</p></div>
        <div class="card"><h3>Kolaborasi</h3><p class="muted">Terhubung dengan dosen dan mitra industri.</p></div>
    </div>
@endsection
