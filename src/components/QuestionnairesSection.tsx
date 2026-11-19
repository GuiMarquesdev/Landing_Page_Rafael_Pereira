import React, { useState } from 'react';
import {
  ClipboardList,
  CalendarCheck,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
} from 'lucide-react';
import { NUTRITIONIST_CONTACT, buildWhatsAppUrl, openWhatsAppWithMessage } from '../contact';
import { BirthDatePicker } from './ui/BirthDatePicker';

type ActiveTab = 'pre-atendimento' | 'acompanhamento';

interface PreAtendimentoData {
  // Etapa 1: Informações pessoais & Dados antropométricos
  nomeCompleto: string;
  dataNascimento: string;
  idade: string;
  telefone: string;
  email: string;
  cidadeProfissaoRotina: string;
  pesoAtual: string;
  altura: string;
  historicoPeso: string;
  examesRecentes: string;

  // Etapa 2: Objetivos, Histórico de saúde & Suplementação
  objetivos: string[];
  metaEspecificaExperiencia: string;
  condicoesSaude: string[];
  medicamentosCirurgiasFamilia: string;
  cicloGestacaoMenopausa: string;
  suplementos: string;

  // Etapa 3: Atividade física & Rotina e estilo de vida
  atividadesFisicas: string[];
  rotinaTreinamento: string;
  diaHabitual: string;
  sonoEstresse: string;
  alcoolFumoHabitos: string;

  // Etapa 4: Hábitos alimentares & Hidratação e intestino
  qtdRefeicoesHorarios: string;
  alimentacaoHabitual: string;
  ondeComePreparoDelivery: string;
  preferenciasRestricoes: string;
  consumoFrutasDocesUltraprocessados: string;
  ansiedadeCompulsaoSaciedade: string;
  aguaDiaria: string;
  funcionamentoIntestinal: string;

  // Etapa 5: Condições práticas & Histórico nutricional
  estruturaCozinharMarmitas: string;
  limitacoesAcessoFinanceiro: string;
  maioresDificuldades: string;
  acompanhamentoDietasAnteriores: string;
  medicamentosRestritivasJejuns: string;
}

interface WeeklyData {
  nomePaciente: string;
  adesaoSemana: string;
  maiorDificuldadeAjustes: string;
  oqueFuncionouEvolucao: string;
}

const OBJETIVOS_OPTIONS = [
  'Emagrecimento',
  'Ganho de massa muscular',
  'Recomposição corporal',
  'Melhora do desempenho esportivo',
  'Saúde e qualidade de vida',
  'Organização alimentar',
  'Outro',
];

const CONDICOES_OPTIONS = [
  'Diabetes ou resistência à insulina',
  'Hipertensão',
  'Alterações de colesterol ou triglicerídeos',
  'Alterações da tireoide',
  'SOP',
  'Doenças gastrointestinais',
  'Outras condições',
  'Nenhuma',
];

const ATIVIDADES_OPTIONS = [
  'Musculação',
  'Corrida ou caminhada',
  'Ciclismo',
  'Natação',
  'CrossFit ou funcional',
  'Esportes coletivos ou lutas',
  'Pilates',
  'Não pratico',
  'Outra',
];

const AGUA_OPTIONS = [
  'Menos de 1 litro',
  '1 a 1,5 litro',
  '1,5 a 2 litros',
  '2 a 3 litros',
  'Mais de 3 litros',
];

const ADESAO_SEMANAL_OPTIONS = [
  'Consegui seguir bem',
  'Segui parcialmente',
  'Tive bastante dificuldade',
  'Não consegui seguir',
];

const STEPS = [
  { id: 1, label: 'Pessoal e Medidas' },
  { id: 2, label: 'Objetivos e Saúde' },
  { id: 3, label: 'Treino e Rotina' },
  { id: 4, label: 'Alimentação e Água' },
  { id: 5, label: 'Prática e Histórico' },
];

const initialPreData: PreAtendimentoData = {
  nomeCompleto: '',
  dataNascimento: '',
  idade: '',
  telefone: '',
  email: '',
  cidadeProfissaoRotina: '',
  pesoAtual: '',
  altura: '',
  historicoPeso: '',
  examesRecentes: '',
  objetivos: [],
  metaEspecificaExperiencia: '',
  condicoesSaude: [],
  medicamentosCirurgiasFamilia: '',
  cicloGestacaoMenopausa: '',
  suplementos: '',
  atividadesFisicas: [],
  rotinaTreinamento: '',
  diaHabitual: '',
  sonoEstresse: '',
  alcoolFumoHabitos: '',
  qtdRefeicoesHorarios: '',
  alimentacaoHabitual: '',
  ondeComePreparoDelivery: '',
  preferenciasRestricoes: '',
  consumoFrutasDocesUltraprocessados: '',
  ansiedadeCompulsaoSaciedade: '',
  aguaDiaria: '',
  funcionamentoIntestinal: '',
  estruturaCozinharMarmitas: '',
  limitacoesAcessoFinanceiro: '',
  maioresDificuldades: '',
  acompanhamentoDietasAnteriores: '',
  medicamentosRestritivasJejuns: '',
};

const initialWeeklyData: WeeklyData = {
  nomePaciente: '',
  adesaoSemana: '',
  maiorDificuldadeAjustes: '',
  oqueFuncionouEvolucao: '',
};

