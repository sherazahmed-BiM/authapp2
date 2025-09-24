<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'google' | 'danger' = 'primary';
  export let type: 'button' | 'submit' = 'button';
  export let disabled: boolean = false;
  export let fullWidth: boolean = false;
  export let onClick: (() => void) | undefined = undefined;
</script>

<button
  {type}
  {disabled}
  class="btn {variant}"
  class:full-width={fullWidth}
  on:click={onClick}
>
  <slot />
</button>

<style>
  .btn {
    padding: 12px 30px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    display: inline-block;
  }

  .btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none !important;
  }

  .full-width {
    width: 100%;
  }

  /* Primary variant */
  .btn.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .btn.primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  /* Secondary variant */
  .btn.secondary {
    background: #f8f9fa;
    color: #495057;
    border: 2px solid #e9ecef;
  }

  .btn.secondary:hover:not(:disabled) {
    background: #e9ecef;
    border-color: #dee2e6;
    transform: translateY(-2px);
  }

  /* Google variant */
  .btn.google {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #4285f4;
    color: white;
  }

  .btn.google:hover:not(:disabled) {
    background: #3367d6;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(66, 133, 244, 0.4);
  }

  /* Danger variant */
  .btn.danger {
    background: #dc3545;
    color: white;
  }

  .btn.danger:hover:not(:disabled) {
    background: #c82333;
  }
</style>
