<script>
  import { portfolioService } from '../../services/PortfolioService.js';
  
  const experiences = portfolioService.getExperiences();
</script>

<section id="experience" class="experience-section uk-section">
  <div class="uk-container">
    <h2 class="uk-heading-line uk-text-center"><span>Work Experience</span></h2>
    
    <div class="uk-margin-large-top">
      <div class="uk-timeline">
        {#each experiences as experience, index}
          <div class="uk-timeline-item {index % 2 === 0 ? 'uk-animation-slide-left-small' : 'uk-animation-slide-right-small'}">
            <div class="uk-timeline-icon">
              <span class="uk-badge">{experience.startDate.substring(0, 4)}</span>
            </div>
            
            <div class="uk-timeline-content">
              <div class="uk-card uk-card-default uk-card-hover">
                <div class="uk-card-header">
                  <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-auto">
                      <span class="company-logo" uk-icon="icon: briefcase; ratio: 2"></span>
                    </div>
                    <div class="uk-width-expand">
                      <h3 class="uk-card-title uk-margin-remove-bottom">{experience.position}</h3>
                      <p class="uk-text-meta uk-margin-remove-top">
                        {experience.company} | {experience.startDate} - {experience.endDate}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div class="uk-card-body">
                  <p>{experience.description}</p>
                  
                  <ul class="uk-list uk-list-bullet">
                    {#each experience.achievements as achievement}
                      <li>{achievement}</li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .experience-section {
    background-color: var(--color-background);
    position: relative;
  }
  
  .uk-timeline {
    position: relative;
    margin-bottom: 40px;
  }
  
  .uk-timeline::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    margin-left: -1px;
    background-color: var(--color-primary);
  }
  
  .uk-timeline-item {
    position: relative;
    margin-bottom: 40px;
  }
  
  .uk-timeline-icon {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
  
  .uk-timeline-content {
    position: relative;
    width: 45%;
    margin-left: 55%;
  }
  
  .uk-timeline-item:nth-child(even) .uk-timeline-content {
    margin-left: 0;
    margin-right: 55%;
  }
  
  .company-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: var(--color-primary);
    border-radius: 50%;
    color: var(--color-text-light);
  }
  
  .uk-badge {
    background-color: var(--color-accent);
    padding: 0 10px;
    font-size: 0.875rem;
  }
  
  @media (max-width: 959px) {
    .uk-timeline::before {
      left: 20px;
    }
    
    .uk-timeline-icon {
      left: 20px;
      transform: none;
    }
    
    .uk-timeline-content,
    .uk-timeline-item:nth-child(even) .uk-timeline-content {
      width: calc(100% - 60px);
      margin-left: 60px;
      margin-right: 0;
    }
  }
</style>