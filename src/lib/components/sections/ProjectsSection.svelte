<script>
  import { portfolioService } from '../../services/PortfolioService.js';
  import { onMount } from 'svelte';
  
  const projects = portfolioService.getProjects();
  let currentProjectIndex = 0;
  let swiperInit = false;
  
  // Initialize Swiper once component is mounted
  onMount(() => {
    import('swiper/element/bundle')
      .then(() => {
        // Initialize Swiper parameters
        const swiper = document.querySelector('.swiper');
        
        if (swiper) {
          Object.assign(swiper, {
            slidesPerView: 1,
            spaceBetween: 30,
            grabCursor: true,
            centeredSlides: true,
            loop: true,
            autoplay: {
              delay: 5000,
              disableOnInteraction: false,
            },
            pagination: {
              clickable: true,
            },
            navigation: true,
            breakpoints: {
              640: {
                slidesPerView: 1.5,
              },
              960: {
                slidesPerView: 2.5,
              },
              1200: {
                slidesPerView: 2.5,
              },
            }
          });
          
          // Initialize Swiper
          swiper.initialize();
          swiperInit = true;
            
          // Update index on slide change
          swiper.addEventListener('slidechange', (e) => {
            currentProjectIndex = e.detail[0].realIndex;
          });
        }
      });
  });
  
  // Toggle project view mode
  let viewMode = 'grid'; // Can be 'grid' or 'carousel'
  
  // Project categories for filtering
  const allCategories = [...new Set(projects.flatMap(p => p.technologies))];
  let selectedCategory = 'all';
  
  function filterProjects(category) {
    selectedCategory = category;
  }
  
  $: filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.technologies.includes(selectedCategory));
</script>

