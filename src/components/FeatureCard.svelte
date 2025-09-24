<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div class="feature">
  <h3>{title}</h3>
  <p>{description}</p>
</div>

<style>
  .feature {
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }

  .feature h3 {
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  .feature p {
    color: #666;
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;
  }
</style>
