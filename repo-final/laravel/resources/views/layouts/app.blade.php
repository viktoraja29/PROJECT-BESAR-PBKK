<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title') | Informatika</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('style.css') }}">
</head>
<body>
    <header class="topbar">
        <div class="wrap topbar-in">
            <a class="brand" href="{{ route('beranda') }}"><span class="brand-mark">&lt;/&gt;</span> Informatika</a>
            {{-- Semua link navigasi memakai named route --}}
            <nav>
                <a href="{{ route('beranda') }}">Beranda</a>
                <a href="{{ route('profil') }}">Profil</a>
                <a href="{{ route('dosen.index') }}">Dosen</a>
                <a href="{{ route('berita') }}">Berita</a>
                <a href="{{ route('admin.dashboard') }}">Admin</a>
            </nav>
        </div>
    </header>

    @hasSection('hero')
        @yield('hero')
    @else
        <section class="page-head"><div class="wrap"><h1>@yield('title')</h1></div></section>
    @endif

    <main class="wrap">
        @yield('content')
    </main>

    <footer>
        <div class="wrap">&copy; {{ date('Y') }} Program Studi Informatika</div>
    </footer>
</body>
</html>
