@extends('layouts.app')
@section('title', 'Dashboard Admin')

@section('content')
    <p class="muted">Ringkasan data program studi.</p>
    <p><a class="btn" href="{{ route('admin.pengaturan') }}">Ke pengaturan &rarr;</a></p>
@endsection
