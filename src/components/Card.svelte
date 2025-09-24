<script lang="ts">
  export let maxWidth = "600px";
  export let padding = "3rem";
  export let centerText = false;
</script>

<div class="card" style="--max-width: {maxWidth}; --padding: {padding};" class:center-text={centerText}>
  <slot />
</div>

<style>
  .card {
    background: white;
    border-radius: 12px;
    padding: var(--padding);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: var(--max-width);
  }

  .center-text {
    text-align: center;
  }

  @media (max-width: 768px) {
    .card {
      padding: 2rem;
    }
  }
</style>
