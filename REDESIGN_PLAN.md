# GIARDINO PREMIUM REDESIGN - PLANO ESTRATÉGICO COMPLETO

## 1. DIAGNÓSTICO VISUAL DA INTERFACE ATUAL

### Problemas identificados

#### 1.1 Hierarquia Visual
- Estrutura "blocos empilhados" sem narrativa clara
- KPI cards sem hierarquia de importância
- Falta de contraste entre seções
- Titularidade fraca e pouco memorável
- Respiração inconsistente entre conteúdos

#### 1.2 Layout e Grid
- Margens e padding inconsistentes
- Falta de alinhamento profissional
- Grid não define ritmo visual
- Espaços vazios subutilizados como recurso
- Separação de seções sem intenção artística

#### 1.3 Hero Section
- Simples demais para causar impacto
- Falta de elemento visual focal
- Sem profundidade ou efeito cinemátográfico
- CTA pouco destacado
- Entrada estática, sem motion

#### 1.4 Tipografia
- Escalas de tamanho não bem definidas
- Falta de contraste entre títulos e corpo
- Tracking e line-height inconsistentes
- Headlines sem "peso" visual
- Números/KPIs sem destaque especial

#### 1.5 Cards e Componentes
- Visuais genéricos, sem acabamento
- Bordas duras, sem sofisticação
- Hover states insuficientes
- Sombras pobres ou inexistentes
- Falta de camadas internas

#### 1.6 Gráficos
- Estáticos, sem animação
- Aparência padrão de biblioteca
- Sem narrativa ou storytelling
- Dados não "entrando em cena"
- Legendas e tooltips básicos

#### 1.7 Motion e Interações
- Poucas animações presentes
- Transições abruptas
- Sem paralax ou scroll reveals
- Microinterações ausentes
- Feedback visual limitado

#### 1.8 Profundidade e Premium
- Interface plana, sem camadas
- Falta de glow ou efeitos leves
- Ausência de glassmorphism sofisticado
- Sem sensação de valor ou luxo
- Comparável a template genérico

---

## 2. DIREÇÃO CRIATIVA - CONCEITO PREMIUM HIGH-END

### 2.1 Posicionamento Visual

**Objetivo:** Interface que transmita instantaneamente sofisticação, credibilidade, exclusividade, inovação e percepção de alto valor.

### 2.2 Linguagem Estética

A página deve equilibrar:

```
MINIMALISMO PREMIUM
├─ Limpo, mas rico
├─ Detalhes refinados
├─ Sem excessos desnecessários
└─ Composição inteligente

EDITORIAL SOFISTICADO
├─ Tipografia como elemento de marca
├─ Hierarquia clara e cinematográfica
├─ Ritmo visual controlado
└─ Narrativa visual forte

DASHBOARDS DE ALTA PERFORMANCE
├─ Dados em destaque aspiracional
├─ Métricas com impacto visual
├─ Gráficos dinâmicos e narrativos
└─ Profundidade e camadas

MOTION ELEGANTE
├─ Reveal on scroll sutis
├─ Stagger timing premium
├─ Transições fluidas
└─ Microanimações contextualizadas

PROFUNDIDADE VISUAL
├─ Glassmorphism discreto (não exagerado)
├─ Gradientes sofisticados
├─ Sombras realistas e suaves
├─ Contraste refinado
└─ Separação de planos clara
```

### 2.3 Inspirações Conceituais

Referências visuais para tom/estilo:

- **Premium Fintech Dashboards**: interfaces de investimento de alto nível
- **Luxury Real Estate**: apresentações sofisticadas de propriedades
- **High-End SaaS**: websites de produtos premium (Stripe, Notion Enterprise)
- **Investment Platforms**: Bloomerg Terminal-like, mas accessível
- **Hospitality Luxury**: landing pages de marcas de luxo
- **Modern Data Storytelling**: visualizações refinadas e narrativas
- **Editorial Tech**: Apple, Tesla - design autoral e memorável

---

## 3. ESTRUTURA COMPLETA DA PÁGINA - SEÇÃO POR SEÇÃO

### 3.1 Header Refeito (Premium)

**Função estratégica:** Estabelecer imediatamente o tom premium, confiança e sofisticação.

**Componentes:**
- Logo aumentada e com espaço generoso
- Título/marca com tipografia forte
- Subtítulo refinado com hierarchia clara
- Divisor visual elegante (linha + ícone animado)
- Decoração sutil em background

**Motion:**
- Entrada fade + scale suave (200ms, ease-out)
- Ícone de decoração com rotação contínua leve (duração: 8s)
- Parallax discreto ao scroll

