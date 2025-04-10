<script>
  import { portfolioService } from '../../services/PortfolioService.js';
  
  const portfolioConfig = portfolioService.getPortfolioConfig();
</script>

<section id="home" class="hero-section uk-section uk-section-primary uk-light uk-flex uk-flex-center uk-flex-middle">
  <div class="uk-container uk-text-center">
    <div class="uk-grid uk-child-width-1-1 uk-child-width-1-2@m uk-flex-middle" uk-grid>
      <div class="uk-text-center uk-text-left@m uk-animation-slide-left-small">
        <h1 class="uk-heading-medium">Hi, I'm <span class="uk-text-bold">{portfolioConfig.name}</span></h1>
        <h2 class="uk-heading-small uk-margin-remove-top">{portfolioConfig.title}</h2>
        
        <p class="uk-text-lead">{portfolioConfig.summary}</p>
        
        <div class="uk-margin-medium-top">
          <a href="#projects" class="uk-button uk-button-default uk-button-large" uk-scroll>View My Work</a>
          <a href="#contact" class="uk-button uk-button-primary uk-button-large uk-margin-small-left" uk-scroll>Contact Me</a>
        </div>
      </div>
      
      <div class="uk-text-center uk-animation-slide-right-small">
        <div class="hero-image-container">
          <img src="public/images/backend-engineering.svg" alt="Backend Engineering Illustration" class="hero-image">
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero-section {
    min-height: 85vh;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
    position: relative;
    overflow: hidden;
  }
  
  .hero-image-container {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .hero-image {
    max-width: 100%;
    height: auto;
    max-height: 500px;
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
  }
  
  @media (max-width: 959px) {
    .hero-image {
      max-height: 300px;
      margin-top: 2rem;
    }
  }
</style>