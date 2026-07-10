import type { TranslationTree } from './es';
import { mergeLocales } from '../mergeLocales';
import { extPtBR } from './ext-pt-BR';

const basePtBR = {
  language: {
    title: 'Idioma',
    select: 'Selecionar idioma',
  },
  home: {
    greeting: 'Olá, {{name}}',
    subtitleDefault: 'O que você precisa consultar hoje?',
    subtitleBranded: 'Protocolos · {{sanatorio}}',
    recents: 'Recentes',
    recentsEmpty: 'Suas últimas consultas aparecerão aqui.',
    favorites: 'Favoritos',
    favoritesEmpty: 'Toque na estrela em um protocolo, fármaco ou patologia para salvar.',
    professional: 'Profissional',
  },
  nav: {
    inicio: 'Início',
    calculos: 'Cálculos',
    historial: 'Histórico',
    ajustes: 'Config.',
  },
  drawer: {
    index: 'Início',
    cursos: 'Cursos',
    congresos: 'Congressos',
    patologias: 'Patologias',
    patologiasEmphasis: 'PATOLOGIAS',
    contacto: 'Contato',
    foro: 'Fórum',
    qrPrint: 'Impressão de QR',
    openMenu: 'Abrir menu e configurações',
    openMenuUnread: 'Abrir menu. {{count}} publicações não lidas no Fórum.',
    sanatoriumWatermark: 'Marca d’água do sanatório',
  },
  search: {
    placeholder: 'Buscar protocolos, fármacos ou patologias…',
  },
  content: {
    pharmacology: 'Farmacologia',
    protocol: 'Protocolo',
    pathology: 'Patologia',
    spanishOnlyNote:
      'Este conteúdo ainda não está disponível em português e será exibido em espanhol.',
  },
  appearance: {
    modeLabel: 'Modo {{mode}}. Toque para alterar.',
  },
  drug: {
    screenTitle: 'Farmacologia',
    indication: 'Indicação',
    preparation: 'PREPARO (Selecione o paciente)',
    stability: 'Estabilidade',
    adverseEffects: 'Efeitos Adversos',
    bibliography: 'Bibliografia',
    notFound: 'Fármaco não encontrado.',
    noDataForPopulation: 'Sem dados para este grupo etário.',
    noPreparationData: 'Sem dados de preparo.',
    population: {
      adulto: 'Adulto',
      pediatrico: 'Pediátrico',
      neonatal: 'Neonatal',
    },
    field: {
      presentation: 'Apresentação',
      reconstitution: 'Reconstituição',
      diluent: 'Diluição',
      finalConcentration: 'Concentração final',
      dose: 'Dose',
      infusionRate: 'Velocidade de infusão',
      administration: 'Administração',
      compatibility: 'Compatibilidade',
      notes: 'Observações',
    },
  },
  pathology: {
    screenTitle: 'Patologias',
    relatedDrugs: 'Fármacos relacionados',
    bibliography: 'Bibliografia',
    notFound: 'Patologia não encontrada.',
  },
  protocol: {
    notFound: 'Protocolo não encontrado.',
    executiveSummary: 'Resumo executivo',
    fullProtocol: 'Protocolo completo',
    bibliography: 'Bibliografia',
    subtitle: 'Protocolo · {{category}}',
    listTitle: 'Protocolos · {{category}}',
    category: {
      adulto: 'Adulto',
      pediatrico: 'Pediátrico',
      neonatologia: 'Neonatologia',
    },
    categoryShort: {
      adulto: 'Adulto',
      pediatrico: 'Pediátrico',
      neonatologia: 'Neonato',
      farmacologia: 'Farmac.',
    },
    division: {
      intensiva: 'UTI Neonatal',
      'baja-complejidad': 'Baixa complexidade',
    },
  },
} as const;

export const ptBR: TranslationTree = mergeLocales(basePtBR, extPtBR);
