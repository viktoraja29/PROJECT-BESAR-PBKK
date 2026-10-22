<?php

namespace App\Data;

// Data dummy dosen (pengganti database)
class Dosen
{
    public static function all(): array
    {
        return [
            [
                'nidn' => '0002443028',
                'nama' => 'Julivian Dodi',
                'keahlian' => 'Web', // DITAMBAHKAN
                'email' => '2443028@wicida.ac.id',
                'wa' => '08**********',
                'instagram' => 'Julipian',
                'linkedin' => 'Julivian Dodi',
                'alamat' => 'Samarinda',
            ],
            [
                'nidn' => '0002443085',
                'nama' => 'Viktor',
                'keahlian' => 'Jaringan', // DITAMBAHKAN
                'email' => '2443085@wicida.ac.id',
                'wa' => '08**********',
                'instagram' => 'Rotkiv Aja',
                'linkedin' => 'Viktor',
                'alamat' => 'Samarinda',
            ],
            [
                'nidn' => '0002443027',
                'nama' => 'Muhammad Farhan',
                'keahlian' => 'Web', // DITAMBAHKAN
                'email' => '2443027@wicida.ac.id',
                'wa' => '08**********',
                'instagram' => 'Farhan Buas',
                'linkedin' => 'Muhammad Farhan',
                'alamat' => 'Tenggarong',
            ],
            [
                'nidn' => '0002443014',
                'nama' => 'Shanjay Wijaya Indra Kirana',
                'keahlian' => 'Basis Data', // DITAMBAHKAN
                'email' => '2443014@wicida.ac.id',
                'wa' => '08**********',
                'instagram' => 'Shanjay Hayyukz',
                'linkedin' => 'Shanjay Wijaya Indra Kirana',
                'alamat' => 'Samarinda',
            ],
            [
                'nidn' => '0002443039',
                'nama' => 'Muhammad Syahreza',
                'keahlian' => 'Basis Data', // DITAMBAHKAN
                'email' => '2443039@wicida.ac.id',
                'wa' => '08**********',
                'instagram' => 'Reza Anos',
                'linkedin' => 'Muhammad Syahreza',
                'alamat' => 'Samarinda',
            ],
        ];
    }

    // DITAMBAHKAN: daftar keahlian unik untuk isi dropdown filter
    public static function daftarKeahlian(): array
    {
        return array_values(array_unique(array_column(self::all(), 'keahlian')));
    }

    public static function find(string $nidn): ?array
    {
        foreach (self::all() as $d) {
            if ($d['nidn'] === $nidn) {
                return $d;
            }
        }

        return null;
    }

    // Inisial untuk avatar: "Julivian Dodi" -> "JD"
    public static function inisial(string $nama): string
    {
        $bersih = preg_replace('/^(Dr\.|Prof\.|Ir\.)\s*/i', '', explode(',', $nama)[0]);
        $kata = array_slice(explode(' ', trim($bersih)), 0, 2);

        return strtoupper(implode('', array_map(fn ($k) => mb_substr($k, 0, 1), $kata)));
    }
}
