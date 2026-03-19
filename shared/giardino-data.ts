/**
 * PROJETO GIARDINO - MODELO DE INVESTIMENTO
 * Residencial Senior + Clube Life Style + Loteamento + Shopping
 * 
 * ANÁLISE FINANCEIRA COMPLETA
 */

// ============================================
// ESTRUTURA DE RECEITAS INICIAIS (VENDAS)
// ============================================

export const initialSales = {
  residentialSenior: {
    title: "Residencial Senior",
    units: 240,
    pricePerUnit: 5_000_000,
    total: 1_200_000_000,
    description: "240 unidades residenciais - venda ao longo de 10 anos",
  },
  timeShare: {
    title: "Time Share",
    units: 80,
    pricePerUnit: 2_000_000,
    total: 160_000_000,
    description: "80 cotas de time share comercializadas",
  },
  lifeStyleClub: {
    title: "Clube Life Style",
    units: 6_000,
    pricePerUnit: 35_000,
    total: 210_000_000,
    downPayment: 10_000, // por unidade
    annualInstallments: 4,
    annualAmount: 10_000, // por parcela
    description: "6.000 títulos comercializados",
  },
  subdivision: {
    title: "Loteamento",
    units: 400,
    pricePerUnit: 400_000,
    total: 160_000_000,
    areaPerUnit: 500, // m²
    description: "400 terrenos - todos ganham acesso ao clube",
  },
  mall: {
    title: "Shopping/Mall",
    stores: [
      { type: "Lojas comerciais", quantity: 250, size: 50, price: 10_000, total: 2_500_000 },
    ],
    total: 2_500_000,
  },
};

export const totalInitialSales =
  initialSales.residentialSenior.total +
  initialSales.timeShare.total +
  initialSales.lifeStyleClub.total +
  initialSales.subdivision.total +
  initialSales.mall.total;
// TOTAL: R$ 1.732.500.000

// ============================================
// RECEITAS MENSAIS RECORRENTES
// ============================================

export const monthlyRecurringRevenue = {
  residentialSenior: {
    title: "Residencial Senior (Mensalidades)",
    units: 240,
    pricePerUnit: 38_000,
    monthlyTotal: 9_120_000,
    description: "240 unidades habitadas - pacote all-inclusive",
  },
  lifeStyleClubMembership: {
    title: "Mensalidade Clube Life Style",
    members: 6_000,
    monthlyFeePerMember: 400,
    monthlyTotal: 2_400_000,
    description: "6.000 títulos ativos pagando mensalidade",
  },
  shoppingMall: {
    title: "Aluguel Shopping/Mall",
    stores: 250,
    monthlyRentPerStore: 10_000,
    monthlyTotal: 2_500_000,
    description: "250 lojas - aluguel mensal",
  },
  consumption: {
    title: "Consumação (Bares, Restaurantes, Eventos)",
    dailyFootTraffic: 500,
    averageSpending: 92, // por pessoa
    daysPerMonth: 30,
    monthlyTotal: 1_380_000, // (500 x 92 x 30)
    description: "Fluxo comercial interno - consumo médio",
  },
};

export const totalMonthlyRevenue =
  monthlyRecurringRevenue.residentialSenior.monthlyTotal +
  monthlyRecurringRevenue.lifeStyleClubMembership.monthlyTotal +
  monthlyRecurringRevenue.shoppingMall.monthlyTotal +
  monthlyRecurringRevenue.consumption.monthlyTotal;
// TOTAL MENSAL: R$ 15.400.000

// ============================================
// CUSTOS OPERACIONAIS MENSAIS
// ============================================

