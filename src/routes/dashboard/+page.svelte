<script lang="ts">
  import { signOut } from "@auth/sveltekit/client";
  import type { PageData } from "./$types";
  import PageContainer from "$components/PageContainer.svelte";
  import Card from "$components/Card.svelte";
  import UserProfile from "$components/UserProfile.svelte";
  import Button from "$components/Button.svelte";

  export let data: PageData;

  async function handleSignOut() {
    await signOut({ callbackUrl: "/" });
  }
</script>

<svelte:head>
  <title>Dashboard - Auth App</title>
</svelte:head>

<PageContainer>
  <Card centerText={true} maxWidth="500px">
    <h1>Welcome to your Dashboard!</h1>

    <UserProfile session={data.session} />

    <div class="actions">
      <Button variant="danger" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  </Card>
</PageContainer>

<style>
  h1 {
    color: #333;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 600;
  }

  .actions {
    margin-top: 2rem;
  }
</style>
