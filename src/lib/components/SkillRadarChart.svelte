<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  
  export let skillCategory;
  export let skills = [];

  let chartCanvas;
  let chart;

  onMount(() => {
    const ctx = chartCanvas.getContext('2d');
    
    // Transform skills data for Chart.js
    const skillLabels = skills.map(skill => skill.name);
    const skillValues = skills.map(skill => skill.proficiencyLevel);
    
    // Create chart
    chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: skillLabels,
        datasets: [
          {
            label: 'Proficiency',
            data: skillValues,
            backgroundColor: 'rgba(91, 123, 154, 0.3)',
            borderColor: 'rgba(91, 123, 154, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(44, 76, 107, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(91, 123, 154, 1)',
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 5,
            ticks: {
              stepSize: 1,
              display: false
            },
            pointLabels: {
              font: {
                size: 14,
                family: "'Segoe UI', sans-serif",
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            angleLines: {
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                const value = context.raw;
                label += value + '/5';
                return label;
              }
            }
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeOutQuart'
        }
      }
    });
    
    return () => {
      chart.destroy();
    };
  });
</script>

<div class="chart-container">
  <h3 class="uk-text-center chart-title">{skillCategory}</h3>
  <canvas bind:this={chartCanvas} height="300"></canvas>
</div>

<style>
  .chart-container {
    position: relative;
    height: 300px;
    width: 100%;
    margin-bottom: 30px;
  }
  
  .chart-title {
    color: var(--color-primary);
    font-size: 1.2rem;
    margin-bottom: 15px;
  }
</style>