-- Future.id: izin Guru BK untuk menerbitkan materi edukasi.
-- Jalankan sekali di Supabase SQL Editor setelah deploy versi website terbaru.
-- Admin dapat mengelola semua materi; Guru BK hanya materi yang dibuat oleh akunnya sendiri.

drop policy if exists "staff manage resources" on public.career_resources;
drop policy if exists "admin manage all resources" on public.career_resources;
drop policy if exists "counselor insert own resources" on public.career_resources;
drop policy if exists "counselor update own resources" on public.career_resources;
drop policy if exists "counselor delete own resources" on public.career_resources;

create policy "admin manage all resources"
on public.career_resources for all to authenticated
using (public.current_role() = 'admin')
with check (public.current_role() = 'admin');

create policy "counselor insert own resources"
on public.career_resources for insert to authenticated
with check (public.current_role() = 'counselor' and created_by = auth.uid());

create policy "counselor update own resources"
on public.career_resources for update to authenticated
using (public.current_role() = 'counselor' and created_by = auth.uid())
with check (public.current_role() = 'counselor' and created_by = auth.uid());

create policy "counselor delete own resources"
on public.career_resources for delete to authenticated
using (public.current_role() = 'counselor' and created_by = auth.uid());

-- Pastikan izin tabel mencakup operasi yang digunakan dashboard.
grant select, insert, update, delete on public.career_resources to authenticated;
