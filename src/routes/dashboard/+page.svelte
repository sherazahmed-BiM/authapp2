<script lang="ts">
  import { signOut } from "@auth/sveltekit/client";
  import type { PageData } from "./$types";

  export let data: PageData;

  async function handleSignOut() {
    await signOut({ callbackUrl: "/" });
  }
</script>

<svelte:head>
  <title>Dashboard - Auth App</title>
</svelte:head>

<div class="dashboard-container">
  <div class="dashboard-card">
    <h1>Welcome to your Dashboard!</h1>

    {#if data.session?.user}
      <div class="user-info">
        <div class="avatar">
          {#if data.session.user.image}
            <img src={data.session.user.image} alt="Profile" />
          {:else}
            <div class="avatar-placeholder">
              {data.session.user.name?.charAt(0) || data.session.user.email?.charAt(0) || "?"}
            </div>
          {/if}
        </div>

        <div class="user-details">
          <h2>{data.session.user.name || "User"}</h2>
          <p>{data.session.user.email}</p>
          <p class="provider">
            Signed in with {data.session.user.email?.includes('@') && !data.session.user.email?.includes('.googleusercontent.com') ? 'Email' : 'Google'}
          </p>
        </div>
      </div>

      <div class="actions">
        <button class="signout-btn" on:click={handleSignOut}>
          Sign Out
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  .dashboard-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 20px;
  }

  .dashboard-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    text-align: center;
  }

  h1 {
    color: #333;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 600;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 1rem;
    overflow: hidden;
    border: 3px solid #667eea;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
  }

  .user-details {
    margin-bottom: 1rem;
  }

  .user-details h2 {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  .user-details p {
    color: #666;
    margin: 0.25rem 0;
  }

  .provider {
    font-size: 0.9rem;
    color: #888;
    font-style: italic;
  }

  .actions {
    margin-top: 2rem;
  }

  .signout-btn {
    background: #dc3545;
    color: white;
    padding: 12px 30px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .signout-btn:hover {
    background: #c82333;
  }
</style>
