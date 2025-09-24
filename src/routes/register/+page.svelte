<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import PageContainer from "$components/PageContainer.svelte";
  import Card from "$components/Card.svelte";
  import FormInput from "$components/FormInput.svelte";
  import Button from "$components/Button.svelte";
  import Message from "$components/Message.svelte";

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

<PageContainer>
  <Card maxWidth="400px">
    <h1>Create Account</h1>

    {#if error}
      <Message type="error" message={error} />
    {/if}

    <form method="POST" use:enhance>
      <FormInput
        label="Full Name"
        type="text"
        id="name"
        name="name"
        bind:value={formData.name}
        required={true}
        placeholder="Enter your full name"
      />

      <FormInput
        label="Email"
        type="email"
        id="email"
        name="email"
        bind:value={formData.email}
        required={true}
        placeholder="Enter your email"
      />

      <FormInput
        label="Password"
        type="password"
        id="password"
        name="password"
        bind:value={formData.password}
        required={true}
        placeholder="Enter your password"
        minlength={6}
      />

      <FormInput
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        bind:value={formData.confirmPassword}
        required={true}
        placeholder="Confirm your password"
        minlength={6}
      />

      <Button variant="primary" type="submit" fullWidth={true}>
        Create Account
      </Button>
    </form>

    <div class="login-link">
      <p>Already have an account? <a href="/">Sign in here</a></p>
    </div>
  </Card>
</PageContainer>

<style>
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
    font-size: 2rem;
    font-weight: 600;
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
