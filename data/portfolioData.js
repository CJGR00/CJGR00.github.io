/**
 * Portfolio Data Configuration
 * Holds all dynamic website copy, stats, skills, projects, and certifications.
 */
export const portfolioData = {
    profile: {
        initials: "CJ",
        logoText: "CJGR",
        firstName: "Christian Jae",
        lastName: "Remulla",
        fullName: "Christian Jae Remulla",
        title: "Computer Science Student &middot; Software Developer &middot; Aspiring Full-Stack Developer",
        description: "A passionate Computer Science student with experience in full-stack web development, database management, GUI applications, and modern frameworks like Next.js and Prisma ORM.",
        status: "Open to Internship Opportunities",
        resumeUrl: "REMULLA_resume.online.pdf",
        email: "christianremulla.01@gmail.com",
        socials: {
            github: "https://github.com/CJGR00",
            linkedin: "https://www.linkedin.com/in/cjgr00/",
            email: "mailto:christianremulla.01@gmail.com"
        },
        stats: [
            { value: "4+", label: "Projects Built" },
            { value: "15", label: "Certifications" },
            { value: "7+", label: "Technologies Used" }
        ]
    },
    about: {
        paragraphs: [
            "I'm currently pursuing a <span class=\"font-semibold text-accent\">Bachelor of Science in Computer Science</span> at <span class=\"font-semibold text-accent\">Cavite State University – Imus Campus</span>, with an expected graduation in 2027.",
            "I enjoy building practical systems that solve real-world problems. My recent work includes DCS-SFMS, a full-stack web application for stakeholder feedback management built with Next.js 16, TypeScript, and Prisma ORM. I'm also experienced in backend development, GUI applications, and database systems.",
            "Outside of academics, I actively pursue certifications in cybersecurity, cloud, and programming to stay sharp and industry-ready for internship and entry-level opportunities."
        ],
        widgets: [
            {
                type: "degree",
                label: "Degree",
                value: "BS in Computer Science",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg>`
            },
            {
                type: "university",
                label: "University",
                value: "Cavite State University – Imus Campus (CvSU – Imus)",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>`
            },
            {
                type: "graduation",
                label: "Expected Graduation",
                value: "2027",
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>`
            },
            {
                type: "interests",
                label: "Career Interests",
                value: ["Software Development", "Web Development", "Database Management", "Cybersecurity"]
            }
        ]
    },
    skills: [
        {
            category: "Programming Languages",
            emoji: "💻",
            items: ["Java", "Python", "C++", "JavaScript", "TypeScript"]
        },
        {
            category: "Web Technologies",
            emoji: "🌐",
            items: ["HTML", "CSS", "PHP", "Next.js", "Node.js"]
        },
        {
            category: "Databases",
            emoji: "🗄️",
            items: ["MySQL", "SQLite", "JSON", "Prisma ORM"]
        },
        {
            category: "Frameworks & Libraries",
            emoji: "📦",
            items: ["Tkinter", "Java Swing", "Botpress", "Chart.js", "jsPDF"]
        },
        {
            category: "Tools & Platforms",
            emoji: "🔧",
            items: ["GitHub", "VS Code", "Cisco Packet Tracer", "XAMPP"]
        },
        {
            category: "Concepts",
            emoji: "🧠",
            items: ["OOP", "CRUD Operations", "Data Structures & Algorithms", "GUI Development", "Database Management", "Agile Development"]
        }
    ],
    projects: [
        {
            title: "DCS-SFMS",
            emoji: "🎓",
            subtitle: "Department of Computer Studies Stakeholder Feedback Management System",
            description: "A full-stack web application built for Cavite State University — Imus Campus, Department of Computer Studies. It digitizes the official HRDO-QF-07 paper feedback form and provides a complete suite of tools for managing stakeholder responses, generating reports, and controlling system access.",
            bullets: [
                "QR Code generation with auto LAN IP detection",
                "Mobile-responsive survey form",
                "Event & form management dashboard",
                "PDF/Excel summary & detailed reports",
                "User account management with role-based access",
                "Report approval workflow",
                "Audit activity log & archive system"
            ],
            tags: ["Next.js 16", "TypeScript", "Prisma ORM", "SQLite", "jsPDF", "Chart.js", "Node.js"],
            githubUrl: "https://github.com/CJGR00/DCS-SFMS",
            gradient: "from-amber-500 to-orange-500",
            iconBg: "from-amber-500 to-orange-600"
        },
        {
            title: "SmartQueue",
            emoji: "🧾",
            subtitle: "Web-Based Queue Management System with Integrated AI Chatbot",
            description: "A web-based queue management system designed for online reservations and real-time queue tracking with integrated AI chatbot assistance for students and staff.",
            bullets: [
                "Role-based dashboards",
                "Queue reservation system",
                "Real-time queue tracking",
                "AI chatbot integration",
                "Student assistance and FAQs"
            ],
            tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Botpress", "XAMPP"],
            githubUrl: "https://github.com/CJGR00/SmartQueue",
            gradient: "from-blue-500 to-indigo-500",
            iconBg: "from-blue-500 to-indigo-600"
        },
        {
            title: "RentaReady",
            emoji: "🚗",
            subtitle: "Vehicle Rental Management System",
            description: "A desktop-based vehicle rental management system with booking, customer, and vehicle management functionalities built on three-tier architecture principles.",
            bullets: [
                "CRUD operations",
                "Admin dashboard",
                "Booking management",
                "Database integration",
                "Three-tier architecture"
            ],
            tags: ["Java Swing", "MySQL", "JDBC"],
            githubUrl: "https://github.com/CJGR00/VehicleRentalSys",
            gradient: "from-emerald-500 to-teal-500",
            iconBg: "from-emerald-500 to-teal-600"
        },
        {
            title: "CRE4MY LATER",
            emoji: "🧁",
            subtitle: "Patisserie POS System",
            description: "A Point-of-Sale system with inventory management, automated receipt generation via email, and complete checkout functionalities for a patisserie business.",
            bullets: [
                "Shopping cart system",
                "Email invoice generation",
                "Inventory tracking",
                "Login authentication",
                "Checkout system"
            ],
            tags: ["Python", "Tkinter", "JSON", "smtplib"],
            githubUrl: "https://github.com/CJGR00/POS",
            gradient: "from-rose-500 to-pink-500",
            iconBg: "from-rose-500 to-pink-600"
        },
        {
            title: "TrustFactor",
            emoji: "🛡️",
            subtitle: "Multi-Factor Authentication Platform",
            description: "A secure authentication platform featuring bcrypt password hashing, session cookies, rate-limiting, and two secondary verification pathways: Google Authenticator TOTP and Nodemailer Email OTP.",
            bullets: [
                "Google Authenticator TOTP QR code setup",
                "Email OTP verification (Nodemailer integration)",
                "Bcrypt password hashing & cookie sessions",
                "Helmet & Rate Limiting security middleware",
                "User & Admin controls with SQLite storage"
            ],
            tags: ["Node.js", "Express", "SQLite", "TOTP", "Nodemailer", "Security"],
            githubUrl: "https://github.com/CJGR00/2FA",
            gradient: "from-cyan-500 to-blue-500",
            iconBg: "from-cyan-500 to-blue-600"
        }
    ],
    certifications: [
        {
            title: "Python Essentials 1",
            issuer: "Cisco NetAcad",
            file: "Certificates/Python_Essentials_1_certificate_remullachristian00-gmail-com_927dcbe7-dce9-4ae8-a3b4-17c87e9a9094.pdf"
        },
        {
            title: "Python Essentials 2",
            issuer: "Cisco NetAcad",
            file: "Certificates/Python_Essentials_2_certificate_remullachristian00-gmail-com_359e516f-af3a-401f-8400-823d14d96eeb.pdf"
        },
        {
            title: "HTML Essentials",
            issuer: "Cisco NetAcad",
            file: "Certificates/HTML_Essentials_certificate_remullachristian00-gmail-com_8d30f392-5284-4e7d-9c9a-85e66c1a72a3.pdf"
        },
        {
            title: "JavaScript Essentials 1",
            issuer: "Cisco NetAcad",
            file: "Certificates/JavaScript_Essentials_1_certificate_remullachristian00-gmail-com_60d55a87-080b-4b7c-81f0-17015d53694f.pdf"
        },
        {
            title: "C++ Essentials 1",
            issuer: "Cisco NetAcad",
            file: "Certificates/C--_Essentials_1_certificate_remullachristian00-gmail-com_da5ea753-ce43-43d2-8ab6-ca382487a9d1.pdf"
        },
        {
            title: "Introduction to Modern AI",
            issuer: "Cisco NetAcad",
            file: "Certificates/Introduction_to_Modern_AI_certificate_remullachristian00-gmail-com_09468efe-89bf-4ba1-add2-5f474499d7cb.pdf"
        },
        {
            title: "Introduction to IoT",
            issuer: "Cisco NetAcad",
            file: "Certificates/Introduction_to_IoT_certificate_remullachristian00-gmail-com_ddb72c2a-96fd-4cc8-a44b-d062ba4a4eb0.pdf"
        },
        {
            title: "Introduction to Data Science",
            issuer: "Cisco NetAcad",
            file: "Certificates/Introduction_to_Data_Science_certificate_remullachristian00-gmail-com_c224f8c1-c231-4bbc-8f95-6b52bdfef6e9.pdf"
        },
        {
            title: "Computer Hardware Basics",
            issuer: "Cisco NetAcad",
            file: "Certificates/Computer_Hardware_Basics_certificate_remullachristian00-gmail-com_e4e0546c-c915-44d1-b017-14e7266fe3bc.pdf"
        },
        {
            title: "Operating Systems Basics",
            issuer: "Cisco NetAcad",
            file: "Certificates/Operating_Systems_Basics_certificate_remullachristian00-gmail-com_c81f04ab-b6b0-4705-9425-b22f2d372c8d.pdf"
        },
        {
            title: "AI at Work: Analyze Customer Reviews",
            issuer: "Cisco NetAcad",
            file: "Certificates/AI_at_Work-_Analyze_Customer_Reviews_certificate_remullachristian00-gmail-com_6401e3f2-b040-4829-8d51-2763dea21279.pdf"
        },
        {
            title: "ISC2 CC Domain",
            issuer: "ISC2",
            file: "Certificates/ISC2 CC Domain.pdf"
        },
        {
            title: "AWS Academy Graduate - Generative AI Foundations",
            issuer: "AWS Academy",
            file: "Certificates/AWSAcademy12NEW20260519-31-8kw8ka.pdf"
        },
        {
            title: "Data Future PH 2025",
            issuer: "Data Analytics Philippines",
            file: "Certificates/Christian Jae Galang Remulla.pdf"
        },
        {
            title: "Semiconductor Readiness",
            issuer: "Cavite State University",
            file: "Certificates/COP_SEMICONDUCTOR MAY 9.pdf"
        }
    ]
};
