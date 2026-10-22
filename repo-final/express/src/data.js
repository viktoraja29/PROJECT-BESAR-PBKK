export const dosen = [
  {
    nidn: '0002443028',
    nama: 'Julivian Dodi',
    keahlian: 'Web', 
    email: '2443028@wicida.ac.id',
    wa: '08**********',
    instagram: 'Julipian',
    linkedin: 'Julivian Dodi',
    alamat: 'Samarinda',
  },
  {
    nidn: '0002443085',
    nama: 'Viktor',
    keahlian: 'Jaringan',
    email: '2443085@wicida.ac.id',
    wa: '08**********',
    instagram: 'Rotkiv Aja',
    linkedin: 'Viktor',
    alamat: 'Samarinda',
  },
  {
    nidn: '0002443027',
    nama: 'Muhammad Farhan',
    keahlian: 'Web', 
    email: '2443027@wicida.ac.id', 
    wa: '08**********',
    instagram: 'Farhan Buas',
    linkedin: 'Muhammad Farhan',
    alamat: 'Tenggarong',
  },
  {
    nidn: '0002443014',
    nama: 'Shanjay Wijaya Indra Kirana',
    keahlian: 'Basis Data', 
    email: '2443014@wicida.ac.id',
    wa: '08**********',
    instagram: 'Shanjay Hayyukz',
    linkedin: 'Shanjay Wijaya Indra Kirana',
    alamat: 'Samarinda',
  },
  {
    nidn: '0002443039',
    nama: 'Muhammad Syahreza',
    keahlian: 'Basis Data', 
    email: '2443039@wicida.ac.id',
    wa: '08**********',
    instagram: 'Reza Anos',
    linkedin: 'Muhammad Syahreza',
    alamat: 'Samarinda',
  },
];


export const daftarKeahlian = [...new Set(dosen.map((d) => d.keahlian))];

export const kategoriBerita = ['terbaru', 'akademik', 'kegiatan'];


export function inisial(nama) {
  const bersih = nama.split(',')[0].replace(/^(Dr\.|Prof\.|Ir\.)\s*/i, '');
  return bersih.split(' ').slice(0, 2).map((k) => k[0]).join('').toUpperCase();
}
