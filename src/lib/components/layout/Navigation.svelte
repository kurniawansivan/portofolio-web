<script>
  // Import the portfolio service to get navigation information
  import { portfolioService } from '../../services/PortfolioService.js';
  
  // Get portfolio configuration for user info
  const portfolioConfig = portfolioService.getPortfolioConfig();
  
  // Define navigation sections
  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];
</script>

<header>
  <nav class="uk-navbar-container uk-navbar-transparent" data-uk-navbar="mode: click">
    <div class="uk-navbar-left">
      <a class="uk-navbar-item uk-logo" href="#home">
        <span class="uk-text-bold">{portfolioConfig.name}</span>
        <span class="uk-text-muted uk-margin-small-left">| {portfolioConfig.title}</span>
      </a>
    </div>
    
    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav uk-visible@m">
        {#each navItems as item}
          <li>
            <a href={item.href} uk-scroll="offset: 100">{item.label}</a>
          </li>
        {/each}
      </ul>
      
      <!-- Mobile Toggle -->
      <a class="uk-navbar-toggle uk-hidden@m mobile-toggle" uk-navbar-toggle-icon href="#" uk-toggle="target: #mobile-menu"></a>
    </div>
  </nav>
  
  <!-- Mobile Menu -->
  <div id="mobile-menu" uk-offcanvas="mode: reveal; overlay: true">
    <div class="uk-offcanvas-bar mobile-menu-bar">
      <button class="uk-offcanvas-close" type="button" uk-close></button>
      <h3 class="mobile-menu-title">{portfolioConfig.name}</h3>
      <p class="uk-text-muted mobile-menu-subtitle">{portfolioConfig.title}</p>
      
      <ul class="uk-nav uk-nav-default mobile-menu-nav">
        {#each navItems as item}
          <li>
            <a href={item.href} uk-scroll="offset: 100" uk-toggle="target: #mobile-menu">{item.label}</a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    z-index: 980;
    background-color: rgba(var(--color-background), 0.95);
    backdrop-filter: blur(5px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .uk-navbar-container:not(.uk-navbar-transparent) {
    background: transparent;
  }
  
  .uk-logo {
    font-size: 1.2rem;
  }
  
  /* Mobile menu styling */
  .mobile-toggle {
    color: var(--color-text) !important; /* Ensure visible toggle icon */
  }
  
  .mobile-menu-bar {
    background-color: #f8f9fa !important; /* Light background */
    color: #333333 !important; /* Dark text for contrast */
  }
  
  .mobile-menu-title {
    color: #333333 !important;
    margin-bottom: 5px;
  }
  
  .mobile-menu-subtitle {
    color: #555555 !important;
  }
  
  .mobile-menu-nav > li > a {
    color: #333333 !important;
    font-weight: 500;
  }
  
  .mobile-menu-nav > li > a:hover {
    color: var(--color-primary) !important;
    background-color: rgba(91, 123, 154, 0.1);
  }
  
  /* Make close button visible */
  .uk-offcanvas-close {
    color: #333333 !important;
  }
</style>