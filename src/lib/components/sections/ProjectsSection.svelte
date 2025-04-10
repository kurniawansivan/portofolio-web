<script>
  import { portfolioService } from '../../services/PortfolioService.js';
  
  const projects = portfolioService.getProjects();
</script>

<section id="projects" class="projects-section uk-section">
  <div class="uk-container">
    <h2 class="uk-heading-line uk-text-center"><span>Featured Projects</span></h2>
    <p class="uk-text-center uk-width-2-3@m uk-margin-auto uk-margin-medium-bottom">
      Here are some of the significant backend engineering projects I've developed. 
      Each one demonstrates my approach to solving complex technical challenges.
    </p>
    
    <div class="uk-grid uk-child-width-1-1 uk-child-width-1-2@m uk-child-width-1-3@l uk-grid-match" uk-grid>
      {#each projects as project}
        <div>
          <div class="uk-card uk-card-default uk-card-hover">
            <div class="uk-card-media-top">
              <div class="uk-cover-container">
                <canvas height="200"></canvas>
                <img src={project.imageUrl} alt={project.title} uk-cover>
              </div>
            </div>
            
            <div class="uk-card-body">
              <h3 class="uk-card-title">{project.title}</h3>
              <p>{project.description}</p>
              
              <div class="uk-margin-small-top">
                {#each project.technologies as tech}
                  <span class="uk-badge">{tech}</span>
                {/each}
              </div>
            </div>
            
            <div class="uk-card-footer">
              {#if project.githubUrl}
                <a href={project.githubUrl} class="uk-button uk-button-text" target="_blank" rel="noopener noreferrer">
                  <span uk-icon="github"></span> Source Code
                </a>
              {/if}
              
              {#if project.demoUrl}
                <a href={project.demoUrl} class="uk-button uk-button-text uk-float-right" target="_blank" rel="noopener noreferrer">
                  <span uk-icon="link"></span> Live Demo
                </a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .projects-section {
    background-color: var(--color-light-bg);
  }

  .uk-badge {
    background-color: var(--color-primary);
    margin-right: 5px;
    margin-bottom: 5px;
    padding: 0 10px;
  }
  
  .uk-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .uk-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  .uk-card-footer {
    border-top: 1px solid var(--color-border);
  }
  
  .uk-button-text {
    color: var(--color-primary);
  }
  
  .uk-button-text:hover {
    color: var(--color-accent);
  }
</style>