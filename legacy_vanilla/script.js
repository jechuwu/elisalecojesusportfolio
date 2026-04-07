
// --- Theme Toggle Logic ---
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}
// Load preference instantly
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// --- Background Paths Logic ---
function initBackgroundPaths() {
    const container = document.getElementById('background-paths-container');
    if (!container) return;

    function generatePaths(position) {
        let pathsHtml = '';
        for (let i = 0; i < 36; i++) {
            const d = `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`;
            const width = 0.5 + i * 0.03;
            const opacity = 0.05 + i * 0.02;
            const duration = 20 + Math.random() * 10;

            pathsHtml += `<path d="${d}" stroke="currentColor" stroke-width="${width}" stroke-opacity="${opacity}" 
                style="stroke-dasharray: 2000; stroke-dashoffset: 2000; animation: drawPath ${duration}s infinite linear alternate;" 
            ></path>`;
        }
        return `<div class="absolute inset-0 w-full h-full"><svg class="w-full h-full text-[#1b1c1b] dark:text-[#FF4F00] transition-colors duration-700" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">${pathsHtml}</svg></div>`;
    }

    container.innerHTML = generatePaths(1) + generatePaths(-1);
}
initBackgroundPaths();

// Typewriter Animation logic
const typewriterEffect = (element, newText, isHTML = false, duration = 800) => {
    if (!element) return;

    // Check if element has multiple children / structure rather than pure text.
    // The current setup assumes text only or simple HTML tags handled by innerHTML
    const targetText = isHTML ? newText : newText.replace(/<[^>]*>/g, '');
    const startTime = performance.now();
    const originalHTML = element.innerHTML;

    const cursor = document.createElement('span');
    cursor.className = 'inline-block w-[2px] h-[1.1em] bg-[#FF4F00] ml-1 align-middle animate-pulse';
    cursor.id = 'typewriter-cursor';

    element.innerHTML = '';
    element.appendChild(cursor);

    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const charCount = Math.floor(progress * targetText.length);
        const currentText = targetText.slice(0, charCount);

        if (isHTML) {
            element.innerHTML = newText.slice(0, Math.floor(progress * newText.length));
        } else {
            element.innerText = currentText;
        }

        element.appendChild(cursor);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (isHTML) {
                element.innerHTML = newText;
            } else {
                element.innerText = targetText;
            }
            cursor.remove();
        }
    };
    requestAnimationFrame(update);
};

