<script>
  import { portfolioService } from '../../services/PortfolioService.js';
  import { onMount } from 'svelte';
  
  const portfolioConfig = portfolioService.getPortfolioConfig();
  
  let animationReady = false;
  
  onMount(() => {
    import('gsap').then(({ gsap }) => {
      // Create a timeline for hero animations
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: "power3.out" }
      });
      
      // Add animations
      tl.from(".hero-title", { y: 50, opacity: 0 })
        .from(".hero-subtitle", { y: 30, opacity: 0 }, "-=0.4")
        .from(".hero-text", { y: 20, opacity: 0 }, "-=0.3")
        .from(".hero-buttons", { y: 20, opacity: 0, stagger: 0.2 }, "-=0.2")
        .from(".hero-image", { x: 50, opacity: 0 }, "-=0.5");
      
      // Enable animation interactions once loaded
      animationReady = true;
      
      // Create floating animation for the hero image
      gsap.to(".hero-image", {
        y: 15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  });
</script>

<section id="home" class="hero-section uk-section uk-flex uk-flex-center uk-flex-middle">
  <div class="uk-container">
    <div class="uk-grid uk-child-width-1-1 uk-child-width-1-2@m uk-flex-middle" uk-grid>
      <div class="uk-text-center uk-text-left@m">
        <h1 class="hero-title">Hi, I'm <span class="uk-text-primary">{portfolioConfig.name}</span></h1>
        <h2 class="hero-subtitle">{portfolioConfig.title}</h2>
        
        <div class="hero-text">
          <p class="uk-text-lead">{portfolioConfig.summary}</p>
          
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-value">3+</div>
              <div class="stat-label">Years Experience</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">10+</div>
              <div class="stat-label">Tech Skills</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">3+</div>
              <div class="stat-label">Projects</div>
            </div>
          </div>
        </div>
        
        <div class="hero-buttons uk-margin-medium-top">
          <a href="#projects" class="uk-button uk-button-default uk-button-large action-button" uk-scroll>
            <span class="button-content">View My Work</span>
          </a>
          <a href="#contact" class="uk-button uk-button-primary uk-button-large action-button pulse-button uk-margin-small-left" uk-scroll>
            <span class="button-content">Contact Me</span>
          </a>
        </div>
        
        <div class="hero-social uk-margin-medium-top">
          {#if portfolioConfig.contactInfo?.socialLinks?.github}
            <a href={portfolioConfig.contactInfo.socialLinks.github} class="social-icon" target="_blank" rel="noopener noreferrer">
              <span uk-icon="icon: github; ratio: 1.2"></span>
            </a>
          {/if}
          
          {#if portfolioConfig.contactInfo?.socialLinks?.linkedin}
            <a href={portfolioConfig.contactInfo.socialLinks.linkedin} class="social-icon" target="_blank" rel="noopener noreferrer">
              <span uk-icon="icon: linkedin; ratio: 1.2"></span>
            </a>
          {/if}
          
          {#if portfolioConfig.contactInfo?.socialLinks?.twitter}
            <a href={portfolioConfig.contactInfo.socialLinks.twitter} class="social-icon" target="_blank" rel="noopener noreferrer">
              <span uk-icon="icon: twitter; ratio: 1.2"></span>
            </a>
          {/if}
        </div>
      </div>
      
      <div class="uk-text-center">
        <div class="hero-image-container">
          <div class="hero-blob"></div>
          <img src="/images/development.png" alt="Backend Engineering Illustration" class="hero-image">
        </div>
      </div>
    </div>
  </div>
  
  <!-- Animated shapes in background -->
  <div class="animated-shape shape-1"></div>
  <div class="animated-shape shape-2"></div>
  <div class="animated-shape shape-3"></div>
</section>

<style>
  .hero-section {
    min-height: 90vh;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
    position: relative;
    overflow: hidden;
    color: white;
    padding: 80px 0;
  }
  
  .hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 15px;
    line-height: 1.2;
    color: white;
  }
  
  .hero-subtitle {
    font-size: 2.2rem;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 25px;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .uk-text-primary {
    color: white !important;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    display: inline-block;
  }
  
  .uk-text-primary::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.4);
    z-index: -1;
  }
  
  .hero-image-container {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .hero-blob {
    position: absolute;
    width: 450px;
    height: 450px;
    border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    background-color: rgba(255, 255, 255, 0.1);
    animation: morph 8s linear infinite;
  }
  
  .hero-image {
    max-width: 100%;
    height: auto;
    max-height: 500px;
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
    position: relative;
    z-index: 2;
  }
  
  /* Stats section */
  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 30px;
  }
  
  .stat-item {
    text-align: center;
  }
  
  .stat-value {
    font-size: 2.2rem;
    font-weight: bold;
    color: white;
    line-height: 1;
  }
  
  .stat-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.8;
  }
  
  /* Buttons */
  .action-button {
    border-radius: 30px;
    padding: 0 30px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    z-index: 1;
    border: 2px solid white;
  }
  
  .action-button::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: white;
    transition: height 0.3s ease;
    z-index: -1;
  }
  
  .action-button:hover::after {
    height: 100%;
  }
  
  .uk-button-default {
    background: transparent;
    color: white;
  }
  
  .uk-button-default:hover {
    background: transparent;
    color: var(--color-accent);
  }
  
  .uk-button-primary {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  .uk-button-primary:hover {
    background-color: rgba(255, 255, 255, 0.3);
    color: #000; /* Adding black color for better contrast on hover */
  }
  
  /* Social Icons */
  .hero-social {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
  }
  
  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    transition: all 0.3s ease;
    margin: 0 5px;
  }
  
  .social-icon:hover {
    transform: translateY(-5px);
    background-color: white;
    color: var(--color-accent);
  }
  
  /* Animated shapes */
  .animated-shape {
    position: absolute;
    opacity: 0.1;
    background: white;
    border-radius: 50%;
  }
  
  .shape-1 {
    width: 80px;
    height: 80px;
    top: 10%;
    left: 10%;
    animation: float 10s infinite ease-in-out;
  }
  
  .shape-2 {
    width: 120px;
    height: 120px;
    bottom: 15%;
    left: 5%;
    animation: float 8s infinite ease-in-out reverse;
  }
  
  .shape-3 {
    width: 150px;
    height: 150px;
    top: 20%;
    right: 10%;
    animation: float 12s infinite ease-in-out;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
    }
    25% {
      transform: translateY(-20px) translateX(10px);
    }
    50% {
      transform: translateY(10px) translateX(20px);
    }
    75% {
      transform: translateY(20px) translateX(-10px);
    }
  }
  
  @keyframes morph {
    0% {
      border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    }
    25% {
      border-radius: 55% 45% 30% 70% / 55% 30% 70% 45%;
    }
    50% {
      border-radius: 30% 70% 55% 45% / 30% 30% 70% 70%;
    }
    75% {
      border-radius: 70% 30% 45% 55% / 45% 70% 30% 55%;
    }
    100% {
      border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
    }
  }
  
  @media (max-width: 959px) {
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.8rem;
    }
    
    .hero-image {
      max-height: 350px;
      margin-top: 40px;
    }
    
    .hero-stats {
      margin-top: 20px;
      gap: 20px;
    }
    
    .stat-value {
      font-size: 1.8rem;
    }
    
    .hero-blob {
      width: 350px;
      height: 350px;
    }
  }
  
  @media (max-width: 639px) {
    .hero-stats {
      flex-direction: column;
      gap: 10px;
    }
    
    .hero-buttons {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    
    .action-button {
      width: 100%;
      margin-left: 0 !important;
    }
    
    .uk-margin-small-left {
      margin-top: 10px;
    }
  }
</style>