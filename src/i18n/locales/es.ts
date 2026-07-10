import { extEs } from './ext-es';
import { mergeLocales } from '../mergeLocales';

const coreEs = {
  language: {
    title: 'Idioma',
    select: 'Seleccionar idioma',
  },
  home: {
    greeting: 'Hola, {{name}}',
    subtitleDefault: '¿Qué necesitás consultar hoy?',
    subtitleBranded: 'Protocolos · {{sanatorio}}',
    recents: 'Recientes',
    recentsEmpty: 'Tus últimas consultas aparecerán aquí.',
    favorites: 'Favoritos',
    favoritesEmpty: 'Tocá la estrella en un protocolo, fármaco o patología para guardarlo.',
    professional: 'Profesional',
  },
  nav: {
    inicio: 'Inicio',
    calculos: 'Cálculos',
    historial: 'Historial',
    ajustes: 'Ajustes',
  },
  drawer: {
    index: 'Inicio',
    cursos: 'Cursos',
    congresos: 'Congresos',
    patologias: 'Patologías',
    patologiasEmphasis: 'PATOLOGÍAS',
    contacto: 'Contacto',
    foro: 'Foro',
    qrPrint: 'Impresión de QR',
    openMenu: 'Abrir menú y configuración',
    openMenuUnread: 'Abrir menú. {{count}} publicaciones sin leer en el Foro.',
    sanatoriumWatermark: 'Marca de agua del sanatorio',
  },
  search: {
    placeholder: 'Buscar protocolos, fármacos o patologías…',
  },
  content: {
    pharmacology: 'Farmacología',
    protocol: 'Protocolo',
    pathology: 'Patología',
    spanishOnlyNote:
      'Todo el contenido clínico está disponible en español.',
  },
  appearance: {
    modeLabel: 'Modo {{mode}}. Tocá para cambiar.',
  },
  drug: {
    screenTitle: 'Farmacología',
    indication: 'Indicación',
    preparation: 'PREPARACIÓN (Seleccione paciente)',
    stability: 'Estabilidad',
    adverseEffects: 'Efectos Adversos',
    bibliography: 'Bibliografía',
    notFound: 'Fármaco no encontrado.',
    noDataForPopulation: 'Sin datos para este grupo etario.',
    noPreparationData: 'Sin datos de preparación.',
    population: {
      adulto: 'Adulto',
      pediatrico: 'Pediátrico',
      neonatal: 'Neonatal',
    },
    field: {
      presentation: 'Presentación',
      reconstitution: 'Reconstitución',
      diluent: 'Dilución',
      finalConcentration: 'Concentración final',
      dose: 'Dosis',
      infusionRate: 'Velocidad de infusión',
      administration: 'Administración',
      compatibility: 'Compatibilidad',
      notes: 'Observaciones',
    },
  },
  pathology: {
    screenTitle: 'Patologías',
    relatedDrugs: 'Fármacos relacionados',
    bibliography: 'Bibliografía',
    notFound: 'Patología no encontrada.',
  },
  protocol: {
    notFound: 'Protocolo no encontrado.',
    executiveSummary: 'Resumen ejecutivo',
    fullProtocol: 'Protocolo completo',
    bibliography: 'Bibliografía',
    subtitle: 'Protocolo · {{category}}',
    listTitle: 'Protocolos · {{category}}',
    category: {
      adulto: 'Adulto',
      pediatrico: 'Pediátrico',
      neonatologia: 'Neonatología',
    },
    categoryShort: {
      adulto: 'Adulto',
      pediatrico: 'Pediátrico',
      neonatologia: 'Neo',
      farmacologia: 'Farma',
    },
    division: {
      intensiva: 'UCI Neonatal',
      'baja-complejidad': 'Baja complejidad',
    },
  },
} as const;

export const es = mergeLocales(coreEs, extEs);

type DeepStringMap<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringMap<T[K]>;
};

export type TranslationTree = DeepStringMap<typeof es>;
