<script>
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";

  let formData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  $: error = $page.form?.error;
</script>

<svelte:head>
  <title>Register - Auth App</title>
</svelte:head>

<div class="register-container">
  <div class="register-card">
    <h1>Create Account</h1>

    {#if error}
      <div class="error-message">
        {error}
      </div>
    {/if}

    <form method="POST" use:enhance>
      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          bind:value={formData.name}
          required
          placeholder="Enter your full name"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          bind:value={formData.email}
          required
          placeholder="Enter your email"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          bind:value={formData.password}
          required
          placeholder="Enter your password"
          minlength="6"
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          bind:value={formData.confirmPassword}
          required
          placeholder="Confirm your password"
          minlength="6"
        />
      </div>

      <button type="submit" class="register-btn">Create Account</button>
    </form>

    <div class="login-link">
      <p>Already have an account? <a href="/">Sign in here</a></p>
    </div>
  </div>
</div>

<style>
  .register-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
  }

  .register-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 2rem;
    font-weight: 600;
  }

  .error-message {
    background-color: #fee;
    color: #c33;
    padding: 10px;
    border-radius: 6px;
    margin-bottom: 1rem;
    border: 1px solid #fcc;
    font-size: 14px;
  }

  .form-group {
    margin-bottom: 1.2rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #555;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 12px;
    border: 2px solid #e1e5e9;
    border-radius: 6px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .register-btn {
    width: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .register-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  .register-btn:active {
    transform: translateY(0);
  }

  .login-link {
    text-align: center;
    margin-top: 1.5rem;
    color: #666;
  }

  .login-link a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
  }

  .login-link a:hover {
    text-decoration: underline;
  }
</style>
