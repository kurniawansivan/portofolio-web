<script>
  import { portfolioService } from '../../services/PortfolioService.js';
  import SkillRadarChart from '../SkillRadarChart.svelte';
  import StatCard from '../StatCard.svelte';
  import { onMount } from 'svelte';
  
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
  
  // Calculate total skill score for summary display
  const allSkills = Object.values(skillsByCategory).flat();
  const totalSkills = allSkills.length;
  const totalExpertise = allSkills.reduce((sum, skill) => sum + skill.proficiencyLevel, 0);
  const averageExpertise = totalSkills > 0 ? Math.round((totalExpertise / totalSkills) * 10) / 10 : 0;
  const expertSkills = allSkills.filter(skill => skill.proficiencyLevel >= 4).length;
  
  // Variables for view mode
  let viewMode = 'card'; // 'card', 'radar', or 'table'
  let activeCategory = 'all';
  
  // Handle category change
  function setActiveCategory(category) {
    activeCategory = category;
  }
  
  // Get filtered skills based on active category
  function getFilteredSkills() {
    if (activeCategory === 'all') {
      return allSkills;
    } else {
      return skillsByCategory[activeCategory] || [];
    }
  }
</script>

<section id="skills" class="skills-section uk-section">
  <div class="uk-container">
    <div data-aos="fade-up">
      <h2 class="uk-heading-line uk-text-center"><span>Technical Skills</span></h2>
      <p class="uk-text-center uk-width-2-3@m uk-margin-auto uk-margin-medium-bottom">
        As a backend engineer, I've developed expertise in various technologies and methodologies 
        that enable me to build robust, scalable systems.
      </p>
    </div>
    
    <!-- Skills Summary Cards -->
    <div class="uk-grid uk-grid-match uk-child-width-1-3@m uk-margin-medium-bottom" data-aos="fade-up" data-aos-delay="100" uk-grid>
      <div>
        <div class="uk-card uk-card-default uk-card-body skill-summary-card">
          <div class="summary-icon">
            <span uk-icon="icon: code; ratio: 2"></span>
          </div>
          <div class="summary-content">
            <div class="summary-title">Total Skills</div>
            <div class="summary-value">{totalSkills}</div>
            <div class="summary-description">Technologies & Tools</div>
          </div>
        </div>
      </div>
      
      <div>
        <div class="uk-card uk-card-default uk-card-body skill-summary-card">
          <div class="summary-icon">
            <span uk-icon="icon: star; ratio: 2"></span>
          </div>
          <div class="summary-content">
            <div class="summary-title">Average Level</div>
            <div class="summary-value">{averageExpertise}</div>
            <div class="summary-description">Out of 5.0</div>
          </div>
        </div>
      </div>
      
      <div>
        <div class="uk-card uk-card-default uk-card-body skill-summary-card">
          <div class="summary-icon">
            <span uk-icon="icon: check; ratio: 2"></span>
          </div>
          <div class="summary-content">
            <div class="summary-title">Expert Areas</div>
            <div class="summary-value">{expertSkills}</div>
            <div class="summary-description">Advanced & Expert Skills</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- View Mode Selector -->
    <div class="uk-margin-medium-bottom uk-flex uk-flex-center" data-aos="fade-up" data-aos-delay="150">
      <div class="uk-button-group view-toggle">
        <button class="uk-button uk-button-default" class:uk-active={viewMode === 'card'} on:click={() => viewMode = 'card'}>
          <span uk-icon="icon: grid"></span> Card View
        </button>
        <button class="uk-button uk-button-default" class:uk-active={viewMode === 'radar'} on:click={() => viewMode = 'radar'}>
          <span uk-icon="icon: future"></span> Radar Charts
        </button>
        <button class="uk-button uk-button-default" class:uk-active={viewMode === 'table'} on:click={() => viewMode = 'table'}>
          <span uk-icon="icon: list"></span> Table View
        </button>
      </div>
    </div>
    
    <!-- Category Filter Navigation -->
    <div uk-filter="target: .js-filter" data-aos="fade-up" data-aos-delay="200">
      <ul class="uk-subnav uk-subnav-pill uk-flex uk-flex-center">
        <li class:uk-active={activeCategory === 'all'} uk-filter-control>
          <a href="#" on:click|preventDefault={() => setActiveCategory('all')}>All Skills</a>
        </li>
        {#each categoryOrder as category}
          {#if skillsByCategory[category]}
            <li class:uk-active={activeCategory === category} uk-filter-control="[data-category='{category}']">
              <a href="#" on:click|preventDefault={() => setActiveCategory(category)}>{categoryNames[category]}</a>
            </li>
          {/if}
        {/each}
      </ul>

      {#if viewMode === 'card'}
        <!-- Card View -->
        <div class="js-filter uk-grid uk-child-width-1-2 uk-child-width-1-3@m uk-child-width-1-4@l" uk-grid="masonry: true">
          {#each getFilteredSkills() as skill}
            <div data-category="{skill.category}" data-aos="fade-up" data-aos-delay={150 + getFilteredSkills().indexOf(skill) * 50}>
              <StatCard 
                title={skill.name}
                value={skill.proficiencyLevel}
                maxValue={5}
                icon={skill.iconName || 'star'} 
                color={skill.proficiencyLevel >= 4 ? 'primary' : 'secondary'}
                animated={true}
              />
            </div>
          {/each}
        </div>
      {:else if viewMode === 'radar'}
        <!-- Radar Chart View -->
        <div class="uk-grid uk-child-width-1-1 uk-child-width-1-2@m" uk-grid>
          {#each Object.entries(skillsByCategory) as [category, skills]}
            {#if skills.length > 0 && (activeCategory === 'all' || activeCategory === category)}
              <div data-aos="zoom-in" data-aos-delay={200}>
                <SkillRadarChart skillCategory={categoryNames[category]} skills={skills} />
              </div>
            {/if}
          {/each}
        </div>
      {:else}
        <!-- Table View -->
        <div class="uk-overflow-auto" data-aos="fade-up">
          <table class="uk-table uk-table-hover uk-table-middle uk-table-divider">
            <thead>
              <tr>
                <th class="uk-table-shrink">#</th>
                <th>Skill Name</th>
                <th>Category</th>
                <th>Level</th>
                <th>Proficiency</th>
              </tr>
            </thead>
            <tbody>
              {#each getFilteredSkills() as skill, index}
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <div class="uk-flex uk-flex-middle">
                      <div class="skill-icon-small">
                        <span uk-icon="icon: {skill.iconName || 'star'}"></span>
                      </div>
                      <span class="uk-margin-small-left">{skill.name}</span>
                    </div>
                  </td>
                  <td>{categoryNames[skill.category]}</td>
                  <td>{getSkillLevelLabel(skill.proficiencyLevel)}</td>
                  <td>
                    <progress class="uk-progress skill-progress" value="{skill.proficiencyLevel * 20}" max="100"></progress>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
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
  
  .skill-icon-small {
    width: 30px;
    height: 30px;
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
    color: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  
  /* Skill Summary Cards */
  .skill-summary-card {
    display: flex;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .skill-summary-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
  
  .summary-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background-color: var(--color-primary);
    color: white;
    border-radius: 50%;
    margin-right: 15px;
  }
  
  .summary-content {
    flex: 1;
  }
  
  .summary-title {
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 5px;
  }
  
  .summary-value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--color-accent);
    line-height: 1;
  }
  
  .summary-description {
    font-size: 0.8rem;
    color: #999;
    margin-top: 5px;
  }
  
  /* View Toggle Buttons */
  .view-toggle .uk-button {
    padding: 5px 15px;
    transition: all 0.3s ease;
  }
  
  .view-toggle .uk-active {
    background-color: var(--color-primary);
    color: white;
  }
  
  /* Skill progress in table view */
  .skill-progress::-webkit-progress-value {
    transition: width 1.5s ease-in-out;
  }
  
  /* Table styling */
  .uk-table-divider {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  }
  
  .uk-table thead {
    background-color: var(--color-primary);
    color: white;
  }
  
  .uk-table thead th {
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.9rem;
  }
</style>