**Visual:**
- Background com gradiente sutil (azul marinho + verde escuro)
- Glow suave em segundo plano
- Linhas decorativas que desaparecem em mobile

---

### 3.2 Hero Section (Novo Padrão)

**Função estratégica:** Impacto inicial de tirar o fôlego. "Capa de produto premium."

**Estrutura de grid:**

```
[Desktop]
┌─────────────────────────────────────┐
│       HEADLINE (72px bold)          │
│       Subtítulo (24px light)        │
│                                     │
│  [Botão primário]  [Botão secundário]│
│                                     │
│     [Visual focal com glow]         │
│     (3D, gradient ou elemento chave) │
│                                     │
│    [Dados aspiracionais]            │
│     KPI 1 | KPI 2 | KPI 3          │
└─────────────────────────────────────┘

[Mobile]
┌─────────────────────────┐
│ HEADLINE (48px)         │
│ Subtítulo (18px)        │
│                         │
│ [Botão primário]        │
│                         │
│ [Visual] (responsivo)   │
│                         │
│ KPI empilhados          │
└─────────────────────────┘
```

**Elementos visuais:**
- Background com múltiplas camadas:
  - Gradient base (135deg, navy → teal)
  - Overlay com textura leve
  - Glow radial em um canto (dourado 10% opacity)
  - Padrão grid sutilíssimo
- Elemento focal:
  - Pode ser 3D com Three.js
  - Ou gradiente animado com forma orgânica
  - Ou padrão de dados em visualização abstrata
  - Com sombra dramática

**Tipografia:**
- Headline: 72px (desktop) / 48px (mobile), bold, azul marinho, 1.2 line-height
- Subtítulo: 24px (desktop) / 18px (mobile), light, cinza neutro, 1.5 line-height
- Supporting text: 16px regular, cinza com 85% opacity

**CTAs no Hero:**
- Primário: botão preenchido (accent gold), com shadow sutil, hover com elevation
- Secundário: outlined, hover com background suave

**Motion:**
```
Timeline de entrada (sequência):
0ms   → Headline: fade + slideUp (1000ms ease-out-back)
200ms → Subtítulo: fade (800ms)
400ms → CTAs: scale + fade (600ms)
600ms → Visual focal: scale + glow pulse (1200ms)
800ms → KPIs: stagger fade + slideUp (400ms each)
```

**Interatividade:**
- Hover no visual focal: leve elevation + glow aumenta
- CTAs: estados bem definidos (hover, active, focus)
- Parallax suave ao scroll (20px offset)

---

### 3.3 Seção de KPIs Principais

**Função estratégica:** Demonstrar números aspiracionais com impacto emocional.

**Layout:**
- Grid 4 colunas (desktop), 2 colunas (tablet), 1 coluna (mobile)
- Espaçamento generoso (gap: 2rem)
- Cards com altura consistente mas proporcional

**Componentes de cada KPI Card:**

```
┌─────────────────────────┐
│ [Ícone sofisticado] 🔶  │
│                         │
│ Título da métrica       │
│ (14px, semibold, gray)  │
│                         │
│ NÚMERO GRANDE           │
│ (56px bold accent)      │
│                         │
│ Contexto: +23% YoY      │
│ (12px, success green)   │
│                         │
│ [Subtle bar indicator]  │
│ ▓▓▓▓▓░░░░░░ 58%        │
└─────────────────────────┘
```

**Visual:**
- Fundo: subtle gradient overlay (navy 5% opacity sobre branco)
- Borda: 1px accent color com 30% opacity
- Shadow: soft shadow (0 4px 20px rgba(0,0,0,0.08))
- Border radius: 16px
- Hover state: elevation + border color 80% opacity + light glow sutil

**Tipografia:**
- Ícone: 32px
- Título: 14px, semibold, gray-600
- Número: 56px, bold, accent color
- Contexto: 12px, regular, success/warning cor

**Motion:**
- Entrada (staggered): cada card entra com delay de 100ms
- Animação: fade + slideUp (500ms ease-out)
- Contador animado: número cresce de 0 → valor (800ms)
- Loop suave: ícone tem subtle pulse (2s infinite)
- Hover: card faz leve elevation (transform: translateY(-4px))

**Ícones:**
- Outline premium (Lucide ou custom SVG)
- Tamanho 32x32
- Color: accent ou primary conforme categoria

---

### 3.4 Seção de Dados / Analytics

**Função estratégica:** Contar história através de dados. "Visualizar a narrativa."

**Layout:**
- Seção em grid assimétrico:
  - Coluna esquerda: 40% (Texto + destaque)
  - Coluna direita: 60% (Gráfico dominante)
- Em mobile: stack vertical (100%)

**Componentes:**