export const humanResources = {
  housekeeping: {
    title: "Camareiras",
    quantity: 24,
    salaryPerPerson: 1_800,
    monthlyTotal: 43_200,
    ratio: "1 camareira por 10 apartamentos",
  },
  culinary: {
    title: "Cozinheiras + Auxiliares",
    quantity: 26, // 6 cozinheiras + 20 auxiliares
    salaryPerPerson: 1_800,
    monthlyTotal: 46_800,
    description: "6 cozinheiras + 20 auxiliares de cozinha",
  },
  laundry: {
    title: "Lavanderia (Lavadeiras + Passadeiras)",
    quantity: 10,
    salaryPerPerson: 1_800,
    monthlyTotal: 18_000,
  },
  cleaning: {
    title: "Auxiliares de Limpeza (Áreas Comuns)",
    quantity: 10,
    salaryPerPerson: 1_800,
    monthlyTotal: 18_000,
  },
  maintenance: {
    title: "Jardineiros + Piscineiros/Salva-vidas",
    quantity: 10,
    salaryPerPerson: 1_800,
    monthlyTotal: 18_000,
  },
  beauty: {
    title: "Beleza (Cabeleireiros, Barbeiros, Manicures, Depiladoras)",
    quantity: 36, // 6+6+12+6
    salaryPerPerson: 1_800,
    monthlyTotal: 64_800,
  },
  reception: {
    title: "Recepcionistas",
    quantity: 10,
    salaryPerPerson: 1_800,
    monthlyTotal: 18_000,
  },
  security: {
    title: "Seguranças",
    quantity: 24,
    salaryPerPerson: 3_000,
    monthlyTotal: 72_000,
    description: "24h segurança - 3 turnos",
  },
  healthcare: {
    title: "Enfermeiros/Enfermeiras",
    quantity: 30,
    salaryPerPerson: 3_000,
    monthlyTotal: 90_000,
    description: "Cuidados de saúde 24/7",
  },
  administrative: {
    title: "Administrativo e Gestão",
    departments: [
      { name: "Escritório", quantity: 4 },
      { name: "Contabilidade", quantity: 4 },
      { name: "Atendimento", quantity: 4 },
      { name: "Administração", quantity: 4 },
      { name: "Marketing", quantity: 2 },
    ],
    quantity: 18,
    salaryPerPerson: 5_000,
    monthlyTotal: 90_000,
  },
};

export const totalHRCosts = Object.values(humanResources).reduce(
  (sum, dept: any) => sum + dept.monthlyTotal,
  0
);
// TOTAL RH: R$ 469.000

export const residentialOperatingCosts = {
  description: "Custos por unidade residencial (240 unidades)",
  hosting: {
    title: "Hospedagem",
    costPerUnit: 4_500,
    units: 240,
    monthlyTotal: 1_080_000,
  },
  meals: {
    title: "Alimentação (5 refeições/dia)",
    costPerUnit: 6_000,
    units: 240,
    monthlyTotal: 1_440_000,
  },
  sportsRecreation: {
    title: "Esporte e Lazer",
    costPerUnit: 2_400,
    units: 240,
    monthlyTotal: 576_000,
  },
  medicalCare: {
    title: "Cuidados Médicos/Home Care/Odontológicos",
    costPerUnit: 2_400,
    units: 240,
    monthlyTotal: 576_000,
  },
  therapies: {
    title: "Terapias/Fisioterapia e Oficinas",
    costPerUnit: 2_400,
    units: 240,
    monthlyTotal: 576_000,
  },
  personalCare: {
    title: "Cuidados Pessoais",
    costPerUnit: 300,
    units: 240,
    monthlyTotal: 72_000,
  },
};

export const totalResidentialCosts = Object.values(residentialOperatingCosts)
  .filter((item: any) => typeof item === "object" && item.monthlyTotal)
  .reduce((sum: number, item: any) => sum + item.monthlyTotal, 0);
// TOTAL OPERACIONAL: R$ 4.320.000

// ============================================
// CUSTOS DE FINANCIAMENTO (CAPEX)
// ============================================

export const financing = {
  totalLoan: 100_000_000,
  annualInterestRate: 0.06, // 6% ao ano
  loanTermMonths: 120, // 10 anos
  monthlyPayment: 1_000_000, // Principal
  description: "Financiamento do CAPEX - 10 anos, 6% a.a.",
};

