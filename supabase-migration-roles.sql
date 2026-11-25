-- Jalankan pada project Supabase yang sudah memakai schema Future.id versi sebelumnya.
-- Membuka permintaan konsultasi pending kepada Guru BK agar dapat ditangani.
drop policy if exists "consult student and assigned staff read" on public.consultation_requests;
create policy "consult student and assigned staff read"
on public.consultation_requests for select to authenticated
using (
  student_id = auth.uid()
  or counselor_id = auth.uid()
  or public.current_role() in ('admin','counselor')
);
create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_assessments_user_created on public.career_assessments(user_id, created_at desc);
create index if not exists idx_plans_user_created on public.career_plans(user_id, created_at desc);
create index if not exists idx_consult_student_created on public.consultation_requests(student_id, created_at desc);
create index if not exists idx_consult_counselor_status on public.consultation_requests(counselor_id, status);
create index if not exists idx_resources_published_created on public.career_resources(published, created_at desc);
