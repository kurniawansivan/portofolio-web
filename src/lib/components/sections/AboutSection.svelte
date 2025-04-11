<script>
  import { portfolioService } from '../../services/PortfolioService.js';
  
  const portfolioConfig = portfolioService.getPortfolioConfig();
  const educationList = portfolioService.getEducation();
</script>

<section id="about" class="about-section uk-section uk-section-muted">
  <div class="uk-container">
    <h2 class="uk-heading-line uk-text-center"><span>About Me</span></h2>
    
    <div class="uk-grid uk-child-width-1-1 uk-child-width-1-2@m uk-flex-middle" uk-grid>
      <div class="uk-animation-slide-left">
        <div class="profile-image-container uk-text-center">
          <img 
            src="/images/projects/profil_ivan.jpg" 
            alt="{portfolioConfig.name} - Backend Engineer" 
            class="profile-image"
            width="300" 
            height="300"
          >
        </div>
      </div>
      
      <div class="uk-animation-slide-right">
        <h3>Who am I?</h3>
        <p class="uk-text-lead">{portfolioConfig.summary}</p>
        
        <p>As a passionate backend engineer, I focus on building robust, scalable systems that power modern applications. I have extensive experience designing APIs, optimizing database performance, and implementing microservice architectures that can handle high-traffic loads.</p>
        
        <p>I believe in writing clean, maintainable code and following best practices for system design. My approach combines technical excellence with practical solutions that solve real business problems.</p>
        
        <h3 class="uk-margin-medium-top">Education</h3>
        <div class="uk-margin-medium-bottom">
          {#each educationList as education}
            <div class="uk-card uk-card-default uk-card-small uk-card-body uk-margin-small-bottom">
              <h4 class="uk-card-title uk-margin-remove-bottom">{education.degree} in {education.field}</h4>
              <p class="uk-text-meta uk-margin-remove-top">{education.institution}, {education.startYear} - {education.endYear}</p>
              <p>{education.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about-section {
    background-color: var(--color-background);
  }

  .profile-image-container {
    position: relative;
    overflow: hidden;
  }

  .profile-image {
    max-width: 300px;
    border: 6px solid var(--color-primary);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
    border-radius: 8px; /* Adding a slight rounded corner for modern look */
  }

  .profile-image:hover {
    transform: scale(1.03);
  }

  h3 {
    color: var(--color-primary);
    border-bottom: 2px solid var(--color-secondary);
    padding-bottom: 10px;
    display: inline-block;
  }
</style>