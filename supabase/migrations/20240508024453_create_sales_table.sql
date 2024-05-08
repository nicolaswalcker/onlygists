create table
  sales (
    id uuid primary key default gen_random_uuid(),
    gist_id uuid references public.gists(id),
    customer_email varchar not null,
    created_at timestamp with time zone default current_timestamp not null
  );