#### 3.4.1 Bloco de Narrativa
```
┌─────────────────────────────┐
│ SEÇÃO HEADLINE              │
│ (Cor accent, 12px)          │
│                             │
│ Título Editorial            │
│ (48px bold navy, 1.2 lh)    │
│                             │
│ Parágrafo de contexto       │
│ (16px regular gray, 1.6 lh) │
│                             │
│ • Ponto-chave 1             │
│ • Ponto-chave 2             │
│ • Ponto-chave 3             │
│                             │
│ Destaque numérico:          │
│ ROI: 237% (32px bold)       │
└─────────────────────────────┘
```

#### 3.4.2 Gráficos Dinâmicos

**Tipos e onde usar:**

1. **Line Chart (Receita Mensal)**
   - Animação de entrada: linhas crescendo progressivamente (1200ms)
   - Tooltip sofisticado: background glass + shadow
   - Hover: ponto destacado com glow
   - Área preenchida com gradiente sutil (20% opacity)
   - Grid lines muito leves (10% gray)
   - Eixos discretos (gray 40%)

2. **Bar Chart (Custos por Categoria)**
   - Animação: barras crescem de baixo para cima (staggered 100ms each)
   - Hover: barra brighter + elevation
   - Cor por categoria (verde, ouro, azul)
   - Valores no topo de cada barra (pequeno)
   - Label com ícone ao lado

3. **Radial/Donut Chart (Distribuição)**
   - Animação SVG: strokeDasharray crescendo (800ms ease-out)
   - Hover: segmento aumenta e brilha
   - Center: número total ou percentual
   - Legend abaixo com cores e valores
   - Tooltip ao hover no segmento

4. **Area Chart (Projeção Anual)**
   - Múltiplas áreas empilhadas
   - Cores com transparência (50%)
   - Hover: tooltip com valores de todas as áreas
   - Animação entrada: areas crescem alternadamente

**Motion no setor de gráficos:**
- Reveal on scroll: gráfico aparece quando 50% visível
- Entrada: fade (300ms) + scale 0.95 → 1 (500ms)
- Contador de valores: números animam ao mesmo tempo que gráficos
- Legend items: fade staggered (100ms each)

**Responsividade:**
- Desktop: lado a lado
- Tablet: gráficos maiores, text abaixo
- Mobile: 100% width, gráfico reescalado, text acima

---

### 3.5 Seção de Benefícios / Diferenciais

**Função estratégica:** Comunicar valor e exclusividade de forma visual.

**Layout:**
- Grid 3 colunas (desktop), 2 colunas (tablet), 1 coluna (mobile)
- Seção headline + subtítulo acima
- Cards em blob/organic shapes (opcional, premium)

**Card de Benefício:**

```
┌──────────────────────────┐
│  ╭─ [Ícone animado]      │
│  │     (48x48)           │
│  │                       │
│  │ Título do Benefício   │
│  │ (18px bold, navy)     │
│  │                       │
│  │ Descrição concisa     │
│  │ (14px regular, gray)  │
│  │                       │
│  └─ [Number badge]       │
│        ① ou #01          │
└──────────────────────────┘
```

**Visual:**
- Fundo: gradiente suave (accent 5% → transparent)
- Ícone: outline com stroke 2px, color accent ou primary
- Borda: none ou 1px accent 20% opacity
- Hover: elevation + icon pulse + subtle glow
- Aspect ratio: 1:1.1 (quadrado alongado)

**Motion:**
- Entrada: fade + slideUp (staggered 150ms)
- Icon: pulse loop (ícone respira, 3s infinite)
- Hover: icon rotates + background brilha
- Text: no hover, subtítulo ganha cor accent

---

### 3.6 Seção de Confiança / Credibilidade

**Função estratégica:** Validação, provas sociais, números que impressionam.

**Layout:**
- Fundo com background premium (texture + glow)
- Grid assimétrico ou hero-style

**Componentes:**

```
┌────────────────────────────────┐
│ HEADLINE (48px, centered)      │
│ Subtítulo (20px, centered)     │
│                                │
│ ┌─────────┬─────────┬────────┐ │
│ │ NÚMERO  │ NÚMERO  │ NÚMERO │ │
│ │  12+    │  500K   │  98%   │ │
│ │Metric 1 │Metric 2 │Metric 3│ │
│ └─────────┴─────────┴────────┘ │
│                                │
│ Logo/selos de certificação     │
│ ou depoimentos de clientes     │
└────────────────────────────────┘
```

**Motion:**
- Números animam com counter (800ms ease-out)
- Entrada em stagger suave
- Pulse suave no número quando chega ao valor final

---

### 3.7 Seção de Processo / Timeline

**Função estratégica:** Mostrar jornada/caminho de forma sofisticada.

