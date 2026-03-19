/**
 * GIARDINO PROJECT - INVESTMENT MODEL
 * Senior Residence + Lifestyle Club + Subdivision + Shopping
 *
 * COMPLETE FINANCIAL ANALYSIS
 */

// ============================================
// INITIAL REVENUE STRUCTURE (SALES)
// ============================================

export const initialSales = {
  residentialSenior: {
    title: "Senior Residence",
    units: 240,
    pricePerUnit: 5_000_000,
    total: 1_200_000_000,
    description: "240 residential units - sold over 10 years",
  },
  timeShare: {
    title: "Time Share",
    units: 80,
    pricePerUnit: 2_000_000,
    total: 160_000_000,
    description: "80 time-share shares sold",
  },
  lifeStyleClub: {
    title: "Lifestyle Club",
    units: 6_000,
    pricePerUnit: 35_000,
    total: 210_000_000,
    downPayment: 10_000, // per unit
    annualInstallments: 4,
    annualAmount: 10_000, // per installment
    description: "6,000 memberships sold",
  },
  subdivision: {
    title: "Subdivision",
    units: 400,
    pricePerUnit: 400_000,
    total: 160_000_000,
    areaPerUnit: 500, // m²
    description: "400 lots - everyone gets club access",
  },
  mall: {
    title: "Shopping/Mall",
    stores: [
      { type: "Commercial stores", quantity: 250, size: 50, price: 10_000, total: 2_500_000 },
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
// RECURRING MONTHLY REVENUE
// ============================================

export const monthlyRecurringRevenue = {
  residentialSenior: {
    title: "Senior Residence (Monthly Fees)",
    units: 240,
    pricePerUnit: 38_000,
    monthlyTotal: 9_120_000,
    description: "240 occupied units - all-inclusive package",
  },
  lifeStyleClubMembership: {
    title: "Lifestyle Club Membership Fee",
    members: 6_000,
    monthlyFeePerMember: 400,
    monthlyTotal: 2_400_000,
    description: "6,000 active memberships paying monthly fees",
  },
  shoppingMall: {
    title: "Shopping/Mall Rent",
    stores: 250,
    monthlyRentPerStore: 10_000,
    monthlyTotal: 2_500_000,
    description: "250 stores - monthly rent",
  },
  consumption: {
    title: "On-site Spending (Bars, Restaurants, Events)",
    dailyFootTraffic: 500,
    averageSpending: 92, // per person
    daysPerMonth: 30,
    monthlyTotal: 1_380_000, // (500 x 92 x 30)
    description: "Internal commercial traffic - average spending",
  },
};

export const totalMonthlyRevenue =
  monthlyRecurringRevenue.residentialSenior.monthlyTotal +
  monthlyRecurringRevenue.lifeStyleClubMembership.monthlyTotal +
  monthlyRecurringRevenue.shoppingMall.monthlyTotal +
  monthlyRecurringRevenue.consumption.monthlyTotal;
// MONTHLY TOTAL: R$ 15,400,000

// ============================================
// MONTHLY OPERATING COSTS
// ============================================

export const humanResources = {
  housekeeping: {
    title: "Housekeepers",
    quantity: 24,
    salaryPerPerson: 1_800,
    monthlyTotal: 43_200,
    ratio: "1 housekeeper per 10 units",
  },
  culinary: {
    title: "Cooks + Assistants",
    quantity: 26, // 6 cooks + 20 assistants
    salaryPerPerson: 1_800,
    monthlyTotal: 46_800,
    description: "6 cooks + 20 kitchen assistants",
  },
  laundry: {
    title: "Laundry (Washers + Ironers)",
    quantity: 10,
    salaryPerPerson: 1_800,
    monthlyTotal: 18_000,
  },
  cleaning: {
    title: "Cleaning Assistants (Common Areas)",
    quantity: 10,
    salaryPerPerson: 1_800,
    monthlyTotal: 18_000,
  },
  maintenance: {
    title: "Gardeners + Pool Attendants/Lifeguards",
    quantity: 10,
    salaryPerPerson: 1_800,
    monthlyTotal: 18_000,
  },
  beauty: {
    title: "Beauty (Hairdressers, Barbers, Manicurists, Waxing Specialists)",
    quantity: 36, // 6+6+12+6
    salaryPerPerson: 1_800,
    monthlyTotal: 64_800,
  },
  reception: {
    title: "Receptionists",
    quantity: 10,
    salaryPerPerson: 1_800,
    monthlyTotal: 18_000,
  },
  security: {
    title: "Security Guards",
    quantity: 24,
    salaryPerPerson: 3_000,
    monthlyTotal: 72_000,
    description: "24-hour security - 3 shifts",
  },
  healthcare: {
    title: "Nurses",
    quantity: 30,
    salaryPerPerson: 3_000,
    monthlyTotal: 90_000,
    description: "24/7 healthcare",
  },
  administrative: {
    title: "Administration and Management",
    departments: [
      { name: "Office", quantity: 4 },
      { name: "Accounting", quantity: 4 },
      { name: "Customer Service", quantity: 4 },
      { name: "Administration", quantity: 4 },
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
// HR TOTAL: R$ 469,000

export const residentialOperatingCosts = {
  description: "Costs per residential unit (240 units)",
  hosting: {
    title: "Accommodation",
    costPerUnit: 4_500,
    units: 240,
    monthlyTotal: 1_080_000,
  },
  meals: {
    title: "Meals (5 meals/day)",
    costPerUnit: 6_000,
    units: 240,
    monthlyTotal: 1_440_000,
  },
  sportsRecreation: {
    title: "Sports and Recreation",
    costPerUnit: 2_400,
    units: 240,
    monthlyTotal: 576_000,
  },
  medicalCare: {
    title: "Medical/Home Care/Dental Care",
    costPerUnit: 2_400,
    units: 240,
    monthlyTotal: 576_000,
  },
  therapies: {
    title: "Therapies/Physiotherapy and Workshops",
    costPerUnit: 2_400,
    units: 240,
    monthlyTotal: 576_000,
  },
  personalCare: {
    title: "Personal Care",
    costPerUnit: 300,
    units: 240,
    monthlyTotal: 72_000,
  },
};

export const totalResidentialCosts = Object.values(residentialOperatingCosts)
  .filter((item: any) => typeof item === "object" && item.monthlyTotal)
  .reduce((sum: number, item: any) => sum + item.monthlyTotal, 0);
// OPERATIONAL TOTAL: R$ 4,320,000

// ============================================
// FINANCING COSTS (CAPEX)
// ============================================

export const financing = {
  totalLoan: 100_000_000,
  annualInterestRate: 0.06, // 6% per year
  loanTermMonths: 120, // 10 years
  monthlyPayment: 1_000_000, // Principal
  description: "CAPEX financing - 10 years, 6% p.a.",
};

// Monthly interest calculation: 6% / 12 = 0.5%
// Month 1 interest: R$ 100,000,000 * 0.005 = R$ 500,000
// This is an approximation - it may vary monthly as amortization progresses
export const monthlyInterest = financing.totalLoan * (financing.annualInterestRate / 12);

// ============================================
// CONSOLIDATED FINANCIAL SUMMARY
// ============================================

export const financialSummary = {
  initialCapital: {
    downPaymentProposal: 30_000_000, // Down payment proposal
    annualPayments: 20_000_000, // 6 annual installments
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
// FEASIBILITY CALCULATIONS
// ============================================

export const viabilityAnalysis = {
  monthlyGrossRevenue: totalMonthlyRevenue,
  monthlyOperatingExpenses: totalHRCosts + totalResidentialCosts,
  monthlyFinancingCost: financing.monthlyPayment + monthlyInterest,
  monthlyNetProfit:
    totalMonthlyRevenue -
    (totalHRCosts + totalResidentialCosts + financing.monthlyPayment + monthlyInterest),
  breakEvenAnalysis: {
    description: "Break-even analysis",
    monthsToBreakEven: "TBD",
  },
  roi: {
    totalInitialInvestment: 150_000_000, // Down payment proposal
    projectedAnnualProfit:
      (totalMonthlyRevenue - totalHRCosts - totalResidentialCosts - financing.monthlyPayment - monthlyInterest) * 12,
  },
};

// ============================================
// PROJECT STRUCTURAL DATA
// ============================================

export const projectStructure = {
  residentialSenior: {
    title: "Senior Residence + Spa",
    totalUnits: 240,
    type: "Residential with specialized services",
    services: [
      "All-inclusive accommodation",
      "Meals (5 meals/day)",
      "24/7 medical care",
      "Therapies and physiotherapy",
      "Sports activities",
      "Beauty services",
      "Home care",
      "Dental care",
    ],
  },
  hospitality: {
    title: "Accommodation (Inn/Hotel)",
    totalUnits: 80,
    type: "Tourist accommodation",
    dailyRate: 1_200,
    occupancyTarget: 0.3,
  },
  lifeStyleClub: {
    title: "Lifestyle Club",
    totalMembers: 6_000,
    benefitsPerMember: "Full access 360 days/year",
    facilities: [
      "Spa",
      "Pools",
      "Sports courts",
      "Kids area",
      "Gym",
      "Medical and dental consultations",
      "Hairdressing and beauty",
      "Convention center",
      "Event halls",
      "Bars and restaurants",
      "Accommodation",
      "Shops",
    ],
  },
  subdivision: {
    title: "Residential Subdivision",
    totalUnits: 400,
    areaPerUnit: 500,
    pricePerUnit: 360_000,
    bonus: "Everyone gets club access",
  },
  commercial: {
    title: "Commercial Center (Shopping Mall)",
    categories: [
      "200 commercial stores (50 m²)",
      "50 food outlets",
      "Gas station",
      "2 cinemas",
      "Supermarket",
      "Pet store",
      "Pharmacy",
      "Drugstore",
    ],
  },
};

// ============================================
// SERVICES INCLUDED IN THE RESIDENTIAL PACKAGE
// ============================================

export const includedServices = [
  "Daily cleaning",
  "Linen change 3x/week",
  "Pool towels daily",
  "Full laundry service 1x/week",
  "5 meals per day",
  "1 sports activity/day",
  "Therapy or physiotherapy 3x/week + 2 workshops",
  "Medical care and home care",
  "Free games room",
  "8 parties/events per month",
  "Emergency ambulance",
  "Concierge and butler",
  "Internal transport",
  "Water, electricity, and internet",
  "Manicure/pedicure (4x/month)",
  "Hairdresser (4x/month)",
  "Facial cleansing (2x/month)",
  "Waxing (2x/month)",
];

// ============================================
// ADDITIONAL SERVICES (NOT INCLUDED)
// ============================================

export const additionalServices = [
  "Personal medications",
  "Adult diapers",
  "Personal hygiene products",
  "Transportation for outings (R$6/km)",
  "Leisure trips",
  "Helicopter transport",
  "Personal shopping",
  "Full-time assistance",
];

// ============================================
// MULTI-YEAR FINANCIAL PROJECTIONS
// ============================================

export const generateYearlyProjections = () => {
  const projections = [];
  let cumulativeProfit = 0;

  // Occupancy/ramp-up factor: starting at 80% and reaching 100% in year 3
  const rampUpFactors = [0.80, 0.90, 1.0, 1.02, 1.04, 1.06, 1.08, 1.10, 1.12, 1.15];

  for (let year = 1; year <= 10; year++) {
    const rampFactor = rampUpFactors[year - 1] || 1.15;

    // Gross revenue with ramp-up and gradual growth
    const grossRevenue = Math.round(totalMonthlyRevenue * 12 * rampFactor);

    // Costs with annual inflation of 2%
    const costInflation = 1 + (year > 1 ? 0.02 * (year - 1) : 0);
    const hrCosts = Math.round(totalHRCosts * 12 * costInflation);
    const operationalCosts = Math.round(totalResidentialCosts * 12 * costInflation);
    const financingPayment = Math.round(financing.monthlyPayment * 12);

    // Interest decreases as the balance decreases
    const remainingBalance = Math.max(0, financing.totalLoan - (financing.monthlyPayment * 12 * (year - 1)));
    const interestCost = Math.round(remainingBalance * financing.annualInterestRate);

    const totalCosts = hrCosts + operationalCosts + financingPayment + interestCost;
    const netProfit = grossRevenue - totalCosts;

    cumulativeProfit += netProfit;

    // ROI calculated on cumulative profit versus initial investment
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
// FULL EXPORT
// ============================================

export const giardino = {
  projectName: "GIARDINO - Investment Model",
  location: "Mogi das Cruzes - São Paulo",
  description: "Complex project: Senior Residence + Lifestyle Club + Subdivision + Shopping",

  // Financial data
  sales: initialSales,
  totalSales: totalInitialSales,
  monthlyRevenue: monthlyRecurringRevenue,
  totalMonthlyRevenue: totalMonthlyRevenue,
  hrCosts: humanResources,
  residentialCosts: residentialOperatingCosts,
  financing: financing,

  // Analyses
  summary: financialSummary,
  viability: viabilityAnalysis,

  // Projections
  yearlyProjections: yearlyProjections,

  // Structure
  structure: projectStructure,
  services: {
    included: includedServices,
    additional: additionalServices,
  },
};
