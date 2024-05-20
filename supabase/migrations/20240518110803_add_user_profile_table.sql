create type department as enum ('marketing', 'after-sales', 'under-writing', 'finance', 'admin', 'agent');

create table user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade not null,
  first_name varchar(255) not null,
  last_name varchar(255) not null,
  email varchar(255) not null,
  department department default 'agent',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create unique index user_profiles_user_id_idx on user_profiles(user_id);

-- enable rls
alter table user_profiles enable row level security;

create policy "user can see user profiles"
on user_profiles
for select
to authenticated
using (true);


-- function to create new user_profile when a new user is created
create or replace function public.create_user_profile()
  returns trigger as $$
  begin
    insert into public.user_profiles (user_id, first_name, last_name, email, department)
    values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', new.email, new.raw_user_meta_data->>'department');
    return new;
  end;
$$ language plpgsql;

create trigger create_user_profile
  after insert on auth.users
  for each row
  execute function public.create_user_profile();