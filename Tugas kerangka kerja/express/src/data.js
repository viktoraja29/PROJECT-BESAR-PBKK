// Data dummy dosen (pengganti database)
// wa: nomor format internasional tanpa "+" (62 = Indonesia)
export const dosen = [
  {
    nidn: '2443028',
    nama: 'Julivian Dodi',
    email: '2443028@wicida.ac.id',
    wa: '08**********',
    instagram: '-',
    linkedin: '',
    alamat: 'Samarinda',
  },
  {
    nidn: '2443085',
    nama: 'Viktor',
    email: '2443085@wicida.ac.id',
    wa: '08**********',
    instagram: '-',
    linkedin: '',
    alamat: 'Samarinda',
  },
  {
    nidn: '2443027',
    nama: 'Muhammad Farhan',
    email: '2443027@Wicida.ac.id',
    wa: '08**********',
    instagram: '-',
    linkedin: '-',
    alamat: 'Tenggarong',
  },
  {
    nidn: '2443014',
    nama: 'Shanjay Wijaya Indra Kirana',
    email: '2443014@wicida.ac.id',
    wa: '08**********',
    instagram: '-',
    linkedin: '-',
    alamat: 'Samarinda',
  },
  {
    nidn: '2443039',
    nama: 'Muhammad Syahreza',
    email: '2443039@wicida.ac.id',
    wa: '08**********',
    instagram: '-',
    linkedin: '-',
    alamat: 'Samarinda',
  },
];

export const kategoriBerita = ['terbaru', 'akademik', 'kegiatan'];

// Ambil inisial untuk avatar: "Dr. Budi Santoso, M.Kom" -> "BS"
export function inisial(nama) {
  const bersih = nama.split(',')[0].replace(/^(Dr\.|Prof\.|Ir\.)\s*/i, '');
  return bersih.split(' ').slice(0, 2).map((k) => k[0]).join('').toUpperCase();
}
