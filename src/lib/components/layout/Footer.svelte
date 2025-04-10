<script>
  import { portfolioService } from '../../services/PortfolioService.js';
  
  const portfolioConfig = portfolioService.getPortfolioConfig();
  const currentYear = new Date().getFullYear();
  const { contactInfo } = portfolioConfig;
</script>

<footer class="uk-section uk-section-secondary uk-padding-small">
  <div class="uk-container">
    <div class="uk-grid-match uk-child-width-1-1 uk-child-width-1-3@m" uk-grid>
      <div class="uk-text-center uk-text-left@m">
        <h4 class="uk-margin-small">{portfolioConfig.name}</h4>
        <p class="uk-text-small uk-margin-remove">{portfolioConfig.title}</p>
      </div>
      
      <div class="uk-text-center">
        <ul class="uk-list uk-margin-remove social-links">
          {#if contactInfo.socialLinks.github}
            <li>
              <a href={contactInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <span uk-icon="icon: github; ratio: 1.2"></span>
              </a>
            </li>
          {/if}
          {#if contactInfo.socialLinks.linkedin}
            <li>
              <a href={contactInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <span uk-icon="icon: linkedin; ratio: 1.2"></span>
              </a>
            </li>
          {/if}
          {#if contactInfo.socialLinks.twitter}
            <li>
              <a href={contactInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile">
                <span uk-icon="icon: twitter; ratio: 1.2"></span>
              </a>
            </li>
          {/if}
        </ul>
      </div>
      
      <div class="uk-text-center uk-text-right@m">
        <p class="uk-text-small uk-margin-remove">
          &copy; {currentYear} All Rights Reserved
        </p>
        <p class="uk-text-small uk-margin-remove">
          <a href="mailto:{contactInfo.email}" class="uk-link-text">{contactInfo.email}</a>
        </p>
      </div>
    </div>
  </div>
</footer>

<style>
  footer {
    background-color: var(--color-accent);
    color: var(--color-text-light);
  }
  
  .social-links {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .social-links li {
    display: inline-block;
  }
  
  .social-links a {
    color: var(--color-text-light);
    transition: transform 0.2s ease;
  }
  
  .social-links a:hover {
    transform: scale(1.2);
  }
  
  h4 {
    color: var(--color-text-light);
    margin-bottom: 5px;
  }
</style>