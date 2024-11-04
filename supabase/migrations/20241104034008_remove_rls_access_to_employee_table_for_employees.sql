drop policy "all departments can insert company employees except agent" on "public"."company_employees";

drop policy "all departments can update company employees except agent" on "public"."company_employees";

drop policy "user can see company employees" on "public"."company_employees";

create policy "Enable read access for users except agent"
on "public"."company_employees"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_profiles
  WHERE ((user_profiles.user_id = ( SELECT auth.uid() AS uid)) AND (user_profiles.department_id IN ( SELECT departments.id
           FROM departments
          WHERE (departments.name = ANY (ARRAY['marketing'::text, 'after-sales'::text, 'under-writing'::text, 'finance'::text, 'admin'::text]))))))));


create policy "Enable update access for admin"
on "public"."company_employees"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM user_profiles
  WHERE ((user_profiles.user_id = ( SELECT auth.uid() AS uid)) AND (user_profiles.department_id IN ( SELECT departments.id
           FROM departments
          WHERE (departments.name = 'admin'::text)))))));


create policy "Enable update for users based on created_by"
on "public"."pending_company_employees"
as permissive
for update
to public
using (((( SELECT auth.uid() AS uid) = created_by) AND (is_approved = false) AND (EXISTS ( SELECT 1
   FROM user_profiles
  WHERE ((user_profiles.user_id = ( SELECT auth.uid() AS uid)) AND (user_profiles.department_id IN ( SELECT departments.id
           FROM departments
          WHERE (departments.name = ANY (ARRAY['admin'::text, 'marketing'::text, 'finance'::text, 'after-sales'::text, 'under-writing'::text])))))))));



