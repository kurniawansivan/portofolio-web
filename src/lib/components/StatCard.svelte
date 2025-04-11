<script>
  import { onMount } from 'svelte';
  
  export let title = '';
  export let value = 0;
  export let maxValue = 5;
  export let icon = 'star';
  export let color = 'primary';
  export let animated = true;
  
  let progress = 0;
  
  onMount(() => {
    if (animated) {
      // Animate the progress value
      const duration = 1500;
      const startTime = performance.now();
      const targetProgress = (value / maxValue) * 100;
      
      function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress_now = Math.min(elapsedTime / duration, 1);
        progress = progress_now * targetProgress;
        
        if (progress_now < 1) {
          requestAnimationFrame(animate);
        }
      }
      
      requestAnimationFrame(animate);
    } else {
      progress = (value / maxValue) * 100;
    }
  });
</script>

<div class="stat-card" class:primary={color === 'primary'} class:secondary={color === 'secondary'} class:success={color === 'success'}>
  <div class="stat-icon">
    <span uk-icon={icon}></span>
  </div>
  <div class="stat-content">
    <h4 class="stat-title">{title}</h4>
    <div class="stat-bar">
      <div class="stat-progress" style="width: {progress}%"></div>
    </div>
    <div class="stat-value">
      <span class="current-value">{value}</span>
      <span class="max-value">/ {maxValue}</span>
    </div>
  </div>
</div>

<style>
  .stat-card {
    display: flex;
    padding: 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    margin-bottom: 15px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
    position: relative;
  }
  
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
  }
  
  .stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
  }
  
  .stat-card.primary::before {
    background-color: var(--color-primary);
  }
  
  .stat-card.secondary::before {
    background-color: var(--color-secondary);
  }
  
  .stat-card.success::before {
    background-color: #28a745;
  }
  
  .stat-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 15px;
    color: white;
  }
  
  .primary .stat-icon {
    background-color: var(--color-primary);
  }
  
  .secondary .stat-icon {
    background-color: var(--color-secondary);
  }
  
  .success .stat-icon {
    background-color: #28a745;
  }
  
  .stat-content {
    flex: 1;
  }
  
  .stat-title {
    margin: 0 0 5px;
    font-size: 16px;
    font-weight: 500;
  }
  
  .stat-bar {
    height: 6px;
    background: #eee;
    border-radius: 3px;
    overflow: hidden;
    margin-bottom: 5px;
  }
  
  .stat-progress {
    height: 100%;
    transition: width 0.5s ease;
  }
  
  .primary .stat-progress {
    background-color: var(--color-primary);
  }
  
  .secondary .stat-progress {
    background-color: var(--color-secondary);
  }
  
  .success .stat-progress {
    background-color: #28a745;
  }
  
  .stat-value {
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
  }
  
  .current-value {
    font-weight: bold;
  }
  
  .max-value {
    color: #777;
    margin-left: 2px;
  }
</style>