export const QuestionnairesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('pre-atendimento');
  const [step, setStep] = useState<number>(1);
  const [preData, setPreData] = useState<PreAtendimentoData>(initialPreData);
  const [weeklyData, setWeeklyData] = useState<WeeklyData>(initialWeeklyData);
  const [preSubmitted, setPreSubmitted] = useState(false);
  const [weeklySubmitted, setWeeklySubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleMultiOption = (
    field: 'objetivos' | 'condicoesSaude' | 'atividadesFisicas',
    option: string
  ) => {
    setPreData((prev) => {
      const current = prev[field];
      const exists = current.includes(option);
      let updated: string[];
      if (exists) {
        updated = current.filter((item) => item !== option);
      } else {
        // Se marcar "Nenhuma" ou "Não pratico", limpa outras; caso contrário, remove a opção exclusiva
        if (option === 'Nenhuma' || option === 'Não pratico') {
          updated = [option];
        } else {
          updated = current.filter((item) => item !== 'Nenhuma' && item !== 'Não pratico').concat(option);
        }
      }
      return { ...prev, [field]: updated };
    });
  };

  const handleNextStep = () => {
    setErrorMsg('');
    if (step === 1 && (!preData.nomeCompleto.trim() || !preData.telefone.trim())) {
      setErrorMsg('Por favor, informe pelo menos seu nome completo e telefone/WhatsApp para continuar.');
      return;
    }
    setStep((s) => Math.min(5, s + 1));
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setStep((s) => Math.max(1, s - 1));
  };

  const handlePreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!preData.nomeCompleto.trim() || !preData.telefone.trim()) {
      setErrorMsg('Preencha seu nome completo e WhatsApp na Etapa 1 antes de enviar.');
      return;
    }
    openWhatsAppWithMessage(formatPreSummary());
    setPreSubmitted(true);
  };

  const handleWeeklySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!weeklyData.nomePaciente.trim() || !weeklyData.adesaoSemana) {
      setErrorMsg('Informe seu nome e selecione como foi sua semana em relação ao planejamento.');
      return;
    }
    openWhatsAppWithMessage(formatWeeklySummary());
    setWeeklySubmitted(true);
  };

  const formatPreSummary = () => {
    return [
      '*QUESTIONÁRIO DE PRÉ-ATENDIMENTO NUTRICIONAL — RAFAEL PEREIRA*',
      '',
      '*1. Informações Pessoais & Antropometria*',
      `- Nome: ${preData.nomeCompleto || '-'}`,
      `- Data de nascimento: ${preData.dataNascimento || '-'} | Idade: ${preData.idade || '-'}`,
      `- WhatsApp: ${preData.telefone || '-'} | E-mail: ${preData.email || '-'}`,
      `- Cidade, profissão e rotina: ${preData.cidadeProfissaoRotina || '-'}`,
      `- Peso atual: ${preData.pesoAtual || '-'} kg | Altura: ${preData.altura || '-'} cm`,
      `- Maior/menor peso e alterações recentes: ${preData.historicoPeso || '-'}`,
      `- Avaliações físicas/exames recentes: ${preData.examesRecentes || '-'}`,
      '',
      '*2. Objetivos, Saúde & Suplementação*',
      `- Objetivos: ${preData.objetivos.length ? preData.objetivos.join(', ') : '-'}`,
      `- Meta específica e experiências anteriores: ${preData.metaEspecificaExperiencia || '-'}`,
      `- Condições diagnosticadas/alergias: ${preData.condicoesSaude.length ? preData.condicoesSaude.join(', ') : '-'}`,
      `- Medicamentos, cirurgias e histórico familiar: ${preData.medicamentosCirurgiasFamilia || '-'}`,
      `- Ciclo menstrual/anticoncepcional/gestação (se aplicável): ${preData.cicloGestacaoMenopausa || '-'}`,
      `- Suplementos (doses e horários): ${preData.suplementos || '-'}`,
      '',
      '*3. Atividade Física & Rotina*',
      `- Atividades físicas: ${preData.atividadesFisicas.length ? preData.atividadesFisicas.join(', ') : '-'}`,
      `- Rotina de treinamento e limitações: ${preData.rotinaTreinamento || '-'}`,
      `- Dia habitual (horários e disponibilidade): ${preData.diaHabitual || '-'}`,
      `- Sono e estresse: ${preData.sonoEstresse || '-'}`,
      `- Álcool, fumo ou outros hábitos: ${preData.alcoolFumoHabitos || '-'}`,
      '',
      '*4. Hábitos Alimentares, Hidratação & Intestino*',
      `- Refeições/dia e horários: ${preData.qtdRefeicoesHorarios || '-'}`,
      `- Alimentação em um dia habitual: ${preData.alimentacaoHabitual || '-'}`,
      `- Local, preparo e delivery: ${preData.ondeComePreparoDelivery || '-'}`,
      `- Preferências, aversões e restrições: ${preData.preferenciasRestricoes || '-'}`,
      `- Frutas, verduras, doces e ultraprocessados: ${preData.consumoFrutasDocesUltraprocessados || '-'}`,
      `- Ansiedade, compulsão, fome e saciedade: ${preData.ansiedadeCompulsaoSaciedade || '-'}`,
      `- Água diária: ${preData.aguaDiaria || '-'}`,
      `- Funcionamento intestinal: ${preData.funcionamentoIntestinal || '-'}`,
      '',
      '*5. Condições Práticas & Histórico Nutricional*',
      `- Estrutura (geladeira/micro-ondas/cozinhar): ${preData.estruturaCozinharMarmitas || '-'}`,
      `- Limitações financeiras ou de acesso: ${preData.limitacoesAcessoFinanceiro || '-'}`,
      `- Maiores dificuldades: ${preData.maioresDificuldades || '-'}`,
      `- Dietas/acompanhamentos anteriores: ${preData.acompanhamentoDietasAnteriores || '-'}`,
      `- Medicamentos p/ emagrecer, dietas restritivas ou jejuns: ${preData.medicamentosRestritivasJejuns || '-'}`,
    ].join('\n');
  };

  const formatWeeklySummary = () => {
    return [
      '*QUESTIONÁRIO DE ACOMPANHAMENTO SEMANAL — RAFAEL PEREIRA*',
      `- Paciente: ${weeklyData.nomePaciente || '-'}`,
      `- Como foi a semana: ${weeklyData.adesaoSemana || '-'}`,
      `- Maior dificuldade e ajustes sugeridos: ${weeklyData.maiorDificuldadeAjustes || '-'}`,
      `- O que funcionou bem e evoluções: ${weeklyData.oqueFuncionouEvolucao || '-'}`,
    ].join('\n');
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback silencioso
    }
  };

  const inputClass =
    'w-full px-3.5 py-2.5 rounded-xl border border-[#DFD8CC] text-xs sm:text-sm bg-[#FAF8F5] text-[#2B2F2A] placeholder:text-[#2B2F2A]/45 focus:outline-none focus:ring-2 focus:ring-[#395D89] transition-all';
  const labelClass =
    'font-oswald block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#2B2F2A] mb-1.5';

  return (
    <section id="questionarios" className="py-12 sm:py-16">
      {/* Cabeçalho da Seção */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <span className="font-oswald text-[11px] sm:text-[12px] font-bold tracking-[0.24em] text-[#395D89] uppercase inline-block mb-1">
          AVALIAÇÃO &amp; CHECK-IN
        </span>
        <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#2B2F2A] mb-2">
          QUESTIONÁRIOS DO PACIENTE
        </h2>
        <p className="text-sm sm:text-base text-[#2B2F2A]/80 font-normal">
          Preencha o questionário de pré-atendimento antes da sua primeira consulta ou envie seu check-in semanal de acompanhamento.
        </p>
      </div>

      {/* Container Principal (#EBE5DB) */}
      <div className="bg-[#EBE5DB] rounded-[20px] md:rounded-[24px] p-5 sm:p-8 lg:p-10 border border-[#E0D9CE] shadow-xs">
        {/* Seletor de Abas (Pré-Atendimento vs. Acompanhamento Semanal) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-8">
          <button
            type="button"
            onClick={() => {
              setActiveTab('pre-atendimento');
              setErrorMsg('');
            }}
            className={`flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'pre-atendimento'
                ? 'bg-[#395D89] text-white border-[#395D89] shadow-sm'
                : 'bg-white/75 text-[#2B2F2A] border-[#DFD8CC] hover:bg-white'
            }`}
          >
            <ClipboardList size={18} className="shrink-0" />
            <div>
              <span className="font-oswald block text-xs sm:text-sm font-bold uppercase tracking-wider leading-tight">
                Pré-Atendimento Nutricional
              </span>
              <span
                className={`text-[11px] block ${
                  activeTab === 'pre-atendimento' ? 'text-white/85' : 'text-[#2B2F2A]/65'
                }`}
              >
                Anamnese completa • 5 etapas rápidas
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('acompanhamento');
              setErrorMsg('');
            }}
            className={`flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'acompanhamento'
                ? 'bg-[#395D89] text-white border-[#395D89] shadow-sm'
                : 'bg-white/75 text-[#2B2F2A] border-[#DFD8CC] hover:bg-white'
            }`}
          >
            <CalendarCheck size={18} className="shrink-0" />
            <div>
              <span className="font-oswald block text-xs sm:text-sm font-bold uppercase tracking-wider leading-tight">
                Acompanhamento Semanal
              </span>
              <span
                className={`text-[11px] block ${
                  activeTab === 'acompanhamento' ? 'text-white/85' : 'text-[#2B2F2A]/65'
                }`}
              >
                Check-in de evolução e ajustes
              </span>
            </div>
          </button>
        </div>

        {/* Cartão Branco Interno do Formulário */}
        <div className="bg-white rounded-2xl p-5 sm:p-8 border border-[#DFD8CC] shadow-xs max-w-4xl mx-auto">
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* ABA 1: QUESTIONÁRIO DE PRÉ-ATENDIMENTO */}
          {activeTab === 'pre-atendimento' && (
            <>
              {preSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#395D89]/15 text-[#395D89] mx-auto flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-bebas text-3xl tracking-wide uppercase text-[#2B2F2A]">
                    PRÉ-ATENDIMENTO REGISTRADO!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2B2F2A]/80 max-w-md mx-auto leading-relaxed">
                    Obrigado, <strong className="text-[#2B2F2A]">{preData.nomeCompleto}</strong>! Abrimos o WhatsApp do nutricionista ({NUTRITIONIST_CONTACT.whatsappDisplay}) com todas as suas respostas preenchidas. Caso não tenha aberto automaticamente, clique abaixo.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={buildWhatsAppUrl(formatPreSummary())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-oswald inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1E3A5F] hover:bg-[#152944] text-white transition-colors shadow-xs"
                    >
                      <MessageCircle size={15} />
                      <span>Enviar no WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopy(formatPreSummary())}
                      className="font-oswald inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#395D89] hover:bg-[#2D4B70] text-white transition-colors cursor-pointer"
                    >
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                      <span>{copied ? 'Resumo Copiado!' : 'Copiar Respostas'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPreSubmitted(false);
                        setPreData(initialPreData);
                        setStep(1);
                      }}
                      className="font-oswald px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EBE5DB] hover:bg-[#DDD5C7] text-[#2B2F2A] transition-colors cursor-pointer"
                    >
                      Preencher Novo
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePreSubmit} noValidate>
                  {/* Introdução e Barra de Progresso */}
                  <div className="mb-6 pb-5 border-b border-[#EAE3D7]">
                    <p className="text-xs sm:text-sm text-[#2B2F2A]/75 mb-4">
                      O objetivo é conhecer sua rotina, seus hábitos alimentares, seu histórico de saúde e seus objetivos para que o acompanhamento seja individualizado e compatível com sua realidade.
                    </p>

                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                      {STEPS.map((s) => {
                        const isActive = step === s.id;
                        const isDone = step > s.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => {
                              setErrorMsg('');
                              setStep(s.id);
                            }}
                            className="text-left group cursor-pointer"
                          >
                            <div
                              className={`h-1.5 rounded-full transition-all mb-1.5 ${
                                isActive
                                  ? 'bg-[#1E3A5F]'
                                  : isDone
                                  ? 'bg-[#395D89]'
                                  : 'bg-[#EBE5DB]'
                              }`}
                            />
                            <span
                              className={`font-oswald hidden sm:block text-[10px] font-bold uppercase tracking-wider truncate ${
                                isActive
                                  ? 'text-[#1E3A5F]'
                                  : isDone
                                  ? 'text-[#395D89]'
                                  : 'text-[#2B2F2A]/45'
                              }`}
                            >
                              {s.id}. {s.label}
                            </span>
                            <span className="font-oswald sm:hidden block text-[10px] font-bold text-center text-[#2B2F2A]/70">
                              {s.id}/5
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ETAPA 1: Informações Pessoais e Dados Antropométricos */}
                  {step === 1 && (
                    <div className="space-y-5">
                      <h3 className="font-bebas text-2xl tracking-wide uppercase text-[#2B2F2A]">
                        1. Informações Pessoais &amp; Dados Antropométricos
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label htmlFor="pre-nome" className={labelClass}>
                            Nome completo <span className="text-[#1E3A5F]">*</span>
                          </label>
                          <input
                            id="pre-nome"
                            type="text"
                            placeholder="Seu nome completo"
                            value={preData.nomeCompleto}
                            onChange={(e) => setPreData({ ...preData, nomeCompleto: e.target.value })}
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label htmlFor="pre-nasc" className={labelClass}>
                            Data de nascimento
                          </label>
                          <BirthDatePicker
                            id="pre-nasc"
                            value={preData.dataNascimento}
                            onChange={(formatted) =>
                              setPreData((prev) => ({ ...prev, dataNascimento: formatted }))
                            }
                            onAgeCalculated={(age) =>
                              setPreData((prev) => ({ ...prev, idade: age }))
                            }
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label htmlFor="pre-idade" className={labelClass}>
                            Idade
                          </label>
                          <input
                            id="pre-idade"
                            type="number"
                            min={1}
                            max={120}
                            placeholder="Ex: 29"
                            value={preData.idade}
                            onChange={(e) => setPreData({ ...preData, idade: e.target.value })}
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label htmlFor="pre-tel" className={labelClass}>
                            Telefone / WhatsApp <span className="text-[#1E3A5F]">*</span>
                          </label>
                          <input
                            id="pre-tel"
                            type="tel"
                            placeholder="(71) 99999-9999"
                            value={preData.telefone}
                            onChange={(e) => setPreData({ ...preData, telefone: e.target.value })}
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label htmlFor="pre-email" className={labelClass}>
                            E-mail
                          </label>
                          <input
                            id="pre-email"
                            type="email"
                            placeholder="seuemail@exemplo.com"
                            value={preData.email}
                            onChange={(e) => setPreData({ ...preData, email: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="pre-rotina-prof" className={labelClass}>
                          Qual sua cidade, profissão e rotina de trabalho ou estudo?
                        </label>
                        <textarea
                          id="pre-rotina-prof"
                          rows={2}
                          placeholder="Ex: Salvador/BA, analista administrativo, trabalho presencial das 8h às 18h."
                          value={preData.cidadeProfissaoRotina}
                          onChange={(e) => setPreData({ ...preData, cidadeProfissaoRotina: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EAE3D7]">
                        <div>
                          <label htmlFor="pre-peso" className={labelClass}>
                            Peso atual (kg)
                          </label>
                          <input
                            id="pre-peso"
                            type="text"
                            placeholder="Ex: 74,5"
                            value={preData.pesoAtual}
                            onChange={(e) => setPreData({ ...preData, pesoAtual: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="pre-altura" className={labelClass}>
                            Altura (cm)
                          </label>
                          <input
                            id="pre-altura"
                            type="text"
                            placeholder="Ex: 175"
                            value={preData.altura}
                            onChange={(e) => setPreData({ ...preData, altura: e.target.value })}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="pre-hist-peso" className={labelClass}>
                          Qual foi seu maior e menor peso na vida adulta? Teve alterações significativas recentemente?
                        </label>
                        <textarea
                          id="pre-hist-peso"
                          rows={2}
                          placeholder="Ex: Menor 65 kg, maior 82 kg. Ganhei 5 kg nos últimos 6 meses."
                          value={preData.historicoPeso}
                          onChange={(e) => setPreData({ ...preData, historicoPeso: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="pre-exames" className={labelClass}>
                          Possui avaliações físicas ou exames de composição corporal recentes?
                        </label>
                        <input
                          id="pre-exames"
                          type="text"
                          placeholder="Ex: Bioimpedância feita há 2 meses / Não possuo"
                          value={preData.examesRecentes}
                          onChange={(e) => setPreData({ ...preData, examesRecentes: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}

                  {/* ETAPA 2: Objetivos, Histórico de Saúde e Suplementação */}
                  {step === 2 && (
                    <div className="space-y-5">
                      <h3 className="font-bebas text-2xl tracking-wide uppercase text-[#2B2F2A]">
                        2. Objetivos, Histórico de Saúde &amp; Suplementação
                      </h3>

                      <div>
                        <span className={labelClass}>
                          Qual seu principal objetivo com o acompanhamento? (Selecione uma ou mais opções)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {OBJETIVOS_OPTIONS.map((opt) => {
                            const selected = preData.objetivos.includes(opt);
                            return (
                              <label
                                key={opt}
                                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                                  selected
                                    ? 'bg-[#395D89]/12 border-[#395D89] font-semibold text-[#2B2F2A]'
                                    : 'bg-[#FAF8F5] border-[#DFD8CC] text-[#2B2F2A]/85 hover:border-[#395D89]/50'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={selected}
                                  onChange={() => toggleMultiOption('objetivos', opt)}
                                  className="accent-[#395D89] w-4 h-4 rounded"
                                />
                                <span>{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="pre-meta-exp" className={labelClass}>
                          Existe alguma meta específica? Já tentou alcançá-la anteriormente? Como foi sua experiência?
                        </label>
                        <textarea
                          id="pre-meta-exp"
                          rows={2}
                          placeholder="Descreva sua meta e tentativas anteriores..."
                          value={preData.metaEspecificaExperiencia}
                          onChange={(e) => setPreData({ ...preData, metaEspecificaExperiencia: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="pt-2 border-t border-[#EAE3D7]">
                        <span className={labelClass}>
                          Possui alguma doença diagnosticada, alergia ou intolerância alimentar?
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {CONDICOES_OPTIONS.map((opt) => {
                            const selected = preData.condicoesSaude.includes(opt);
                            return (
                              <label
                                key={opt}
                                className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                                  selected
                                    ? 'bg-[#395D89]/12 border-[#395D89] font-semibold text-[#2B2F2A]'
                                    : 'bg-[#FAF8F5] border-[#DFD8CC] text-[#2B2F2A]/85 hover:border-[#395D89]/50'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={selected}
                                  onChange={() => toggleMultiOption('condicoesSaude', opt)}
                                  className="accent-[#395D89] w-4 h-4 rounded"
                                />
                                <span>{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="pre-meds" className={labelClass}>
                          Utiliza medicamentos? Possui histórico de cirurgias, internações ou doenças relevantes na família?
                        </label>
                        <textarea
                          id="pre-meds"
                          rows={2}
                          placeholder="Informe medicamentos em uso, histórico cirúrgico ou familiar..."
                          value={preData.medicamentosCirurgiasFamilia}
                          onChange={(e) => setPreData({ ...preData, medicamentosCirurgiasFamilia: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="pre-ciclo" className={labelClass}>
                          Se aplicável, utiliza anticoncepcional, apresenta alterações menstruais ou está gestante, amamentando ou na menopausa?
                        </label>
                        <input
                          id="pre-ciclo"
                          type="text"
                          placeholder="Opcional — informe se aplicável"
                          value={preData.cicloGestacaoMenopausa}
                          onChange={(e) => setPreData({ ...preData, cicloGestacaoMenopausa: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="pt-2 border-t border-[#EAE3D7]">
                        <label htmlFor="pre-supl" className={labelClass}>
                          Utiliza algum suplemento ou produto para emagrecimento ou desempenho esportivo? Informe quais, doses e horários.
                        </label>
                        <textarea
                          id="pre-supl"
                          rows={2}
                          placeholder="Ex: Whey protein (30g pós-treino), Creatina (5g/dia), Cafeína, vitaminas, pré-treinos..."
                          value={preData.suplementos}
                          onChange={(e) => setPreData({ ...preData, suplementos: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}

                  {/* ETAPA 3: Atividade Física e Rotina/Estilo de Vida */}
                  {step === 3 && (
                    <div className="space-y-5">
                      <h3 className="font-bebas text-2xl tracking-wide uppercase text-[#2B2F2A]">
                        3. Atividade Física &amp; Estilo de Vida
                      </h3>

                      <div>
                        <span className={labelClass}>
                          Pratica alguma atividade física atualmente? (Selecione uma ou mais opções)
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {ATIVIDADES_OPTIONS.map((opt) => {
                            const selected = preData.atividadesFisicas.includes(opt);
                            return (
                              <label
                                key={opt}
                                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                                  selected
                                    ? 'bg-[#395D89]/12 border-[#395D89] font-semibold text-[#2B2F2A]'
                                    : 'bg-[#FAF8F5] border-[#DFD8CC] text-[#2B2F2A]/85 hover:border-[#395D89]/50'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={selected}
                                  onChange={() => toggleMultiOption('atividadesFisicas', opt)}
                                  className="accent-[#395D89] w-4 h-4 rounded"
                                />
                                <span>{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="pre-treino-rotina" className={labelClass}>
                          Descreva sua rotina de treinamento: frequência semanal, duração, horários, intensidade, tempo de prática e lesões/acompanhamento.
                        </label>
                        <textarea
                          id="pre-treino-rotina"
                          rows={3}
                          placeholder="Ex: Musculação 4x/semana às 7h por 1h, intensidade moderada/alta, há 1 ano. Sem lesões."
                          value={preData.rotinaTreinamento}
                          onChange={(e) => setPreData({ ...preData, rotinaTreinamento: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="pt-2 border-t border-[#EAE3D7]">
                        <label htmlFor="pre-dia" className={labelClass}>
                          Como é seu dia habitual? Informe horários de acordar, dormir, trabalho/estudo, deslocamentos e disponibilidade para refeições e treinar.
                        </label>
                        <textarea
                          id="pre-dia"
                          rows={3}
                          placeholder="Ex: Acordo 6h30, trabalho das 8h às 18h, treino 19h, durmo 23h..."
                          value={preData.diaHabitual}
                          onChange={(e) => setPreData({ ...preData, diaHabitual: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="pre-sono" className={labelClass}>
                          Quantas horas dorme por noite? Como avalia seu sono e nível de estresse?
                        </label>
                        <input
                          id="pre-sono"
                          type="text"
                          placeholder="Ex: 6h30 por noite, sono leve, estresse moderado no trabalho"
                          value={preData.sonoEstresse}
                          onChange={(e) => setPreData({ ...preData, sonoEstresse: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="pre-alcool" className={labelClass}>
                          Consome bebidas alcoólicas, fuma ou possui algum hábito que considere importante mencionar?
                        </label>
                        <input
                          id="pre-alcool"
                          type="text"
                          placeholder="Ex: Consumo social aos finais de semana / Não fumo"
                          value={preData.alcoolFumoHabitos}
                          onChange={(e) => setPreData({ ...preData, alcoolFumoHabitos: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}

                  {/* ETAPA 4: Hábitos Alimentares, Hidratação e Intestino */}
                  {step === 4 && (
                    <div className="space-y-4">
                      <h3 className="font-bebas text-2xl tracking-wide uppercase text-[#2B2F2A]">
                        4. Hábitos Alimentares, Hidratação &amp; Intestino
                      </h3>

                      <div>
                        <label htmlFor="pre-qtd-ref" className={labelClass}>
                          Quantas refeições costuma fazer por dia e em quais horários?
                        </label>
                        <input
                          id="pre-qtd-ref"
                          type="text"
                          placeholder="Ex: 4 refeições — 7h30, 12h30, 16h30 e 20h30"
                          value={preData.qtdRefeicoesHorarios}
                          onChange={(e) => setPreData({ ...preData, qtdRefeicoesHorarios: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="pre-dia-alim" className={labelClass}>
                          Descreva brevemente sua alimentação em um dia habitual (alimentos, preparações e quantidades aproximadas).
                        </label>
                        <textarea
                          id="pre-dia-alim"
                          rows={3}
                          placeholder="Café da manhã, almoço, lanches e jantar típicos..."
                          value={preData.alimentacaoHabitual}
                          onChange={(e) => setPreData({ ...preData, alimentacaoHabitual: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="pre-onde-come" className={labelClass}>
                          Onde costuma comer e quem prepara suas refeições? Consome delivery ou come fora com frequência?
                        </label>
                        <input
                          id="pre-onde-come"
                          type="text"
                          placeholder="Ex: Almoço em restaurante perto do trabalho, janto em casa, peço delivery 2x/semana"
                          value={preData.ondeComePreparoDelivery}
                          onChange={(e) => setPreData({ ...preData, ondeComePreparoDelivery: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="pre-pref" className={labelClass}>
                          Quais alimentos gosta, não gosta ou evita? Possui alguma restrição alimentar?
                        </label>
                        <textarea
                          id="pre-pref"
                          rows={2}
                          placeholder="Alimentos indispensáveis, aversões ou restrições..."
                          value={preData.preferenciasRestricoes}
                          onChange={(e) => setPreData({ ...preData, preferenciasRestricoes: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="pre-consumo" className={labelClass}>
                          Como é seu consumo de frutas, verduras, legumes, doces, frituras e ultraprocessados?
                        </label>
                        <textarea
                          id="pre-consumo"
                          rows={2}
                          placeholder="Frequência semanal de vegetais, doces e alimentos industrializados..."
                          value={preData.consumoFrutasDocesUltraprocessados}
                          onChange={(e) =>
                            setPreData({ ...preData, consumoFrutasDocesUltraprocessados: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="pre-ansiedade" className={labelClass}>
                          Percebe episódios de comer por ansiedade, estresse, compulsão ou dificuldade em reconhecer fome e saciedade?
                        </label>
                        <input
                          id="pre-ansiedade"
                          type="text"
                          placeholder="Descreva se ocorre e em quais momentos do dia"
                          value={preData.ansiedadeCompulsaoSaciedade}
                          onChange={(e) => setPreData({ ...preData, ansiedadeCompulsaoSaciedade: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="pt-2 border-t border-[#EAE3D7]">
                        <span className={labelClass}>Quanto de água costuma beber diariamente?</span>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          {AGUA_OPTIONS.map((opt) => {
                            const selected = preData.aguaDiaria === opt;
                            return (
                              <label
                                key={opt}
                                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                                  selected
                                    ? 'bg-[#395D89]/12 border-[#395D89] font-semibold text-[#2B2F2A]'
                                    : 'bg-[#FAF8F5] border-[#DFD8CC] text-[#2B2F2A]/85 hover:border-[#395D89]/50'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="agua-diaria"
                                  checked={selected}
                                  onChange={() => setPreData({ ...preData, aguaDiaria: opt })}
                                  className="accent-[#395D89] w-3.5 h-3.5"
                                />
                                <span>{opt}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label htmlFor="pre-intestino" className={labelClass}>
                          Como funciona seu intestino? Informe frequência de evacuação e se há constipação, diarreia, gases, inchaço, azia ou refluxo.
                        </label>
                        <textarea
                          id="pre-intestino"
                          rows={2}
                          placeholder="Ex: Evacuo diariamente / Sinto inchaço e gases após o almoço..."
                          value={preData.funcionamentoIntestinal}
                          onChange={(e) => setPreData({ ...preData, funcionamentoIntestinal: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}

                  {/* ETAPA 5: Preferências, Condições Práticas e Histórico Nutricional */}
                  {step === 5 && (
                    <div className="space-y-5">
                      <h3 className="font-bebas text-2xl tracking-wide uppercase text-[#2B2F2A]">
                        5. Condições Práticas &amp; Histórico Nutricional
                      </h3>

                      <div>
                        <label htmlFor="pre-estrutura" className={labelClass}>
                          Possui geladeira e micro-ondas no trabalho? Tem disponibilidade para cozinhar ou preparar marmitas?
                        </label>
                        <textarea
                          id="pre-estrutura"
                          rows={2}
                          placeholder="Ex: Sim, tenho micro-ondas e geladeira no trabalho; consigo cozinhar aos domingos e quartas."
                          value={preData.estruturaCozinharMarmitas}
                          onChange={(e) => setPreData({ ...preData, estruturaCozinharMarmitas: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="pre-acesso" className={labelClass}>
                          Existe alguma limitação financeira, dificuldade de acesso a alimentos ou preferência a considerar no planejamento?
                        </label>
                        <textarea
                          id="pre-acesso"
                          rows={2}
                          placeholder="Ex: Prefiro alimentos práticos e acessíveis de supermercado comum"
                          value={preData.limitacoesAcessoFinanceiro}
                          onChange={(e) => setPreData({ ...preData, limitacoesAcessoFinanceiro: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="pre-dificuldades" className={labelClass}>
                          Quais são suas maiores dificuldades para manter uma alimentação organizada?
                        </label>
                        <textarea
                          id="pre-dificuldades"
                          rows={2}
                          placeholder="Ex: Falta de tempo à tarde, beliscar à noite, finais de semana..."
                          value={preData.maioresDificuldades}
                          onChange={(e) => setPreData({ ...preData, maioresDificuldades: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div className="pt-2 border-t border-[#EAE3D7]">
                        <label htmlFor="pre-hist-nutri" className={labelClass}>
                          Já realizou acompanhamento nutricional ou seguiu alguma dieta anteriormente? Como foi sua experiência e resultados?
                        </label>
                        <textarea
                          id="pre-hist-nutri"
                          rows={2}
                          placeholder="Conte brevemente sua experiência anterior..."
                          value={preData.acompanhamentoDietasAnteriores}
                          onChange={(e) => setPreData({ ...preData, acompanhamentoDietasAnteriores: e.target.value })}
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label htmlFor="pre-restritivas" className={labelClass}>
                          Já utilizou medicamentos para emagrecimento, realizou dietas restritivas ou jejuns prolongados?
                        </label>
                        <textarea
                          id="pre-restritivas"
                          rows={2}
                          placeholder="Ex: Fiz dieta low carb por 2 meses / Nunca utilizei medicamentos"
                          value={preData.medicamentosRestritivasJejuns}
                          onChange={(e) => setPreData({ ...preData, medicamentosRestritivasJejuns: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}

                  {/* Navegação entre etapas */}
                  <div className="mt-8 pt-5 border-t border-[#EAE3D7] flex items-center justify-between gap-3">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="font-oswald inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EBE5DB] hover:bg-[#DDD5C7] text-[#2B2F2A] transition-colors cursor-pointer"
                      >
                        <ChevronLeft size={16} />
                        <span>Etapa Anterior</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#2B2F2A]/55 font-medium">
                        Etapa {step} de 5
                      </span>
                    )}

                    {step < 5 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="font-oswald inline-flex items-center gap-1.5 px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#395D89] hover:bg-[#2D4B70] text-white shadow-xs transition-colors cursor-pointer"
                      >
                        <span>Próxima Etapa</span>
                        <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="font-oswald inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.14em] bg-[#1E3A5F] hover:bg-[#152944] text-white shadow-sm transition-colors cursor-pointer"
                      >
                        <span>Concluir e Enviar no WhatsApp</span>
                        <MessageCircle size={16} />
                      </button>
                    )}
                  </div>
                </form>
              )}
            </>
          )}

          {/* ABA 2: QUESTIONÁRIO DE ACOMPANHAMENTO SEMANAL */}
          {activeTab === 'acompanhamento' && (
            <>
              {weeklySubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#395D89]/15 text-[#395D89] mx-auto flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-bebas text-3xl tracking-wide uppercase text-[#2B2F2A]">
                    CHECK-IN SEMANAL REGISTRADO!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2B2F2A]/80 max-w-md mx-auto leading-relaxed">
                    Obrigado pelo feedback, <strong className="text-[#2B2F2A]">{weeklyData.nomePaciente}</strong>! Abrimos o WhatsApp do nutricionista ({NUTRITIONIST_CONTACT.whatsappDisplay}) com seu check-in preenchido. Caso não tenha aberto automaticamente, clique abaixo.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={buildWhatsAppUrl(formatWeeklySummary())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-oswald inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1E3A5F] hover:bg-[#152944] text-white transition-colors shadow-xs"
                    >
                      <MessageCircle size={15} />
                      <span>Enviar Check-in no WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopy(formatWeeklySummary())}
                      className="font-oswald inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#395D89] hover:bg-[#2D4B70] text-white transition-colors cursor-pointer"
                    >
                      {copied ? <Check size={15} /> : <Copy size={15} />}
                      <span>{copied ? 'Check-in Copiado!' : 'Copiar Resumo Semanal'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setWeeklySubmitted(false);
                        setWeeklyData(initialWeeklyData);
                      }}
                      className="font-oswald px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EBE5DB] hover:bg-[#DDD5C7] text-[#2B2F2A] transition-colors cursor-pointer"
                    >
                      Novo Check-in
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleWeeklySubmit} noValidate className="space-y-5">
                  <div className="pb-4 border-b border-[#EAE3D7]">
                    <h3 className="font-bebas text-2xl tracking-wide uppercase text-[#2B2F2A]">
                      Questionário de Acompanhamento Semanal
                    </h3>
                    <p className="text-xs sm:text-sm text-[#2B2F2A]/75 mt-0.5">
                      Espaço dedicado aos pacientes em acompanhamento para relatar dificuldades, vitórias e solicitar ajustes semanais.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="weekly-nome" className={labelClass}>
                      Seu Nome <span className="text-[#1E3A5F]">*</span>
                    </label>
                    <input
                      id="weekly-nome"
                      type="text"
                      placeholder="Seu nome completo"
                      value={weeklyData.nomePaciente}
                      onChange={(e) => setWeeklyData({ ...weeklyData, nomePaciente: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <span className={labelClass}>
                      1. Como foi sua semana em relação ao planejamento alimentar?{' '}
                      <span className="text-[#1E3A5F]">*</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {ADESAO_SEMANAL_OPTIONS.map((opt) => {
                        const selected = weeklyData.adesaoSemana === opt;
                        return (
                          <label
                            key={opt}
                            className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-colors ${
                              selected
                                ? 'bg-[#395D89]/12 border-[#395D89] font-semibold text-[#2B2F2A]'
                                : 'bg-[#FAF8F5] border-[#DFD8CC] text-[#2B2F2A]/85 hover:border-[#395D89]/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="adesao-semanal"
                              checked={selected}
                              onChange={() => setWeeklyData({ ...weeklyData, adesaoSemana: opt })}
                              className="accent-[#395D89] w-4 h-4"
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="weekly-dificuldade" className={labelClass}>
                      2. Qual foi sua maior dificuldade nesta semana? Existe alguma refeição, alimento ou estratégia que não funcionou bem? O que poderia ser ajustado?
                    </label>
                    <textarea
                      id="weekly-dificuldade"
                      rows={3}
                      placeholder="Ex: Senti mais fome no lanche da tarde ou tive dificuldade em preparar o jantar nos dias de plantão..."
                      value={weeklyData.maiorDificuldadeAjustes}
                      onChange={(e) => setWeeklyData({ ...weeklyData, maiorDificuldadeAjustes: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="weekly-evolucao" className={labelClass}>
                      3. O que você mais gostou ou considera que funcionou bem nesta semana? Percebeu evolução na alimentação, disposição, treinos ou bem-estar?
                    </label>
                    <textarea
                      id="weekly-evolucao"
                      rows={3}
                      placeholder="Ex: O café da manhã trouxe muita saciedade, dormi melhor e meu rendimento na corrida melhorou..."
                      value={weeklyData.oqueFuncionouEvolucao}
                      onChange={(e) => setWeeklyData({ ...weeklyData, oqueFuncionouEvolucao: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="font-oswald w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-bold tracking-[0.14em] bg-[#1E3A5F] hover:bg-[#152944] text-white uppercase inline-flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      <span>Enviar Check-in no WhatsApp</span>
                      <MessageCircle size={16} />
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};