// Cálculo de juros ao mês: 6% / 12 = 0.5%
// Juros do mês 1: R$ 100.000.000 * 0.005 = R$ 500.000
// Essa é uma aproximação - pode variar mensalmente conforme amortização
export const monthlyInterest = financing.totalLoan * (financing.annualInterestRate / 12);

// ============================================
// RESUMO FINANCEIRO CONSOLIDADO
// ============================================

export const financialSummary = {
  initialCapital: {
    downPaymentProposal: 30_000_000, // entrada Dinho
    annualPayments: 20_000_000, // 6 parcelas anuais
    totalProposalPayment: 150_000_000,
  },
  monthlyAnalysis: {
    grossRevenue: totalMonthlyRevenue,
    hrCosts: totalHRCosts,
    residentialOperatingCosts: totalResidentialCosts,
    financingPayment: financing.monthlyPayment,
    estimatedMonthlyInterest: monthlyInterest,
  },
  annualProjection: {
    grossRevenue: totalMonthlyRevenue * 12,
    totalCosts: (totalHRCosts + totalResidentialCosts + financing.monthlyPayment) * 12,
  },
};

// ============================================
// CÁLCULOS DE VIABILIDADE
// ============================================

export const viabilityAnalysis = {
  monthlyGrossRevenue: totalMonthlyRevenue,
  monthlyOperatingExpenses: totalHRCosts + totalResidentialCosts,
  monthlyFinancingCost: financing.monthlyPayment + monthlyInterest,
  monthlyNetProfit:
    totalMonthlyRevenue -
    (totalHRCosts + totalResidentialCosts + financing.monthlyPayment + monthlyInterest),
  breakEvenAnalysis: {
    description: "Análise de ponto de equilíbrio",
    monthsToBreakEven: "TBD",
  },
  roi: {
    totalInitialInvestment: 150_000_000, // Proposta Dinho
    projectedAnnualProfit: 
      (totalMonthlyRevenue - totalHRCosts - totalResidentialCosts - financing.monthlyPayment - monthlyInterest) * 12,
  },
};

// ============================================
// DADOS ESTRUTURAIS DO PROJETO
// ============================================

export const projectStructure = {
  residentialSenior: {
    title: "Residencial Senior + SPA",
    totalUnits: 240,
    type: "Habitacional com serviços especializados",
    services: [
      "Acomodação all-inclusive",
      "Alimentação (5 refeições/dia)",
      "Cuidados médicos 24/7",
      "Terapias e fisioterapia",
      "Atividades esportivas",
      "Serviços de beleza",
      "Home care",
      "Cuidados odontológicos",
    ],
  },
  hospitality: {
    title: "Hospedagem (Pousada/Hotel)",
    totalUnits: 80,
    type: "Hospedagem turística",
    dailyRate: 1_200,
    occupancyTarget: 0.3,
  },
  lifeStyleClub: {
    title: "Clube Life Style",
    totalMembers: 6_000,
    benefitsPerMember: "360 dias/ano acesso completo",
    facilities: [
      "Spa",
      "Piscinas",
      "Quadras esportivas",
      "Área kids",
      "Academia",
      "Consultas médicas e odontológicas",
      "Cabeleireiro e beleza",
      "Centro de convenções",
      "Salões de festas",
      "Bares e restaurantes",
      "Hospedagem",
      "Lojas",
    ],
  },
  subdivision: {
    title: "Loteamento Residencial",
    totalUnits: 400,
    areaPerUnit: 500,
    pricePerUnit: 360_000,
    bonus: "Todos ganham acesso ao clube",
  },
  commercial: {
    title: "Centro Comercial (Shopping/Mall)",
    categories: [
      "200 lojas comerciais (50m²)",
      "50 lojas de alimentação",
      "Posto de gasolina",
      "2 cinemas",
      "Supermercado",
      "Pet shop",
      "Farmácia",
      "Drogaria",
    ],
  },
};

// ============================================
// SERVIÇOS INCLUSOS NO PACOTE RESIDENCIAL
// ============================================