<section id="projects" class="projects-section uk-section">
  <div class="uk-container">
    <div data-aos="fade-up">
      <h2 class="uk-heading-line uk-text-center"><span>Featured Projects</span></h2>
      <p class="uk-text-center uk-width-2-3@m uk-margin-auto uk-margin-medium-bottom">
        Here are some of the significant backend engineering projects I've developed. 
        Each one demonstrates my approach to solving complex technical challenges.
      </p>
    </div>
    
    <!-- Project View Mode Toggle -->
    <div class="uk-flex uk-flex-center uk-margin-medium-bottom" data-aos="fade-up">
      <div class="uk-button-group view-toggle">
        <button class="uk-button uk-button-default" class:uk-active={viewMode === 'grid'} on:click={() => viewMode = 'grid'}>
          <span uk-icon="icon: grid"></span> Grid View
        </button>
        <button class="uk-button uk-button-default" class:uk-active={viewMode === 'carousel'} on:click={() => viewMode = 'carousel'}>
          <span uk-icon="icon: album"></span> Carousel
        </button>
      </div>
    </div>
    
    <!-- Technology Filter Navigation -->
    <div class="uk-margin-medium-bottom" data-aos="fade-up" data-aos-delay="100">
      <div class="filter-pills uk-flex uk-flex-center uk-flex-wrap">
        <button 
          class="filter-pill" 
          class:active={selectedCategory === 'all'} 
          on:click={() => filterProjects('all')}
        >
          All
        </button>
        {#each allCategories as category}
          <button 
            class="filter-pill" 
            class:active={selectedCategory === category} 
            on:click={() => filterProjects(category)}
          >
            {category}
          </button>
        {/each}
      </div>
    </div>
    
    {#if viewMode === 'grid'}
      <!-- Grid View -->
      <div class="uk-grid uk-child-width-1-1 uk-child-width-1-2@m uk-child-width-1-3@l uk-grid-match" uk-grid>
        {#each filteredProjects as project, index}
          <div data-aos="fade-up" data-aos-delay={index * 100}>
            <div class="project-card uk-card uk-card-default uk-card-hover">
              <div class="uk-card-media-top project-image-container">
                <div class="project-overlay">
                  <div class="project-overlay-content">
                    <div class="project-tech-list">
                      {#each project.technologies as tech}
                        <span class="uk-badge">{tech}</span>
                      {/each}
                    </div>
                    <div class="project-links">
                      {#if project.githubUrl}
                        <a href={project.githubUrl} class="project-link" target="_blank" rel="noopener noreferrer">
                          <span uk-icon="github"></span>
                        </a>
                      {/if}
                      
                      {#if project.demoUrl}
                        <a href={project.demoUrl} class="project-link" target="_blank" rel="noopener noreferrer">
                          <span uk-icon="link"></span>
                        </a>
                      {/if}
                    </div>
                  </div>
                </div>
                <img src={project.imageUrl} alt={project.title} class="project-image">
              </div>
              
              <div class="uk-card-body">
                <h3 class="project-title">{project.title}</h3>
                <p class="project-description">{project.description}</p>
              </div>
              
              <div class="uk-card-footer">
                <div class="tech-tags">
                  {#each project.technologies.slice(0, 3) as tech}
                    <span class="tech-tag">{tech}</span>
                  {/each}
                  {#if project.technologies.length > 3}
                    <span class="tech-tag">+{project.technologies.length - 3}</span>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <!-- Carousel View -->
      <div class="swiper-container" data-aos="fade-up">
        <swiper-container class="swiper" init={swiperInit}>
          {#each filteredProjects as project, index}
            <swiper-slide>
              <div class="project-slide">
                <div class="project-slide-content">
                  <div class="project-slide-image">
                    <img src={project.imageUrl} alt={project.title}>
                  </div>
                  <div class="project-slide-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div class="project-tech-pills">
                      {#each project.technologies as tech}
                        <span class="project-tech-pill">{tech}</span>
                      {/each}
                    </div>
                    <div class="project-slide-links">
                      {#if project.githubUrl}
                        <a href={project.githubUrl} class="uk-button uk-button-primary uk-button-small" target="_blank" rel="noopener noreferrer">
                          <span uk-icon="github"></span> View Source
                        </a>
                      {/if}
                      
                      {#if project.demoUrl}
                        <a href={project.demoUrl} class="uk-button uk-button-secondary uk-button-small" target="_blank" rel="noopener noreferrer">
                          <span uk-icon="link"></span> Live Demo
                        </a>
                      {/if}
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
          {/each}
        </swiper-container>
      </div>
    {/if}
  </div>
</section>

<style>
  .projects-section {
    background-color: var(--color-light-bg);
  }

  /* Project Card Styling */
  .project-card {
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    height: 100%;
  }
  
  .project-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
  }
  
  .project-image-container {
    position: relative;
    overflow: hidden;
    height: 200px;
  }
  
  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  .project-card:hover .project-image {
    transform: scale(1.1);
  }
  
  .project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(44, 76, 107, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .project-card:hover .project-overlay {
    opacity: 1;
  }
  
  .project-overlay-content {
    text-align: center;
    color: white;
    padding: 20px;
  }
  
  .project-tech-list {
    margin-bottom: 15px;
  }
  
  .project-tech-list .uk-badge {
    background-color: white;
    color: var(--color-accent);
    margin: 0 3px;
    font-weight: bold;
  }
  
  .project-links {
    display: flex;
    justify-content: center;
    gap: 15px;
  }
  
  .project-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: white;
    color: var(--color-accent);
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
  
  .project-link:hover {
    transform: scale(1.2);
  }
  
  .project-title {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: var(--color-accent);
    transition: color 0.3s ease;
  }
  
  .project-card:hover .project-title {
    color: var(--color-primary);
  }
  
  .project-description {
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Tech Tags */
  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .tech-tag {
    display: inline-block;
    padding: 3px 8px;
    background-color: #f2f2f2;
    border-radius: 20px;
    font-size: 0.8rem;
    color: #666;
  }
  
  /* Carousel Styling */
  .swiper-container {
    width: 100%;
    padding: 30px 0;
  }
  
  .project-slide {
    padding: 20px;
  }
  
  .project-slide-content {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    height: 450px;
  }
  
  .project-slide-image {
    height: 200px;
    overflow: hidden;
  }
  
  .project-slide-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
  
  .project-slide-content:hover .project-slide-image img {
    transform: scale(1.1);
  }
  
  .project-slide-info {
    padding: 20px;
  }
  
  .project-slide-info h3 {
    margin-top: 0;
    color: var(--color-accent);
    font-size: 1.3rem;
  }
  
  .project-tech-pills {
    margin: 15px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .project-tech-pill {
    display: inline-block;
    padding: 3px 10px;
    background-color: var(--color-primary);
    color: white;
    border-radius: 20px;
    font-size: 0.7rem;
  }
  
  .project-slide-links {
    margin-top: 20px;
    display: flex;
    gap: 10px;
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
  
  /* Filter Pills */
  .filter-pills {
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .filter-pill {
    background: none;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .filter-pill.active, .filter-pill:hover {
    background-color: var(--color-primary);
    color: white;
  }
</style>