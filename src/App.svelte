<script>
  import { onMount } from 'svelte'
  import katex from 'katex'
  import { temas } from './data/temas.js'
  let Plotly
  async function getPlotly() {
    if (!Plotly) {
      Plotly = (await import('plotly.js-dist-min')).default
    }
    return Plotly
  }

  /* ─────────────── FLASHCARDS DATA ─────────────── */
  const seedCards = [
    { id: 1,  front: 'Definición de sistema termodinámico',                                back: 'Cantidad de materia o región del espacio sometida a estudio.',                                    tema: 'Intro' },
    { id: 2,  front: 'Propiedades intensivas vs extensivas',                                 back: 'Intensivas: independientes de la masa (T, P). Extensivas: dependen de la masa (V, U, H).',       tema: 'Intro' },
    { id: 3,  front: 'Estado de equilibrio termodinámico',                                   back: 'Un sistema está en equilibrio cuando no hay cambios macroscópicos ni flujos netos.',            tema: 'Intro' },
    { id: 4,  front: 'Calidad (x) en una mezcla líquido-vapor',                              back: 'x = m_{vapor} / (m_{líquido} + m_{vapor}) . Entre 0 (líquido saturado) y 1 (vapor saturado).', tema: 'Cambios de fase' },
    { id: 5,  front: 'Regla de las fases de Gibbs',                                          back: 'F = C - P + 2 . F: grados de libertad, C: componentes, P: fases.',                             tema: 'Cambios de fase' },
    { id: 6,  front: 'Ecuación de estado del gas ideal',                                     back: 'PV = mRT \\quad \\text{o} \\quad Pv = RT',                                                    tema: 'Cambios de fase' },
    { id: 7,  front: 'Primer principio de la termodinámica (sistema cerrado)',               back: '\\Delta U = Q - W',                                                                               tema: 'Primer principio' },
    { id: 8,  front: 'Definición de entalpía',                                               back: 'H = U + PV',                                                                                      tema: 'Primer principio' },
    { id: 9,  front: 'Trabajo en proceso politrópico (gas ideal)',                           back: 'W = \\frac{P_2V_2 - P_1V_1}{1-n} = \\frac{mR(T_2-T_1)}{1-n}',                                  tema: 'Primer principio' },
    { id: 10, front: 'Relación entre c_p y c_v para gas ideal',                              back: 'c_p - c_v = R \\quad ; \\quad \\gamma = c_p / c_v',                                          tema: 'Primer principio' },
    { id: 11, front: 'Segundo principio — enunciado de Kelvin-Planck',                       back: 'Es imposible construir una máquina térmica que funcione en un ciclo y produzca trabajo neto intercambiando calor con una sola fuente.', tema: 'Segundo principio' },
    { id: 12, front: 'Rendimiento térmico de Carnot',                                        back: '\\eta_{Carnot} = 1 - \\frac{T_c}{T_h}',                                                         tema: 'Segundo principio' },
    { id: 13, front: 'Entropía de un proceso reversible',                                    back: '\\Delta S = \\int \\frac{\\delta Q_{rev}}{T}',                                                  tema: 'Segundo principio' },
    { id: 14, front: 'Desigualdad de Clausius',                                              back: '\\oint \\frac{\\delta Q}{T} \\le 0',                                                            tema: 'Segundo principio' },
    { id: 15, front: 'Rendimiento Ciclo Otto ideal',                                         back: '\\eta_{Otto} = 1 - \\frac{1}{r^{\\gamma-1}}',                                                  tema: 'Ciclos' },
    { id: 16, front: 'Rendimiento Ciclo Diesel ideal',                                       back: '\\eta_{Diesel} = 1 - \\frac{1}{r^{\\gamma-1}} \\cdot \\frac{r_c^{\\gamma}-1}{\\gamma(r_c-1)}', tema: 'Ciclos' },
    { id: 17, front: 'Rendimiento Ciclo Brayton ideal',                                      back: '\\eta_{Brayton} = 1 - \\frac{1}{r_p^{(\\gamma-1)/\\gamma}}',                                   tema: 'Ciclos' },
    { id: 18, front: 'Eficiencia de una bomba de calor (COP)',                               back: 'COP_{BC} = \\frac{Q_h}{W} = \\frac{1}{1 - T_c/T_h}',                                          tema: 'Ciclos' },
    { id: 19, front: 'Conservación de masa — sistema abierto',                               back: '\\dot{m}_{entra} = \\dot{m}_{sale} \\quad (régimen estacionario)',                           tema: 'Sistemas abiertos' },
    { id: 20, front: 'Balance de energía en régimen estacionario (sistema abierto)',         back: '\\dot{Q} - \\dot{W} = \\sum \\dot{m}_{sale}h_{sale} - \\sum \\dot{m}_{entra}h_{entra}',   tema: 'Sistemas abiertos' },
    { id: 21, front: 'Entalpía de estancamiento (tobera)',                                   back: 'h_0 = h + \\frac{V^2}{2}',                                                                        tema: 'Sistemas abiertos' },
    { id: 22, front: 'Ley de Fourier (conducción)',                                          back: '\\dot{Q} = -kA\\frac{dT}{dx}',                                                                   tema: 'Transferencia de calor' },
    { id: 23, front: 'Ley de enfriamiento de Newton (convección)',                           back: '\\dot{Q} = hA(T_s - T_\\infty)',                                                                 tema: 'Transferencia de calor' },
    { id: 24, front: 'Ley de Stefan-Boltzmann (radiación)',                                  back: '\\dot{Q} = \\varepsilon\\sigma A T^4',                                                          tema: 'Transferencia de calor' },
    { id: 25, front: 'Número de Nusselt',                                                    back: 'Nu = \\frac{hL_c}{k}',                                                                            tema: 'Transferencia de calor' },
    { id: 26, front: 'Presión manométrica vs absoluta',                                       back: 'P_{abs} = P_{man} + P_{atm}',                                                                     tema: 'Intro' },
    { id: 27, front: 'Densidad y peso específico',                                            back: '\\rho = m/V \\quad ; \\quad \\gamma = \\rho g',                                                 tema: 'Intro' },
    { id: 28, front: 'Diferencia entre proceso, ciclo y estado de equilibrio',                back: 'Proceso: cambio de estado. Ciclo: serie de procesos que regresan al estado inicial. Equilibrio: sin gradientes ni flujos netos.', tema: 'Intro' },
    { id: 29, front: 'Tablas de vapor: región saturada',                                      back: 'Entre líquido saturado (x=0) y vapor saturado (x=1). Se necesita P o T y la calidad x.',        tema: 'Cambios de fase' },
    { id: 30, front: 'Ecuación de Clausius-Clapeyron',                                        back: '\\frac{dP}{dT} = \\frac{h_{fg}}{T v_{fg}}',                                                       tema: 'Cambios de fase' },
    { id: 31, front: 'Punto crítico',                                                         back: 'El estado donde las fases líquida y gaseosa se vuelven indistinguibles. Por encima no hay ebullición.', tema: 'Cambios de fase' },
    { id: 32, front: 'Trabajo de frontera (boundary work)',                                   back: 'W_b = \\int_{1}^{2} P \\, dV',                                                                    tema: 'Primer principio' },
    { id: 33, front: 'Proceso isotermo de gas ideal',                                         back: 'T = cte \\Rightarrow W = nRT \\ln(V_2/V_1) = nRT \\ln(P_1/P_2)',                              tema: 'Primer principio' },
    { id: 34, front: 'Proceso isobárico',                                                     back: 'P = cte \\Rightarrow W = P(V_2 - V_1) = mR(T_2 - T_1)',                                         tema: 'Primer principio' },
    { id: 35, front: 'Diferencia entre adiabático e isentrópico',                             back: 'Adiabático: Q = 0 (sin transferencia de calor). Isentrópico: adiabático + reversible (\\Delta S = 0).', tema: 'Primer principio' },
    { id: 36, front: 'Entropía generada en un proceso irreversible',                          back: 'S_{gen} = \\Delta S_{sistema} + \\Delta S_{entorno} \\ge 0',                                    tema: 'Segundo principio' },
    { id: 37, front: 'Principio de aumento de entropía',                                      back: 'La entropía del universo nunca disminuye: \\Delta S_{universo} \\ge 0',                         tema: 'Segundo principio' },
    { id: 38, front: 'Eficiencia de una máquina frigorífica (COP)',                           back: 'COP_{MR} = \\frac{Q_c}{W} = \\frac{T_c}{T_h - T_c}',                                           tema: 'Segundo principio' },
    { id: 39, front: 'Ciclo de refrigeración por compresión de vapor',                        back: 'Evaporador → Compresor → Condensador → Válvula de expansión. El fluido de trabajo experimenta cambio de fase.', tema: 'Ciclos' },
    { id: 40, front: 'Ciclo de Carnot inverso',                                               back: 'Refrigerador o bomba de calor ideal. COP máximo teórico para las temperaturas dadas.',             tema: 'Ciclos' },
    { id: 41, front: 'Relación de trabajo de retroceso (back work ratio)',                    back: 'BWR = W_{compresor} / W_{turbina}. En Brayton típicamente 40-60%.',                              tema: 'Ciclos' },
    { id: 42, front: 'Número de Mach',                                                        back: 'Ma = V / a \\quad ; \\quad a = \\sqrt{\\gamma R T}',                                             tema: 'Sistemas abiertos' },
    { id: 43, front: 'Relación de áreas en flujo isoentrópico (tobera)',                      back: '\\frac{A}{A^*} = \\frac{1}{Ma} \\left( \\frac{2}{\\gamma+1} \\left(1+\\frac{\\gamma-1}{2}Ma^2\\right) \\right)^{(\\gamma+1)/(2(\\gamma-1))}', tema: 'Sistemas abiertos' },
    { id: 44, front: 'Eficiencia isoentrópica de una turbina',                                back: '\\eta_T = \\frac{h_3 - h_4}{h_3 - h_{4s}} = \\frac{w_{real}}{w_{isoentrópico}}',              tema: 'Sistemas abiertos' },
    { id: 45, front: 'Resistencia térmica en serie',                                          back: 'R_{total} = \\sum R_i \\quad ; \\quad \\dot{Q} = \\frac{\\Delta T}{R_{total}}',             tema: 'Transferencia de calor' },
    { id: 46, front: 'Número de Reynolds',                                                    back: 'Re = \\frac{\\rho V L}{\\mu} = \\frac{V L}{\\nu}',                                              tema: 'Transferencia de calor' },
    { id: 47, front: 'Número de Prandtl',                                                     back: 'Pr = \\frac{\\nu}{\\alpha} = \\frac{c_p \\mu}{k}',                                             tema: 'Transferencia de calor' },
    { id: 48, front: 'Factor de compresibilidad Z',                                            back: 'Z = \\frac{Pv}{RT} \\quad ; \\quad Z=1 para gas ideal',                                         tema: 'Cambios de fase' },
    { id: 49, front: 'Volumen específico de una mezcla líquido-vapor',                         back: 'v = v_f + x(v_g - v_f)',                                                                        tema: 'Cambios de fase' },
    { id: 50, front: 'Entalpía de una mezcla líquido-vapor',                                   back: 'h = h_f + x h_{fg}',                                                                              tema: 'Cambios de fase' },
    { id: 51, front: 'Ecuación de Van der Waals',                                              back: '\\left(P + \\frac{a}{v^2}\\right)(v - b) = RT',                                                 tema: 'Cambios de fase' },
    { id: 52, front: 'Mezclas de gases ideales — fracción molar',                              back: 'y_i = \\frac{N_i}{N_{total}}',                                                                    tema: 'Mezclas' },
    { id: 53, front: 'Mezclas de gases ideales — fracción másica',                             back: 'x_i = \\frac{m_i}{m_{total}}',                                                                    tema: 'Mezclas' },
    { id: 54, front: 'Ley de Dalton para mezclas de gases ideales',                            back: 'P_{total} = \\sum P_i(T, V_{total})',                                                           tema: 'Mezclas' },
    { id: 55, front: 'Presión parcial de un gas ideal en mezcla',                              back: 'P_i = y_i P_{total}',                                                                             tema: 'Mezclas' },
    { id: 56, front: 'Humedad específica (ω)',                                                 back: '\\omega = \\frac{m_v}{m_a} = 0.622 \\frac{P_v}{P - P_v}',                                     tema: 'Psicrometría' },
    { id: 57, front: 'Humedad relativa (φ)',                                                   back: '\\phi = \\frac{P_v}{P_g} \\approx \\frac{m_v}{m_{v,sat}}',                                     tema: 'Psicrometría' },
    { id: 58, front: 'Temperatura de bulbo húmedo',                                            back: 'Temperatura que alcanza el aire cuando se satura adiabáticamente por evaporación de agua.',     tema: 'Psicrometría' },
    { id: 59, front: 'Exergía (disponibilidad)',                                               back: 'Máximo trabajo útil obtenible de un sistema al equilibrarse con el entorno.',                   tema: 'Exergía' },
    { id: 60, front: 'Balance de exergía',                                                     back: '\\Delta X = X_{in} - X_{out} - X_{destroyed}',                                                   tema: 'Exergía' },
    { id: 61, front: 'Destrucción de exergía',                                                 back: 'X_{destroyed} = T_0 S_{gen}',                                                                     tema: 'Exergía' },
    { id: 62, front: 'Eficiencia isoentrópica de un compresor',                                back: '\\eta_C = \\frac{h_{2s} - h_1}{h_2 - h_1}',                                                       tema: 'Sistemas abiertos' },
    { id: 63, front: 'Relación de presiones crítica en tobera convergente',                    back: '\\frac{P^*}{P_0} = \\left(\\frac{2}{\\gamma+1}\\right)^{\\gamma/(\\gamma-1)} \\approx 0.528', tema: 'Sistemas abiertos' },
    { id: 64, front: 'Ciclo combinado (gas-vapor)',                                            back: 'Ciclo Brayton en la parte superior + Rankine en la parte inferior. Eficiencias > 60%.',         tema: 'Ciclos' },
    { id: 65, front: 'Turborreactor ideal — empuje específico',                                back: 'F/\\dot{m} = (V_{salida} - V_{entrada}) + (P_{salida} - P_{entrada})A_{salida}/\\dot{m}',        tema: 'Propulsión' },
    { id: 66, front: 'Eficiencia propulsiva',                                                  back: '\\eta_p = \\frac{2}{1 + V_{salida}/V_{entrada}}',                                                 tema: 'Propulsión' },
    { id: 67, front: 'Número de Rayleigh (transferencia de calor)',                            back: 'Ra = Gr \\cdot Pr = \\frac{g \\beta (T_s - T_\\infty) L^3}{\\nu \\alpha}',                 tema: 'Transferencia de calor' },
    { id: 68, front: 'Capa límite térmica',                                                    back: 'Región cerca de la superficie donde existen gradientes de temperatura significativos.',           tema: 'Transferencia de calor' },
    { id: 69, front: 'Ley de enfriamiento de Newton (versión diferencial)',                    back: `q'' = h(T_s - T_\\infty)`,                                                                    tema: 'Transferencia de calor' },
    { id: 70, front: 'Coeficiente global de transferencia de calor (U)',                       back: '\\dot{Q} = UA \\Delta T_{lm}',                                                                   tema: 'Transferencia de calor' },
  ]

  /* ─────────────── STATE ─────────────── */
  let active = 'dashboard'
  let showBack = false
  let cardIdx = 0
  let openProblem = null
  let today = new Date().toISOString().split('T')[0]
  let toast = { message: '', type: 'info', visible: false }
  let freeReview = false
  let freeOrder = []
  let temaActivo = null

  /* ─────────────── EXAM STATE ─────────────── */
  let examQuestions = []
  let examIdx = 0
  let examAnswers = []
  let examShowAnswer = false
  let examFinished = false
  let examCount = 10
  let examReviewErrors = false

  function startExam() {
    const pool = [...cards].sort(() => Math.random() - 0.5).slice(0, Math.min(examCount, cards.length))
    examQuestions = pool
    examIdx = 0
    examAnswers = []
    examShowAnswer = false
    examFinished = false
    examReviewErrors = false
    active = 'examen'
  }
  function answerExam(correct) {
    examAnswers = [...examAnswers, { q: examQuestions[examIdx], correct }]
    examShowAnswer = false
    if (examIdx + 1 < examQuestions.length) {
      examIdx += 1
    } else {
      examFinished = true
      const stats = getStats()
      stats.totalReviews = (stats.totalReviews || 0) + examAnswers.length
      stats.correctReviews = (stats.correctReviews || 0) + examAnswers.filter(a => a.correct).length
      saveStats(stats)
      updateStreak()
    }
  }
  function examScore() {
    const correct = examAnswers.filter(a => a.correct).length
    return { correct, total: examAnswers.length, pct: Math.round((correct / examAnswers.length) * 100) }
  }

  /* ─────────────── SIMULATOR STATE ─────────────── */
  let simCycle = 'otto'
  let simR = 9
  let simGamma = 1.4
  let simRpCut = 2.5
  let plotDiv

  function baseLayout(titleText) {
    return {
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: { color: '#e8ecf4', family: 'JetBrains Mono, monospace', size: 12 },
      margin: { t: 30, r: 20, b: 40, l: 50 },
      xaxis: { gridcolor: 'rgba(255,255,255,0.08)', zeroline: false, domain: [0, 0.45], title: { text: 'v (m³/kg)', font: { size: 11 } } },
      yaxis: { gridcolor: 'rgba(255,255,255,0.08)', zeroline: false, title: { text: 'P (kPa)', font: { size: 11 } } },
      xaxis2: { gridcolor: 'rgba(255,255,255,0.08)', zeroline: false, domain: [0.55, 1], title: { text: 's (kJ/kg·K)', font: { size: 11 } } },
      yaxis2: { gridcolor: 'rgba(255,255,255,0.08)', zeroline: false, anchor: 'x2', title: { text: 'T (K)', font: { size: 11 } } },
      legend: { x: 0.02, y: 0.98, bgcolor: 'rgba(10,15,26,0.7)', bordercolor: 'rgba(255,255,255,0.1)', borderwidth: 1 },
      title: { text: titleText, font: { size: 14, color: '#e8ecf4' }, x: 0.5 }
    }
  }

  async function drawOtto() {
    if (!plotDiv) return
    const r = simR, g = simGamma, pCut = simRpCut
    const v1 = 1, v2 = v1 / r, p1 = 1
    const p2 = p1 * Math.pow(r, g), p3 = p2 * pCut, p4 = p3 / Math.pow(r, g)
    const T1 = 300, T2 = T1 * Math.pow(r, g-1), T3 = T2 * pCut, T4 = T3 / Math.pow(r, g-1)
    const cv = 0.718
    const s1 = 0, s2 = s1, s3 = s2 + cv * Math.log(T3/T2), s4 = s3
    const nPts = 80

    const v12 = Array.from({length: nPts}, (_, i) => v2 + (v1-v2)*(i/(nPts-1)))
    const p12 = v12.map(v => p1 * Math.pow(v1/v, g))
    const v34 = Array.from({length: nPts}, (_, i) => v1 + (v2-v1)*(i/(nPts-1)))
    const p34 = v34.map(v => p3 * Math.pow(v2/v, g))

    const tracePV = [
      { x: v12, y: p12, mode: 'lines', name: '1→2 (comp)', line: { color: '#60a5fa', width: 3 } },
      { x: [v2, v2], y: [p2, p3], mode: 'lines', name: '2→3 (Qin)', line: { color: '#f97316', width: 3, dash: 'dot' } },
      { x: v34, y: p34, mode: 'lines', name: '3→4 (exp)', line: { color: '#22c55e', width: 3 } },
      { x: [v1, v1], y: [p4, p1], mode: 'lines', name: '4→1 (Qout)', line: { color: '#ef4444', width: 3, dash: 'dot' } },
      { x: [v1, v2, v2, v1], y: [p1, p2, p3, p4], mode: 'markers', marker: { size: 10, color: '#e8ecf4' }, showlegend: false, text: ['1', '2', '3', '4'], textposition: 'top center', textfont: { color: '#e8ecf4', size: 12 } }
    ]

    const s23 = Array.from({length: nPts}, (_, i) => s2 + (s3-s2)*(i/(nPts-1)))
    const T23 = s23.map(s => T2 * Math.exp((s-s2)/cv))
    const s41 = Array.from({length: nPts}, (_, i) => s4 + (s1-s4)*(i/(nPts-1)))
    const T41 = s41.map(s => T4 * Math.exp((s-s4)/cv))

    const traceTS = [
      { x: [s1, s2], y: [T1, T2], mode: 'lines', name: '1→2', line: { color: '#60a5fa', width: 3 } },
      { x: s23, y: T23, mode: 'lines', name: '2→3', line: { color: '#f97316', width: 3, dash: 'dot' } },
      { x: [s3, s4], y: [T3, T4], mode: 'lines', name: '3→4', line: { color: '#22c55e', width: 3 } },
      { x: s41, y: T41, mode: 'lines', name: '4→1', line: { color: '#ef4444', width: 3, dash: 'dot' } },
      { x: [s1, s2, s3, s4], y: [T1, T2, T3, T4], mode: 'markers', marker: { size: 10, color: '#e8ecf4' }, showlegend: false, text: ['1', '2', '3', '4'], textposition: 'top center', textfont: { color: '#e8ecf4', size: 12 } }
    ]

    const eta = 1 - 1/Math.pow(r, g-1)
    Plotly.newPlot(plotDiv, [
      ...tracePV.map(t => ({...t, xaxis: 'x', yaxis: 'y'})),
      ...traceTS.map(t => ({...t, xaxis: 'x2', yaxis: 'y2'}))
    ], baseLayout(`Ciclo Otto — r=${r.toFixed(1)}, γ=${g.toFixed(2)}, η=${(eta*100).toFixed(1)}%`), { responsive: true, displayModeBar: false })
  }

  async function drawBrayton() {
    if (!plotDiv) return
    const rp = simR, g = simGamma, Tcut = simRpCut
    const p1 = 1, p2 = p1 * rp, p3 = p2, p4 = p1
    const T1 = 300, T2 = T1 * Math.pow(rp, (g-1)/g), T3 = T2 * Tcut, T4 = T3 / Math.pow(rp, (g-1)/g)
    const cp = 1.005, R = 0.287
    const s1 = 0, s2 = s1, s3 = s2 + cp * Math.log(T3/T2) - R * Math.log(p3/p2), s4 = s3
    const nPts = 80

    /* P-v: isentropic curves + isobars */
    const v1 = R*T1/p1, v2 = R*T2/p2, v3 = R*T3/p3, v4 = R*T4/p4
    const v12 = Array.from({length: nPts}, (_, i) => v1 + (v2-v1)*(i/(nPts-1)))
    const p12 = v12.map(v => p1 * Math.pow(v1/v, g))
    const v34 = Array.from({length: nPts}, (_, i) => v3 + (v4-v3)*(i/(nPts-1)))
    const p34 = v34.map(v => p3 * Math.pow(v3/v, g))

    const tracePV = [
      { x: v12, y: p12, mode: 'lines', name: '1→2 (comp)', line: { color: '#60a5fa', width: 3 } },
      { x: [v2, v3], y: [p2, p3], mode: 'lines', name: '2→3 (Qin)', line: { color: '#f97316', width: 3, dash: 'dot' } },
      { x: v34, y: p34, mode: 'lines', name: '3→4 (exp)', line: { color: '#22c55e', width: 3 } },
      { x: [v4, v1], y: [p4, p1], mode: 'lines', name: '4→1 (Qout)', line: { color: '#ef4444', width: 3, dash: 'dot' } },
      { x: [v1, v2, v3, v4], y: [p1, p2, p3, p4], mode: 'markers', marker: { size: 10, color: '#e8ecf4' }, showlegend: false, text: ['1', '2', '3', '4'], textposition: 'top center', textfont: { color: '#e8ecf4', size: 12 } }
    ]

    /* T-s: isentropics + isobars */
    const s23 = Array.from({length: nPts}, (_, i) => s2 + (s3-s2)*(i/(nPts-1)))
    const T23 = s23.map(s => T2 * Math.exp((s-s2)/cp))
    const s41 = Array.from({length: nPts}, (_, i) => s4 + (s1-s4)*(i/(nPts-1)))
    const T41 = s41.map(s => T4 * Math.exp((s-s4)/cp))

    const traceTS = [
      { x: [s1, s2], y: [T1, T2], mode: 'lines', name: '1→2', line: { color: '#60a5fa', width: 3 } },
      { x: s23, y: T23, mode: 'lines', name: '2→3', line: { color: '#f97316', width: 3, dash: 'dot' } },
      { x: [s3, s4], y: [T3, T4], mode: 'lines', name: '3→4', line: { color: '#22c55e', width: 3 } },
      { x: s41, y: T41, mode: 'lines', name: '4→1', line: { color: '#ef4444', width: 3, dash: 'dot' } },
      { x: [s1, s2, s3, s4], y: [T1, T2, T3, T4], mode: 'markers', marker: { size: 10, color: '#e8ecf4' }, showlegend: false, text: ['1', '2', '3', '4'], textposition: 'top center', textfont: { color: '#e8ecf4', size: 12 } }
    ]

    const eta = 1 - 1/Math.pow(rp, (g-1)/g)
    Plotly.newPlot(plotDiv, [
      ...tracePV.map(t => ({...t, xaxis: 'x', yaxis: 'y'})),
      ...traceTS.map(t => ({...t, xaxis: 'x2', yaxis: 'y2'}))
    ], baseLayout(`Ciclo Brayton — rₚ=${rp.toFixed(1)}, γ=${g.toFixed(2)}, η=${(eta*100).toFixed(1)}%`), { responsive: true, displayModeBar: false })
  }

  async function drawDiesel() {
    if (!plotDiv) return
    const r = simR, g = simGamma, rc = simRpCut
    const v1 = 1, v2 = v1 / r, v3 = v2 * rc, v4 = v1
    const p1 = 1, p2 = p1 * Math.pow(r, g), p3 = p2
    const p4 = p3 * Math.pow(v3/v4, g)
    const T1 = 300, T2 = T1 * Math.pow(r, g-1), T3 = T2 * rc, T4 = T3 * Math.pow(rc/r, g-1)
    const cv = 0.718, cp = 1.005, R = 0.287
    const s1 = 0, s2 = s1, s3 = s2 + cp * Math.log(T3/T2), s4 = s3
    const nPts = 80

    /* P-v */
    const v12 = Array.from({length: nPts}, (_, i) => v1 + (v2-v1)*(i/(nPts-1)))
    const p12 = v12.map(v => p1 * Math.pow(v1/v, g))
    const v34 = Array.from({length: nPts}, (_, i) => v3 + (v4-v3)*(i/(nPts-1)))
    const p34 = v34.map(v => p3 * Math.pow(v3/v, g))

    const tracePV = [
      { x: v12, y: p12, mode: 'lines', name: '1→2 (comp)', line: { color: '#60a5fa', width: 3 } },
      { x: [v2, v3], y: [p2, p3], mode: 'lines', name: '2→3 (Qin)', line: { color: '#f97316', width: 3, dash: 'dot' } },
      { x: v34, y: p34, mode: 'lines', name: '3→4 (exp)', line: { color: '#22c55e', width: 3 } },
      { x: [v4, v1], y: [p4, p1], mode: 'lines', name: '4→1 (Qout)', line: { color: '#ef4444', width: 3, dash: 'dot' } },
      { x: [v1, v2, v3, v4], y: [p1, p2, p3, p4], mode: 'markers', marker: { size: 10, color: '#e8ecf4' }, showlegend: false, text: ['1', '2', '3', '4'], textposition: 'top center', textfont: { color: '#e8ecf4', size: 12 } }
    ]

    /* T-s */
    const s41 = Array.from({length: nPts}, (_, i) => s4 + (s1-s4)*(i/(nPts-1)))
    const T41 = s41.map(s => T4 * Math.exp((s-s4)/cv))

    const traceTS = [
      { x: [s1, s2], y: [T1, T2], mode: 'lines', name: '1→2', line: { color: '#60a5fa', width: 3 } },
      { x: [s2, s3], y: [T2, T3], mode: 'lines', name: '2→3', line: { color: '#f97316', width: 3, dash: 'dot' } },
      { x: [s3, s4], y: [T3, T4], mode: 'lines', name: '3→4', line: { color: '#22c55e', width: 3 } },
      { x: s41, y: T41, mode: 'lines', name: '4→1', line: { color: '#ef4444', width: 3, dash: 'dot' } },
      { x: [s1, s2, s3, s4], y: [T1, T2, T3, T4], mode: 'markers', marker: { size: 10, color: '#e8ecf4' }, showlegend: false, text: ['1', '2', '3', '4'], textposition: 'top center', textfont: { color: '#e8ecf4', size: 12 } }
    ]

    const eta = 1 - (1/Math.pow(r, g-1)) * ((Math.pow(rc, g) - 1) / (g * (rc - 1)))
    Plotly.newPlot(plotDiv, [
      ...tracePV.map(t => ({...t, xaxis: 'x', yaxis: 'y'})),
      ...traceTS.map(t => ({...t, xaxis: 'x2', yaxis: 'y2'}))
    ], baseLayout(`Ciclo Diesel — r=${r.toFixed(1)}, r_c=${rc.toFixed(1)}, γ=${g.toFixed(2)}, η=${(eta*100).toFixed(1)}%`), { responsive: true, displayModeBar: false })
  }

  async function drawCycle() {
    if (simCycle === 'otto') await drawOtto()
    else if (simCycle === 'brayton') await drawBrayton()
    else if (simCycle === 'diesel') await drawDiesel()
  }

  /* cards with SM-2 fields */
  let cards = []

  function loadCards() {
    const saved = localStorage.getItem('termo-cards')
    if (saved) {
      cards = JSON.parse(saved)
    } else {
      cards = seedCards.map(c => ({
        ...c,
        interval: 1,
        repetitions: 0,
        ef: 2.5,
        nextReview: today,
        lastReview: null,
      }))
      saveCards()
    }
  }

  function saveCards() {
    localStorage.setItem('termo-cards', JSON.stringify(cards))
  }

  /* SM-2 algorithm */
  function sm2(card, q) {
    let { interval, repetitions, ef } = card
    if (q >= 3) {
      if (repetitions === 0) interval = 1
      else if (repetitions === 1) interval = 6
      else interval = Math.round(interval * ef)
      repetitions += 1
    } else {
      repetitions = 0
      interval = 1
    }
    ef = ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    if (ef < 1.3) ef = 1.3

    const next = new Date()
    next.setDate(next.getDate() + interval)

    card.interval = interval
    card.repetitions = repetitions
    card.ef = ef
    card.nextReview = next.toISOString().split('T')[0]
    card.lastReview = today
    saveCards()
  }

  function dueCards() {
    return cards.filter(c => c.nextReview <= today)
  }

  /* problem data */
  const problemas = [
    { id: 1, titulo: 'Compresor isentrópico', enunciado: 'Aire entra a un compresor a $P_1 = 100$ kPa, $T_1 = 300$ K. La relación de presiones es $r_p = 8$. Calcule la temperatura de salida suponiendo proceso isentrópico con $\\gamma = 1.4$.', dificultad: 'Media', tema: 'Sistemas abiertos', pasos: ['Para un proceso isentrópico: $T_2 / T_1 = (P_2 / P_1)^{(\\gamma-1)/\\gamma}$', 'Sustituir: $T_2 = 300 \\cdot 8^{0.4/1.4}$', 'Resultado: $T_2 \\approx 543.4$ K'] },
    { id: 2, titulo: 'Rendimiento Ciclo Otto', enunciado: 'Un ciclo Otto ideal tiene una relación de compresión $r = 9$. Calcule el rendimiento térmico suponiendo $\\gamma = 1.4$.', dificultad: 'Fácil', tema: 'Ciclos', pasos: ['Fórmula: $\\eta_{Otto} = 1 - \\frac{1}{r^{\\gamma-1}}$', 'Sustituir: $\\eta = 1 - \\frac{1}{9^{0.4}}$', 'Resultado: $\\eta \\approx 58.5\\%$'] },
    { id: 3, titulo: 'Ciclo Rankine — Eficiencia térmica', enunciado: 'Un ciclo Rankine opera entre $P_{alta} = 8$ MPa (600 °C) y $P_{baja} = 20$ kPa. La bomba es isentrópica. Calcule la eficiencia térmica del ciclo.', dificultad: 'Difícil', tema: 'Ciclos', pasos: ['Estado 1: Líquido saturado a 20 kPa → $h_1 \\approx 251.4$ kJ/kg, $v_1 = 0.001017$ m³/kg', 'Bomba: $h_2 = h_1 + v_1(P_2-P_1) \\approx 259.5$ kJ/kg', 'Estado 3: Vapor sobrecalentado a 8 MPa, 600 °C → $h_3 \\approx 3642.4$ kJ/kg, $s_3 \\approx 7.0206$ kJ/kg·K', 'Turbina: $s_4 = s_3$ → $x_4 = (7.0206 - 0.8320)/7.0752 \\approx 0.875$, $h_4 \\approx 2280.8$ kJ/kg', '$q_{in} = h_3 - h_2 \\approx 3382.9$ kJ/kg', '$w_{neto} = (h_3-h_4) - (h_2-h_1) \\approx 1354.3$ kJ/kg', '$\\eta = w_{neto}/q_{in} \\approx 40.0\\%$'] },
    { id: 4, titulo: 'Transferencia de calor — Convección', enunciado: 'Una placa de $A = 2$ m² se mantiene a $T_s = 80$ °C en aire a $T_\\infty = 20$ °C. El coeficiente convectivo es $h = 25$ W/m²·K. Calcule la potencia disipada por convección.', dificultad: 'Fácil', tema: 'Transferencia de calor', pasos: ['Fórmula de Newton: $\\dot{Q} = hA(T_s - T_\\infty)$', 'Sustituir: $\\dot{Q} = 25 \\cdot 2 \\cdot (80-20)$', 'Resultado: $\\dot{Q} = 3000$ W = 3 kW'] },
    { id: 5, titulo: 'Segundo principio — Máquina térmica', enunciado: 'Una máquina térmica opera entre $T_h = 1000$ K y $T_c = 300$ K, produciendo $W = 400$ kJ por ciclo. Calcule la máxima eficiencia posible y el calor mínimo rechazado.', dificultad: 'Media', tema: 'Segundo principio', pasos: ['Máxima eficiencia = rendimiento de Carnot: $\\eta_{max} = 1 - T_c/T_h = 1 - 300/1000 = 0.70$ (70%)', '$\\eta = W/Q_h$ → $Q_h = W/\\eta_{max} = 400/0.70 \\approx 571.4$ kJ', '$Q_c = Q_h - W \\approx 571.4 - 400 = 171.4$ kJ'] },
    { id: 6, titulo: 'Primer principio — Tanque rígido', enunciado: 'Se añaden 50 kJ de calor a un tanque rígido (volumen constante) que contiene 2 kg de gas ideal con $c_v = 0.718$ kJ/kg·K. Calcule el cambio de temperatura y la variación de energía interna.', dificultad: 'Media', tema: 'Primer principio', pasos: ['Proceso isocórico: $W = 0$ (volumen constante)', '$\\Delta U = Q = 50$ kJ (primer principio)', '$\\Delta U = m c_v \\Delta T$ → $50 = 2 \\cdot 0.718 \\cdot \\Delta T$', '$\\Delta T \\approx 34.8$ K'] },
    { id: 7, titulo: 'Entalpía de estancamiento', enunciado: 'Aire fluye por una tobera a $V = 250$ m/s, $T = 300$ K, $P = 100$ kPa. Calcule la temperatura y presión de estancamiento ($c_p = 1.005$ kJ/kg·K, $\\gamma = 1.4$).', dificultad: 'Difícil', tema: 'Sistemas abiertos', pasos: ['$T_0 = T + V^2/(2c_p) = 300 + 250^2/(2 \\cdot 1005) \\approx 331.1$ K', 'Proceso isentrópico: $P_0/P = (T_0/T)^{\\gamma/(\\gamma-1)}$', '$P_0 = 100 \\cdot (331.1/300)^{3.5} \\approx 143.6$ kPa'] },
    { id: 8, titulo: 'Pistón con gas ideal (primer principio)', enunciado: 'Un gas ideal ($\\gamma = 1.4$) en un pistón se expande isotérmicamente desde $V_1 = 0.1$ m³, $P_1 = 500$ kPa hasta $V_2 = 0.3$ m³. Calcule el trabajo, el calor y el cambio de energía interna.', dificultad: 'Media', tema: 'Primer principio', pasos: ['Isotermo → $\\Delta U = 0$ (energía interna solo depende de T para gas ideal)', '$W = P_1V_1 \\ln(V_2/V_1) = 500 \\cdot 0.1 \\cdot \\ln(3) \\approx 54.9$ kJ', 'Primer principio: $Q = \\Delta U + W = 0 + 54.9 = 54.9$ kJ'] },
    { id: 9, titulo: 'Entropía generada en mezcla de agua', enunciado: 'Se mezclan adiabáticamente 2 kg de agua líquida a $80$ °C con 3 kg a $20$ °C. Calcule la temperatura final y la entropía generada ($c = 4.18$ kJ/kg·K).', dificultad: 'Difícil', tema: 'Segundo principio', pasos: ['Balance de energía: $m_1c(T_f - T_1) + m_2c(T_f - T_2) = 0$', '$2(353) + 3(293) = 5 T_f$ → $T_f = 317$ K (44 °C)', '$\\Delta S_1 = m_1 c \\ln(T_f/T_1) = 2 \\cdot 4.18 \\cdot \\ln(317/353) \\approx -0.899$ kJ/K', '$\\Delta S_2 = m_2 c \\ln(T_f/T_2) = 3 \\cdot 4.18 \\cdot \\ln(317/293) \\approx 0.980$ kJ/K', '$S_{gen} = \\Delta S_1 + \\Delta S_2 \\approx 0.081$ kJ/K'] },
    { id: 10, titulo: 'Conducción en pared compuesta', enunciado: 'Una pared de 0.2 m² está formada por ladrillo ($k=0.72$ W/m·K, 10 cm) y aislante ($k=0.04$ W/m·K, 5 cm). La temperatura interior es $25$ °C y la exterior $-5$ °C. Calcule la pérdida de calor.', dificultad: 'Media', tema: 'Transferencia de calor', pasos: ['Resistencias en serie: $R = L_1/(k_1A) + L_2/(k_2A)$', '$R = 0.10/(0.72\\cdot0.2) + 0.05/(0.04\\cdot0.2) = 0.694 + 6.25 = 6.944$ K/W', '$\\dot{Q} = \\Delta T / R = 30 / 6.944 \\approx 4.32$ W'] },
    { id: 11, titulo: 'Tobera convergente-divergente (Mach)', enunciado: 'Aire ($\\gamma=1.4$) fluye por una tobera con $Ma_1 = 0.3$ en la entrada. Calcule la relación de áreas $A/A^*$ y la relación de presiones $P/P^*$.', dificultad: 'Difícil', tema: 'Sistemas abiertos', pasos: ['Relación de áreas: $A/A^* = \\frac{1}{Ma}\\left(\\frac{2}{\\gamma+1}(1+\\frac{\\gamma-1}{2}Ma^2)\\right)^{(\\gamma+1)/(2(\\gamma-1))}$', 'Sustituir $Ma=0.3$: $A/A^* \\approx \\frac{1}{0.3}(\\frac{2}{2.4}(1+0.2\\cdot0.09))^{3} \\approx 2.04$', 'Relación de presiones: $P/P_0 = (1+\\frac{\\gamma-1}{2}Ma^2)^{-\\gamma/(\\gamma-1)}$', '$P/P^* = \\frac{P/P_0}{(P/P_0)^*}$ donde $(P/P_0)^* = (2/(\\gamma+1))^{\\gamma/(\\gamma-1)} \\approx 0.528$', '$P/P_0(0.3) \\approx 0.939$, luego $P/P^* \\approx 0.939/0.528 \\approx 1.78$'] },
    { id: 12, titulo: 'Ciclo Brayton con regeneración', enunciado: 'Un ciclo Brayton ideal tiene $r_p = 10$, $T_1 = 300$ K, $T_3 = 1400$ K, $\\gamma = 1.4$. Calcule el rendimiento con regeneración perfecta ($\\epsilon = 1$).', dificultad: 'Difícil', tema: 'Ciclos', pasos: ['$T_2 = T_1 \\cdot r_p^{(\\gamma-1)/\\gamma} = 300 \\cdot 10^{0.2857} \\approx 579.2$ K', '$T_4 = T_3 / r_p^{(\\gamma-1)/\\gamma} = 1400 / 10^{0.2857} \\approx 725.1$ K', 'Con regeneración perfecta: $T_5 = T_4$ y $T_6 = T_2$', '$q_{in} = c_p(T_3 - T_5) = 1.005(1400 - 725.1) \\approx 678.3$ kJ/kg', '$w_{neto} = c_p[(T_3-T_4)-(T_2-T_1)] = 1.005[(1400-725.1)-(579.2-300)] \\approx 393.2$ kJ/kg', '$\\eta = w_{neto}/q_{in} \\approx 57.9\\%$'] },
    { id: 13, titulo: 'Presión manométrica en un tanque', enunciado: 'Un manómetro conectado a un tanque de gas indica $P_{man} = 350$ kPa. La presión atmosférica local es $P_{atm} = 101.3$ kPa. Calcule la presión absoluta y la presión equivalente en bar.', dificultad: 'Fácil', tema: 'Intro', pasos: ['$P_{abs} = P_{man} + P_{atm} = 350 + 101.3 = 451.3$ kPa', 'Conversión: $1$ bar $= 100$ kPa', '$P_{abs} = 4.513$ bar'] },
    { id: 14, titulo: 'Calidad de una mezcla líquido-vapor', enunciado: 'Un recipiente de $V = 0.5$ m³ contiene 4 kg de agua a $P = 200$ kPa. Sabiendo que $v_f = 0.001061$ m³/kg y $v_g = 0.8857$ m³/kg a esa presión, determine la calidad y el volumen ocupado por cada fase.', dificultad: 'Media', tema: 'Cambios de fase', pasos: ['Volumen específico de la mezcla: $v = V/m = 0.5/4 = 0.125$ m³/kg', 'Despejar calidad: $v = v_f + x(v_g - v_f)$', '$0.125 = 0.001061 + x(0.8857 - 0.001061)$ → $x \approx 0.140$ (14%)', '$V_{vapor} = m \cdot x \cdot v_g = 4 \cdot 0.140 \cdot 0.8857 \approx 0.496$ m³', '$V_{líquido} = V - V_{vapor} \approx 0.004$ m³'] },
    { id: 15, titulo: 'Gas real con Van der Waals', enunciado: 'Un mol de CO₂ ocupa un volumen de $0.5$ L a $300$ K. Calcule la presión usando la ecuación de Van der Waals ($a = 0.364$ Pa·m⁶/mol², $b = 4.27 \times 10^{-5}$ m³/mol) y compárela con el gas ideal.', dificultad: 'Media', tema: 'Cambios de fase', pasos: ['Gas ideal: $P = nRT/V = 1 \cdot 8.314 \cdot 300 / (0.5 \times 10^{-3}) = 4.99$ MPa', 'Van der Waals: $P = \frac{RT}{v-b} - \frac{a}{v^2}$', '$v = 0.5 \times 10^{-3}$ m³/mol', '$P = \frac{8.314 \cdot 300}{0.5 \times 10^{-3} - 4.27 \times 10^{-5}} - \frac{0.364}{(0.5 \times 10^{-3})^2}$', '$P \approx 5.44 - 1.46 = 3.98$ MPa', 'Diferencia: el gas ideal sobrestima la presión en ~25% por no considerar fuerzas intermoleculares'] },
    { id: 16, titulo: 'Proceso politrópico de compresión', enunciado: 'Se comprime aire desde $P_1 = 100$ kPa, $T_1 = 300$ K hasta $P_2 = 800$ kPa siguiendo un proceso politrópico con $n = 1.3$. Calcule la temperatura final, el trabajo específico y el calor transferido ($R = 0.287$ kJ/kg·K, $c_v = 0.718$ kJ/kg·K).', dificultad: 'Difícil', tema: 'Primer principio', pasos: ['$T_2 = T_1 (P_2/P_1)^{(n-1)/n} = 300 \cdot 8^{0.3/1.3} \approx 470.6$ K', '$w = \frac{R(T_2-T_1)}{1-n} = \frac{0.287(470.6-300)}{1-1.3} \approx -163.2$ kJ/kg (trabajo negativo: entra)', '$\Delta u = c_v(T_2-T_1) = 0.718(470.6-300) \approx 122.5$ kJ/kg', '$q = \Delta u + w = 122.5 - 163.2 = -40.7$ kJ/kg (calor sale)'] },
    { id: 17, titulo: 'Entropía generada en expansión libre', enunciado: 'Una división separa dos compartimentos de igual volumen en un recipiente aislado. Uno contiene 1 mol de gas ideal a $300$ K y el otro está vacío. Se retira la división. Calcule la entropía generada.', dificultad: 'Media', tema: 'Segundo principio', pasos: ['Expansión libre: $Q = 0$, $W = 0$ → $\Delta U = 0$ → $T_f = T_i = 300$ K', 'Para gas ideal: $\Delta S = nR \ln(V_2/V_1) = 1 \cdot 8.314 \cdot \ln(2)$', '$\Delta S \approx 5.76$ J/K', 'Como el sistema está aislado: $S_{gen} = \Delta S_{sis} = 5.76$ J/K > 0 (irreversible)'] },
    { id: 18, titulo: 'Ciclo Diesel ideal', enunciado: 'Un ciclo Diesel ideal tiene relación de compresión $r = 18$ y relación de corte $r_c = 2.2$. La temperatura inicial es $T_1 = 300$ K. Calcule el rendimiento térmico ($\gamma = 1.4$).', dificultad: 'Media', tema: 'Ciclos', pasos: ['$\eta_{Diesel} = 1 - \frac{1}{r^{\gamma-1}} \cdot \frac{r_c^{\gamma}-1}{\gamma(r_c-1)}$', '$r^{\gamma-1} = 18^{0.4} \approx 3.18$', '$\frac{r_c^{\gamma}-1}{\gamma(r_c-1)} = \frac{2.2^{1.4}-1}{1.4(2.2-1)} = \frac{2.85-1}{1.68} \approx 1.10$', '$\eta = 1 - \frac{1}{3.18} \cdot 1.10 = 1 - 0.346 = 0.654$ (65.4%)'] },
    { id: 19, titulo: 'Mezcla de gases y presiones parciales', enunciado: 'Un recipiente de $2$ m³ contiene una mezcla de $0.5$ kg de N₂ y $0.3$ kg de O₂ a $300$ K. Calcule la presión total y las presiones parciales ($R_{N2} = 0.297$ kJ/kg·K, $R_{O2} = 0.260$ kJ/kg·K).', dificultad: 'Media', tema: 'Mezclas', pasos: ['$P_{N2} = m_{N2} R_{N2} T / V = 0.5 \cdot 297 \cdot 300 / 2 = 22.28$ kPa', '$P_{O2} = m_{O2} R_{O2} T / V = 0.3 \cdot 260 \cdot 300 / 2 = 11.70$ kPa', '$P_{total} = P_{N2} + P_{O2} = 33.98$ kPa', 'Fracciones molares: $y_{N2} = 22.28/33.98 \approx 0.656$, $y_{O2} \approx 0.344$'] },
    { id: 20, titulo: 'Aire húmedo — Humedad específica', enunciado: 'Aire a $30$ °C y $P = 100$ kPa tiene una humedad relativa $\phi = 60$%. La presión de saturación a $30$ °C es $P_g = 4.25$ kPa. Calcule la humedad específica y la presión parcial del vapor.', dificultad: 'Media', tema: 'Psicrometría', pasos: ['$P_v = \phi \cdot P_g = 0.60 \cdot 4.25 = 2.55$ kPa', '$\omega = 0.622 \frac{P_v}{P - P_v} = 0.622 \frac{2.55}{100 - 2.55}$', '$\omega \approx 0.0163$ kg vapor/kg aire seco (16.3 g/kg)'] },
    { id: 21, titulo: 'Radiación entre placas paralelas', enunciado: 'Dos placas grandes paralelas están a $T_1 = 800$ K y $T_2 = 500$ K. Ambas son cuerpos negros. Calcule el flujo de calor neto por radiación entre ellas ($\sigma = 5.67 \times 10^{-8}$ W/m²·K⁴).', dificultad: 'Fácil', tema: 'Transferencia de calor', pasos: ['Ley de Stefan-Boltzmann para intercambio neto entre cuerpos negros:', '$q = \sigma (T_1^4 - T_2^4)$', '$q = 5.67 \times 10^{-8} (800^4 - 500^4)$', '$q = 5.67 \times 10^{-8} (4.096 \times 10^{11} - 6.25 \times 10^{10})$', '$q = 5.67 \times 10^{-8} \cdot 3.471 \times 10^{11} \approx 19.68$ kW/m²'] },
    { id: 22, titulo: 'Cálculo de área crítica en tobera', enunciado: 'Aire ($\gamma = 1.4$, $R = 287$ J/kg·K) fluye isentrópicamente por una tobera desde $P_0 = 500$ kPa, $T_0 = 400$ K hasta $P = 100$ kPa. El flujo másico es $\dot{m} = 2$ kg/s. Calcule el área de la garganta ($A^*$) y el área de salida.', dificultad: 'Difícil', tema: 'Sistemas abiertos', pasos: ['En la garganta: $Ma = 1$, $T^* = T_0 \frac{2}{\gamma+1} = 400 \cdot \frac{2}{2.4} = 333.3$ K', '$P^* = P_0 (2/(\gamma+1))^{\gamma/(\gamma-1)} = 500 \cdot 0.528 = 264$ kPa', '$\rho^* = P^*/(RT^*) = 264000/(287 \cdot 333.3) = 2.76$ kg/m³', '$V^* = a^* = \sqrt{\gamma RT^*} = \sqrt{1.4 \cdot 287 \cdot 333.3} \approx 366$ m/s', '$A^* = \dot{m}/(\rho^* V^*) = 2/(2.76 \cdot 366) \approx 1.98 \times 10^{-3}$ m² = 19.8 cm²', 'A la salida: $Ma_{salida} \approx 1.71$ (de tablas isentrópicas para $P/P_0 = 0.2$)', '$A_{salida} = A^* \cdot (A/A^*)_{Ma=1.71} \approx 1.98 \cdot 1.35 \approx 2.67$ cm²'] },
  ]


  /* helpers */
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark'
    const next = current === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  function renderKatex(node, tex) {
    if (node && tex) {
      try { katex.render(tex, node, { throwOnError: false }) }
      catch (e) { node.textContent = tex }
    }
    return { update(newTex) {
      if (node && newTex) {
        try { katex.render(newTex, node, { throwOnError: false }) }
        catch (e) { node.textContent = newTex }
      }
    }}
  }

  function pickDueCard() {
    const due = dueCards()
    if (due.length === 0) { cardIdx = 0; return }
    const currentId = cards[cardIdx]?.id
    const next = due.find(c => c.id !== currentId) || due[0]
    cardIdx = cards.findIndex(c => c.id === next.id)
  }
  function nextCard() {
    showBack = false
    pickDueCard()
  }

  function getStats() {
    const saved = localStorage.getItem('termo-stats')
    return saved ? JSON.parse(saved) : { streak: 0, lastDate: null, totalReviews: 0, correctReviews: 0 }
  }
  function saveStats(stats) {
    localStorage.setItem('termo-stats', JSON.stringify(stats))
  }
  function updateStreak() {
    const stats = getStats()
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1)
    const yestStr = yesterday.toISOString().split('T')[0]
    if (stats.lastDate === today) return stats
    if (stats.lastDate === yestStr) stats.streak += 1
    else stats.streak = 1
    stats.lastDate = today
    saveStats(stats)
    return stats
  }

  function showToast(msg, type = 'info') {
    toast = { message: msg, type, visible: true }
    setTimeout(() => { toast = { ...toast, visible: false } }, 1800)
  }

  function rate(q) {
    const card = cards[cardIdx]
    if (!card) return
    sm2(card, q)
    const stats = getStats()
    stats.totalReviews += 1
    if (q >= 3) stats.correctReviews += 1
    saveStats(stats)
    updateStreak()
    const labels = { 1: 'Olvidado — se repite mañana', 2: 'Difícil — intervalo corto', 3: 'Bien — progreso normal', 4: 'Fácil — intervalo largo', 5: 'Perfecto — máximo intervalo' }
    const types = { 1: 'error', 2: 'warning', 3: 'success', 4: 'success', 5: 'success' }
    showToast(labels[q], types[q])
    nextCard()
  }

  function resetProgress() {
    if (!confirm('¿Borrar todo el progreso de flashcards?')) return
    localStorage.removeItem('termo-cards')
    localStorage.removeItem('termo-stats')
    loadCards()
    cardIdx = 0
    showBack = false
  }

  function exportProgress() {
    const data = {
      cards: JSON.parse(localStorage.getItem('termo-cards') || '[]'),
      stats: JSON.parse(localStorage.getItem('termo-stats') || '{}'),
      exportedAt: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `termo-trainer-backup-${today}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function importProgress(event) {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (data.cards) localStorage.setItem('termo-cards', JSON.stringify(data.cards))
        if (data.stats) localStorage.setItem('termo-stats', JSON.stringify(data.stats))
        loadCards()
        showToast('Progreso importado correctamente', 'success')
      } catch (err) {
        showToast('Error al importar el archivo', 'error')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  onMount(() => {
    loadCards()
    pickDueCard()
    const savedTheme = localStorage.getItem('theme')
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
    const theme = savedTheme || (prefersLight ? 'light' : 'dark')
    document.documentElement.setAttribute('data-theme', theme)
  })

  $: dueCount = dueCards().length
  $: currentCard = cards[cardIdx] || null
  $: stats = getStats()
  $: if (active === 'simulador' && plotDiv) drawCycle()
</script>

<header class="site-header">
  <div class="container header-inner">
    <div class="logo">Termo <span>Trainer</span></div>
    <div class="header-actions">
      <nav class="tab-nav">
        <button class="tab-btn" class:active={active === 'dashboard'} on:click={() => active = 'dashboard'}>Dashboard</button>
        <button class="tab-btn" class:active={active === 'flashcards'} on:click={() => active = 'flashcards'}>Flashcards</button>
        <button class="tab-btn" class:active={active === 'problemas'} on:click={() => active = 'problemas'}>Problemas</button>
        <button class="tab-btn" class:active={active === 'temas'} on:click={() => { active = 'temas'; temaActivo = null; }}>Temas</button>
        <button class="tab-btn" class:active={active === 'simulador'} on:click={() => active = 'simulador'}>Simulador</button>
        <button class="tab-btn" class:active={active === 'examen'} on:click={() => active = 'examen'}>Examen</button>
      </nav>
      <button class="theme-toggle" on:click={toggleTheme}>☀️</button>
    </div>
  </div>
</header>

<main class="container">
  {#if active === 'dashboard'}
    <section>
      <h1>Dashboard</h1>
      <p class="muted">Resumen de progreso y estado de estudio.</p>
      <div class="grid">
        <div class="card">
          <div class="label">Flashcards pendientes hoy</div>
          <div class="value">{dueCount}</div>
        </div>
        <div class="card">
          <div class="label">Racha de estudio</div>
          <div class="value">{stats.streak} 🔥</div>
        </div>
        <div class="card">
          <div class="label">Total repasos</div>
          <div class="value">{stats.totalReviews}</div>
        </div>
        <div class="card">
          <div class="label">Precisión</div>
          <div class="value">{stats.totalReviews ? Math.round((stats.correctReviews/stats.totalReviews)*100) : 0}%</div>
        </div>
        <div class="card">
          <div class="label">Total tarjetas</div>
          <div class="value">{cards.length}</div>
        </div>
        <div class="card">
          <div class="label">Fórmula del día</div>
          <div class="formula" use:renderKatex={"\\eta = 1 - \\frac{Q_c}{Q_h}"}></div>
        </div>
      </div>

      <div class="controls" style="margin-top:2rem;">
        <button on:click={exportProgress}>💾 Exportar progreso</button>
        <label class="secondary" style="cursor:pointer;">
          📁 Importar progreso
          <input type="file" accept=".json" on:change={importProgress} style="display:none;" />
        </label>
      </div>
    </section>

  {:else if active === 'flashcards'}
    <section>
      <h1>Flashcards</h1>
      <p class="muted">Repetición espaciada — algoritmo SM-2.</p>

      <div class="controls" style="margin-bottom:1rem;justify-content:flex-start;">
        <button class="secondary" class:active={!freeReview} on:click={() => { freeReview = false; pickDueCard(); showBack = false; }}>SM-2</button>
        <button class="secondary" class:active={freeReview} on:click={() => { freeReview = true; freeOrder = cards.map(c=>c.id).sort(()=>Math.random()-0.5); cardIdx = cards.findIndex(c=>c.id===freeOrder[0]); showBack = false; }}>Repaso libre</button>
      </div>

      {#if !freeReview && dueCount === 0}
        <div class="empty-state">
          <div class="icon">🎉</div>
          <p>¡No hay tarjetas pendientes para hoy!</p>
          <button class="secondary" on:click={resetProgress}>Reiniciar progreso</button>
        </div>
      {:else if currentCard}
        <div class="card-wrap">
          <div class="flashcard" on:click={() => showBack = !showBack} role="button" tabindex="0">
            <div class="tema">{currentCard.tema}</div>
            <div class="content">
              {#if !showBack}
                <div class="front">{currentCard.front}</div>
                <div class="hint">Pulsa para ver la respuesta</div>
              {:else}
                <div class="back" use:renderKatex={currentCard.back}></div>
              {/if}
            </div>
          </div>
        </div>

        {#if showBack}
          {#if freeReview}
            <div class="controls">
              <button on:click={() => { showBack = false; const idx = freeOrder.indexOf(currentCard.id); const prev = freeOrder[idx-1]; if (prev) cardIdx = cards.findIndex(c=>c.id===prev); }}>← Anterior</button>
              <button on:click={() => { showBack = false; const idx = freeOrder.indexOf(currentCard.id); const next = freeOrder[idx+1]; if (next) cardIdx = cards.findIndex(c=>c.id===next); }}>Siguiente →</button>
            </div>
          {:else}
            <div class="rate-bar">
              <div class="rate-label">¿Qué tal lo tienes?</div>
              <div class="rate-buttons">
                <button class="rate-btn r1" on:click={() => rate(1)}>1<br><span>Olvidado</span></button>
                <button class="rate-btn r2" on:click={() => rate(2)}>2<br><span>Difícil</span></button>
                <button class="rate-btn r3" on:click={() => rate(3)}>3<br><span>Bien</span></button>
                <button class="rate-btn r4" on:click={() => rate(4)}>4<br><span>Fácil</span></button>
                <button class="rate-btn r5" on:click={() => rate(5)}>5<br><span>Perfecto</span></button>
              </div>
            </div>
          {/if}
        {/if}

        <div class="controls">
          <button on:click={resetProgress}>Reiniciar progreso</button>
        </div>
      {/if}
    </section>

  {:else if active === 'problemas'}
    <section>
      <h1>Banco de Problemas</h1>
      <p class="muted">Enunciado → intentar → resolución paso a paso.</p>
      <div class="list">
        {#each problemas as p}
          <div class="problem-card">
            <div class="problem-header">
              <div>
                <div class="problem-title">{p.titulo}</div>
                <div class="meta">
                  <span class="badge">{p.tema}</span>
                  <span class="badge">{p.dificultad}</span>
                </div>
              </div>
              <button class="toggle-btn" on:click={() => openProblem = openProblem === p.id ? null : p.id}>
                {openProblem === p.id ? 'Ocultar' : 'Resolver'}
              </button>
            </div>
            <div class="enunciado" use:renderKatex={p.enunciado}></div>
            {#if openProblem === p.id}
              <div class="solucion">
                <h4>Solución paso a paso</h4>
                <ol>
                  {#each p.pasos as paso}
                    <li><span use:renderKatex={paso}></span></li>
                  {/each}
                </ol>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </section>

  {:else if active === 'temas'}
    <section>
      {#if !temaActivo}
        <h1>Temas</h1>
        <p class="muted">Teoría, formularios y recursos por bloque temático.</p>
        <div class="tema-grid">
          {#each temas as t}
            <div class="tema-card" on:click={() => temaActivo = t} role="button" tabindex="0">
              <div class="tema-name">{t.nombre}</div>
              <div class="tema-count">{cards.filter(c => c.tema === t.id || c.tema === t.nombre).length} flashcards · {problemas.filter(p => p.tema === t.id || p.tema === t.nombre).length} problemas</div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="tema-header">
          <button class="secondary" on:click={() => temaActivo = null}>← Volver a temas</button>
        </div>
        <h2>{temaActivo.nombre}</h2>

        <div class="tema-section">
          <h3>Teoría</h3>
          <ul class="tema-list">
            {#each temaActivo.teoría as parrafo}
              <li>{parrafo}</li>
            {/each}
          </ul>
        </div>

        <div class="tema-section">
          <h3>Formulario</h3>
          <div class="formula-grid">
            {#each temaActivo.formulas as f}
              <div class="formula-box" use:renderKatex={f}></div>
            {/each}
          </div>
        </div>

        {#if temaActivo.tablas && temaActivo.tablas.length}
          {#each temaActivo.tablas as tabla}
            <div class="tema-section">
              <h3>{tabla.titulo}</h3>
              <div class="tema-table-wrap">
                <table class="tema-table">
                  <thead>
                    <tr>
                      {#each tabla.headers as h}
                        <th>{h}</th>
                      {/each}
                    </tr>
                  </thead>
                  <tbody>
                    {#each tabla.rows as row}
                      <tr>
                        {#each row as cell}
                          <td use:renderKatex={cell}></td>
                        {/each}
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            </div>
          {/each}
        {/if}

        {#if temaActivo.aplicaciones && temaActivo.aplicaciones.length}
          <div class="tema-section">
            <h3>Aplicaciones prácticas</h3>
            <ul class="tema-list">
              {#each temaActivo.aplicaciones as app}
                <li>{app}</li>
              {/each}
            </ul>
          </div>
        {/if}

        <div class="tema-actions">
          <button on:click={() => { freeReview = true; freeOrder = cards.filter(c => c.tema === temaActivo.id || c.tema === temaActivo.nombre).map(c=>c.id).sort(()=>Math.random()-0.5); if (freeOrder.length) { cardIdx = cards.findIndex(c=>c.id===freeOrder[0]); active = 'flashcards'; showBack = false; } else { showToast('No hay flashcards de este tema', 'warning'); } }}>Practicar flashcards</button>
          <button class="secondary" on:click={() => { const probs = problemas.filter(p => p.tema === temaActivo.id || p.tema === temaActivo.nombre); if (probs.length) { openProblem = probs[0].id; active = 'problemas'; } else { showToast('No hay problemas de este tema', 'warning'); } }}>Ver problemas</button>
        </div>
      {/if}
    </section>

  {:else if active === 'simulador'}
    <section>
      <h1>Simulador de Ciclos</h1>
      <p class="muted">Compara ciclos ideales con diagramas P-v y T-s interactivos.</p>

      <div class="cycle-selector">
        <button class="cycle-btn" class:active={simCycle === 'otto'} on:click={() => { simCycle = 'otto'; drawCycle(); }}>Otto</button>
        <button class="cycle-btn" class:active={simCycle === 'brayton'} on:click={() => { simCycle = 'brayton'; drawCycle(); }}>Brayton</button>
        <button class="cycle-btn" class:active={simCycle === 'diesel'} on:click={() => { simCycle = 'diesel'; drawCycle(); }}>Diesel</button>
        <button class="cycle-btn" class:active={simCycle === 'rankine'} on:click={() => { simCycle = 'rankine'; drawCycle(); }} disabled>Rankine</button>
      </div>

      <div class="sim-controls">
        {#if simCycle === 'otto'}
          <div class="slider-group">
            <label>Relación de compresión r = {simR.toFixed(1)}
              <input type="range" min="4" max="14" step="0.5" bind:value={simR} on:input={drawCycle} />
            </label>
          </div>
          <div class="slider-group">
            <label>Relación de presión combustión = {simRpCut.toFixed(1)}
              <input type="range" min="1.5" max="5" step="0.1" bind:value={simRpCut} on:input={drawCycle} />
            </label>
          </div>
        {:else if simCycle === 'brayton'}
          <div class="slider-group">
            <label>Relación de presiones rₚ = {simR.toFixed(1)}
              <input type="range" min="2" max="20" step="0.5" bind:value={simR} on:input={drawCycle} />
            </label>
          </div>
          <div class="slider-group">
            <label>Relación de temperaturas T₃/T₂ = {simRpCut.toFixed(1)}
              <input type="range" min="1.5" max="6" step="0.1" bind:value={simRpCut} on:input={drawCycle} />
            </label>
          </div>
        {:else}
          <div class="slider-group"><span class="label-like">Próximamente…</span></div>
        {/if}
        <div class="slider-group">
          <label>γ = {simGamma.toFixed(2)}
            <input type="range" min="1.2" max="1.6" step="0.01" bind:value={simGamma} on:input={drawCycle} />
          </label>
        </div>
      </div>

      <div class="plot-wrap" bind:this={plotDiv}></div>
    </section>

  {:else if active === 'examen'}
    <section>
      <h1>Modo Examen</h1>
      <p class="muted">Autoevaluación rápida con flashcards aleatorias.</p>

      {#if examFinished && !examReviewErrors}
        <div class="results">
          <div class="score-ring">
            <div class="score-value">{examScore().pct}%</div>
            <div class="score-label">{examScore().correct}/{examScore().total} aciertos</div>
          </div>
          <div class="result-actions">
            <button on:click={() => { examReviewErrors = true; examIdx = 0; examShowAnswer = true; }}>Revisar errores</button>
            <button class="secondary" on:click={startExam}>Nuevo examen</button>
            <button class="secondary" on:click={() => active = 'dashboard'}>Volver al Dashboard</button>
          </div>
        </div>
      {:else if examFinished && examReviewErrors}
        <div class="exam-review">
          <h3>Revisión de errores</h3>
          {#each examAnswers.filter(a => !a.correct) as err, i}
            <div class="review-card">
              <div class="review-num">{i+1}</div>
              <div>
                <div class="review-q">{err.q.front}</div>
                <div class="review-a" use:renderKatex={err.q.back}></div>
              </div>
            </div>
          {/each}
          <div class="controls">
            <button on:click={() => { examReviewErrors = false; }}>← Volver a resultados</button>
          </div>
        </div>
      {:else if examQuestions.length === 0}
        <div class="exam-config">
          <div class="config-card">
            <div class="label">Número de preguntas</div>
            <div class="config-options">
              {#each [5, 10, 15, 20] as n}
                <button class="config-btn" class:active={examCount === n} on:click={() => examCount = n}>{n}</button>
              {/each}
            </div>
            <button class="start-btn" on:click={startExam}>Comenzar examen</button>
          </div>
        </div>
      {:else}
        <div class="exam-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: {(examIdx / examQuestions.length) * 100}%"></div>
          </div>
          <div class="progress-text">Pregunta {examIdx + 1} de {examQuestions.length}</div>
        </div>

        <div class="card-wrap">
          <div class="flashcard" on:click={() => examShowAnswer = !examShowAnswer} role="button" tabindex="0">
            <div class="tema">{examQuestions[examIdx].tema}</div>
            <div class="content">
              {#if !examShowAnswer}
                <div class="front">{examQuestions[examIdx].front}</div>
                <div class="hint">Pulsa para ver la respuesta</div>
              {:else}
                <div class="back" use:renderKatex={examQuestions[examIdx].back}></div>
              {/if}
            </div>
          </div>
        </div>

        {#if examShowAnswer}
          <div class="exam-actions">
            <button class="exam-btn wrong" on:click={() => answerExam(false)}>✗ Incorrecto</button>
            <button class="exam-btn correct" on:click={() => answerExam(true)}>✓ Correcto</button>
          </div>
        {/if}
      {/if}
    </section>
  {/if}
</main>

<style>
  .site-header {
    position: sticky;
    top: 0;
    z-index: 50;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border);
    margin-bottom: 2rem;
    background: var(--surface);
    box-shadow: var(--shadow-sm);
  }
  .header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .logo {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: 1.05rem;
    color: var(--text);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .logo span { color: var(--accent-bright); }
  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .tab-nav {
    display: flex;
    gap: 0.25rem;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 0.25rem;
  }
  .tab-btn {
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.45rem 0.85rem;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    transition: background 0.2s, color 0.2s;
    cursor: pointer;
  }
  .tab-btn:hover { color: var(--text); }
  .tab-btn.active { background: var(--accent); color: #fff; }
  .theme-toggle {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: 8px;
    padding: 0.4rem 0.7rem;
    cursor: pointer;
    transition: border-color 0.2s;
  }
  .theme-toggle:hover { border-color: var(--accent-bright); }

  main { padding-bottom: 3rem; }
  h1 { font-size: 1.8rem; margin-bottom: 0.5rem; }
  .muted { color: var(--text-muted); margin-bottom: 2rem; }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.25rem;
  }
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
  }
  .label {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
  }
  .value {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--accent-bright);
  }
  .formula { margin-top: 0.5rem; }

  .empty-state {
    text-align: center;
    padding: 3rem;
    color: var(--text-muted);
  }
  .empty-state .icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .empty-state p { margin-bottom: 1.5rem; }
  .secondary {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--accent);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: border-color 0.2s;
  }
  .secondary:hover { border-color: var(--accent-bright); }

  .card-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  .flashcard {
    width: 100%;
    max-width: 600px;
    min-height: 280px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.2s;
    box-shadow: var(--shadow-sm);
  }
  .flashcard:hover { border-color: var(--accent); transform: translateY(-2px); }
  .tema {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent-warm);
    margin-bottom: 1.5rem;
    border: 1px solid var(--accent-warm);
    padding: 0.25rem 0.6rem;
    border-radius: 999px;
  }
  .front { font-size: 1.4rem; font-weight: 700; }
  .hint { font-size: 0.8rem; color: var(--text-muted); margin-top: 1rem; }
  .back { font-size: 1.2rem; }

  .rate-bar {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .rate-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
  }
  .rate-buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .rate-btn {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: 10px;
    padding: 0.5rem 0.9rem;
    cursor: pointer;
    transition: all 0.15s;
    line-height: 1.2;
    min-width: 72px;
  }
  .rate-btn span { font-size: 0.6rem; font-weight: 500; color: var(--text-muted); }
  .rate-btn:hover { transform: translateY(-2px); border-color: var(--accent); }
  .rate-btn.r1:hover { border-color: #ef4444; color: #ef4444; }
  .rate-btn.r2:hover { border-color: #f97316; color: #f97316; }
  .rate-btn.r3:hover { border-color: #eab308; color: #eab308; }
  .rate-btn.r4:hover { border-color: #22c55e; color: #22c55e; }
  .rate-btn.r5:hover { border-color: #3b82f6; color: #3b82f6; }

  .controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  .controls button {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 600;
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: 10px;
    padding: 0.6rem 1.2rem;
    cursor: pointer;
    transition: border-color 0.2s;
  }
  .controls button:hover { border-color: var(--accent-bright); }

  .list { display: flex; flex-direction: column; gap: 1rem; }
  .problem-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
  }
  .problem-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .problem-title { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.5rem; }
  .meta { display: flex; gap: 0.5rem; flex-wrap: wrap; }
  .badge {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
    border: 1px solid var(--border-hover);
    color: var(--text-muted);
  }
  .toggle-btn {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 600;
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--accent);
    border-radius: 8px;
    padding: 0.4rem 0.8rem;
    white-space: nowrap;
    cursor: pointer;
    transition: border-color 0.2s;
  }
  .toggle-btn:hover { border-color: var(--accent-bright); }
  .enunciado { color: var(--text-muted); line-height: 1.7; }
  .solucion {
    margin-top: 1.25rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--border);
  }
  .solucion h4 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem; color: var(--accent-warm); }
  .solucion ol { padding-left: 1.25rem; }
  .solucion li { margin-bottom: 0.6rem; color: var(--text); }

  .cycle-selector {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }
  .cycle-btn {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-muted);
    border-radius: 10px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .cycle-btn:hover { color: var(--text); border-color: var(--accent); }
  .cycle-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }
  .cycle-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .sim-controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .slider-group {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1rem;
  }
  .slider-group label, .label-like {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }
  .slider-group input[type="range"] {
    width: 100%;
    accent-color: var(--accent);
  }
  .plot-wrap {
    width: 100%;
    min-height: 420px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 0.5rem;
  }

  :global(.toast) {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.6rem 1.2rem;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    box-shadow: var(--shadow-md);
    z-index: 100;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  :global(.toast.visible) {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    pointer-events: auto;
  }
  :global(.toast.error) { border-color: #ef4444; color: #fca5a5; }
  :global(.toast.warning) { border-color: #f97316; color: #fdba74; }
  :global(.toast.success) { border-color: #22c55e; color: #86efac; }

  .exam-config {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  .config-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 2rem;
    max-width: 400px;
    width: 100%;
    text-align: center;
  }
  .config-options {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin: 1rem 0 1.5rem;
  }
  .config-btn {
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 700;
    background: var(--surface-2);
    border: 1px solid var(--border);
    color: var(--text-muted);
    border-radius: 10px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .config-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }
  .start-btn {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    font-weight: 700;
    width: 100%;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 10px;
    padding: 0.75rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }
  .start-btn:hover { opacity: 0.9; }

  .exam-progress {
    margin-bottom: 1.5rem;
  }
  .progress-bar {
    height: 6px;
    background: var(--surface-2);
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
  .progress-fill {
    height: 100%;
    background: var(--accent);
    border-radius: 999px;
    transition: width 0.3s ease;
  }
  .progress-text {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  .exam-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .exam-btn {
    font-family: var(--font-mono);
    font-size: 0.9rem;
    font-weight: 700;
    padding: 0.7rem 1.5rem;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    transition: transform 0.15s, opacity 0.2s;
  }
  .exam-btn:hover { transform: translateY(-2px); opacity: 0.9; }
  .exam-btn.correct { background: #22c55e; color: #fff; }
  .exam-btn.wrong { background: #ef4444; color: #fff; }

  .results {
    text-align: center;
    padding: 2rem;
  }
  .score-ring {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 4px solid var(--accent);
    margin-bottom: 2rem;
  }
  .score-value {
    font-size: 2.2rem;
    font-weight: 800;
    color: var(--accent-bright);
  }
  .score-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-top: 0.25rem;
  }
  .result-actions {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .exam-review {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .review-card {
    display: flex;
    gap: 1rem;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.25rem;
  }
  .review-num {
    font-family: var(--font-mono);
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--accent-warm);
    min-width: 28px;
  }
  .review-q { font-weight: 700; margin-bottom: 0.5rem; }
  .review-a { color: var(--text-muted); }

  .tema-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .tema-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.2s;
    box-shadow: var(--shadow-sm);
  }
  .tema-card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .tema-name { font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem; }
  .tema-count { font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }

  .tema-header { margin-bottom: 1.5rem; }
  .tema-section {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-sm);
  }
  .tema-section h3 {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--accent-warm);
    margin-bottom: 1rem;
  }
  .tema-list { list-style: none; padding: 0; }
  .tema-list li {
    position: relative;
    padding-left: 1.25rem;
    margin-bottom: 0.75rem;
    color: var(--text-muted);
    line-height: 1.6;
  }
  .tema-list li::before {
    content: '›';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-weight: 700;
  }
  .formula-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }
  .formula-box {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tema-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  .tema-table-wrap {
    overflow-x: auto;
    border-radius: 10px;
    border: 1px solid var(--border);
  }
  .tema-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.85rem;
  }
  .tema-table th {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    text-align: left;
    padding: 0.75rem 1rem;
    background: var(--surface-2);
    color: var(--accent-warm);
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
  }
  .tema-table td {
    padding: 0.6rem 1rem;
    border-bottom: 1px solid var(--border);
    color: var(--text);
    vertical-align: top;
  }
  .tema-table tbody tr:last-child td {
    border-bottom: none;
  }
  .tema-table tbody tr:hover td {
    background: rgba(96,165,250,0.05);
  }

  @media (max-width: 640px) {
    .header-inner { flex-direction: column; align-items: stretch; }
    .header-actions { justify-content: space-between; }
    .tab-nav { flex: 1; overflow-x: auto; }
    .rate-buttons { gap: 0.35rem; }
    .rate-btn { min-width: 60px; padding: 0.4rem 0.5rem; font-size: 0.75rem; }
    .plot-wrap { min-height: 320px; }
  }
</style>
