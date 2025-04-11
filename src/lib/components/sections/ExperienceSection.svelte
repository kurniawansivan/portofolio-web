<script>
  import { portfolioService } from '../../services/PortfolioService.js';
  import { onMount } from 'svelte';
  
  const experiences = portfolioService.getExperiences();
  
  // Calculate total years of experience
  let totalYearsExperience = 0;
  let totalCompanies = experiences.length;
  let longestPosition = '';
  let longestDuration = 0;
  
  onMount(() => {
    experiences.forEach(exp => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate === 'Present' ? new Date() : new Date(exp.endDate);
      const durationMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                           (endDate.getMonth() - startDate.getMonth());
      
      // Convert to years with one decimal place
      const durationYears = durationMonths / 12;
      totalYearsExperience += durationYears;
      
      // Check if this is the longest position
      if (durationMonths > longestDuration) {
        longestDuration = durationMonths;
        longestPosition = exp.position;
      }
    });
    
    // Round to one decimal place
    totalYearsExperience = Math.round(totalYearsExperience * 10) / 10;
  });
</script>

<section id="experience" class="experience-section uk-section">
  <div class="uk-container">
    <div data-aos="fade-up">
      <h2 class="uk-heading-line uk-text-center"><span>Work Experience</span></h2>
      
      <!-- Experience Stats Summary -->
      <div class="uk-grid uk-child-width-1-3@m uk-text-center uk-margin-large-top uk-margin-large-bottom" uk-grid>
        <div data-aos="fade-right" data-aos-delay="100">
          <div class="exp-stat-card">
            <div class="exp-stat-value">{totalYearsExperience}</div>
            <div class="exp-stat-label">Years Experience</div>
            <div class="exp-stat-icon"><span uk-icon="icon: history; ratio: 1.5"></span></div>
          </div>
        </div>
        
        <div data-aos="fade-up" data-aos-delay="200">
          <div class="exp-stat-card">
            <div class="exp-stat-value">{totalCompanies}</div>
            <div class="exp-stat-label">Companies</div>
            <div class="exp-stat-icon"><span uk-icon="icon: world; ratio: 1.5"></span></div>
          </div>
        </div>
        
        <div data-aos="fade-left" data-aos-delay="300">
          <div class="exp-stat-card">
            <div class="exp-stat-value" uk-tooltip="Longest position held">
            <span class="uk-text-muted">Backend Engineer</span>
            </div>
            <div class="exp-stat-label">Key Position</div>
            <div class="exp-stat-icon"><span uk-icon="icon: star; ratio: 1.5"></span></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Timeline View -->
    <div class="uk-margin-large-top">
      <div class="uk-timeline">
        {#each experiences as experience, index}
          <div class="uk-timeline-item" data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} data-aos-duration="800" data-aos-delay={index * 100}>
            <div class="uk-timeline-icon">
              <span class="uk-badge">{experience.startDate.substring(0, 4)}</span>
            </div>
            
            <div class="uk-timeline-content">
              <div class="uk-card uk-card-default uk-card-hover exp-card">
                <div class="uk-card-header">
                  <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-auto">
                      <div class="company-logo">
                        <span uk-icon="icon: briefcase; ratio: 2"></span>
                      </div>
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
                  
                  <div class="achievement-list">
                    {#each experience.achievements as achievement, i}
                      <div class="achievement-item" style="animation-delay: {i * 0.2}s">
                        <div class="achievement-bullet"></div>
                        <div class="achievement-text">{achievement}</div>
                      </div>
                    {/each}
                  </div>
                </div>
                
                <div class="uk-card-footer">
                  <div class="position-stats">
                    <div class="position-stat">
                      <span class="position-stat-icon" uk-icon="icon: calendar"></span>
                      <span class="position-stat-label">Duration:</span>
                      <span class="position-stat-value">
                        {(() => {
                          const startDate = new Date(experience.startDate);
                          const endDate = experience.endDate === 'Present' ? new Date() : new Date(experience.endDate);
                          const durationMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                                              (endDate.getMonth() - startDate.getMonth());
                          const years = Math.floor(durationMonths / 12);
                          const months = durationMonths % 12;
                          return `${years > 0 ? years + 'y ' : ''}${months > 0 ? months + 'm' : ''}`;
                        })()}
                      </span>
                    </div>
                  </div>
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
    width: 3px;
    margin-left: -1.5px;
    background: linear-gradient(to bottom, rgba(91, 123, 154, 0.2), var(--color-primary));
  }
  
  .uk-timeline-item {
    position: relative;
    margin-bottom: 80px;
  }
  
  .uk-timeline-icon {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    transition: all 0.3s ease;
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
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
    border-radius: 50%;
    color: var(--color-text-light);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .exp-card:hover .company-logo {
    transform: rotate(10deg) scale(1.1);
  }
  
  .uk-badge {
    background-color: var(--color-primary);
    padding: 0 15px;
    height: 28px;
    line-height: 28px;
    font-weight: bold;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    font-size: 1rem;
  }
  
  .uk-timeline-item:hover .uk-badge {
    transform: scale(1.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  /* Stats cards */
  .exp-stat-card {
    background-color: white;
    border-radius: 15px;
    padding: 25px 15px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .exp-stat-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  .exp-stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: var(--color-primary);
  }
  
  .exp-stat-value {
    font-size: 2.2rem;
    font-weight: bold;
    color: var(--color-accent);
    margin-bottom: 5px;
  }
  
  .exp-stat-label {
    font-size: 1rem;
    color: #777;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .exp-stat-icon {
    position: absolute;
    bottom: -15px;
    right: -15px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(91, 123, 154, 0.1);
    font-size: 2rem;
    z-index: 0;
  }
  
  /* Achievement list */
  .achievement-list {
    margin-top: 20px;
  }
  
  .achievement-item {
    display: flex;
    margin-bottom: 10px;
    align-items: flex-start;
    animation: slideInRight 0.5s ease forwards;
    opacity: 0;
  }
  
  .achievement-bullet {
    width: 10px;
    height: 10px;
    background-color: var(--color-primary);
    border-radius: 50%;
    margin-top: 6px;
    flex-shrink: 0;
  }
  
  .achievement-text {
    margin-left: 15px;
    flex: 1;
  }
  
  /* Position Stats */
  .position-stats {
    display: flex;
    justify-content: space-between;
  }
  
  .position-stat {
    display: flex;
    align-items: center;
    color: #777;
  }
  
  .position-stat-icon {
    margin-right: 5px;
    color: var(--color-primary);
  }
  
  .position-stat-label {
    font-weight: bold;
    margin-right: 5px;
    font-size: 0.9rem;
  }
  
  .position-stat-value {
    font-size: 0.9rem;
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
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