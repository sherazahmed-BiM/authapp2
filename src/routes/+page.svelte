<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import PageContainer from "$components/PageContainer.svelte";
  import Card from "$components/Card.svelte";
  import Button from "$components/Button.svelte";
  import Message from "$components/Message.svelte";
  import FeatureCard from "$components/FeatureCard.svelte";

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

<PageContainer>
  <Card centerText={true}>
    <h1>Welcome to Auth App</h1>

    {#if registered}
      <Message type="success" message="✅ Account created successfully! <a href='/signin'>Sign in here</a>" />
    {/if}

    <div class="actions">
      <Button variant="primary">
        <a href="/signin">Sign In</a>
      </Button>
      <Button variant="secondary">
        <a href="/register">Create Account</a>
      </Button>
    </div>

    <div class="features">
      <FeatureCard
        title="🔐 Secure Authentication"
        description="Email/password and Google OAuth with database sessions"
      />

      <FeatureCard
        title="🛡️ Protected Routes"
        description="Dashboard and other pages require authentication"
      />

      <FeatureCard
        title="💾 Session Persistence"
        description="Sessions stored in PostgreSQL with Drizzle ORM"
      />
    </div>
  </Card>
</PageContainer>

<style>
  h1 {
    color: #333;
    margin-bottom: 2rem;
    font-size: 3rem;
    font-weight: 600;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 3rem;
    justify-content: center;
  }

  .actions :global(a) {
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }

    .actions {
      flex-direction: column;
    }
  }
</style>
