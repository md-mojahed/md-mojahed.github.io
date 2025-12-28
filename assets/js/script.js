
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
        { name: "Go", icon: "fa-brands fa-golang", level: 75 },
        { name: "Package Development", icon: "fas fa-cube", level: 90 },
        { name: "Composer", icon: "fas fa-box", level: 90 },
        { name: "Chrome Extensions", icon: "fa-brands fa-chrome", level: 80 },
        { name: "QR/Barcode Gen", icon: "fas fa-qrcode", level: 85 },
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
        skillItem.setAttribute('data-aos', 'fade-up');
        skillItem.setAttribute('data-aos-delay', delay.toString());

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
        const animation = index % 2 === 0 ? "fade-right" : "fade-right";

        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.setAttribute('data-aos', animation);
        timelineItem.setAttribute('data-aos-delay', delay.toString());

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
            title: "MParser PHP Package",
            category: "package",
            tags: ["PHP", "Composer", "String Parsing", "Open Source"],
            description: "A powerful PHP package that simplifies parsing complex strings with custom tokens and expressions. Available on Packagist as mojahed/mparser."
        },
        {
            id: 2,
            title: "EduplusQR PHP SDK",
            category: "package",
            tags: ["PHP", "Go", "QR Code", "SDK"],
            description: "Fast QR Code Generator PHP SDK with Go binary backend for high-performance QR code generation. Published as mojahed/eduplusqr."
        },
        {
            id: 3,
            title: "EduplusBarcode PHP SDK",
            category: "package",
            tags: ["PHP", "Go", "Barcode", "SDK"],
            description: "Fast Barcode Generator PHP SDK with Go binary backend for efficient barcode generation. Available as mojahed/eduplusbarcode."
        },
        {
            id: 4,
            title: "Laravel QR & Barcode Package",
            category: "package",
            tags: ["Laravel", "PHP", "QR Code", "Barcode"],
            description: "Laravel package for QR Code and Barcode generation using EduplusQR and EduplusBarcode with configurable binary paths. Published as eduplus/qr."
        },
        {
            id: 5,
            title: "Eduplus Archive SDK",
            category: "package",
            tags: ["PHP", "Laravel", "Archive System", "SDK"],
            description: "PHP SDK for Eduplus Archive - Student Archive System with comprehensive document management capabilities. Available as eduplus/archive."
        },
        {
            id: 6,
            title: "Md's Filler Chrome Extension",
            category: "app",
            tags: ["JavaScript", "Chrome Extension", "Testing", "Automation"],
            description: "Chrome extension that automatically fills web forms with realistic context fake data for testing and development purposes."
        },
        {
            id: 7,
            title: "Mohammadpur Preparatory School & College",
            category: "web",
            tags: ["PHP", "Laravel", "MySQL", "Bootstrap"],
            description: "Complete school management website for Mohammadpur Preparatory School & College (college.mpsc.edu.bd) with student portal and administrative features."
        },
        {
            id: 8,
            title: "Iqra Universal School",
            category: "web",
            tags: ["PHP", "Laravel", "MySQL", "Responsive Design"],
            description: "Educational institution website for ইকরা ইউনিভার্সেল স্কুল (iqrauniversalschool.com) with bilingual support and modern design."
        },
        {
            id: 9,
            title: "Ideal School & College Motijheel",
            category: "web",
            tags: ["PHP", "Laravel", "MySQL", "Academic Portal"],
            description: "Comprehensive school website for Ideal School & College, Motijheel, Dhaka (iscm.edu.bd) with student information system."
        },
        {
            id: 10,
            title: "South Point School & College Baridhara",
            category: "web",
            tags: ["PHP", "Laravel", "MySQL", "CMS"],
            description: "Modern educational website for South Point School & College (spsc-baridhara.com) with content management and student services."
        },
        {
            id: 11,
            title: "Araf Baby Mart E-commerce",
            category: "web",
            tags: ["PHP", "Laravel", "E-commerce", "Payment Gateway"],
            description: "Full-featured e-commerce platform for baby products (arafbabymart.com) with inventory management, payment processing, and order tracking."
        },
        {
            id: 12,
            title: "People Engager Mobile App",
            category: "app",
            tags: ["Flutter", "Android", "iOS", "Cross-platform"],
            description: "Cross-platform mobile application for people engagement and social networking, available on both Android and iOS platforms."
        },
        {
            id: 13,
            title: "Eduplus Student Mobile App",
            category: "app",
            tags: ["Flutter", "Android", "Education", "Student Portal"],
            description: "Educational mobile application for students with features for course management, assignments, and academic tracking on Android platform."
        },
        {
            id: 14,
            title: "WithImpact.com Server Infrastructure",
            category: "server",
            tags: ["AWS", "Hostinger", "WHM", "cPanel"],
            description: "Complete server administration and infrastructure management for WithImpact.com including AWS cloud services, Hostinger hosting, and cPanel/WHM server management."
        },
        {
            id: 15,
            title: "Light Technologies Server Management",
            category: "server",
            tags: ["Linode", "AWS", "WHM", "cPanel"],
            description: "Comprehensive server administration for Light Technologies including Linode VPS management, AWS cloud infrastructure, and cPanel/WHM server configuration and maintenance."
        }
    ];

    // Helper functions for project display
    function getProjectIcon(category) {
        const icons = {
            'web': 'fa-globe',
            'app': 'fa-mobile-alt',
            'server': 'fa-server',
            'package': 'fa-cube'
        };
        return icons[category] || 'fa-code';
    }

    function getCategoryName(category) {
        const names = {
            'web': 'Web Development',
            'app': 'Mobile App',
            'server': 'Server Admin',
            'package': 'Package/SDK'
        };
        return names[category] || 'Development';
    }

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
            projectItem.setAttribute('data-aos', 'fade-up');
            projectItem.setAttribute('data-aos-delay', delay.toString());

            projectItem.innerHTML = `
        <div class="project-header">
          <div class="project-icon">
            <i class="fas ${getProjectIcon(project.category)}"></i>
          </div>
          <div class="project-category">${getCategoryName(project.category)}</div>
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
          <div class="project-actions">
            <a href="#" class="project-link">
              <i class="fas fa-external-link-alt"></i>
              View Project
            </a>
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
            name: "Upwork Client",
            position: "Enterprise Client",
            company: "AWS Project",
            role: "Enterprise Client",
            rating: 5,
            content: "I have worked with many contractors on Upwork. Mojahedul has been the best. He is on time and on budget. His problem solving skills are extremely advanced. The quality of his work is always top notch. His work rarely needs revisions. If it does, he does it quickly and always within spec. If you have any programming or web task you should consider him. You will never be disappointed."
        },
        {
            id: 2,
            name: "Upwork Client",
            position: "Project Manager",
            company: "Web Development",
            role: "Project Manager",
            rating: 5,
            content: "Mojahedul was extremely helpful and knowledgeable. He helped us on solving a nuxt.js deployment while transferring a hosting for our website. I recommend him to anyone needing web development solutions."
        },
        {
            id: 3,
            name: "Upwork Client",
            position: "Technical Lead",
            company: "AWS Enterprise",
            role: "Technical Lead",
            rating: 5,
            content: "Md did a great job on a LAMP REST API deployment to Amazon Web Services. We'd be happy to work with this freelancer again."
        },
        {
            id: 4,
            name: "Upwork Client",
            position: "DevOps Manager",
            company: "Infrastructure Project",
            role: "DevOps Manager",
            rating: 5,
            content: "Excellent professional. He managed to spot issues on my setup and fix them very quickly. Great DevOps. Very good at his work. Extremely knowledgeable and hard working. Good communication. Highly recommend."
        },
        {
            id: 5,
            name: "Upwork Client",
            position: "Software Engineer",
            company: "Backend Development",
            role: "Software Engineer",
            rating: 5,
            content: "Mojahedul is a genius! Found and fixed my problem in minutes. Md. Mojahedul is great solving big problems. He never desists until he finds a solution. Great job!"
        },
        {
            id: 6,
            name: "Upwork Client",
            position: "Startup Founder",
            company: "Web Application",
            role: "Startup Founder",
            rating: 5,
            content: "Amazing work!! Has the skills, the service, and the communication. It was a pleasure, and I will be back very soon! He was very helpful, got work done quick and without issue. Knowledgeable and would hire again."
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
        <div class="testimonial-header">
          <div class="testimonial-avatar">
            <i class="fas fa-user"></i>
          </div>
          <div class="testimonial-rating">
            ${Array.from({length: testimonial.rating}, () => '<i class="fas fa-star"></i>').join('')}
          </div>
        </div>
        <div class="testimonial-body">
          <p class="testimonial-quote">"${testimonial.content}"</p>
          <div class="testimonial-author">
            <h4 class="testimonial-name">${testimonial.name}</h4>
            <div class="testimonial-details">
              <span class="testimonial-role">${testimonial.role}</span>
              <span class="testimonial-company">${testimonial.company}</span>
            </div>
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
