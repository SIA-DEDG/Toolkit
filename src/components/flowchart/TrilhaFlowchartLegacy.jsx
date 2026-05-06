import { SectionBadge } from '../SectionBadge'
import { InstrumentCardLegacy } from './InstrumentCardLegacy'
import { DecisionBoxLegacy } from './DecisionBoxLegacy'
import { StepCircle } from './StepCircle'

const BRAND_BLUE = '#0e59a8'
const BRAND_BG   = '#E3EFFF'

const SNAKE_PATH = `
  M 1051 0
  L 1051 255
  A 50 50 0 0 1 1001 305
  L 430 305
  A 50 50 0 0 0 380 355
  L 380 490
  A 50 50 0 0 0 430 540
  L 770 540
  A 50 50 0 0 1 820 590
  L 820 920
`

export function TrilhaFlowchartLegacy({ onInstrumentClick, headerAction }) {
  return (
    <div className="relative overflow-visible" style={{ width: 1440, height: 820 }}>

      {headerAction && (
        <div className="absolute z-[2]" style={{ right: 20, top: 20 }}>
          {headerAction}
        </div>
      )}

      <div className="absolute flex flex-col gap-2 z-[2]" style={{ left: 43, top: 20 }}>
        <SectionBadge>Trilha de Instrumentos</SectionBadge>
        <h2 className="font-semibold text-2xl text-ink-mid m-0 leading-snug">
          Trilha de Instrumentos
        </h2>
        <p className="font-normal text-sm text-ink-mid m-0">
          Descrição da etapa de identificação
        </p>
      </div>

      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0"
        viewBox="0 0 1440 766"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={SNAKE_PATH} stroke={BRAND_BLUE} strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" />
        <path d={SNAKE_PATH} stroke={BRAND_BG}   strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="absolute z-[1]" style={{ left: 710, top: 74 }}>
        <InstrumentCardLegacy accentColor="#08ba9c" iconBg="rgba(8,186,156,0.2)" icon="🤝" title="Acordo" description="Instrumento jurídico que  formaliza uma parceria entre instituições públicas  e entidades privadas, ICTs sem Transferência de Recursos" onClick={() => onInstrumentClick('acordo-pd&i')} />
      </div>

      <div className="absolute z-[1] flex flex-col items-center" style={{ left: 918, top: 100 }}>
        <span className="relative top-[20px] text-xs text-brand ml-12 mb-0.5">Não</span>
        <StepCircle number="1" color="#08ba9c" line="right" />
      </div>

      <div className="absolute z-[1]" style={{ left: 999, top: 94 }}>
        <DecisionBoxLegacy width={110} height={86} text="Haverá repasse de recursos públicos?" bg={BRAND_BG} />
      </div>

      <div className="absolute z-[1] flex flex-col items-center" style={{ left: 1109, top: 100 }}>
        <span className="relative top-[20px] text-xs text-brand mr-12 mb-0.5">Sim</span>
        <StepCircle number="2" color="#209828" line="left" />
      </div>

      <div className="absolute z-[1]" style={{ left: 1199, top: 74 }}>
        <InstrumentCardLegacy accentColor="#209828" iconBg="rgba(32,152,40,0.2)" icon="📋" title="Convênio" description="Instrumento jurídico que formaliza uma parceria entre instituições públicas  e entidades privadas, ICTs com Transferência de Recursos" onClick={() => onInstrumentClick('convenio-pd&i')} />
      </div>

      <div className="absolute z-[1]" style={{ left: 795, top: 346 }}>
        <StepCircle number="3" color={BRAND_BLUE} line="up" />
      </div>

      <div className="absolute z-[1]" style={{ left: 858, top: 386 }}>
        <InstrumentCardLegacy accentColor={BRAND_BLUE} iconBg="rgba(14,89,168,0.2)" icon="💻" title="Encomenda Tecnológica" description="Compra de um esforço de desenvolvimento de solução que ainda não existe no mercado e envolve alto risco tecnológico" onClick={() => onInstrumentClick('encomenda-tecnologica')} />
      </div>

      <div className="absolute z-[1]" style={{ left: 758, top: 288 }}>
        <DecisionBoxLegacy width={120} height={76} text="Existe Risco Tecnológico?" bg={BRAND_BG} />
      </div>

      <div className="absolute z-[1]" style={{ left: 244, top: 307 }}>
        <StepCircle number="4" color="#dbaf00" line="right" />
      </div>

      <div className="absolute z-[1]" style={{ left: 314, top: 285 }}>
        <DecisionBoxLegacy width={140} height={86} text="Há possibilidade de contratação Direta?" bg={BRAND_BG} />
      </div>

      <div className="absolute z-[1]" style={{ left: 29, top: 290 }}>
        <InstrumentCardLegacy accentColor="#dbaf00" iconBg="rgba(219,175,0,0.2)" icon="📇" title="Contratação Direta" description="Aquisição de bens ou serviços pela administração pública com dispensa de licitação, quando a competição é inviável ou não é obrigatória, sendo uma exceção à regra geral de licitação" onClick={() => onInstrumentClick('contratacao-direta')} />
      </div>

      <div className="absolute z-[1]" style={{ left: 548, top: 536 }}>
        <DecisionBoxLegacy width={125} height={95} text="O objeto da parceria envolve a transferência de tecnologia não patenteada?" bg={BRAND_BG} />
      </div>

      <div className="absolute z-[1]" style={{ left: 578, top: 630 }}>
        <StepCircle number="5" color="#6a0ea8" line="up" />
      </div>

      <div className="absolute z-[1]" style={{ left: 366, top: 650 }}>
        <InstrumentCardLegacy accentColor="#6a0ea8" iconBg="rgba(106,14,168,0.2)" icon="🔄" title="Transferência Tecnológica não patenteada" description="Formaliza a aquisição de conhecimentos técnicos, fórmulas ou processos secretos com valor de mercado, mas não protegidos por patente" width={204} onClick={() => onInstrumentClick('contrato-transferencia-tecnologia')} />
      </div>

      <div className="absolute z-[1]" style={{ left: 710, top: 640 }}>
        <DecisionBoxLegacy width={180} height={76} text="Envolve inovação aberta (pitch/hackathon)?" bg={BRAND_BG} />
      </div>

      <div className="absolute z-[1]" style={{ left: 890, top: 650 }}>
        <StepCircle number="6" color="rgb(0,162,127)" line="left" />
      </div>

      <div className="absolute z-[1]" style={{ left: 900, top: 710 }}>
        <InstrumentCardLegacy accentColor="rgb(0,162,127)" iconBg="rgba(0,162,127,0.2)" icon="💡" title="Pitches e Hackatons" description="Metodologia exploratória para identificar soluções inovadoras por meio de competições abertas, com possibilidade de contratação futura (CPSI – Lei 14.133/21, art. 75, IV)" onClick={() => onInstrumentClick('pitch-hackton')} />
      </div>

    </div>
  )
}
