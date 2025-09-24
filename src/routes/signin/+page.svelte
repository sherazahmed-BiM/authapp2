<script lang="ts">
  import { signIn } from "@auth/sveltekit/client";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  export let form: { error?: string; success?: boolean; redirectTo?: string };

  let email = "";
  let password = "";
  let isLoading = false;

  // Get error from server action result
  $: error = form?.error || '';

  // Handle successful authentication on client-side only
  onMount(() => {
    if (form?.success && form?.redirectTo) {
      console.log('✅ Authentication successful, redirecting to:', form.redirectTo);
      goto(form.redirectTo);
    }
  });

  async function handleGoogleLogin() {
    try {
      console.log('🔄 Starting Google signIn');

      await signIn("google", {
        callbackUrl: "/dashboard"
      });

    } catch (err) {
      console.error('Google sign in error:', err);
      error = "Google sign in failed";
    }
  }
</script>

<svelte:head>
  <title>Sign In - Auth App</title>
</svelte:head>

<div class="signin-container">
  <div class="signin-card">
    <h1>Sign In</h1>

    {#if error}
      <div class="error-message">{error}</div>
    {/if}

    <!-- Credentials Sign In -->
    <form method="POST" action="?" enctype="application/x-www-form-urlencoded">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autocomplete="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          autocomplete="current-password"
        />
      </div>
      <button type="submit" class="signin-btn">
        Sign In
      </button>
    </form>
    

    <div class="divider"><span>or</span></div>

    <!-- Google Sign In -->
    <button class="google-btn" type="button" on:click={handleGoogleLogin} disabled={isLoading}>
      Sign in with Google
    </button>

    <div class="register-link">
      <p>Don't have an account? <a href="/register">Create one here</a></p>
    </div>
  </div>
</div>


<style>
  .signin-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
  }

  .signin-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
    font-size: 2rem;
    font-weight: 600;
  }

  .error-message {
    background-color: #fee;
    color: #c33;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 1.5rem;
    border: 1px solid #fcc;
    font-size: 14px;
    text-align: center;
  }

  .signin-form {
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.2rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #555;
    font-weight: 500;
  }

  .form-group input {
    width: 100%;
    padding: 12px;
    border: 2px solid #e1e5e9;
    border-radius: 6px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
  }

  .form-group input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .form-group input:disabled {
    background: #f8f9fa;
    cursor: not-allowed;
  }

  .signin-btn {
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 1rem;
  }

  .signin-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  .signin-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .divider {
    position: relative;
    text-align: center;
    margin: 1.5rem 0;
  }

  .divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e1e5e9;
  }

  .divider span {
    background: white;
    padding: 0 15px;
    color: #666;
    font-weight: 500;
  }

  .google-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    background: #4285f4;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .google-btn:hover {
    background: #3367d6;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(66, 133, 244, 0.4);
  }

  .google-icon {
    width: 20px;
    height: 20px;
  }

  .register-link {
    text-align: center;
    margin-top: 2rem;
    color: #666;
  }

  .register-link a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
  }

  .register-link a:hover {
    text-decoration: underline;
  }
</style>
