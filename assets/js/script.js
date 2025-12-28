
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animation on Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Header scroll effect
    const header = document.getElementById('header');
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function () {
        // Header scroll effect
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Mobile menu toggle
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu .nav-link');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        mobileMenuBackdrop.classList.toggle('active');

        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close mobile menu on link click
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    // Close mobile menu when clicking on backdrop
    mobileMenuBackdrop.addEventListener('click', toggleMobileMenu);

    // Close mobile menu on ESC key press
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // Skills data
    const skills = [
        { name: "PHP", icon: "fa-brands fa-php", level: 95 },
        { name: "Laravel", icon: "fa-brands fa-laravel", level: 90 },
        { name: "Node.js", icon: "fa-brands fa-node-js", level: 85 },
        { name: "Python", icon: "fa-brands fa-python", level: 80 },
        { name: "Vue.js", icon: "fa-brands fa-vuejs", level: 85 },
        { name: "Nuxt.js", icon: "fas fa-code", level: 80 },
        { name: "Alpine.js", icon: "fas fa-code", level: 85 },
        { name: "RESTful API", icon: "fas fa-exchange-alt", level: 90 },
        { name: "Flutter", icon: "fas fa-mobile-alt", level: 75 },
        { name: "AWS", icon: "fa-brands fa-aws", level: 85 },
        { name: "Linux", icon: "fa-brands fa-linux", level: 90 },
        { name: "Ubuntu", icon: "fa-brands fa-ubuntu", level: 90 },
        { name: "Digital Ocean", icon: "fa-brands fa-digital-ocean", level: 85 },
        { name: "Google Cloud", icon: "fa-brands fa-google", level: 80 },
        { name: "cPanel/WHM", icon: "fas fa-server", level: 90 },
        { name: "MySQL", icon: "fas fa-database", level: 90 },
        { name: "Docker", icon: "fa-brands fa-docker", level: 75 },
        { name: "Kubernetes", icon: "fas fa-dharmachakra", level: 70 },
        { name: "Git", icon: "fa-brands fa-git-alt", level: 90 },
        { name: "Security", icon: "fas fa-shield-alt", level: 85 },
    ];

    // Populate skills grid
    const skillsGrid = document.querySelector('.skills-grid');
    skills.forEach((skill, index) => {
        const delay = index * 50;

        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';

        skillItem.innerHTML = `
      <i class="${skill.icon}"></i>
      <h3>${skill.name}</h3>
      <div class="skill-bar">
        <div class="skill-progress" style="width: ${skill.level}%"></div>
      </div>
    `;

        skillsGrid.appendChild(skillItem);
    });

    // Experience data
    const experiences = [
        {
            title: "Lead Software Engineer",
            company: "Light Technologies",
            period: "January 2021 - Present",
            description: "Leading software development teams in designing and implementing complex web applications and systems. Overseeing development lifecycle from concept to deployment while ensuring best practices in code quality and security.",
            responsibilities: [
                "Architecting scalable software solutions",
                "Leading a team of developers",
                "Implementing CI/CD pipelines",
                "Code reviews and quality assurance",
                "Client consultations and requirement gathering"
            ]
        },
        {
            title: "Freelance Software Developer",
            company: "Upwork (Top Rated Freelancer)",
            period: "2019 - Present",
            description: "Providing expert software development services to clients worldwide. Specializing in backend systems, API development, database architecture, and server administration.",
            responsibilities: [
                "Building custom web applications",
                "Server setup and management",
                "API development and integration",
                "Database optimization",
                "Troubleshooting and support"
            ]
        },
        {
            title: "System Administrator",
            company: "Various Projects",
            period: "2020 - Present",
            description: "Managing and optimizing Linux-based servers and cloud infrastructure. Implementing security measures and ensuring reliable system performance.",
            responsibilities: [
                "Server setup and configuration",
                "Security implementation",
                "Performance optimization",
                "Backup and disaster recovery planning",
                "Monitoring and maintenance"
            ]
        }
    ];

    // Populate experience timeline
    const timeline = document.querySelector('.timeline');
    experiences.forEach((exp, index) => {
        const delay = (index % 2) * 100;
        const animation = index % 2 === 0 ? "fade-right" : "fade-left";

        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';

        const timelineContent = document.createElement('div');
        timelineContent.className = 'timeline-content';

        timelineContent.innerHTML = `
      <span class="date">${exp.period}</span>
      <h3>${exp.title}</h3>
      <h4>${exp.company}</h4>
      <p>${exp.description}</p>
      
      <h5 class="mt-3 mb-2 fw-semibold">Key Responsibilities:</h5>
      <ul class="ps-3">
        ${exp.responsibilities.map(resp => `
          <li class="d-flex align-items-start">
            <span class="text-primary me-2">•</span>
            <span>${resp}</span>
          </li>
        `).join('')}
      </ul>
    `;

        timelineItem.appendChild(timelineContent);
        timeline.appendChild(timelineItem);
    });

    // Projects data
    const projects = [
        {
            id: 1,
            title: "E-commerce Platform",
            category: "web",
            image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
            tags: ["Laravel", "Vue.js", "MySQL", "AWS"],
            description: "A fully-featured e-commerce platform with advanced inventory management and payment processing."
        },
        {
            id: 2,
            title: "Healthcare Management System",
            category: "web",
            image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
            tags: ["PHP", "Laravel", "MySQL", "Alpine.js"],
            description: "A comprehensive healthcare management system for hospitals and clinics."
        },
        {
            id: 3,
            title: "Food Delivery App",
            category: "app",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
            tags: ["Flutter", "Node.js", "Firebase"],
            description: "Mobile application for food ordering and delivery with real-time tracking."
        },
        {
            id: 4,
            title: "Real Estate Platform",
            category: "web",
            image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
            tags: ["PHP", "Laravel", "Vue.js", "Google Maps API"],
            description: "A property listing and management platform with advanced search and filtering."
        },
        {
            id: 5,
            title: "Cloud Infrastructure Setup",
            category: "server",
            image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
            tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
            description: "Complete cloud infrastructure setup with automated deployment pipelines."
        },
        {
            id: 6,
            title: "School Management System",
            category: "web",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
            tags: ["PHP", "Laravel", "MySQL", "JavaScript"],
            description: "Comprehensive school management system with student, teacher, and administrative portals."
        },
        {
            id: 7,
            title: "Inventory Management App",
            category: "app",
            image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
            tags: ["Flutter", "Node.js", "MongoDB"],
            description: "Mobile application for inventory tracking and management with barcode scanning."
        },
        {
            id: 8,
            title: "High-Performance Server Cluster",
            category: "server",
            image: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
            tags: ["Linux", "Docker", "Load Balancing", "Redis"],
            description: "High-availability server cluster setup with load balancing and failover mechanisms."
        }
    ];

    // Populate projects grid and set up filtering
    const projectsGrid = document.querySelector('.projects-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Function to generate project items
    function generateProjects(items) {
        projectsGrid.innerHTML = '';

        items.forEach((project, index) => {
            const delay = index * 100;

            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';

            projectItem.innerHTML = `
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}">
          <div class="project-overlay">
            <a href="#" class="project-link">View Project</a>
          </div>
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
        </div>
      `;

            projectsGrid.appendChild(projectItem);
        });
    }

    // Generate all projects initially
    generateProjects(projects);

    // Set up filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter projects
            let filteredProjects;
            if (filter === 'all') {
                filteredProjects = projects;
            } else {
                filteredProjects = projects.filter(project => project.category === filter);
            }

            // Generate filtered projects
            generateProjects(filteredProjects);

            // Re-initialize AOS for new elements
            AOS.refresh();
        });
    });

    // Testimonials data
    const testimonials = [
        {
            id: 1,
            name: "John Davis",
            position: "CTO, TechSolutions Inc.",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            content: "Working with Mojahedul has been an absolute pleasure. His expertise in Laravel and server management helped us scale our application efficiently. He's responsive, professional, and delivers high-quality work consistently."
        },
        {
            id: 2,
            name: "Sarah Wilson",
            position: "Founder, EduLearn Platform",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            content: "Mojahedul developed our entire learning management system from scratch. His attention to detail and technical knowledge are impressive. He understood our requirements perfectly and delivered even more than we expected."
        },
        {
            id: 3,
            name: "Michael Roberts",
            position: "Project Manager, HealthTech Solutions",
            image: "https://randomuser.me/api/portraits/men/41.jpg",
            content: "We hired Mojahedul for a complex healthcare project involving sensitive data. His security implementations were top-notch, and he ensured our platform was both user-friendly and secure. I highly recommend his services."
        },
        {
            id: 4,
            name: "Emily Chang",
            position: "E-commerce Director, FashionHub",
            image: "https://randomuser.me/api/portraits/women/33.jpg",
            content: "Mojahedul revolutionized our e-commerce platform. His expertise in PHP and Vue.js created a seamless shopping experience for our customers. Our sales have increased by 40% since the launch of the new website!"
        },
        {
            id: 5,
            name: "David Martinez",
            position: "Startup Founder",
            image: "https://randomuser.me/api/portraits/men/22.jpg",
            content: "As a startup with limited resources, finding a developer who could handle both frontend and backend was crucial. Mojahedul delivered our MVP on time and within budget, allowing us to secure our first round of funding."
        }
    ];

    // Populate testimonials slider
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialDots = document.querySelector('.testimonial-dots');

    testimonials.forEach((testimonial, index) => {
        // Create testimonial item
        const testimonialItem = document.createElement('div');
        testimonialItem.className = `testimonial-item ${index === 0 ? 'active' : ''}`;

        testimonialItem.innerHTML = `
      <div class="testimonial-content">
        <div class="testimonial-info">
          <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-image">
          <div>
            <p class="testimonial-quote">"${testimonial.content}"</p>
            <h4 class="testimonial-name">${testimonial.name}</h4>
            <p class="testimonial-position">${testimonial.position}</p>
          </div>
        </div>
      </div>
    `;

        testimonialsContainer.appendChild(testimonialItem);

        // Create testimonial dot
        const testimonialDot = document.createElement('button');
        testimonialDot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
        testimonialDot.setAttribute('data-index', index.toString());
        testimonialDot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);

        testimonialDots.appendChild(testimonialDot);
    });

    // Testimonial slider functionality
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDotBtns = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialDotBtns.forEach(dot => dot.classList.remove('active'));

        testimonialItems[index].classList.add('active');
        testimonialDotBtns[index].classList.add('active');

        currentTestimonial = index;
    }

    // Set up dot navigation
    testimonialDotBtns.forEach(dot => {
        dot.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
            resetTestimonialInterval();
        });
    });

    // Auto rotate testimonials
    let testimonialInterval = setInterval(() => {
        let nextTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(nextTestimonial);
    }, 5000);

    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(() => {
            let nextTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(nextTestimonial);
        }, 5000);
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // In a real implementation, you would send the form data to a server
        // For this demo, we'll just show a success alert
        alert("Message sent! I'll get back to you soon.");

        // Reset the form
        contactForm.reset();
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
