
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function VideoUploadForm() {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    setSuccess(null);

    if (!file) {
      setError('Please select a file to upload.');
      setUploading(false);
      return;
    }

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      setError('You must be logged in to upload videos.');
      setUploading(false);
      return;
    }

    const filePath = `${user.id}/${Date.now()}-${file.name}`;

    try {
      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL (or signed URL if bucket is private)
      const { data: publicUrlData } = supabase.storage
        .from('videos')
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      // Save video metadata to database
      const { error: dbError } = await supabase.from('videos').insert({
        user_id: user.id,
        title: title,
        file_path: publicUrl,
      });

      if (dbError) {
        throw dbError;
      }

      setSuccess('Video uploaded successfully!');
      setTitle('');
      setFile(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Video Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={uploading}
        />
      </div>
      <div>
        <label htmlFor="file">Select Video</label>
        <input
          type="file"
          id="file"
          accept="video/*"
          onChange={handleFileChange}
          required
          disabled={uploading}
        />
      </div>
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Video'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
}
