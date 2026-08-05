CREATE POLICY "Read request files for accessible sites" ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'request-files'
    AND public.can_access_site(auth.uid(), (split_part(name, '/', 1))::uuid)
  );

CREATE POLICY "Upload request files for accessible sites" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'request-files'
    AND public.can_access_site(auth.uid(), (split_part(name, '/', 1))::uuid)
  );

CREATE POLICY "Admins delete request files" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'request-files' AND public.has_role(auth.uid(), 'admin'));
