# Future.id — Multi-role Workspace (Vercel + Supabase)

Future.id adalah platform pendamping eksplorasi dan perencanaan karier siswa dengan tiga role: **Admin**, **Guru BK**, dan **Siswa**.

## Deploy / pembaruan
1. Upload isi folder `future-id-main` ke root repository GitHub.
2. Import repository di Vercel (Framework Preset: Other; Build Command kosong; Output Directory `.`).
3. Pastikan project Supabase yang digunakan sama dengan konfigurasi pada `assets/config.js`.
4. Jika ini instalasi baru, jalankan `supabase-schema.sql`. Jika memperbarui database versi lama, jalankan `supabase-migration-roles.sql` saja di Supabase SQL Editor.
5. Commit perubahan ke GitHub dan tunggu Vercel selesai redeploy.

## Role dan akun
- Pendaftaran publik melalui `register.html` selalu membuat role `student` (Siswa). Role tidak dapat dipilih dari formulir publik.
- Buat akun Admin/Guru BK melalui Supabase Authentication → Users, kemudian ubah profil melalui SQL Editor:
  ```sql
  update public.profiles set role = 'admin' where email = 'admin@sekolah.sch.id';
  update public.profiles set role = 'counselor' where email = 'bk@sekolah.sch.id';
  ```
- Nilai role database: `admin`, `counselor`, `student`.
- Admin dapat mengubah role akun melalui menu Manajemen pengguna. Lindungi akun Admin dan berikan role hanya kepada staf berwenang.

## Fitur workspace
### Siswa
- Dashboard personal dan ringkasan progres.
- Asesmen refleksi minat karier (RIASEC sederhana).
- Eksplorasi bidang karier.
- Career planning: menyimpan tujuan dan langkah berikutnya.
- Mengajukan konsultasi kepada Guru BK.
- Membaca materi yang telah dipublikasikan.

### Guru BK
- Ringkasan jumlah siswa, asesmen, dan konsultasi menunggu.
- Melihat daftar siswa, hasil asesmen, dan rencana karier.
- Melihat permintaan konsultasi, menetapkan diri sebagai penanggung jawab, dan memperbarui status.
- Membuat, menerbitkan, mengarsipkan, dan menghapus materi karier.

### Admin
- Ringkasan akun berdasarkan role.
- Manajemen akun dan pengaturan role.
- Manajemen materi karier.
- Pengelolaan katalog bidang karier.
- Informasi konfigurasi sistem dan arahan backup.

## Keamanan dan batasan
- Jangan pernah menaruh `service_role` key di frontend. Gunakan hanya publishable/anon key.
- RLS Supabase tetap menjadi lapisan otorisasi utama; UI yang menyembunyikan menu bukan pengganti RLS.
- Data asesmen dan konsultasi bersifat sensitif. Batasi akses staf sesuai kebijakan sekolah dan uji RLS sebelum penggunaan nyata. Backup dikelola dari dashboard Supabase.
- Asesmen saat ini merupakan refleksi eksploratif singkat, bukan tes psikologis/diagnostik tervalidasi atau penentu mutlak karier.
- Upload file belum diaktifkan; materi disimpan sebagai deskripsi dan tautan URL. Untuk upload, siapkan bucket Storage privat dan kebijakan akses yang sesuai.

## Konfigurasi
Isi `assets/config.js` dengan Project URL dan Publishable/anon key dari Supabase Project Settings → API. Jangan gunakan service role key.


## Materi oleh Guru BK
Guru BK dapat membuka menu **Materi karier**, mengisi judul, kategori, deskripsi, dan tautan materi/video, lalu memilih **Terbit** agar materi tampil pada dashboard siswa atau **Draft** untuk menyimpannya terlebih dahulu. Guru BK hanya dapat mengubah dan menghapus materi yang dibuat oleh akunnya sendiri; Admin dapat mengelola seluruh materi.

Jika project Supabase sudah memakai database versi sebelumnya, jalankan `supabase-migration-guru-bk-materi.sql` melalui Supabase SQL Editor setelah deploy file website terbaru. Untuk instalasi database baru, gunakan `supabase-schema.sql`.