export const includedServices = [
  "Limpeza diária",
  "Trocas de roupa 3x/semana",
  "Toalhas de piscina diariamente",
  "Lavanderia completa 1x/semana",
  "5 refeições por dia",
  "1 atividade esportiva/dia",
  "Terapia ou fisioterapia 3x/semana + 2x oficinas",
  "Cuidados médicos e home care",
  "Sala de jogos livre",
  "8 festas/eventos por mês",
  "Ambulância emergencial",
  "Concierge e mordomo",
  "Transporte interno",
  "Água, luz e internet",
  "Manicure/pedicure (4x/mês)",
  "Cabelereiro (4x/mês)",
  "Limpeza de pele (2x/mês)",
  "Depilação (2x/mês)",
];

// ============================================
// SERVIÇOS COMPLEMENTARES (NÃO INCLUSOS)
// ============================================

export const additionalServices = [
  "Medicamentos pessoais",
  "Fraldas geriátricas",
  "Produtos de higiene pessoal",
  "Transporte para passeios (R$6/km)",
  "Viagens de lazer",
  "Transporte de helicóptero",
  "Compras pessoais",
  "Acompanhamento full time",
];

// ============================================
// PROJEÇÕES FINANCEIRAS MULTI-ANUAIS
// ============================================

export const generateYearlyProjections = () => {
  const projections = [];
  let cumulativeProfit = 0;

  // Fator de ocupação/ramp-up: começando com 80% e atingindo 100% no ano 3
  const rampUpFactors = [0.80, 0.90, 1.0, 1.02, 1.04, 1.06, 1.08, 1.10, 1.12, 1.15];

  for (let year = 1; year <= 10; year++) {
    const rampFactor = rampUpFactors[year - 1] || 1.15;

    // Receita bruta com ramp-up e crescimento gradual
    const grossRevenue = Math.round(totalMonthlyRevenue * 12 * rampFactor);

    // Custos com inflação anual de 2%
    const costInflation = 1 + (year > 1 ? 0.02 * (year - 1) : 0);
    const hrCosts = Math.round(totalHRCosts * 12 * costInflation);
    const operationalCosts = Math.round(totalResidentialCosts * 12 * costInflation);
    const financingPayment = Math.round(financing.monthlyPayment * 12);

    // Juros decrescem conforme o saldo diminui
    const remainingBalance = Math.max(0, financing.totalLoan - (financing.monthlyPayment * 12 * (year - 1)));
    const interestCost = Math.round(remainingBalance * financing.annualInterestRate);

    const totalCosts = hrCosts + operationalCosts + financingPayment + interestCost;
    const netProfit = grossRevenue - totalCosts;

    cumulativeProfit += netProfit;

    // ROI calculado sobre o lucro acumulado vs investimento inicial
    const roi = ((cumulativeProfit) / financing.totalLoan) * 100;

    projections.push({
      year,
      grossRevenue,
      totalCosts,
      netProfit,
      cumulativeProfit: Math.round(cumulativeProfit),
      roi: roi.toFixed(2),
    });
  }

  return projections;
};

export const yearlyProjections = generateYearlyProjections();

// ============================================
// EXPORT COMPLETO
// ============================================

export const giardino = {
  projectName: "GIARDINO - Modelo de Investimento",
  location: "Mogi das Cruzes - São Paulo",
  description: "Projeto complexo: Residencial Senior + Clube Life Style + Loteamento + Shopping",

  // Dados financeiros
  sales: initialSales,
  totalSales: totalInitialSales,
  monthlyRevenue: monthlyRecurringRevenue,
  totalMonthlyRevenue: totalMonthlyRevenue,
  hrCosts: humanResources,
  residentialCosts: residentialOperatingCosts,
  financing: financing,

  // Análises
  summary: financialSummary,
  viability: viabilityAnalysis,

  // Projeções
  yearlyProjections: yearlyProjections,

  // Estrutura
  structure: projectStructure,
  services: {
    included: includedServices,
    additional: additionalServices,
  },
};
