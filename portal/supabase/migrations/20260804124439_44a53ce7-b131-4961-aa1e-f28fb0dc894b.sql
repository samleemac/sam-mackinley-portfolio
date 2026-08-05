REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE ALL ON FUNCTION public.can_access_site(uuid, uuid) FROM anon;
REVOKE ALL ON FUNCTION public.can_access_request(uuid, uuid) FROM anon;

DROP POLICY "Published case studies are public" ON public.case_studies;
CREATE POLICY "Published case studies are public" ON public.case_studies FOR SELECT TO anon, authenticated
  USING (published = true);
