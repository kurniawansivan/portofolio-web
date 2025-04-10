/**
 * PortfolioData.js - Data models for the portfolio website
 * Using class-based approach for better structure and OOP principles
 */

// Base class for portfolio items with common properties
export class PortfolioItem {
  constructor(id, title, description, imageUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}

// Project class containing project-specific properties
export class Project extends PortfolioItem {
  constructor(id, title, description, imageUrl, technologies, githubUrl, demoUrl) {
    super(id, title, description, imageUrl);
    this.technologies = technologies || [];
    this.githubUrl = githubUrl;
    this.demoUrl = demoUrl;
  }
}

// Skill class for technical skills
export class Skill {
  constructor(id, name, category, proficiencyLevel, iconName) {
    this.id = id;
    this.name = name;
    this.category = category; // e.g., 'backend', 'database', 'devops'
    this.proficiencyLevel = proficiencyLevel; // 1-5 scale
    this.iconName = iconName; // For display with icons
  }
}

// Experience class for work experience
export class Experience {
  constructor(id, company, position, startDate, endDate, description, achievements) {
    this.id = id;
    this.company = company;
    this.position = position;
    this.startDate = startDate;
    this.endDate = endDate || 'Present';
    this.description = description;
    this.achievements = achievements || [];
  }
}

// Education class for academic background
export class Education {
  constructor(id, institution, degree, field, startYear, endYear, description) {
    this.id = id;
    this.institution = institution;
    this.degree = degree;
    this.field = field;
    this.startYear = startYear;
    this.endYear = endYear || 'Present';
    this.description = description;
  }
}

// ContactInfo class for contact information
export class ContactInfo {
  constructor(email, phone, location, socialLinks) {
    this.email = email;
    this.phone = phone;
    this.location = location;
    this.socialLinks = socialLinks || {}; // Object containing social media links
  }
}

// Portfolio configuration class
export class PortfolioConfig {
  constructor(name, title, summary, avatarUrl, contactInfo) {
    this.name = name;
    this.title = title;
    this.summary = summary;
    this.avatarUrl = avatarUrl;
    this.contactInfo = contactInfo;
  }
}