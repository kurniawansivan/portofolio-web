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
</script>

<main>
  <Navigation />
  
  <HeroSection />
  
  <AboutSection />
  
  <SkillsSection />
  
  <ProjectsSection />
  
  <ExperienceSection />
  
  <section id="contact" class="uk-section uk-section-primary uk-light">
    <div class="uk-container uk-text-center">
      <h2 class="uk-heading-line uk-text-center"><span>Get in Touch</span></h2>
      
      <p class="uk-text-lead">Interested in working together? Feel free to reach out!</p>
      
      <div class="uk-margin-medium-top">
        <a href="mailto:kurniawansivan@gmail.com" class="uk-button uk-button-default uk-button-large">
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
  }
  
  :global(section) {
    scroll-margin-top: 80px; /* For smooth scrolling with fixed header */
  }
  
  main {
    width: 100%;
    overflow-x: hidden;
  }
</style>
