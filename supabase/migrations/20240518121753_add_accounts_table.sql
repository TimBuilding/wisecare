create table accounts (
  id uuid primary key default uuid_generate_v4(),
  is_active boolean not null default true,
  agent_id uuid not null references user_profiles(user_id) on delete set null,
  company_name varchar(255) not null,
  company_address text not null,
  nature_of_business text not null,
  hmo_provider_id uuid not null references hmo_providers(id) on delete set null,
  previous_hmo_provider_id uuid not null references hmo_providers(id) on delete set null,
  current_hmo_provider_id uuid not null references hmo_providers(id) on delete set null,
  account_type_id uuid not null references account_types(id) on delete set null,
  total_utilization float not null,
  total_premium_paid float not null,
  signatory_designation text not null,
  contact_person text not null,
  contact_number text not null,
  principal_plan_type_id uuid not null references plan_types(id) on delete set null,
  dependent_plan_type_id uuid not null references plan_types(id) on delete set null,
  initial_head_count int not null,
  effectivity_date date not null,
  coc_issue_date date not null,
  effective_date date not null,
  renewal_date date not null,
  expiration_date date not null,
  delivery_date_of_membership_ids date not null,
  orientation_date date not null,
  initial_contract_value float not null,
  mode_of_payment_id uuid not null references mode_of_payments(id) on delete set null,
  wellness_lecture_date date not null,
  annual_physical_examination_date date not null,
  commision_rate float not null,
  additional_benefits text not null,
  special_benefits text not null,
  mode_of_premium_id uuid references mode_of_premium(id) on delete set null,
  due_date date,
  or_number text,
  or_date date,
  sa_number text,
  amount float,
  total_contract_value float,
  balance float,
  billing_period int check (billing_period >= 1 and billing_period <= 31),
  summary_of_benefits text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- enable rls
alter table accounts enable row level security;

create policy "allow authenticated users to read accounts"
  on accounts
  for select
  to authenticated
  using (true);

create policy "allow specific departments to insert accounts"
  on accounts
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from user_profiles
      where user_profiles.user_id = auth.uid() and user_profiles.department_id in (select id from departments where name in ('admin', 'marketing', 'finance'))
    )  
  );

create policy "allow specific departments to update accounts"
  on accounts
  for update
  to authenticated
  using (
    exists (
      select 1
      from user_profiles
      where user_profiles.user_id = auth.uid() and user_profiles.department_id in (select id from departments where name in ('admin', 'marketing', 'finance'))
    )
  )
  with check (
    exists (
      select 1
      from user_profiles
      where user_profiles.user_id = auth.uid() and user_profiles.department_id in (select id from departments where name in ('admin', 'marketing', 'finance'))
    )
  );
