// Import necessary hooks and libraries
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * A login form component that handles user authentication.
 * It uses Supabase for authentication.
 */
export default function LoginForm() {
  // State for the email and password form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to hold any error messages
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the form submission.
   * @param e - The form event.
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state on new submission

    // Attempt to sign in with the provided email and password
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // If there's an error, display it
    if (error) {
      setError(error.message);
    } else {
      // On success, redirect to the account page
      window.location.href = '/account';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Email input field */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {/* Password input field */}
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {/* Submit button */}
      <button type="submit">Log In</button>
      {/* Display error message if any */}
      {error && <p>{error}</p>}
    </form>
  );
}
