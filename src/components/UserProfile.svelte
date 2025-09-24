<script lang="ts">
  import type { Session } from "@auth/sveltekit";

  export let session: Session | null;
</script>

{#if session?.user}
  <div class="user-info">
    <div class="avatar">
      {#if session.user.image}
        <img src={session.user.image} alt="Profile" />
      {:else}
        <div class="avatar-placeholder">
          {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "?"}
        </div>
      {/if}
    </div>

    <div class="user-details">
      <h2>{session.user.name || "User"}</h2>
      <p>{session.user.email}</p>
      <p class="provider">
        Signed in with {session.user.email?.includes('@') && !session.user.email?.includes('.googleusercontent.com') ? 'Email' : 'Google'}
      </p>
    </div>
  </div>
{/if}

<style>
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
</style>
