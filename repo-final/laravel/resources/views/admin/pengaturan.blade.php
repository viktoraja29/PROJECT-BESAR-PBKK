@extends('layouts.app')
@section('title', 'Pengaturan Admin')

@section('content')
    <p class="muted">Halaman pengaturan situs.</p>
    <p><a class="btn btn-ghost" href="{{ route('admin.dashboard') }}">&larr; Ke dashboard</a></p>
@endsection
