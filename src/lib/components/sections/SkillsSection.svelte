<script>
  import { portfolioService } from '../../services/PortfolioService.js';
  
  const skillsByCategory = portfolioService.getSkillsByCategory();
  
  // Function to get skill level label
  function getSkillLevelLabel(level) {
    switch(level) {
      case 5: return 'Expert';
      case 4: return 'Advanced';
      case 3: return 'Intermediate';
      case 2: return 'Basic';
      default: return 'Beginner';
    }
  }
  
  // Define category display order and nice display names
  const categoryOrder = ['backend', 'database', 'devops', 'cloud', 'architecture'];
  const categoryNames = {
    backend: 'Backend Technologies',
    database: 'Database Systems',
    devops: 'DevOps Tools',
    cloud: 'Cloud Platforms',
    architecture: 'Architecture & Design'
  };
</script>

<section id="skills" class="skills-section uk-section">
  <div class="uk-container">
    <h2 class="uk-heading-line uk-text-center"><span>Technical Skills</span></h2>
    <p class="uk-text-center uk-width-2-3@m uk-margin-auto uk-margin-medium-bottom">
      As a backend engineer, I've developed expertise in various technologies and methodologies 
      that enable me to build robust, scalable systems.
    </p>
    
    <div uk-filter="target: .js-filter">
      <ul class="uk-subnav uk-subnav-pill uk-flex uk-flex-center">
        <li class="uk-active" uk-filter-control><a href="#">All</a></li>
        {#each categoryOrder as category}
          {#if skillsByCategory[category]}
            <li uk-filter-control="[data-category='{category}']">
              <a href="#">{categoryNames[category]}</a>
            </li>
          {/if}
        {/each}
      </ul>

      <div class="js-filter uk-grid uk-child-width-1-2 uk-child-width-1-3@m uk-child-width-1-4@l" uk-grid="masonry: true">
        {#each Object.entries(skillsByCategory) as [category, skills]}
          {#each skills as skill}
            <div data-category="{category}">
              <div class="uk-card uk-card-default uk-card-hover uk-card-body uk-card-small">
                <div class="uk-flex uk-flex-middle">
                  <div class="skill-icon">
                    <span uk-icon="icon: {skill.iconName || 'cog'}; ratio: 1.5"></span>
                  </div>
                  <div class="uk-margin-small-left">
                    <h4 class="uk-card-title uk-margin-remove-bottom">{skill.name}</h4>
                    <p class="uk-text-meta uk-margin-remove-top">{getSkillLevelLabel(skill.proficiencyLevel)}</p>
                  </div>
                </div>
                
                <div class="uk-margin-small-top">
                  <progress class="uk-progress" value="{skill.proficiencyLevel * 20}" max="100"></progress>
                </div>
              </div>
            </div>
          {/each}
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .skills-section {
    background-color: var(--color-secondary);
  }
  
  .skill-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--color-primary);
    color: var(--color-text-light);
  }
  
  .uk-progress {
    height: 6px;
    background-color: rgba(0,0,0,0.1);
  }
  
  .uk-progress::-webkit-progress-value {
    background-color: var(--color-primary);
  }
  
  .uk-progress::-moz-progress-bar {
    background-color: var(--color-primary);
  }
  
  .uk-subnav-pill > .uk-active > a {
    background-color: var(--color-primary);
  }
  
  .uk-card {
    transition: transform 0.2s ease;
  }
  
  .uk-card:hover {
    transform: translateY(-5px);
  }
</style>