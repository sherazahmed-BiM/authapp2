<script lang="ts">
  export let label: string;
  export let type: string = "text";
  export let id: string;
  export let name: string;
  export let required: boolean = false;
  export let placeholder: string = "";
  export let minlength: number | undefined = undefined;
  export let autocomplete: any = undefined;
  export let disabled: boolean = false;
  export let value: string = "";

  // Bind value for two-way binding
  $: if (value !== undefined) {
    // Handle external value changes
  }
</script>

<div class="form-group">
  <label for={id}>{label}</label>
  <input
    {type}
    {id}
    {name}
    {required}
    {placeholder}
    {minlength}
    {disabled}
    autocomplete={autocomplete}
    bind:value
  />
</div>

<style>
  .form-group {
    margin-bottom: 1.2rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #555;
    font-weight: 500;
  }

  .form-group input {
    width: 100%;
    padding: 12px;
    border: 2px solid #e1e5e9;
    border-radius: 6px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
  }

  .form-group input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .form-group input:disabled {
    background: #f8f9fa;
    cursor: not-allowed;
  }
</style>