const translations = {
    es: {
        projects: 'Proyectos',
        services: 'Capacidades',
        about: 'Sobre mi',
        contact: 'Contacto',
        heroDesc: 'Explora una visión donde la precisión técnica se encuentra con la estética emocional. Diseño industrial de alto impacto.',
        scroll: 'Desliza',
        enfoque: 'Enfoque',
        di_title: 'Diseño Industrial',
        experiencia: 'Experiencia',
        reconocimiento: 'Reconocimiento',
        base: 'Base',
        location: 'Berlín, Alemania',
        portfolioTitle: 'Portfolio',
        selectedWorks: 'Trabajos Seleccionados',
        archive: 'Archivo / 2024',
        capacidades: 'Capacidades',
        especialidad: 'Especialidad',
        ctaTitle: 'Construyamos <br/> el <span class="text-[#FF4F00] italic">futuro</span>.',
        startProject: 'Iniciar Proyecto',
        di_conceptual: 'DI Conceptual',
        di_desc: 'Visualizando la próxima generación de productos físicos con modelado de alta fidelidad.',
        cmf_title: 'CMF y Producción',
        cmf_desc: 'Definiendo materiales y acabados que elevan la identidad y el valor de marca.',
        digital_title: 'Integración Digital',
        digital_desc: 'Diseñando interfaces que viven dentro de objetos físicos para experiencias fluidas.',
        footer_copy: '© 2024 Jesus Elisaleco Portfolio.',
        ind_cat1: 'Ingeniería Óptica & CMF',
        ind_cat2: 'Relojería Contemporánea',
        ind_cat3: 'Ergonomía Acústica',
        ind_cat4: 'Sistemas de Iluminación',
        ind_cat5: 'Mobiliario de Autor',
        ind_cat6: 'Diseño Minimalista',
        list1: ['Desarrollo de Forma', 'Lenguajes de Diseño', 'Ergonomía'],
        list2: ['Innovación en Materiales', 'Enlace de Producción', 'Prototipado'],
        list3: ['IU Embebida', 'Retroalimentación Háptica', 'Ecosistemas'],

        // About Page Additions
        aboutTitle: 'Diseñador. Pensador.<br/>\n                    <span class="text-[#FF4F00] italic">Creador de soluciones.</span>',
        aboutDesc: 'Soy un diseñador industrial convencido de que la mejor tecnología es aquella que se siente humana. Combino ingeniería óptica, exploración háptica y diseño de sistemas complejos para crear experiencias tangibles, duraderas y hermosas. Con sede en Berlín y con una obsesión por el detalle absoluto.',

        // Project Lumix Additions
        caseStudy: 'Caso de Estudio',
        lumixHeroDesc: 'Redefiniendo el sistema visual profesional. Un riguroso viaje desde el diseño conceptual, optimización acústica, hasta la ingeniería de precisión.',
        client: 'Cliente',
        role: 'Rol',
        discipline: 'Disciplina',
        year: 'Año',
        roleDesc: 'Diseño Industrial Jefe',
        discDesc: 'CMF & Ingeniería Óptica',
        challengeTag: '1. El Desafío',
        challengeTitle: 'Equilibrar el peso, disipar el calor y mantener el lujo.',
        challengeP1: 'Las cámaras de formato medio actuales sufren de asimetría térmica y problemas severos de peso. Nuestro objetivo en "Lumix Pro X" era tomar el cuerpo hiper-confiable que todos los fotógrafos de cine aprecian y evolucionarlo para resistir sesiones continuas en rigurosos desiertos de 50°C.',
        challengeP2: 'No queríamos construir solo un marco de magnesio; queríamos una aleación termo-reactiva en la que la cámara respire sin partes móviles (que introducen ruidos y vulnerabilidades).',
        ideationTag: '2. Ideación',
        ideationTitle: 'Sketches y Primeros Prototipos',
        cmfTag: '3. Producción y CMF',
        cmfTitle: 'Aleaciones con alma. Texturas en negro mate.',
        cmfDesc: 'Definimos una paleta CMF de alto contraste que prioriza el agarre. La montura central está maquinada en titanio grado aéreo, y el cuerpo está cubierto de nuestro polímero de uretano exclusivo de poros abiertos. Esto previene un agarre resbaladizo, maximiza el amortiguamiento acústico para las partes internas y se siente increíble al tacto.',
        nextProject: 'Siguiente Proyecto'
    },
    en: {
        projects: 'Projects',
        services: 'Capabilities',
        about: 'About',
        contact: 'Contact',
        heroDesc: 'Explore a vision where technical precision meets emotional aesthetics. High-impact industrial design.',
        scroll: 'Scroll',
        enfoque: 'Focus',
        di_title: 'Industrial Design',
        experiencia: 'Experience',
        reconocimiento: 'Recognition',
        base: 'Base',
        location: 'Berlin, Germany',
        portfolioTitle: 'Works',
        selectedWorks: 'Selected Works',
        archive: 'Archive / 2024',
        capacidades: 'Capabilities',
        especialidad: 'Specialty',
        ctaTitle: 'Let\'s build <br/> the <span class="text-[#FF4F00] italic">future</span>.',
        startProject: 'Start Project',
        di_conceptual: 'Conceptual ID',
        di_desc: 'Visualizing the next generation of physical products with high-fidelity modeling.',
        cmf_title: 'CMF & Production',
        cmf_desc: 'Defining materials and finishes that elevate brand identity and value.',
        digital_title: 'Digital Integration',
        digital_desc: 'Designing interfaces that live within physical objects for seamless experiences.',
        footer_copy: '© 2024 Jesus Elisaleco Portfolio.',
        ind_cat1: 'Optical Engineering & CMF',
        ind_cat2: 'Contemporary Horology',
        ind_cat3: 'Acoustic Ergonomics',
        ind_cat4: 'Lighting Systems',
        ind_cat5: 'Signature Furniture',
        ind_cat6: 'Minimalist Design',
        list1: ['Form Development', 'Design Languages', 'Ergonomics'],
        list2: ['Material Innovation', 'Production Liaison', 'Prototyping'],
        list3: ['Embedded UI', 'Haptic Feedback', 'Ecosystems'],

        // About Page Additions
        aboutTitle: 'Designer. Thinker.<br/>\n                    <span class="text-[#FF4F00] italic">Problem solver.</span>',
        aboutDesc: 'I am an industrial designer convinced that the best technology is that which feels human. I combine optical engineering, haptic exploration, and complex system design to create tangible, enduring, and beautiful experiences. Based in Berlin, with an absolute obsession for detail.',

        // Project Lumix Additions
        caseStudy: 'Case Study',
        lumixHeroDesc: 'Redefining the professional visual system. A rigorous journey from conceptual design, acoustic optimization, to precision engineering.',
        client: 'Client',
        role: 'Role',
        discipline: 'Discipline',
        year: 'Year',
        roleDesc: 'Lead Industrial Design',
        discDesc: 'CMF & Optical Engineering',
        challengeTag: '1. The Challenge',
        challengeTitle: 'Balancing weight, dissipating heat, and maintaining luxury.',
        challengeP1: 'Current medium-format cameras suffer from thermal asymmetry and severe weight issues. Our goal with the "Lumix Pro X" was to take the hyper-reliable body that all cinema photographers cherish and evolve it to withstand continuous shoots in rigorous 50°C deserts.',
        challengeP2: 'We didn’t just want to build a magnesium frame; we wanted a thermo-reactive alloy where the camera breathes without moving parts (which introduce noise and vulnerabilities).',
        ideationTag: '2. Ideation',
        ideationTitle: 'Sketches and Early Prototypes',
        cmfTag: '3. Production and CMF',
        cmfTitle: 'Alloys with soul. Matte black textures.',
        cmfDesc: 'We defined a high-contrast CMF palette that prioritizes grip. The central mount is machined from aerospace-grade titanium, and the body is covered in our exclusive open-pore urethane polymer. This prevents slippery grips, maximizes acoustic dampening for internal parts, and feels incredible to the touch.',
        nextProject: 'Next Project'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Add entering animation
    document.body.classList.add('page-enter');
    document.body.addEventListener('animationend', (e) => {
        if (e.animationName === 'pageSlideIn') {
            document.body.classList.remove('page-enter');
            document.body.style.transform = 'none';
        }
    });

    // Gallery Card Interaction
    const galleryCards = document.querySelectorAll('.gallery-card');
    galleryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            galleryCards.forEach(c => {
                c.classList.remove('active');
                c.style.flex = "1";
            });
            card.classList.add('active');
            card.style.flex = "5";
        });
    });

    // Intercept local links for exit animation
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            // Check if it's an internal link but not a hash link to the same page
            if (href && !href.startsWith('#') && !href.startsWith('mailto:')) {
                e.preventDefault();
                document.body.classList.remove('page-enter');
                document.body.classList.add('page-exit');
                setTimeout(() => {
                    window.location.href = href;
                }, 350);
            }
        });
    });

    const langBtn = document.getElementById('language-toggle');
    let currentLang = 'es';

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        const t = translations[currentLang];

        document.querySelectorAll('.nav-link').forEach(link => {
            const key = link.getAttribute('data-key');
            if (t[key]) typewriterEffect(link, t[key]);
        });

        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (t[key] && !el.classList.contains('nav-link') && !el.classList.contains('list-item')) {
                // Determine if this element requires HTML injection
                const htmlKeys = ['ctaTitle', 'aboutTitle'];
                const isHTML = htmlKeys.includes(key);
                typewriterEffect(el, t[key], isHTML);
            }
        });

        document.querySelectorAll('.list-item').forEach(li => {
            const group = li.getAttribute('data-group');
            const index = parseInt(li.getAttribute('data-index'));
            if (t[group] && t[group][index]) {
                typewriterEffect(li, t[group][index]);
            }
        });
    });

    const themeBtn = document.getElementById('dark-mode-toggle');
    const themePath = document.getElementById('theme-path');
    const themeSvg = document.getElementById('theme-svg');
    const html = document.documentElement;

    themeBtn.addEventListener('click', () => {
        const isDark = html.classList.toggle('dark');
        themeSvg.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themePath.setAttribute('d', isDark ? 'M12 3a9 9 0 100 18V3z' : 'M12 3a9 9 0 110 18V3z');
            themeSvg.style.transform = 'rotate(0deg)';
        }, 150);
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-[#FF4F00]', 'opacity-100');
            link.classList.add('text-[#1b1c1b]', 'opacity-60');

            const href = link.getAttribute('href');
            if (href && href.split('#')[1] === current) {
                link.classList.add('text-[#FF4F00]', 'opacity-100');
                link.classList.remove('text-[#1b1c1b]', 'opacity-60');
            }
        });
    });

    const heroSection = document.getElementById('hero');
    const cursorGlow = document.getElementById('cursor-glow');
    if (heroSection && cursorGlow) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cursorGlow.style.left = `${x}px`;
            cursorGlow.style.top = `${y}px`;
        });
    }

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach(card => {
        card.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-1000');
        revealObserver.observe(card);
    });
});
