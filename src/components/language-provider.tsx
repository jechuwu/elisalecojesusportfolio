"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Language = 'es' | 'en';
type TranslationDict = Record<string, string | string[]>;

export const translations: Record<Language, TranslationDict> = {
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
    aboutTitle: 'Diseñador. Pensador.<br/><span class="text-[#FF4F00] italic">Creador de soluciones.</span>',
    aboutDesc: 'Soy un diseñador industrial convencido de que la mejor tecnología es aquella que se siente humana. Combino ingeniería óptica, exploración háptica y diseño de sistemas complejos para crear experiencias tangibles, duraderas y hermosas. Con sede en Berlín y con una obsesión por el detalle absoluto.',
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
    puriformHeroDesc: 'Un purificador de agua diseñado para elevar la experiencia diaria en el hogar.',
    puriformChallenge1Tag: '1. El Desafío',
    puriformChallenge1Title: 'Diseñar para la industria nacional, repensar los procesos de manufactura.',
    puriformChallenge1P1: 'El desarrollo del purificador de agua hogareño PuriForm exigió equilibrar la viabilidad en la Industria Argentina con un diseño de alta precisión. Para lograr competitividad frente a productos con menos restricciones de manufactura, el equipo se hizo a partir de procesos de conformado directo.',
    puriformChallenge1P2: 'Se implementó un chasis metálico interno resuelto mediante mecanizado y chapa plegada, que garantiza la rigidez del equipo. Para la interfaz y los cerramientos, optamos por el termoformado frontal, de tapa y fijo, logrando un producto final que responde a las limitantes locales de fabricación manteniendo una Percepción de Alta gama y una configuración escalable.',
    puriformIdeationTag: '2. Ideación',
    puriformIdeationTitle: 'Bocetos y conceptualización',
    puriformIdeationDesc: '',
    puriformCMFTag: '4. Producción y CMF',
    puriformCMFTitle: 'Ingeniería de Materiales y Producción',
    puriformCMFDesc: '',
    puriformDevTag: '5. Desarrollo de Producto',
    puriformDevTitle: 'Ingeniería de Materiales y Producción',
    puriformDevDesc: '',
    puriformAssemblyStep1: 'Anclaje de la electrónica en el termoformado Frontal',
    puriformAssemblyStep2: 'Ensamblaje del depósito y la bomba en el chasis',
    puriformAssemblyStep3: 'Se agregan los filtros con sus codos y conexiones',
    puriformAssemblyStep4: 'Se fija el termoformado Frontal con el conjunto previamente armado',
    puriformAssemblyStep5: 'Se instala el "Jack" al termoformado y se fija toda la pieza al chasis',
    puriformAssemblyStep6: 'Se revisan las conexiones, tanto de agua como eléctricas',
    puriformAssemblyStep7: 'Se fuerza levemente la chapa "Carcasa" para abrazar todo el chasis, luego se fija con tornillos por abajo',
    puriformAssemblyStep8: 'Se ensambla el posavasos con sus respectivas patas y 2 imanes para poder unirse al chasis',
    puriformAssemblyStep9: 'Se termina el ensamble colocando El termoformado "Tapa" mediante sus encastres. Se coloca la tapa del deposito y el posavasos',
    puriformAssemblyStep10: 'Ensamble terminado producto final',
    puriformProcessCorteLaser: 'Corte láser',
    puriformProcessPlegado: 'Plegado de chapa',
    puriformProcessTermoformado: 'Termoformado',
    puriformProcessSoldadura: 'Soldadura',
    puriformProcessPegado: 'Pegado',
    puriformProcessMecanizado: 'Mecanizado',
    puriformProcessEmbutido: 'Embutido',
    puriformCompChapaCarcasa: 'Chapa Carcasa',
    puriformCompTermoFrontal: 'Termoformado Frontal',
    puriformCompTermoTapaFijo: 'Termoformado "Tapa" y "Fijo"',
    puriformCompChasis: 'Chasis',
    puriformCompApoyavasos: 'Apoyavasos',

    allProjects: 'Galería',
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
    aboutTitle: 'Designer. Thinker.<br/><span class="text-[#FF4F00] italic">Problem solver.</span>',
    aboutDesc: 'I am an industrial designer convinced that the best technology is that which feels human. I combine optical engineering, haptic exploration, and complex system design to create tangible, enduring, and beautiful experiences. Based in Berlin, with an absolute obsession for detail.',
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
    challengeP2: 'We didn\'t just want to build a magnesium frame; we wanted a thermo-reactive alloy where the camera breathes without moving parts (which introduce noise and vulnerabilities).',
    ideationTag: '2. Ideation',
    ideationTitle: 'Sketches and Early Prototypes',
    cmfTag: '3. Production and CMF',
    cmfTitle: 'Alloys with soul. Matte black textures.',
    cmfDesc: 'We defined a high-contrast CMF palette that prioritizes grip. The central mount is machined from aerospace-grade titanium, and the body is covered in our exclusive open-pore urethane polymer. This prevents slippery grips, maximizes acoustic dampening for internal parts, and feels incredible to the touch.',
    puriformHeroDesc: 'A water purifier designed to elevate the daily home experience.',
    puriformChallenge1Tag: '1. The Challenge',
    puriformChallenge1Title: 'Designing for the national industry, rethinking manufacturing processes.',
    puriformChallenge1P1: 'The development of the PuriForm domestic water purifier required balancing viability within the Argentine Industry with a high-precision design. To achieve competitiveness against products with fewer manufacturing restrictions, the unit was built using direct forming processes.',
    puriformChallenge1P2: 'An internal metal chassis was implemented, resolved through machining and bent sheet metal, ensuring the unit\'s rigidity. For the interface and enclosures, we opted for front thermoforming, lid, and fixed parts, achieving a final product that responds to local manufacturing constraints while maintaining a High-end Perception and a scalable configuration.',
    puriformIdeationTag: '2. Ideation',
    puriformIdeationTitle: 'Sketches and conceptualization',
    puriformIdeationDesc: '',
    puriformCMFTag: '4. Production & CMF',
    puriformCMFTitle: 'Materials Engineering and Production',
    puriformCMFDesc: '',
    puriformDevTag: '5. Product Development',
    puriformDevTitle: 'Materials Engineering and Production',
    puriformDevDesc: '',
    puriformAssemblyStep1: 'Anchoring the electronics in the Front thermoform',
    puriformAssemblyStep2: 'Assembly of the tank and pump in the chassis',
    puriformAssemblyStep3: 'Filters are added with their elbows and connections',
    puriformAssemblyStep4: 'The Front thermoform is fixed with the previously assembled set',
    puriformAssemblyStep5: 'The "Jack" is installed on the thermoform and the entire piece is fixed to the chassis',
    puriformAssemblyStep6: 'Connections are checked, both water and electrical',
    puriformAssemblyStep7: 'The "Shell" sheet is gently forced to embrace the entire chassis, then fixed with screws from below',
    puriformAssemblyStep8: 'The cup holder is assembled with its respective legs and 2 magnets to attach to the chassis',
    puriformAssemblyStep9: 'Assembly is completed by placing the "Lid" thermoform through its snap fits. The tank lid and cup holder are placed',
    puriformAssemblyStep10: 'Assembly completed — final product',
    puriformProcessCorteLaser: 'Laser cut',
    puriformProcessPlegado: 'Sheet bending',
    puriformProcessTermoformado: 'Thermoforming',
    puriformProcessSoldadura: 'Welding',
    puriformProcessPegado: 'Bonding',
    puriformProcessMecanizado: 'Machining',
    puriformProcessEmbutido: 'Deep drawing',
    puriformCompChapaCarcasa: 'Shell Sheet',
    puriformCompTermoFrontal: 'Front Thermoform',
    puriformCompTermoTapaFijo: '"Lid" and "Fixed" Thermoform',
    puriformCompChasis: 'Chassis',
    puriformCompApoyavasos: 'Cup Holder',

    allProjects: 'Gallery',
    nextProject: 'Next Project'
  }
};

interface LanguageContextType {
    lang: Language;
    t: (key: string) => string;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Language>('es');

    useEffect(() => {
        const saved = localStorage.getItem('lang') as Language;
        if (saved === 'es' || saved === 'en') {
            setLang(saved);
        }
    }, []);

    const toggleLanguage = useCallback(() => {
        setLang(prev => {
            const next = prev === 'es' ? 'en' : 'es';
            localStorage.setItem('lang', next);
            return next;
        });
    }, []);

    const t = useCallback((key: string): string => {
        const val = translations[lang]?.[key];
        if (Array.isArray(val)) return val.join(', ');
        return typeof val === 'string' && val.length > 0 ? val : key;
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
}
