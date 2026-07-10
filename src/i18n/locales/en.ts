import type { TranslationTree } from './es';
import { mergeLocales } from '../mergeLocales';
import { extEn } from './ext-en';

const baseEn = {
  language: {
    title: 'Language',
    select: 'Select language',
  },
  home: {
    greeting: 'Hello, {{name}}',
    subtitleDefault: 'What do you need to look up today?',
    subtitleBranded: 'Protocols · {{sanatorio}}',
    recents: 'Recent',
    recentsEmpty: 'Your recent items will appear here.',
    favorites: 'Favorites',
    favoritesEmpty: 'Tap the star on a protocol, drug, or pathology to save it.',
    professional: 'Professional',
  },
  nav: {
    inicio: 'Home',
    calculos: 'Calculations',
    historial: 'History',
    ajustes: 'Settings',
  },
  drawer: {
    index: 'Home',
    cursos: 'Courses',
    congresos: 'Congress',
    patologias: 'Pathologies',
    patologiasEmphasis: 'PATHOLOGIES',
    contacto: 'Contact',
    foro: 'Forum',
    qrPrint: 'QR printing',
    openMenu: 'Open menu and settings',
    openMenuUnread: 'Open menu. {{count}} unread forum posts.',
    sanatoriumWatermark: 'Sanatorium watermark',
  },
  search: {
    placeholder: 'Search protocols, drugs, or pathologies…',
  },
  content: {
    pharmacology: 'Pharmacology',
    protocol: 'Protocol',
    pathology: 'Pathology',
    spanishOnlyNote:
      'Drug monographs remain in Spanish until their translation is complete.',
  },
  appearance: {
    modeLabel: '{{mode}} mode. Tap to change.',
  },
  drug: {
    screenTitle: 'Pharmacology',
    indication: 'Indication',
    preparation: 'PREPARATION (Select patient type)',
    stability: 'Stability',
    adverseEffects: 'Adverse Effects',
    bibliography: 'Bibliography',
    notFound: 'Drug not found.',
    noDataForPopulation: 'No data for this age group.',
    noPreparationData: 'No preparation data available.',
    population: {
      adulto: 'Adult',
      pediatrico: 'Pediatric',
      neonatal: 'Neonatal',
    },
    field: {
      presentation: 'Presentation',
      reconstitution: 'Reconstitution',
      diluent: 'Dilution',
      finalConcentration: 'Final concentration',
      dose: 'Dose',
      infusionRate: 'Infusion rate',
      administration: 'Administration',
      compatibility: 'Compatibility',
      notes: 'Notes',
    },
  },
  pathology: {
    screenTitle: 'Pathologies',
    relatedDrugs: 'Related drugs',
    bibliography: 'Bibliography',
    notFound: 'Pathology not found.',
  },
  protocol: {
    notFound: 'Protocol not found.',
    executiveSummary: 'Executive summary',
    fullProtocol: 'Full protocol',
    bibliography: 'Bibliography',
    subtitle: 'Protocol · {{category}}',
    listTitle: 'Protocols · {{category}}',
    category: {
      adulto: 'Adult',
      pediatrico: 'Pediatric',
      neonatologia: 'Neonatology',
    },
    categoryShort: {
      adulto: 'Adult',
      pediatrico: 'Pediatric',
      neonatologia: 'Neo',
      farmacologia: 'Pharma',
    },
    division: {
      intensiva: 'Neonatal ICU',
      'baja-complejidad': 'Low complexity',
    },
  },
} as const;

export const en: TranslationTree = mergeLocales(baseEn, extEn);
