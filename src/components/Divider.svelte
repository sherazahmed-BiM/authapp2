<script lang="ts">
  export let text: string = "or";
</script>

<div class="divider">
  <span>{text}</span>
</div>

<style>
  .divider {
    position: relative;
    text-align: center;
    margin: 1.5rem 0;
  }

  .divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e1e5e9;
  }

  .divider span {
    background: white;
    padding: 0 15px;
    color: #666;
    font-weight: 500;
  }
</style>
