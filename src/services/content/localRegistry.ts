import adultoIndex from '../../../content/branches/atencion-sanitaria/categories/adulto/index.json';
import pediatricoIndex from '../../../content/branches/atencion-sanitaria/categories/pediatrico/index.json';
import neonatologiaIndex from '../../../content/branches/atencion-sanitaria/categories/neonatologia/index.json';
import cur001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/cur-001.json';
import hig001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/hig-001.json';
import med001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/med-001.json';
import nac001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/nac-001.json';
import nav001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/nav-001.json';
import oxi001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/oxi-001.json';
import pad001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/pad-001.json';
import sep001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/sep-001.json';
import sho001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/sho-001.json';
import son001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/son-001.json';
import vip001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/vip-001.json';
import vic001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/vic-001.json';
import dia001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/dia-001.json';
import dip001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/dip-001.json';
import dpp001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/dpp-001.json';
import hem001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/hem-001.json';
import ret001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/ret-001.json';
import pam001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/pam-001.json';
import sng001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/sng-001.json';
import uro001 from '../../../content/branches/atencion-sanitaria/categories/adulto/protocols/uro-001.json';
import feb001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/feb-001.json';
import sepP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/sep-p001.json';
import vipP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/vip-p001.json';
import sonP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/son-p001.json';
import vicP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/vic-p001.json';
import hemP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/hem-p001.json';
import retP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/ret-p001.json';
import pamP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/pam-p001.json';
import oxiP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/oxi-p001.json';
import broP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/bro-p001.json';
import dolP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/dol-p001.json';
import rehP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/reh-p001.json';
import medP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/med-p001.json';
import dipP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/dip-p001.json';
import dppP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/dpp-p001.json';
import sngP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/sng-p001.json';
import uroP001 from '../../../content/branches/atencion-sanitaria/categories/pediatrico/protocols/uro-p001.json';
import neoI001 from '../../../content/branches/atencion-sanitaria/categories/neonatologia/protocols/neo-i-001.json';
import neoI002 from '../../../content/branches/atencion-sanitaria/categories/neonatologia/protocols/neo-i-002.json';
import neoI003 from '../../../content/branches/atencion-sanitaria/categories/neonatologia/protocols/neo-i-003.json';
import neoI004 from '../../../content/branches/atencion-sanitaria/categories/neonatologia/protocols/neo-i-004.json';
import neoI005 from '../../../content/branches/atencion-sanitaria/categories/neonatologia/protocols/neo-i-005.json';
import neoI006 from '../../../content/branches/atencion-sanitaria/categories/neonatologia/protocols/neo-i-006.json';
import neoI007 from '../../../content/branches/atencion-sanitaria/categories/neonatologia/protocols/neo-i-007.json';
import neoI008 from '../../../content/branches/atencion-sanitaria/categories/neonatologia/protocols/neo-i-008.json';
import neoI009 from '../../../content/branches/atencion-sanitaria/categories/neonatologia/protocols/neo-i-009.json';
import neoB001 from '../../../content/branches/atencion-sanitaria/categories/neonatologia/protocols/neo-b-001.json';
import neoB002 from '../../../content/branches/atencion-sanitaria/categories/neonatologia/protocols/neo-b-002.json';
import neoB003 from '../../../content/branches/atencion-sanitaria/categories/neonatologia/protocols/neo-b-003.json';
import type { Protocol, ProtocolIndex } from '@/types/protocol';

/** Índices locales por categoría. Añadir una línea al crear una categoría nueva. */
export const LOCAL_CATEGORY_INDEXES: Record<string, ProtocolIndex> = {
  adulto: adultoIndex as ProtocolIndex,
  pediatrico: pediatricoIndex as ProtocolIndex,
  neonatologia: neonatologiaIndex as ProtocolIndex,
};

/**
 * Protocolos empaquetados para uso sin conexión.
 * Añadir una línea al incorporar un protocolo nuevo en el repositorio.
 */
export const LOCAL_PROTOCOLS: Record<string, Protocol> = {
  'sep-001': sep001 as Protocol,
  'sho-001': sho001 as Protocol,
  'nac-001': nac001 as Protocol,
  'nav-001': nav001 as Protocol,
  'oxi-001': oxi001 as Protocol,
  'pad-001': pad001 as Protocol,
  'hig-001': hig001 as Protocol,
  'cur-001': cur001 as Protocol,
  'med-001': med001 as Protocol,
  'son-001': son001 as Protocol,
  'vip-001': vip001 as Protocol,
  'vic-001': vic001 as Protocol,
  'dia-001': dia001 as Protocol,
  'dip-001': dip001 as Protocol,
  'dpp-001': dpp001 as Protocol,
  'hem-001': hem001 as Protocol,
  'ret-001': ret001 as Protocol,
  'pam-001': pam001 as Protocol,
  'sng-001': sng001 as Protocol,
  'uro-001': uro001 as Protocol,
  'feb-001': feb001 as Protocol,
  'sep-p001': sepP001 as Protocol,
  'vip-p001': vipP001 as Protocol,
  'son-p001': sonP001 as Protocol,
  'vic-p001': vicP001 as Protocol,
  'hem-p001': hemP001 as Protocol,
  'ret-p001': retP001 as Protocol,
  'pam-p001': pamP001 as Protocol,
  'oxi-p001': oxiP001 as Protocol,
  'bro-p001': broP001 as Protocol,
  'dol-p001': dolP001 as Protocol,
  'reh-p001': rehP001 as Protocol,
  'med-p001': medP001 as Protocol,
  'dip-p001': dipP001 as Protocol,
  'dpp-p001': dppP001 as Protocol,
  'sng-p001': sngP001 as Protocol,
  'uro-p001': uroP001 as Protocol,
  'neo-i-001': neoI001 as Protocol,
  'neo-i-002': neoI002 as Protocol,
  'neo-i-003': neoI003 as Protocol,
  'neo-i-004': neoI004 as Protocol,
  'neo-i-005': neoI005 as Protocol,
  'neo-i-006': neoI006 as Protocol,
  'neo-i-007': neoI007 as Protocol,
  'neo-i-008': neoI008 as Protocol,
  'neo-i-009': neoI009 as Protocol,
  'neo-b-001': neoB001 as Protocol,
  'neo-b-002': neoB002 as Protocol,
  'neo-b-003': neoB003 as Protocol,
};
