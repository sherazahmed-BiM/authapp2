<script lang="ts">
  import { signIn } from "@auth/sveltekit/client";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import PageContainer from "$components/PageContainer.svelte";
  import Card from "$components/Card.svelte";
  import FormInput from "$components/FormInput.svelte";
  import Button from "$components/Button.svelte";
  import Message from "$components/Message.svelte";
  import Divider from "$components/Divider.svelte";

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

<PageContainer>
  <Card maxWidth="400px">
    <h1>Sign In</h1>

    {#if error}
      <Message type="error" message={error} />
    {/if}

    <!-- Credentials Sign In -->
    <form method="POST" action="?" enctype="application/x-www-form-urlencoded">
      <FormInput
        label="Email"
        type="email"
        id="email"
        name="email"
        required={true}
        autocomplete="email"
        bind:value={email}
      />
      <FormInput
        label="Password"
        type="password"
        id="password"
        name="password"
        required={true}
        autocomplete="current-password"
        bind:value={password}
      />
      <Button variant="primary" type="submit" fullWidth={true}>
        Sign In
      </Button>
    </form>

    <Divider />

    <!-- Google Sign In -->
    <Button
      variant="google"
      type="button"
      fullWidth={true}
      disabled={isLoading}
      onClick={handleGoogleLogin}
    >
      Sign in with Google
    </Button>

    <div class="register-link">
      <p>Don't have an account? <a href="/register">Create one here</a></p>
    </div>
  </Card>
</PageContainer>


<style>
  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
    font-size: 2rem;
    font-weight: 600;
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
