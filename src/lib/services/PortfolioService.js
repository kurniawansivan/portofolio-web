/**
 * PortfolioService.js - Service for managing portfolio data
 * Handles data loading and provides methods to access different sections of portfolio data
 */
import { 
  PortfolioConfig, 
  Project, 
  Skill, 
  Experience, 
  Education, 
  ContactInfo 
} from '../models/PortfolioData.js';

export class PortfolioService {
  constructor() {
    this._portfolioData = this._loadPortfolioData();
  }

  // Get portfolio owner configuration
  getPortfolioConfig() {
    return this._portfolioData.config;
  }

  // Get all projects
  getProjects() {
    return this._portfolioData.projects;
  }

  // Get project by ID
  getProjectById(id) {
    return this._portfolioData.projects.find(project => project.id === id);
  }

  // Get skills grouped by category
  getSkillsByCategory() {
    const categories = {};
    this._portfolioData.skills.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = [];
      }
      categories[skill.category].push(skill);
    });
    return categories;
  }

  // Get experiences in chronological order (most recent first)
  getExperiences() {
    return [...this._portfolioData.experiences].sort((a, b) => {
      const dateA = a.endDate === 'Present' ? new Date() : new Date(a.endDate);
      const dateB = b.endDate === 'Present' ? new Date() : new Date(b.endDate);
      return dateB - dateA;
    });
  }

  // Get education history
  getEducation() {
    return this._portfolioData.education;
  }

  // Private method to load portfolio data
  _loadPortfolioData() {
    // This would typically fetch from an API or database
    // For now we use sample data
    return {
      config: new PortfolioConfig(
        'Ivan',
        'Backend Engineer',
        'Experienced backend engineer with expertise in designing scalable and maintainable systems. Passionate about clean code, performance optimization, and cloud infrastructure.',
        '/profile-placeholder.jpg',
        new ContactInfo(
          'kurniawansivan@gmail.com',
          '+6281529921965',
          'Bali, Indonesia',
          {
            github: '',
            linkedin: '',
            twitter: ''
          }
        )
      ),
      projects: [
        new Project(
          'p1',
          'Onboarding Asset Upload',
          'This project automates the onboarding of assets to Azure Blob Storage, Vusion Rail API, and Korona Cloud API. It integrates with Microsoft OneDrive to retrieve files, Azure Blob Storage for file uploads, and third-party APIs for publishing and tagging assets dynamically',
          '',
          ['Python', 'REST API', 'Docker', 'Azure'],
          null,
          null
        ),
        new Project(
          'p2',
          'API Gateway Middleware',
          'Built a flexible API Gateway for microservices, handling authentication, rate limiting, and dynamic request routing. Secured endpoints with JWT/OAuth2, implemented traffic control to ensure stability, and designed the system for easy scalability and integration of new services.',
          '',
          ['Python', 'REST API', 'Docker', 'Azure'],
          null,
          null
        ),
        new Project(
          'p3',
          'Data Analystics',
          'Developed a data analytics system for a People Analyzer to extract insights on user behavior, performance, and engagement. Leveraged structured and unstructured data to identify trends, detect anomalies, and support decision-making. Designed visual metrics and reports to monitor key metrics such as attendance, productivity, and sentiment over time.',
          '',
          ['Python','Pandas', 'NumPy', 'Mathplotlib'],
          null,
          null
        )
      ],
      skills: [
        new Skill('s1', 'Node.js', 'backend', 3, 'nodejs'),
        new Skill('s2', 'Java', 'backend', 3, 'java'),
        new Skill('s3', 'Python', 'backend', 5, 'python'),
        new Skill('s4', 'PostgreSQL', 'database', 5, 'postgresql'),
        new Skill('s5', 'MySQL', 'database', 4, 'mysql'),
        new Skill('s6', 'Docker', 'devops', 5, 'docker'),
        new Skill('s10', 'Microsoft Azure', 'cloud', 4, 'azure'),
        new Skill('s11', 'CI/CD', 'devops', 4, 'cicd'),
        new Skill('s12', 'REST API Design', 'architecture', 5, 'api'),
        new Skill('s13', 'Database Schema', 'architecture', 5, 'databaseschema'),
        new Skill('s14', 'SQLAlchemy', 'database', 4, 'sqlalchemy'),
        new Skill('s15', 'Postman', 'devops', 5, 'postman'),
        new Skill('s16', 'Vercel', 'cloud', 5, 'vercel'),
        new Skill('s16', 'Heroku', 'cloud', 5, 'heroku'),
        new Skill('s17', 'Authentication', 'architecture', 5, 'authentication'),
      ],
      experiences: [
        new Experience(
          'e1',
          'PT. Wolkk Cloud Development',
          'Backend Engineer',
          '2024-07-01',
          '',
          'Backend development for distributed systems',
          [
            'Build and maintain server-side applications, APIs, and databases',
            'Ensure backend systems are fast, secure, and scalable',
            'Collaborate with frontend developers and other teams to integrate system components'
          ]
        ),
        new Experience(
          'e2',
          'PT. Praijing Sinar Abadi',
          'Web Technical Lead',
          '2021-08-01',
          '',
          'Worked on web development based on shopify',
          [
            'Lead and guide the web development team to deliver high-quality projects on time',
            'Design and oversee the technical architecture of websites and web applications',
            'Ensure code quality, security, and performance through reviews and best practices'
          ]
        ),
        new Experience(
          'e3',
          'CV. Samapura Jewelry',
          'Data Analyst (Intern)',
          '2021-12-01',
          '2022-12-01',
          'Data Analyst with focus on',
          [
            'Identify trends, patterns, and correlations for transactional data',
            'Clean and preprocess data raw purchased order data',
            'Create visualizations and generate reports'
          ]
        )
      ],
      education: [
        new Education(
          'ed1',
          'Primakara University',
          'Bachelor',
          'Computer Science',
          2019,
          2024,
          'Graduated with honors'
        )
      ]
    };
  }
}

// Create a singleton instance for the application
export const portfolioService = new PortfolioService();