**Layout:**
- Timeline vertical (desktop/tablet) ou horizontal scroll (mobile)
- Etapas conectadas visualmente
- Indicador de progresso

```
    ① Planejamento
       ↓
    ② Análise
       ↓
    ③ Implementação
       ↓
    ④ Validação
```

**Componente Etapa:**

```
┌─────────────────────┐
│  ⓵ Etapa (24px)    │
│                    │
│  Título            │
│  (20px bold)       │
│                    │
│  Descrição breve   │
│  (14px regular)    │
│                    │
│  [Ícone contexto]  │
└─────────────────────┘
```

**Motion:**
- Entrada: número e texto aparecem com fade + slideUp
- Conector: linha cresce de top → bottom ao scroll
- Hover: card ganha cor accent e elevation

---

### 3.8 CTA Final / Fechamento

**Função estratégica:** Conversão de alto impacto.

**Layout:**
- Full width background premium
- Centered text
- Botões horizontais

```
┌──────────────────────────────┐
│  HEADLINE IMPACTANTE         │
│  (60px bold, white/gold)     │
│                              │
│  Subtítulo com urgência      │
│  (20px light, branco 90%)    │
│                              │
│ [CTA PRIMARY] [CTA SECONDARY]│
│                              │
│ Disclaimer ou nota pequena   │
└──────────────────────────────┘
```

**Visual:**
- Background: gradiente dinâmico (navy → accent)
- Com overlay padrão grid sutilíssimo
- Glow radial em canto
- Elemento decorativo animado (forma, partículas)

**Motion:**
- Entrada: fade + scale (600ms)
- Botão: hover com elevation + glow
- Background: subtle animation de padrão (30s loop)

---

## 4. DESIGN SYSTEM - DEFINIÇÃO COMPLETA

### 4.1 Paleta de Cores

**Cores Primárias:**

```
Primary Navy:       #1F3B5E (RGB: 31, 59, 94)   - Headlines, backgrounds
Secondary Green:    #2D5016 (RGB: 45, 80, 22)   - Accents, highlights
Accent Gold:        #F4C430 (RGB: 244, 196, 48) - CTAs, callouts

Light White:        #FFFFFF (RGB: 255, 255, 255)
Dark Gray:          #1A1A1A (RGB: 26, 26, 26)

Neutrals:
├─ Gray 900:        #111827
├─ Gray 800:        #1F2937
├─ Gray 700:        #374151
├─ Gray 600:        #4B5563
├─ Gray 500:        #6B7280
├─ Gray 400:        #9CA3AF
├─ Gray 300:        #D1D5DB
├─ Gray 200:        #E5E7EB
└─ Gray 50:         #F9FAFB

Semantic:
├─ Success:         #10B981 (verde)
├─ Warning:         #F59E0B (âmbar)
├─ Error:           #EF4444 (vermelho)
└─ Info:            #3B82F6 (azul)
```

**Gradientes Principais:**

```
Hero Gradient:
  linear-gradient(135deg, #1F3B5E 0%, #2D5A8C 50%, #F4C430 100%)

Card Gradient (subtle):
  linear-gradient(180deg, rgba(31, 59, 94, 0.05) 0%, transparent 100%)

Glow Radial (accent):
  radial-gradient(circle at center, rgba(244, 196, 48, 0.15) 0%, transparent 70%)

Dark Gradient (sections):
  linear-gradient(180deg, #1F3B5E 0%, #2D5016 100%)

Premium Overlay:
  linear-gradient(180deg, rgba(255,255,255, 0.8) 0%, rgba(255,255,255, 0) 100%)
```

### 4.2 Tipografia

**Font Families:**

```
Headlines:        "Inter Bold" ou "Sora Bold" (Google Fonts / system)
Body:             "Inter Regular" / "System Font Stack"
Numbers/Data:     "Inter Medium" com tracking aumentado
```

**Escala Tipográfica:**

```
H1:    72px / 88px (desktop)     │ 48px (mobile)  │ Bold     │ LH: 1.2
H2:    56px / 68px (desktop)     │ 36px (mobile)  │ Bold     │ LH: 1.2
H3:    40px / 48px (desktop)     │ 28px (mobile)  │ Semibold │ LH: 1.3
H4:    28px / 32px (desktop)     │ 24px (mobile)  │ Semibold │ LH: 1.3
H5:    24px / 28px (desktop)     │ 20px (mobile)  │ Semibold │ LH: 1.4
H6:    20px / 24px (desktop)     │ 18px (mobile)  │ Medium   │ LH: 1.4

Body L: 18px / 20px              │ Regular        │ LH: 1.6
Body:   16px / 18px              │ Regular        │ LH: 1.6
Body S: 14px / 16px              │ Regular        │ LH: 1.6
Caption: 12px / 14px             │ Regular        │ LH: 1.5
Tiny:    10px / 12px             │ Regular        │ LH: 1.4

Data/Numbers: 56px / 40px / 28px │ Bold or Medium │ LH: 1.2 (tight)
Label:        12px               │ Semibold       │ LH: 1.4 (tracking +0.5px)
```

