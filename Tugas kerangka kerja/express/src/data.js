// Data dummy dosen (pengganti database untuk pertemuan ini)
// wa: nomor format internasional tanpa "+" (62 = Indonesia)
export const dosen = [
  {
    nidn: '0012345678',
    nama: 'Dr. Budi Santoso, M.Kom',
    keahlian: 'Jaringan',
    email: 'budi.santoso@kampus.ac.id',
    wa: '6281234567801',
    instagram: 'budi.santoso',
    linkedin: 'budi-santoso',
    alamat: 'Jl. Sudirman No. 12, Makassar, Sulawesi Selatan',
  },
  {
    nidn: '0023456789',
    nama: 'Siti Aminah, M.Kom',
    keahlian: 'Basis Data',
    email: 'siti.aminah@kampus.ac.id',
    wa: '6281234567802',
    instagram: 'siti.aminah',
    linkedin: 'siti-aminah',
    alamat: 'Jl. Pettarani No. 45, Makassar, Sulawesi Selatan',
  },
  {
    nidn: '0034567890',
    nama: 'Andi Wijaya, M.T.',
    keahlian: 'Web',
    email: 'andi.wijaya@kampus.ac.id',
    wa: '6281234567803',
    instagram: 'andi.wijaya',
    linkedin: 'andi-wijaya',
    alamat: 'Jl. Perintis Kemerdekaan Km 10, Makassar',
  },
  {
    nidn: '0045678901',
    nama: 'Rina Marlina, M.Cs.',
    keahlian: 'Web',
    email: 'rina.marlina@kampus.ac.id',
    wa: '6281234567804',
    instagram: 'rina.marlina',
    linkedin: 'rina-marlina',
    alamat: 'Jl. Urip Sumoharjo No. 8, Makassar',
  },
];

export const daftarKeahlian = [...new Set(dosen.map((d) => d.keahlian))];
export const kategoriBerita = ['terbaru', 'akademik', 'kegiatan'];

// Ambil inisial untuk avatar: "Dr. Budi Santoso, M.Kom" -> "BS"
export function inisial(nama) {
  const bersih = nama.split(',')[0].replace(/^(Dr\.|Prof\.|Ir\.)\s*/i, '');
  return bersih.split(' ').slice(0, 2).map((k) => k[0]).join('').toUpperCase();
}   