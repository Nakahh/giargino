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
    units: 80,
    pricePerUnit: 2_000_000,
    total: 160_000_000,
    description: "Cotas de fração ideal - 360 diárias/ano para associados",
  },
  lifeStyleClub: {
    title: "Clube Life Style",
    units: 6_000,
    pricePerUnit: 50_000,
    total: 300_000_000,
    downPayment: 10_000, // por unidade
    annualInstallments: 4,
    annualAmount: 10_000, // por parcela
    description: "6.000 títulos comercializados",
  },
  subdivision: {
    title: "Loteamento",
    units: 400,
    pricePerUnit: 360_000,
    total: 144_000_000,
    areaPerUnit: 500, // m²
    description: "400 terrenos - todos ganham acesso ao clube",
  },
  mall: {
    title: "Shopping/Mall",
    stores: [
      { type: "Lojas comerciais", quantity: 200, size: 50, price: 10_000, total: 2_000_000 },
      { type: "Alimentação", quantity: 50, size: 50, price: 10_000, total: 500_000 },
      { type: "Posto de gasolina", quantity: 1, price: 40_000, total: 40_000 },
      { type: "Cinemas", quantity: 2, price: 40_000, total: 80_000 },
      { type: "Supermercado", quantity: 1, price: 40_000, total: 40_000 },
      { type: "Pet Shop", quantity: 1, price: 10_000, total: 10_000 },
      { type: "Farmácia de Manipulação", quantity: 1, price: 15_000, total: 15_000 },
      { type: "Drogaria", quantity: 1, price: 15_000, total: 15_000 },
    ],
    total: 2_660_000,
  },
};

export const totalInitialSales =
  initialSales.residentialSenior.total +
  initialSales.lifeStyleClub.total +
  initialSales.subdivision.total +
  initialSales.mall.total;
// TOTAL: R$ 604.660.000

// ============================================
// RECEITAS MENSAIS RECORRENTES
// ============================================

export const monthlyRecurringRevenue = {
  residentialSenior: {
    title: "Residencial Senior (Mensalidades)",
    units: 240,
    pricePerUnit: 35_000,
    monthlyTotal: 8_400_000,
    description: "240 unidades habitadas - pacote all-inclusive",
  },
  hospitality: {
    title: "Hospedagem (Pousada/Hotel)",
    units: 80,
    dailyRate: 1_000,
    occupancyRate: 0.3, // 30% ocupação estimada
    estimatedMonthlyGuests: 720, // (80 * 30 dias * 30%)
    monthlyTotal: 756_000, // 720 hóspedes x R$1.000
    description: "80 apartamentos - diárias meia pensão",
  },
  lifeStyleClubMembership: {
    title: "Mensalidade Clube Life Style",
    members: 6_000,
    monthlyFeePerMember: 500,
    monthlyTotal: 3_000_000,
    description: "6.000 títulos ativos pagando mensalidade",
  },
  barsRestaurantShops: {
    title: "Bares, Restaurantes, Lojas, Eventos",
    dailyFootTraffic: 350,
    averageSpending: 150, // por pessoa
    daysPerMonth: 30,
    monthlyTotal: 1_575_000, // (350 x 150 x 30)
    description: "Fluxo comercial interno - consumo médio",
  },
};

export const totalMonthlyRevenue =
  monthlyRecurringRevenue.residentialSenior.monthlyTotal +
  monthlyRecurringRevenue.hospitality.monthlyTotal +
  monthlyRecurringRevenue.lifeStyleClubMembership.monthlyTotal +
  monthlyRecurringRevenue.barsRestaurantShops.monthlyTotal;
// TOTAL MENSAL: R$ 13.731.000

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

  for (let year = 1; year <= 10; year++) {
    // Assumindo crescimento conservador de 2% ao ano após ano 1
    const growthFactor = 1 + (year > 1 ? 0.02 * (year - 1) : 0);

    const grossRevenue = totalMonthlyRevenue * 12 * growthFactor;
    const hrCosts = totalHRCosts * 12 * (1 + 0.03 * (year - 1)); // 3% inflation annually
    const operationalCosts = totalResidentialCosts * 12 * (1 + 0.03 * (year - 1));
    const financingPayment = financing.monthlyPayment * 12;

    // Juros decrescem conforme o saldo diminui
    const remainingBalance = financing.totalLoan - (financing.monthlyPayment * 12 * (year - 1));
    const interestCost = Math.max(0, remainingBalance * financing.annualInterestRate);

    const totalCosts = hrCosts + operationalCosts + financingPayment + interestCost;
    const netProfit = grossRevenue - totalCosts;
    const roi = ((netProfit * year) / financing.totalLoan) * 100;

    projections.push({
      year,
      grossRevenue: Math.round(grossRevenue),
      hrCosts: Math.round(hrCosts),
      operationalCosts: Math.round(operationalCosts),
      financingPayment: Math.round(financingPayment),
      interestCost: Math.round(interestCost),
      totalCosts: Math.round(totalCosts),
      netProfit: Math.round(netProfit),
      cumulativeProfit: Math.round(netProfit * year),
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