**Letter Spacing (tracking):**

```
Headlines:    0px (normal)
Body:         0px (normal)
Labels/Tags:  +0.5px (espacado premium)
Data/Numbers: -0.5px (compressed para impacto)
```

### 4.3 Spacing / Espaçamento

**Scale (em `rem` e `px`):**

```
4px  (0.25rem)  - Very tight, apenas micro-gaps
8px  (0.5rem)   - Tight, entre elementos próximos
12px (0.75rem)  - Small gaps
16px (1rem)     - Default/base spacing
24px (1.5rem)   - Medium
32px (2rem)     - Large (seções internas)
40px (2.5rem)   - XL
48px (3rem)     - XXL
64px (4rem)     - XXXL (entre seções principais)
80px (5rem)     - Hero spacing
96px (6rem)     - Max breathing room
```

**Aplicação:**

```
Card padding:          24px
Section padding (top): 64px
Section padding (bottom): 64px
Section gutter:        40px (gap entre colunas)
Element gap:           16px
Mobile reduce by:      30-50% (64px → 40px, etc)
```

### 4.4 Border Radius

```
sm:  4px    - Inputs, small components
md:  8px    - Cards, medium components
lg:  12px   - Larger cards, groups
xl:  16px   - Premium cards, prominent blocks
2xl: 20px   - Large sections
3xl: 24px   - Hero regions
full: 50%   - Pills, circular elements
```

### 4.5 Shadows

**Hierarchy de Sombras:**

```
Subtle:
  0 2px 4px rgba(0, 0, 0, 0.05)

Soft:
  0 4px 12px rgba(0, 0, 0, 0.08)

Medium:
  0 8px 16px rgba(0, 0, 0, 0.12)

Elevated:
  0 12px 32px rgba(0, 0, 0, 0.15)

Dramatic:
  0 20px 48px rgba(0, 0, 0, 0.20)

Luxury (com color tint):
  0 4px 20px rgba(31, 59, 94, 0.15)
  + 0 -2px 8px rgba(244, 196, 48, 0.10)
```

### 4.6 Borders

```
1px solid    - Subtle, primary outline
1px solid    - Com accent color 30% opacity (premium look)
2px solid    - Bold, highlight
No border    - Minimal look (mas shadow)
```

### 4.7 Opacity Scale

```
100% (1.00) - Full opaque
90%  (0.90) - Slight transparency
80%  (0.80) - Visible but faded
70%  (0.70) - Muted
60%  (0.60) - Soft
50%  (0.50) - Medium transparency
40%  (0.40) - Light
30%  (0.30) - Very light
20%  (0.20) - Subtle
10%  (0.10) - Almost invisible
5%   (0.05) - Barely visible (backgrounds)
```

---

## 5. MOTION SYSTEM - ESPECIFICAÇÃO COMPLETA

### 5.1 Durations

```
Micro:    150ms (feedback instant, micro-interactions)
Quick:    200ms (button hover, label change)
Standard: 300-400ms (normal transitions)
Slow:     600-800ms (entrance animations, reveal)
Epic:     1200ms+ (hero section, major reveals)

Presets:
├─ Entrance:  500-800ms, ease-out
├─ Exit:      300-500ms, ease-in
├─ Hover:     200ms, ease-out
├─ Loading:   infinite, ease-in-out
└─ Scroll:    depend on delta
```

### 5.2 Easing Functions

```
ease-out:        cubic-bezier(0.16, 1, 0.3, 1)     - Decelerate, softer entrance
ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1)      - Symmetric, calm
ease-back:       custom back easing                 - Bouncy return
ease-elastic:    custom elastic                      - Spring-like
ease-linear:     linear                              - Constant (pour loops)

Default (Framer Motion):
├─ default:      { duration: 0.3, ease: "easeOut" }
├─ tappable:     { duration: 0.1, ease: "easeOut" }
└─ spring:       { damping: 20, stiffness: 300 }
```

### 5.3 Animation Presets

#### 5.3.1 Entrance Animations

**Fade + SlideUp (padrão):**
```js
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: "easeOut" }}
```

**Scale + Fade (elementos focais):**
```js
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6, ease: "easeOut" }}
```

**Stagger Container (múltiplos items):**
```js
variants={{
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}}
```

