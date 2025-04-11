<script>
  // Import UIkit CSS
  import 'uikit/dist/css/uikit.min.css';
  
  // Import UIkit JS
  import 'uikit/dist/js/uikit.min.js';
  import 'uikit/dist/js/uikit-icons.min.js';
  
  // Import custom theme
  import './lib/utils/theme.css';
  
  // Import layout components
  import Navigation from './lib/components/layout/Navigation.svelte';
  import Footer from './lib/components/layout/Footer.svelte';
  
  // Import section components
  import HeroSection from './lib/components/sections/HeroSection.svelte';
  import AboutSection from './lib/components/sections/AboutSection.svelte';
  import SkillsSection from './lib/components/sections/SkillsSection.svelte';
  import ProjectsSection from './lib/components/sections/ProjectsSection.svelte';
  import ExperienceSection from './lib/components/sections/ExperienceSection.svelte';
  
  // Import animation libraries
  import { onMount } from 'svelte';
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  
  // Initialize animations when component is mounted
  onMount(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic'
    });
    
    // Refresh AOS when all images are loaded for better accuracy
    window.addEventListener('load', () => {
      AOS.refresh();
    });
  });
</script>

<main>
  <Navigation />
  
  <HeroSection />
  
  <AboutSection />
  
  <SkillsSection />
  
  <ProjectsSection />
  
  <ExperienceSection />
  
  <section id="contact" class="uk-section uk-section-primary uk-light">
    <div class="uk-container uk-text-center" data-aos="fade-up">
      <h2 class="uk-heading-line uk-text-center"><span>Get in Touch</span></h2>
      
      <p class="uk-text-lead">Interested in working together? Feel free to reach out!</p>
      
      <div class="uk-margin-medium-top">
        <a href="mailto:kurniawansivan@gmail.com" class="uk-button uk-button-default uk-button-large pulse-button">
          <span uk-icon="mail"></span> Email Me
        </a>
      </div>
    </div>
  </section>
  
  <Footer />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    overflow-x: hidden;
  }
  
  :global(section) {
    scroll-margin-top: 80px; /* For smooth scrolling with fixed header */
  }
  
  main {
    width: 100%;
    overflow-x: hidden;
  }
  
  /* Add pulse animation for buttons */
  :global(.pulse-button) {
    animation: pulse 2s infinite;
    box-shadow: 0 0 0 rgba(255, 255, 255, 0.4);
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }
  
  /* Custom animations classes */
  :global(.fade-in-left) {
    animation: fadeInLeft 0.6s ease-in-out;
  }
  
  :global(.fade-in-right) {
    animation: fadeInRight 0.6s ease-in-out;
  }
  
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
