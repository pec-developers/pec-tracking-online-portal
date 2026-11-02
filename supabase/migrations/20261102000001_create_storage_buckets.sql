-- ==============================================================================
-- PECTOP Supabase Storage Buckets & Policies Migration
-- ==============================================================================

-- 1. Create 'pectop-media' Bucket for all portal media & digital booklet assets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'pectop-media',
    'pectop-media',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Create 'student-photos' Bucket for Booklet Cover, Family & Passout Photos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'student-photos',
    'student-photos',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE SET
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ==============================================================================
-- 3. Storage Row Level Security (RLS) Policies for Public Read & Upload
-- ==============================================================================

-- Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow Public SELECT (Read) access to pectop-media objects
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public Read for pectop-media'
    ) THEN
        CREATE POLICY "Public Read for pectop-media"
        ON storage.objects FOR SELECT
        USING (bucket_id = 'pectop-media');
    END IF;
END $$;

-- Allow Public SELECT (Read) access to student-photos objects
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public Read for student-photos'
    ) THEN
        CREATE POLICY "Public Read for student-photos"
        ON storage.objects FOR SELECT
        USING (bucket_id = 'student-photos');
    END IF;
END $$;

-- Allow INSERT (Upload) for authenticated and anon roles for student-photos
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow Upload to student-photos'
    ) THEN
        CREATE POLICY "Allow Upload to student-photos"
        ON storage.objects FOR INSERT
        WITH CHECK (bucket_id = 'student-photos');
    END IF;
END $$;

-- Allow INSERT (Upload) for pectop-media
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow Upload to pectop-media'
    ) THEN
        CREATE POLICY "Allow Upload to pectop-media"
        ON storage.objects FOR INSERT
        WITH CHECK (bucket_id = 'pectop-media');
    END IF;
END $$;

-- Allow UPDATE for pectop-media
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow Update on pectop-media'
    ) THEN
        CREATE POLICY "Allow Update on pectop-media"
        ON storage.objects FOR UPDATE
        USING (bucket_id = 'pectop-media');
    END IF;
END $$;

-- Allow UPDATE for student-photos
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Allow Update on student-photos'
    ) THEN
        CREATE POLICY "Allow Update on student-photos"
        ON storage.objects FOR UPDATE
        USING (bucket_id = 'student-photos');
    END IF;
END $$;

