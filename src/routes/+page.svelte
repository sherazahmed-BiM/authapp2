<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";

  let registered = false;

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registered') === 'true') {
      registered = true;
      // Clean up the URL
      const url = new URL(window.location.href);
      url.searchParams.delete('registered');
      window.history.replaceState({}, '', url.toString());
    }
  });

  // Redirect authenticated users to dashboard
  $: if ($page.data.session) {
    window.location.href = '/dashboard';
  }
</script>

<svelte:head>
  <title>Auth App</title>
</svelte:head>

<div class="landing-container">
  <div class="landing-card">
    <h1>Welcome to Auth App</h1>

    {#if registered}
      <div class="success-message">
        ✅ Account created successfully! <a href="/signin">Sign in here</a>
      </div>
    {/if}

    <div class="actions">
      <a href="/signin" class="signin-btn">Sign In</a>
      <a href="/register" class="register-btn">Create Account</a>
    </div>

    <div class="features">
      <div class="feature">
        <h3>🔐 Secure Authentication</h3>
        <p>Email/password and Google OAuth with database sessions</p>
      </div>

      <div class="feature">
        <h3>🛡️ Protected Routes</h3>
        <p>Dashboard and other pages require authentication</p>
      </div>

      <div class="feature">
        <h3>💾 Session Persistence</h3>
        <p>Sessions stored in PostgreSQL with Drizzle ORM</p>
      </div>
    </div>
  </div>
</div>

<style>
  .landing-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
  }

  .landing-card {
    background: white;
    border-radius: 12px;
    padding: 3rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    text-align: center;
  }

  h1 {
    color: #333;
    margin-bottom: 2rem;
    font-size: 3rem;
    font-weight: 600;
  }

  .success-message {
    background-color: #efe;
    color: #363;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 2rem;
    border: 1px solid #cfc;
    font-weight: 500;
  }

  .success-message a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
  }

  .success-message a:hover {
    text-decoration: underline;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
    justify-content: center;
  }

  .signin-btn, .register-btn {
    padding: 12px 30px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
  }

  .signin-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .signin-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  .register-btn {
    background: #f8f9fa;
    color: #495057;
    border: 2px solid #e9ecef;
  }

  .register-btn:hover {
    background: #e9ecef;
    border-color: #dee2e6;
    transform: translateY(-2px);
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .feature {
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }

  .feature h3 {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .feature p {
    color: #666;
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    .landing-card {
      padding: 2rem;
    }

    h1 {
      font-size: 2.5rem;
    }

    .actions {
      flex-direction: column;
    }

    .signin-btn, .register-btn {
      width: 100%;
    }

    .features {
      grid-template-columns: 1fr;
    }
  }
</style>
