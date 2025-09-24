<script lang="ts">
  export let type: 'error' | 'success' = 'error';
  export let message: string;
</script>

<div class="message {type}">
  {message}
</div>

<style>
  .message {
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 1.5rem;
    border: 1px solid;
    font-size: 14px;
    text-align: center;
  }

  .message.error {
    background-color: #fee;
    color: #c33;
    border-color: #fcc;
  }

  .message.success {
    background-color: #efe;
    color: #363;
    border-color: #cfc;
    font-weight: 500;
  }

  .message.success :global(a) {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
  }

  .message.success :global(a:hover) {
    text-decoration: underline;
  }
</style>
