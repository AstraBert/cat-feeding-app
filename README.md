# Cat Feeding Application

This application serves the purpose of tracking cat feeding times, quantities and food types.

> [!IMPORTANT]
>
> _While the deployed version of the app is invite-only, you are very welcome to deploy your own version, and contribute to this one with issues and pull requests!_

## Set Up

The stack on which this application is built is:

1. [NextJS](https://nextjs.org) as the foundational framework
2. [Supabase](https://supabase.com) for backend operations
3. [shadcn/ui](https://ui.shadcn.com) for frontend rendering

### 1. Install the application

Clone this GitHub repository:

```bash
git clone https://github.com/AstraBert/cat-feeding-app
```

Install all the needed dependencies:

```bash
npm install
```

### 2. Set up the database

To set up the database, you need to have a Supabase account and a project running under that account. Copy the `anon` key and the URL of the project in `.env.local` for local development under these names:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

> _Remember that both of these variable are meant to be exposed to the client._

For production environments, [Vercel](https://vercel.com) offers the possibility of pasting these keys directly as env variables, so you do not have to worry about anything there!

What we've done up to now is sufficient for authentication, but if you want to know more, you can follow the official [Supabase Auth with NextJS guide](https://supabase.com/docs/guides/auth/server-side/nextjs).

Once you have your key and URL, create a `feedings` table on Supabase with the following SQL command:

```sql
CREATE TABLE feedings (
    id INT PRIMARY KEY,
    feedingTime TIMESTAMPTZ DEFAULT NOW(),
    quantity TEXT,
    additionalNotes TEXT DEFAULT 'no additional notes',
    wetFood BOOLEAN DEFAULT FALSE,
    dryFood BOOLEAN DEFAULT FALSE
);
```

And add the two following policies:

```sql
-- Allow both anonymous and authenticated users to read the database table
CREATE POLICY "public can read feedings" ON public.feedings
FOR SELECT TO anon, authenticated
USING (true);
```

```sql
-- Allow only authenticated users to write the database table
create policy "authenticated can read feedings"
on "public"."feedings"
as PERMISSIVE
for INSERT
to authenticated
with check (
true
);
```

This is all that is needed to run the application!

If you also want to enable picture uploading, you should [create a public bucket](https://supabase.com/docs/guides/storage/buckets/creating-buckets) named `pictures`, and create [an access policy](https://supabase.com/docs/guides/storage/security/access-control#access-policies) to restrict uploading files only to authenticated roles.

After that, create a `pictures` table:

```sql
CREATE TABLE pictures (
    id INT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    filePath TEXT,
    url TEXT,
    caption TEXT DEFAULT NULL,
);
```

And then create a policies that allows reading from anon and writing from authenticated:

```sql
-- Allow both anonymous and authenticated users to read the database table
CREATE POLICY "public can read pictures" ON public.pictures
FOR SELECT TO anon, authenticated
USING (true);
```

```sql
-- Allow only authenticated users to write the database table
create policy "authenticated can read pictures"
on "public"."pictures"
as PERMISSIVE
for INSERT
to authenticated
with check (
true
);
```

### 3. Run the App

In development environments, run the app with:

```bash
npm run dev
```

In production ones, use:

```bash
npm run start
```

And you're all set!

## License

This project is provided under an [MIT License](./LICENSE)

## Contributing

Contributions are always welcome! Please follow the contribution [guidelines](./CONTRIBUTING.md).
