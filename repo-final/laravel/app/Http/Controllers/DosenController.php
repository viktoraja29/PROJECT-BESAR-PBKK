<?php

namespace App\Http\Controllers;

use App\Data\Dosen;
use Illuminate\Http\Request; // DITAMBAHKAN

class DosenController extends Controller
{
    // DIUBAH: menerima Request untuk membaca ?keahlian=...
    public function index(Request $request)
    {
        $keahlian = trim((string) $request->query('keahlian', ''));
        $semua = Dosen::all();

        // DITAMBAHKAN: saring data jika filter diisi
        $dosen = $keahlian === ''
            ? $semua
            : array_values(array_filter($semua, fn ($d) => strcasecmp($d['keahlian'], $keahlian) === 0));

        return view('dosen.index', [
            'dosen' => $dosen,
            'keahlian' => $keahlian,                         // DITAMBAHKAN
            'daftarKeahlian' => Dosen::daftarKeahlian(),     // DITAMBAHKAN
        ]);
    }

    public function show(string $nidn)
    {
        $d = Dosen::find($nidn);
        abort_if($d === null, 404);

        return view('dosen.show', ['d' => $d]);
    }

    public function api()
    {
        $data = Dosen::all();

        return response()->json([
            'status' => 'success',
            'total' => count($data),
            'data' => $data,
        ]);
    }
}
