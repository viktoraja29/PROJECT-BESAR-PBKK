export const dosen = [
  {
    nidn: 'TI-2443028',
    nama: 'Julivian Dodi',
    email: '2443028@wicida.ac.id',
    wa: '08**********',
    instagram: 'Julipian',
    linkedin: 'Julivian Dodi',
    alamat: 'Samarinda',
  },
  {
    nidn: 'TI-2443085',
    nama: 'Viktor',
    email: '2443085@wicida.ac.id',
    wa: '08**********',
    instagram: 'Rotkiv Aja',
    linkedin: 'Viktor',
    alamat: 'Samarinda',
  },
  {
    nidn: 'TI-2443027',
    nama: 'Muhammad Farhan',
    email: '2443027@Wicida.ac.id',
    wa: '08**********',
    instagram: 'Farhan Buas',
    linkedin: 'Muhammad Farhan',
    alamat: 'Tenggarong',
  },
  {
    nidn: 'TI-02443014',
    nama: 'Shanjay Wijaya Indra Kirana',
    email: '2443014@wicida.ac.id',
    wa: '08**********',
    instagram: 'Shanjay Hayyukz',
    linkedin: 'Shanjay Wijaya Indra Kirana',
    alamat: 'Samarinda',
  },
  {
    nidn: 'TI-2443039',
    nama: 'Muhammad Syahreza',
    email: '2443039@wicida.ac.id',
    wa: '08**********',
    instagram: 'Reza Anos',
    linkedin: 'Muhammad Syahreza',
    alamat: 'Samarinda',
  },
];

export const kategoriBerita = ['terbaru', 'akademik', 'kegiatan'];

// Ambil inisial untuk avatar: "Viktor" -> "BS"
export function inisial(nama) {
  const bersih = nama.split(',')[0].replace(/^(Dr\.|Prof\.|Ir\.)\s*/i, '');
  return bersih.split(' ').slice(0, 2).map((k) => k[0]).join('').toUpperCase();
}