**Stagger Child:**
```js
variants={{
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}}
```

#### 5.3.2 Hover Animations

**Card Elevation:**
```js
whileHover={{ y: -4, transition: { duration: 0.2 } }}
```

**Icon Pulse:**
```js
animate={{ scale: [1, 1.05, 1] }}
transition={{ duration: 2, repeat: Infinity }}
```

**Button Press:**
```js
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

#### 5.3.3 Scroll-Based Animations

**Reveal on Scroll (Intersection Observer):**
```js
// Trigger animation quando elemento entra viewport (50% visible)
animate when scrollIntoView
fade + slideUp 0.5s ease-out
```

**Parallax:**
```js
// Offset Y baseado em scroll position
y = scrollY * 0.3  (conservative, 30% parallax)
```

#### 5.3.4 Continuous/Loop Animations

**Rotation (decorativo):**
```js
animate={{ rotate: 360 }}
transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
```

**Pulse (breathing effect):**
```js
animate={{ opacity: [1, 0.7, 1] }}
transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
```

**Counter (números animados):**
```js
useMotionValue + useTransform
Display: update on scroll/timer
```

### 5.4 Interaction States

**Button States:**
```
Rest:       Normal appearance
Hover:      Scale 1.02 + shadow increase
Active/Tap: Scale 0.98 + shadow decrease
Disabled:   Opacity 0.5 + no hover
Focus:      Ring with accent color
```

**Card States:**
```
Rest:       Normal shadow, no color shift
Hover:      Elevation +4px, border/glow brighten, content may shift
Active:     State indication (checkmark, badge)
```

---

## 6. ESPECIFICAÇÃO DE GRÁFICOS

### 6.1 Tipos de Gráficos e Localização

#### Line Chart - Receita Mensal

**Localização:** Analytics section, lado direito (desktop)

**Dados:** Série temporal de 12 meses

**Animação de Entrada:**
```
- Linhas crescem gradualmente (strokeDasharray animation)
- Duração: 1200ms
- Easing: ease-out
- Stagger: cada série entra 100ms depois da anterior
- Quando pronto: área preenchida com gradiente
```

**Interações:**
```
- Hover no ponto: tooltip com valor exato
- Tooltip style: glass effect background + shadow + border
- Ponto: destaca com glow + aumenta de tamanho
- Grid lines: muito leves (10% opacity), suaviza no zoom
```

**Styling:**
```
Linha 1 (Receita): #1F3B5E (navy) - stroke width 3px
Linha 2 (Projeção): #F4C430 (accent) - stroke width 2px com dashes
Área: linear-gradient(180deg, #1F3B5E 0%, transparent 100%), opacity 20%
Grid: rgba(107, 114, 128, 0.1)
Eixos: rgba(107, 114, 128, 0.4)
Labels: 12px regular gray-600
```

#### Bar Chart - Custos por Categoria

**Localização:** Analytics section, alternado

**Dados:** 5-7 categorias de custo

**Animação de Entrada:**
```
- Barras crescem de bottom para top (transform: scaleY)
- Duração: 600ms cada
- Stagger: 80ms entre barras
- Total: ~800ms
- Easing: ease-out-back (bouncy soft)
```

**Interações:**
```
- Hover na barra: brighten cor + elevation shadow + tooltip
- Valor aparece no topo da barra
- Label ao lado com ícone categoria
```

**Styling:**
```
Cores por categoria:
├─ Verde:  #10B981 (operacional)
├─ Ouro:   #F4C430 (financeiro)
├─ Azul:   #3B82F6 (administrativo)
├─ Vermelho: #EF4444 (contingência)
└─ Cinza:  #9CA3AF (outros)

Stroke: 1px subtly darker
Shadow on hover: 0 8px 16px rgba(0,0,0,0.12)
```

#### Radial / Donut Chart - Distribuição de Valor

**Localização:** Benefits/features section, seção destaque

**Dados:** 4-6 segmentos de distribuição

**Animação de Entrada:**
```
- SVG strokeDasharray grow de 0 → 100%
- Duração: 800ms
- Easing: ease-out
- Stagger: cada segmento 100ms depois
- Center pode ter contador animado
```

**Interações:**
```
- Hover no segmento: aumenta radius + brilho + tooltip
- Legend abaixo com cores e percentual
- Legend items fade in staggered
```

**Styling:**
```
Segmento 1: #1F3B5E
Segmento 2: #2D5016
Segmento 3: #F4C430
Segmento 4: #10B981
Stroke (separação): 2px white
Center text: número grande + label pequeno
```

#### Area Chart - Projeção Anual Empilhada

**Localização:** CTA section ou última analytics

**Dados:** 3-4 séries empilhadas ao longo de meses

**Animação de Entrada:**
```
- Áreas crescem progressivamente (strokeDasharray → fill)
- Duração: 1000ms
- Easing: ease-out
- Stagger: 150ms entre séries
```

**Styling:**
```
Área 1: rgba(31, 59, 94, 0.4)  - base
Área 2: rgba(45, 80, 22, 0.3)  - over
Área 3: rgba(244, 196, 48, 0.2) - top
Stroke: 2px solid color de cada série
```

### 6.2 Tooltips e Legendas

**Tooltip Style:**
```
Background:   rgba(31, 59, 94, 0.95) com backdrop-filter: blur(10px)
Border:       1px solid rgba(244, 196, 48, 0.3)
Padding:      12px 16px
Border-radius: 8px
Shadow:       0 8px 32px rgba(0, 0, 0, 0.15)
Text:         14px regular white
Arrow:        subtle, matching color
```

**Legend Style:**
```
Position:     Below chart ou inline
Layout:       Horizontal flex com gap 24px
Item:         12px label + 12x12px color square
Hover:        dim other items (opacity 30%)
```

### 6.3 Responsividade de Gráficos

```
Desktop: 100% width, full height
Tablet:  90% width, reduce height 20%
Mobile:  100% width, reduce height 40%, stack vertical if needed
```

---

## 7. ESTRUTURA DE COMPONENTES - ORGANIZAÇÃO

### 7.1 Estrutura de Pastas Recomendada

```
client/
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx        (NEW)
│   │   ├── KPISection.tsx         (NEW)
│   │   ├── AnalyticsSection.tsx   (NEW)
│   │   ├── BenefitsSection.tsx    (NEW)
│   │   ├── CredibilitySection.tsx (NEW)
│   │   ├── ProcessSection.tsx     (NEW)
│   │   ├── CTASection.tsx         (NEW)
│   │   └── index.ts
│   │
│   ├── charts/
│   │   ├── LineChartAnimated.tsx      (ENHANCE)
│   │   ├── BarChartAnimated.tsx       (ENHANCE)
│   │   ├── RadialChartAnimated.tsx    (NEW)
│   │   ├── AreaChartAnimated.tsx      (NEW)
│   │   ├── ChartTooltip.tsx           (NEW)
│   │   ├── ChartLegend.tsx            (NEW)
│   │   └── index.ts
│   │
│   ├── cards/
│   │   ├── KPICard.tsx            (REFACTOR → premium)
│   │   ├── FeatureCard.tsx        (NEW)
│   │   ├── BenefitCard.tsx        (NEW)
│   │   ├── DataCard.tsx           (NEW)
│   │   └── index.ts
│   │
│   ├── motion/
│   │   ├── useRevealOnScroll.ts   (NEW)
│   │   ├── motionPresets.ts       (NEW)
│   │   ├── ScrollRevealWrapper.tsx (NEW)
│   │   └── index.ts
│   │
│   ├── icons/
│   │   ├── AnimatedIcon.tsx       (NEW)
│   │   ├── IconWrapper.tsx        (NEW)
│   │   └── index.ts
│   │
│   ├── PremiumHeader.tsx          (ENHANCE - já iniciado)
│   ├── PremiumFooter.tsx          (ENHANCE)
│   ├── PremiumGallery.tsx         (OK, keep)
│   ├── SimplePDFExport.tsx        (OK, keep)
│   └── ui/
│       └── ...existing radix components...
│
├── styles/
│   ├── design-tokens.css          (ENHANCE)
│   ├── motion.css                 (NEW - keyframes premium)
│   ├── typography.css             (NEW - font scales)
│   └── scroll-snap.css            (OK, keep)
│
├── hooks/
│   ├── use-scroll-sync.ts         (OK)
│   ├── use-theme-tokens.ts        (OK)
│   ├── use-reveal-on-scroll.ts    (NEW)
│   ├── use-counter-animation.ts   (NEW)
│   ├── use-chart-animation.ts     (NEW)
│   └── ...existing hooks...
│
├── lib/
│   ├── animation-helpers.ts       (NEW)
│   ├── chart-helpers.ts           (NEW)
│   └── utils.ts
│
└── pages/
    ├── Dashboard.tsx              (REFACTOR - usar novas seções)
    └── ...
```

### 7.2 Componentes a Criar/Refatorar

**Seções (novo):**
- HeroSection
- KPISection
- AnalyticsSection
- BenefitsSection
- CredibilitySection
- ProcessSection
- CTASection

**Cards (novo/refator):**
- KPICard (refactor premium)
- FeatureCard
- BenefitCard
- DataCard

**Gráficos (enhance):**
- LineChartAnimated (enhance com animação)
- BarChartAnimated (enhance)
- RadialChartAnimated (novo)
- AreaChartAnimated (novo)
- ChartTooltip (novo)
- ChartLegend (novo)

**Motion (novo):**
- useRevealOnScroll hook
- motionPresets (constants)
- ScrollRevealWrapper component

**Ícones (novo):**
- AnimatedIcon wrapper
- IconWrapper para contextualização

---

## 8. PLANO DE IMPLEMENTAÇÃO

### Fase 1: Setup e Design System (1-2 dias)
1. Update tailwind.config.ts com nova paleta e tokens
2. Update global.css com nova escala tipográfica e spacing
3. Criar motion.css com keyframes premium
4. Criar design-tokens.ts com constants
5. Create motionPresets.ts com animation configs

### Fase 2: Componentes Base (2-3 dias)
1. Create ScrollRevealWrapper e useRevealOnScroll
2. Create ChartTooltip e ChartLegend
3. Refactor KPICard para premium
4. Create FeatureCard, BenefitCard, DataCard
5. Create AnimatedIcon wrapper

### Fase 3: Gráficos Animados (2-3 dias)
1. Enhance LineChartAnimated com entrada suave
2. Enhance BarChartAnimated com stagger
3. Create RadialChartAnimated com SVG animation
4. Create AreaChartAnimated com gradientes
5. Teste responsividade de todos

### Fase 4: Seções (3-4 dias)
1. Create HeroSection com impact visual
2. Create KPISection com stagger animation
3. Create AnalyticsSection com gráficos e narrativa
4. Create BenefitsSection com cards
5. Create CredibilitySection com contadores
6. Create ProcessSection com timeline
7. Create CTASection com impacto

### Fase 5: Integração em Dashboard (1-2 dias)
1. Refactor Dashboard.tsx para usar novas seções
2. Wire up de dados
3. Teste de scroll e animations
4. Adjust spacing e breakpoints

### Fase 6: Responsividade e Polish (1-2 dias)
1. Mobile optimization para todas seções
2. Tablet breakpoint tweaks
3. Animation perf check
4. Validação de acessibilidade
5. Testing completo

---

## 9. GUIA DE DECISÕES TÉCNICAS

### 9.1 Bibliotecas Confirmadas
- **Framer Motion**: para todas as animações
- **Recharts**: para gráficos (já está no projeto)
- **Lucide React**: para ícones outline
- **Tailwind CSS**: utilitários e classes customizadas

### 9.2 Patterns de Componentes

**Motion Wrapper Pattern:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

**ScrollReveal Pattern:**
```tsx
<ScrollRevealWrapper>
  <KPICard />
  <KPICard />
</ScrollRevealWrapper>
```

**Chart Animation Pattern:**
```tsx
<AnimatedLineChart
  data={data}
  animationDuration={1200}
  staggerDelay={100}
/>
```

### 9.3 Design Token Exports

Criar arquivo `lib/tokens.ts` com:
```ts
export const tokens = {
  colors: { /* ... */ },
  spacing: { /* ... */ },
  typography: { /* ... */ },
  shadows: { /* ... */ },
  durations: { /* ... */ },
  easing: { /* ... */ },
}
```

---

## 10. CHECKLIST DE VALIDAÇÃO FINAL

- [ ] Hierarquia visual clara em todas as seções
- [ ] Hero section causa impacto imediato
- [ ] Todas as animações são suaves e performáticas
- [ ] Gráficos têm narrativa visual clara
- [ ] Cards têm acabamento premium (shadow, border, hover)
- [ ] Tipografia é consistente e legível
- [ ] Espaçamento é generoso e inteligente
- [ ] Responsividade mantém premium feel em mobile
- [ ] Performance de animações está boa (60fps)
- [ ] Acessibilidade preservada (contraste, focus states)
- [ ] Browser testing (Chrome, Firefox, Safari)
- [ ] Mobile testing (iOS, Android)
- [ ] Lighthouse scores > 80

---

## 11. NOTAS ADICIONAIS

- **Evitar excessos:** Glassmorphism é sofisticado, mas usar com moderação
- **Motion hierarchy:** Não tudo anima; apenas elementos-chave e interativas
- **Performance first:** Preferir CSS animations para loops, Framer para entrance
- **Acessibilidade:** prefers-reduced-motion respeitado sempre
- **Mobile-first thinking:** Design para mobile, enhance para desktop
- **Tokens consistentes:** Use design tokens, não valores hardcoded
- **Component reuse:** Não duplicar lógica, sempre componentes

---

**Data de Planejamento:** 2024
**Prioridade:** HIGH - CRITICAL REDESIGN
**Escopo:** Full visual + motion + data visualization overhaul

