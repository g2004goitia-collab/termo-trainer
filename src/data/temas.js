export const temas = [
  {
    id: 'Intro',
    nombre: 'Introducción y Conceptos Básicos',
    teoría: [
      'La termodinámica es la rama de la física que estudia las transformaciones de la energía y sus efectos sobre las propiedades macroscópicas de la materia.',
      'Sistema termodinámico: porción del universo sometida a estudio. Todo lo externo es el entorno o medio ambiente. La frontera puede ser real o imaginaria, fija o móvil.',
      'Sistemas cerrados (de masa constante): solo intercambian energía, no masa. Sistemas abiertos (volumen de control): intercambian masa y energía. Sistemas aislados: no intercambian nada.',
      'Propiedades intensivas no dependen del tamaño del sistema: temperatura, presión, densidad. Propiedades extensivas son aditivas: masa, volumen, energía interna.',
      'El estado de equilibrio termodinámico requiere equilibrio térmico (T uniforme), mecánico (P uniforme), de fase (sin cambios de fase netos) y químico (sin reacciones netas).',
      'Un proceso es la transformación de un estado de equilibrio a otro. Los principales son: isobárico (P cte), isocórico (V cte), isotermo (T cte), adiabático (Q=0) y politrópico (PVⁿ=cte).',
      'La presión manométrica es la diferencia respecto a la atmosférica. La presión absoluta es la que debe usarse en todas las ecuaciones termodinámicas.',
      'La temperatura es una medida de la energía cinética molecular media. Las escalas absolutas (Kelvin, Rankine) son las únicas válidas para cálculos termodinámicos.'
    ],
    formulas: [
      'P_{abs} = P_{man} + P_{atm}',
      '\\rho = \\frac{m}{V}',
      '\\gamma = \\rho g',
      'v = \\frac{V}{m} = \\frac{1}{\\rho}',
      'T(K) = T(°C) + 273.15',
      '\\bar{v} = \\frac{V}{n} \\quad \\text{(volumen molar)}'
    ],
    tablas: [
      {
        titulo: 'Clasificación de sistemas termodinámicos',
        headers: ['Tipo', 'Intercambio de masa', 'Intercambio de energía'],
        rows: [
          ['Cerrado', 'No', 'Sí'],
          ['Abierto', 'Sí', 'Sí'],
          ['Aislado', 'No', 'No']
        ]
      },
      {
        titulo: 'Procesos termodinámicos fundamentales',
        headers: ['Proceso', 'Condición', 'Relación'],
        rows: [
          ['Isobárico', 'P = cte', 'W = P\\Delta V'],
          ['Isocórico', 'V = cte', 'W = 0'],
          ['Isotermo', 'T = cte', 'PV = cte'],
          ['Adiabático', 'Q = 0', 'PV^{\\gamma} = cte'],
          ['Politrópico', 'PV^{n} = cte', 'W = \\frac{P_2V_2 - P_1V_1}{1-n}']
        ]
      }
    ],
    aplicaciones: [
      'Diseño de recipientes a presión: es fundamental conocer la diferencia entre presión manométrica y absoluta para cálculos de seguridad.',
      'Análisis de procesos industriales: clasificar correctamente el sistema como abierto o cerrado determina qué ecuaciones de balance aplicar.',
      'Medición de propiedades: distinguir propiedades intensivas de extensivas permite escalar resultados de laboratorio a planta industrial.'
    ]
  },
  {
    id: 'Cambios de fase',
    nombre: 'Cambios de Fase y Propiedades de Sustancias Puras',
    teoría: [
      'Una sustancia pura tiene composición química uniforme e invariable. Puede existir en más de una fase, pero su composición es la misma en todas ellas.',
      'El diagrama P-T muestra las regiones de fase sólida, líquida y gaseosa, separadas por líneas de coexistencia. El punto triple es el único estado donde las tres fases coexisten en equilibrio.',
      'El punto crítico marca el límite superior de la curva de saturación líquido-vapor. Por encima de la temperatura crítica no es posible liquefar un gas por compresión.',
      'La calidad (x) se define únicamente en la región de saturación (mezcla líquido-vapor) y varía entre 0 (líquido saturado) y 1 (vapor saturado).',
      'En la región de líquido comprimido (subenfriado), las propiedades se aproximan muy bien a las del líquido saturado a la misma temperatura.',
      'Para vapor sobrecalentado se requieren dos propiedades independientes (P y T) para determinar el estado.',
      'La ecuación de estado del gas ideal (PV=mRT) es válida para presiones bajas y temperaturas altas. Para comportamiento real se usan ecuaciones como Van der Waals o el factor de compresibilidad Z.',
      'La regla de las fases de Gibbs (F = C - P + 2) determina los grados de libertad de un sistema en equilibrio.'
    ],
    formulas: [
      'x = \\frac{m_{vapor}}{m_{total}}',
      'v = v_f + x(v_g - v_f)',
      'h = h_f + x h_{fg}',
      'u = u_f + x u_{fg}',
      's = s_f + x s_{fg}',
      '\\frac{dP}{dT} = \\frac{h_{fg}}{T v_{fg}}',
      'Z = \\frac{Pv}{RT}',
      '\\left(P + \\frac{a}{v^2}\\right)(v - b) = RT',
      'F = C - P + 2'
    ],
    tablas: [
      {
        titulo: 'Puntos críticos de sustancias comunes',
        headers: ['Sustancia', 'Tcr (K)', 'Pcr (bar)'],
        rows: [
          ['Agua', '647.1', '220.6'],
          ['CO₂', '304.2', '73.8'],
          ['Nitrógeno', '126.2', '34.0'],
          ['Oxígeno', '154.6', '50.4'],
          ['Amoníaco', '405.4', '113.5']
        ]
      },
      {
        titulo: 'Región del diagrama T-v para agua',
        headers: ['Región', 'Calidad', 'Propiedades conocidas'],
        rows: [
          ['Líquido comprimido', '—', 'P y T (aprox. v≈vf)'],
          ['Líquido saturado', 'x = 0', 'P o T'],
          ['Mezcla saturada', '0 < x < 1', 'P o T + x'],
          ['Vapor saturado', 'x = 1', 'P o T'],
          ['Vapor sobrecalentado', '—', 'P y T']
        ]
      }
    ],
    aplicaciones: [
      'Diseño de calderas y turbinas: es esencial manejar tablas de vapor para determinar entalpías y entropías en cada punto del ciclo Rankine.',
      'Sistemas de refrigeración: el conocimiento de las curvas de saturación permite dimensionar condensadores y evaporadores.',
      'Almacenamiento de gases criogénicos: el punto crítico determina las condiciones máximas de almacenamiento sin riesgo de liquefacción.'
    ]
  },
  {
    id: 'Primer principio',
    nombre: 'Primer Principio de la Termodinámica',
    teoría: [
      'El primer principio es el principio de conservación de la energía aplicado a sistemas termodinámicos: la energía no se crea ni se destruye, solo se transforma.',
      'Energía interna (U): suma de todas las formas microscópicas de energía (cinética molecular, potencial intermolecular, vibracional, rotacional). Es una propiedad de estado.',
      'Trabajo (W): transferencia de energía asociada a una fuerza que actúa a través de una distancia. En termodinámica, el trabajo de frontera es W = ∫ P dV.',
      'Calor (Q): transferencia de energía debida a una diferencia de temperatura. No es una propiedad, depende del camino seguido.',
      'Para un sistema cerrado: ΔU = Q - W (convención de signos de ingeniería). Para un sistema abierto en régimen estacionario: Q̇ - Ẇ = ΔḢ + ΔĖc + ΔĖp.',
      'La entalpía H = U + PV es especialmente útil en sistemas abiertos y en procesos a presión constante, donde Q_p = ΔH.',
      'En un proceso isocórico (V=cte), W=0 y Q = ΔU = m c_v ΔT. En un proceso isobárico (P=cte), W = PΔV y Q = ΔH = m c_p ΔT.',
      'Para un gas ideal, la energía interna y la entalpía solo dependen de la temperatura: du = c_v dT, dh = c_p dT.',
      'Proceso isotermo de gas ideal: ΔU = 0, por tanto Q = W = mRT ln(V₂/V₁).',
      'Proceso adiabático reversible (isentrópico) de gas ideal: PV^γ = cte, TV^(γ-1) = cte, T^γ P^(1-γ) = cte.',
      'En procesos politrópicos (PV^n = cte), el trabajo y el calor dependen del exponente n. Casos particulares: n=0 (isobárico), n=1 (isotermo), n=γ (adiabático), n=∞ (isocórico).'
    ],
    formulas: [
      '\\Delta U = Q - W',
      'H = U + PV',
      'W_b = \\int_{1}^{2} P \\, dV',
      '\\Delta U = m c_v \\Delta T \\quad \\text{(gas ideal)}',
      '\\Delta H = m c_p \\Delta T \\quad \\text{(gas ideal)}',
      'c_p - c_v = R',
      '\\gamma = \\frac{c_p}{c_v}',
      'W_{isotermo} = mRT \\ln\\frac{V_2}{V_1}',
      'W_{politrópico} = \\frac{mR(T_2-T_1)}{1-n} = \\frac{P_2V_2-P_1V_1}{1-n}',
      'Q_{isocórico} = m c_v \\Delta T',
      'Q_{isobárico} = m c_p \\Delta T'
    ],
    tablas: [
      {
        titulo: 'Resumen de procesos para gas ideal',
        headers: ['Proceso', 'Relación', 'W', 'Q', 'ΔU'],
        rows: [
          ['Isobárico', 'P = cte', 'P(V₂-V₁)', 'mcpΔT', 'mcvΔT'],
          ['Isocórico', 'V = cte', '0', 'mcvΔT', 'mcvΔT'],
          ['Isotermo', 'T = cte', 'mRT·ln(V₂/V₁)', 'mRT·ln(V₂/V₁)', '0'],
          ['Adiabático', 'PV^{γ}=cte', 'm·cv·ΔT', '0', 'mcvΔT'],
          ['Politrópico', 'PV^{n}=cte', 'mR(T₂-T₁)/(1-n)', 'm·cn·ΔT', 'mcvΔT']
        ]
      },
      {
        titulo: 'Energía en sistemas abiertos (régimen estacionario)',
        headers: ['Término', 'Ecuación', 'Unidades'],
        rows: [
          ['Flujo de entalpía', 'ṁ·h', 'kW'],
          ['Flujo de energía cinética', 'ṁ·V²/2', 'kW'],
          ['Flujo de energía potencial', 'ṁ·gz', 'kW'],
          ['Transferencia de calor', 'Q̇', 'kW'],
          ['Transferencia de trabajo', 'Ẇ', 'kW']
        ]
      }
    ],
    aplicaciones: [
      'Análisis de motores de combustión interna: el primer principio permite calcular el calor liberado por la combustión a partir del trabajo producido y las pérdidas.',
      'Diseño de intercambiadores de calor: en sistemas abiertos, el balance de energía con entalpías permite dimensionar el área de transferencia necesaria.',
      'Compresores y turbinas: conocer el trabajo isentrópico y el trabajo real (mediante eficiencias) es fundamental para el diseño mecánico.'
    ]
  },
  {
    id: 'Segundo principio',
    nombre: 'Segundo Principio y Entropía',
    teoría: [
      'El segundo principio establece la dirección natural de los procesos y limita la conversión de calor en trabajo. No contradice la conservación de energía, sino que añade restricciones sobre su calidad.',
      'Enunciado de Kelvin-Planck: es imposible construir una máquina térmica que funcione en un ciclo y produzca trabajo neto intercambiando calor con una sola fuente.',
      'Enunciado de Clausius: es imposible construir un dispositivo que funcione en un ciclo y cuyo único efecto sea transferir calor de un cuerpo frío a otro caliente.',
      'La máquina de Carnot es el ciclo reversible ideal que opera entre dos reservorios térmicos. Su rendimiento depende únicamente de las temperaturas absolutas de los reservorios.',
      'Entropía (S): propiedad extensiva que mide el grado de dispersión molecular de la energía. Para un proceso reversible: dS = δQ_rev/T.',
      'La desigualdad de Clausius (∮ δQ/T ≤ 0) permite determinar si un ciclo es reversible (=0), irreversible (<0) o imposible (>0).',
      'Entropía generada (S_gen): siempre ≥ 0. Es cero para procesos reversibles y positiva para irreversibles. S_gen = ΔS_universo = ΔS_sistema + ΔS_entorno.',
      'La entropía de un sistema puede disminuir (ej. en un refrigerador), pero la del universo siempre aumenta.',
      'El principio de aumento de entropía del universo es una de las leyes más fundamentales de la física y determina la flecha del tiempo.'
    ],
    formulas: [
      '\\eta_{Carnot} = 1 - \\frac{T_c}{T_h}',
      '\\Delta S = \\int \\frac{\\delta Q_{rev}}{T}',
      '\\oint \\frac{\\delta Q}{T} \\le 0',
      'S_{gen} = \\Delta S_{sis} + \\Delta S_{ent} \\ge 0',
      'COP_{MR} = \\frac{T_c}{T_h - T_c}',
      'COP_{BC} = \\frac{T_h}{T_h - T_c} = \\frac{1}{1 - T_c/T_h}',
      '\\Delta S_{universo} \\ge 0'
    ],
    tablas: [
      {
        titulo: 'Máquina térmica, refrigerador y bomba de calor',
        headers: ['Dispositivo', 'Objetivo', 'COP/Rendimiento', 'Límites'],
        rows: [
          ['Máquina térmica', 'Producir trabajo', 'η = W/Qh', 'η ≤ η_Carnot'],
          ['Refrigerador', 'Extraer calor de Tc', 'COP = Qc/W', 'COP ≤ COP_Carnot'],
          ['Bomba de calor', 'Suministrar calor a Th', 'COP = Qh/W', 'COP ≤ COP_Carnot']
        ]
      },
      {
        titulo: 'Efecto de irreversibilidades en S_gen',
        headers: ['Irreversibilidad', 'Origen', 'Efecto en S_gen'],
        rows: [
          ['Transferencia de calor finita', 'ΔT finito', 'S_gen = Q(1/Tc - 1/Th)'],
          ['Fricción', 'Movimiento', 'S_gen = W_fricción/T'],
          ['Mezcla de fluidos', 'Difusión', 'S_gen = -R·Σṁ·ln(yi)'],
          ['Expansion libre', 'Sin trabajo', 'S_gen = nR·ln(V2/V1)']
        ]
      }
    ],
    aplicaciones: [
      'Evaluación de eficiencia de plantas de potencia: comparar el rendimiento real con el de Carnot indica el margen de mejora.',
      'Diseño de sistemas de refrigeración: el COP de Carnot fija el límite teórico máximo para un par de temperaturas dado.',
      'Análisis de exergía: la entropía generada está directamente relacionada con la destrucción de trabajo útil (exergía).'
    ]
  },
  {
    id: 'Ciclos',
    nombre: 'Ciclos Termodinámicos',
    teoría: [
      'Un ciclo termodinámico es una serie de procesos que devuelven al sistema a su estado inicial, permitiendo la conversión continua de calor en trabajo (o viceversa).',
      'Ciclo Otto (motor de encendido por chispa): 1→2 compresión isentrópica, 2→3 adición de calor a volumen constante (chispa), 3→4 expansión isentrópica, 4→1 rechazo de calor a volumen constante.',
      'Ciclo Diesel (motor de encendido por compresión): similar al Otto pero la combustión es a presión aproximadamente constante (corte). Relación de corte r_c = V3/V2.',
      'Ciclo Brayton (turbina de gas): 1→2 compresión isentrópica, 2→3 calor a presión constante (cámara de combustión), 3→4 expansión isentrópica (turbina), 4→1 rechazo a presión constante.',
      'Ciclo Rankine (central térmica de vapor): 1→2 bombeo isentrópico, 2→3 vaporización isobárica (caldera), 3→4 expansión isentrópica (turbina), 4→1 condensación isobárica.',
      'Mejoras al ciclo Rankine: recalentamiento (reduce humedad en turbina), regeneración (alimentación con calentadores), sobrecalentamiento (aumenta eficiencia).',
      'Ciclo combinado (gas-vapor): una turbina de gas (Brayton) en la parte superior y un ciclo de vapor (Rankine) en la inferior. Eficiencias superiores al 60%.',
      'Relación de trabajo de retroceso (BWR): fracción del trabajo de la turbina consumida por el compresor/bomba. En Brayton es alta (~40-60%).',
      'En motores de reacción, el ciclo Brayton abierto produce empuje directamente por la aceleración de gases, no trabajo en eje.'
    ],
    formulas: [
      '\\eta_{Otto} = 1 - \\frac{1}{r^{\\gamma-1}}',
      '\\eta_{Diesel} = 1 - \\frac{1}{r^{\\gamma-1}} \\cdot \\frac{r_c^{\\gamma}-1}{\\gamma(r_c-1)}',
      '\\eta_{Brayton} = 1 - \\frac{1}{r_p^{(\\gamma-1)/\\gamma}}',
      'COP_{BC} = \\frac{1}{1 - T_c/T_h}',
      'BWR = \\frac{W_{compresor}}{W_{turbina}}',
      '\\eta_{Rankine} = \\frac{w_{turbina} - w_{bomba}}{q_{caldera}} = \\frac{(h_3-h_4)-(h_2-h_1)}{h_3-h_2}'
    ],
    tablas: [
      {
        titulo: 'Comparación de ciclos de potencia',
        headers: ['Ciclo', 'Aplicación', 'Compresión', 'Calor', 'Expansión'],
        rows: [
          ['Otto', 'Automoción', 'Isentrópica', 'Isovolumétrico', 'Isentrópica'],
          ['Diesel', 'Transporte pesado', 'Isentrópica', 'Isobárico', 'Isentrópica'],
          ['Brayton', 'Aviación / Turbo', 'Isentrópica', 'Isobárico', 'Isentrópica'],
          ['Rankine', 'Centrales térmicas', 'Bomba isoentr.', 'Isobárico', 'Turbina isoentr.']
        ]
      },
      {
        titulo: 'Rangos típicos de parámetros',
        headers: ['Ciclo', 'r o rp', 'T máx (K)', 'η típico'],
        rows: [
          ['Otto', 'r = 8-12', '2500-3000', '25-35%'],
          ['Diesel', 'r = 14-22', '2000-2500', '35-45%'],
          ['Brayton', 'rp = 10-40', '1300-1700', '35-42%'],
          ['Rankine', '—', '800-900', '35-45%'],
          ['Combinado', '—', '—', '> 60%']
        ]
      }
    ],
    aplicaciones: [
      'Automoción: motores Otto para gasolina y Diesel para gasóleo. La relación de compresión determina la eficiencia y la necesidad de octanaje.',
      'Aviación: turborreactores y turbofans basados en el ciclo Brayton. La relación de presiones y la temperatura de entrada a turbina son críticas.',
      'Generación eléctrica: ciclos Rankine en centrales de carbón, nucleares y solares térmicas. El ciclo combinado gas-vapor maximiza la eficiencia.'
    ]
  },
  {
    id: 'Sistemas abiertos',
    nombre: 'Sistemas Abiertos y Flujo de Fluidos',
    teoría: [
      'Un volumen de control (sistema abierto) es una región del espacio a través de la cual fluye masa. La frontera se denomina superficie de control.',
      'Conservación de masa (ecuación de continuidad): para régimen estacionario, el flujo másico entrante es igual al saliente: ṁ_e = ṁ_s.',
      'Conservación de energía (primer principio para sistemas abiertos): Q̇ - Ẇ = Σṁ_s(h + V²/2 + gz)_s - Σṁ_e(h + V²/2 + gz)_e.',
      'En muchos dispositivos (toberas, difusores, válvulas) no hay trabajo ni calor significativos, por lo que h + V²/2 = cte (entalpía de estancamiento).',
      'Tobera convergente-divergente: acelera fluido desde subsónico a supersónico. El área mínima (garganta) es donde Ma=1 (condición crítica).',
      'Relación de presiones crítica: P*/P₀ = (2/(γ+1))^(γ/(γ-1)) ≈ 0.528 para aire. Si la presión de descarga es menor, el flujo está bloqueado (choque).',
      'Eficiencia isoentrópica de turbina: η_T = (h₃-h₄)/(h₃-h₄s). De compresor: η_C = (h₂s-h₁)/(h₂-h₁).',
      'Número de Mach: relación entre la velocidad del fluido y la velocidad del sonido local (a = √(γRT)). Flujo subsónico (Ma<1), transónico (Ma≈1), supersónico (Ma>1).',
      'En compresores axiales, el ratio de presión por etapa está limitado por choques en los álabes cuando Ma relativo se aproxima a 1.'
    ],
    formulas: [
      '\\dot{m} = \\rho A V = \\frac{A V}{v}',
      '\\dot{m}_{entra} = \\dot{m}_{sale}',
      '\\dot{Q} - \\dot{W} = \\sum \\dot{m}_{s}\\left(h + \\frac{V^2}{2} + gz\\right)_{s} - \\sum \\dot{m}_{e}\\left(h + \\frac{V^2}{2} + gz\\right)_{e}',
      'h_0 = h + \\frac{V^2}{2}',
      'T_0 = T + \\frac{V^2}{2c_p}',
      '\\frac{P^*}{P_0} = \\left(\\frac{2}{\\gamma+1}\\right)^{\\gamma/(\\gamma-1)}',
      'Ma = \\frac{V}{a} = \\frac{V}{\\sqrt{\\gamma RT}}',
      '\\frac{A}{A^*} = \\frac{1}{Ma}\\left(\\frac{2}{\\gamma+1}\\left(1+\\frac{\\gamma-1}{2}Ma^2\\right)\\right)^{(\\gamma+1)/(2(\\gamma-1))}',
      '\\eta_T = \\frac{h_3 - h_4}{h_3 - h_{4s}}'
    ],
    tablas: [
      {
        titulo: 'Dispositivos de flujo estacionario',
        headers: ['Dispositivo', 'Ẇ', 'Q̇', 'Proceso', 'Ecuación clave'],
        rows: [
          ['Tobera', '0', '0', 'Isentrópico', 'h + V²/2 = cte'],
          ['Difusor', '0', '0', 'Isentrópico', 'h + V²/2 = cte'],
          ['Turbina', '>0', '~0', 'Isentrópico real', 'Ẇ = ṁ(h₃-h₄)'],
          ['Compresor', '<0', '~0', 'Isentrópico real', 'Ẇ = ṁ(h₂-h₁)'],
          ['Intercambiador', '0', 'Q̇', 'Isobárico', 'Q̇ = ṁΔh'],
          ['Válvula', '0', '0', 'Isentrálpico', 'h = cte (h₁=h₂)']
        ]
      },
      {
        titulo: 'Régimen de flujo según número de Mach',
        headers: ['Régimen', 'Ma', 'Características'],
        rows: [
          ['Incompresible', '< 0.3', 'ρ ≈ cte, ecuaciones simplificadas'],
          ['Subsónico', '0.3 - 0.8', 'Compresible pero sin ondas de choque'],
          ['Transónico', '0.8 - 1.2', 'Choques locales, separación de capa límite'],
          ['Supersónico', '1.2 - 5.0', 'Ondas de choque, expansión de Prandtl-Meyer'],
          ['Hipersónico', '> 5.0', 'Disociación, efectos de alta temperatura']
        ]
      }
    ],
    aplicaciones: [
      'Diseño de turborreactores: las relaciones de área crítica determinan la geometría de la tobera y la condición de bloqueo sónico.',
      'Compresores de motores aeronáuticos: el número de Mach relativo en la punta de álabes limita el ratio de presión por etapa.',
      'Sistemas HVAC: toberas y difusores en conductos de aire acondicionado se diseñan minimizando pérdidas por fricción y choques.'
    ]
  },
  {
    id: 'Transferencia de calor',
    nombre: 'Transferencia de Calor',
    teoría: [
      'La transferencia de calor es el estudio de los mecanismos por los que la energía térmica se transfiere debido a gradientes de temperatura.',
      'Conducción: transferencia molecular en un medio estacionario o en reposo. La ley de Fourier establece que el flujo de calor es proporcional al gradiente de temperatura.',
      'Convección: transferencia por movimiento macroscópico del fluido. Se clasifica en forzada (ventilador, bomba) y natural (gradiente de densidad por flotabilidad).',
      'Radiación: transferencia por ondas electromagnéticas. No requiere medio material. Todo cuerpo emite radiación proporcional a T⁴ (ley de Stefan-Boltzmann).',
      'Resistencia térmica en serie: análoga a resistencias eléctricas. Para paredes compuestas: R_total = Σ(Li/kiA). El flujo de calor es Q̇ = ΔT/R_total.',
      'Conducción en cilindros (tuberías): la resistencia térmica es R = ln(r₂/r₁)/(2πkL). Se usa ampliamente en aislamiento de tuberías industriales.',
      'Números adimensionales: Reynolds (regime de flujo), Prandtl (relación difusividad momento/thermal), Nusselt (relación convección/conducción), Grashof (flotabilidad), Rayleigh (convección natural).',
      'Intercambiadores de calor: dispositivos diseñados para transferir calor entre dos fluidos sin mezclarlos. Tipos: tubo y carcasa, placas, de flujo cruzado.',
      'Efectividad de un intercambiador: ε = Q̇_real / Q̇_máximo. El método NTU (Number of Transfer Units) permite diseñar intercambiadores sin iterar temperaturas de salida.',
      'Transferencia de calor por radiación entre superficies grises: incluye factores de visión (view factors) y radiosidad. En recintos cerrados, el intercambio neto depende de las temperaturas y emisividades.'
    ],
    formulas: [
      '\\dot{Q} = -kA\\frac{dT}{dx}',
      '\\dot{Q} = hA(T_s - T_\\infty)',
      '\\dot{Q} = \\varepsilon \\sigma A T^4',
      'R_{cond} = \\frac{L}{kA}',
      'R_{conv} = \\frac{1}{hA}',
      'R_{cil} = \\frac{\\ln(r_2/r_1)}{2\\pi kL}',
      '\\frac{1}{U} = \\frac{1}{h_i} + \\frac{L}{k} + \\frac{1}{h_e}',
      '\\dot{Q} = UA \\Delta T_{lm}',
      '\\Delta T_{lm} = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)}',
      'Nu = \\frac{hL_c}{k}',
      'Re = \\frac{\\rho VL}{\\mu}',
      'Pr = \\frac{c_p \\mu}{k} = \\frac{\\nu}{\\alpha}'
    ],
    tablas: [
      {
        titulo: 'Mecanismos de transferencia de calor',
        headers: ['Mecanismo', 'Medio', 'Ley dominante', 'Dependencia'],
        rows: [
          ['Conducción', 'Sólidos/fluidos', 'Fourier', 'ΔT, k, A/L'],
          ['Convección', 'Fluidos en movimiento', 'Newton', 'ΔT, h, A'],
          ['Radiación', 'Vacío/medios', 'Stefan-Boltzmann', 'T⁴, ε, A']
        ]
      },
      {
        titulo: 'Correlaciones para convección forzada (tuberías)',
        headers: ['Régimen', 'Condición', 'Correlación'],
        rows: [
          ['Laminar', 'Re < 2300', 'Nu = 3.66 (T cte) o 4.36 (q cte)'],
          ['Turbulento', 'Re > 10000', 'Nu = 0.023·Re^0.8·Pr^n (n=0.4 calentamiento, 0.3 enfriamiento)'],
          ['Transición', '2300 < Re < 10000', 'Interpolación o correlaciones específicas']
        ]
      },
      {
        titulo: 'Materiales aislantes típicos',
        headers: ['Material', 'k (W/m·K)', 'T máx (°C)'],
        rows: [
          ['Lana mineral', '0.035-0.045', '650'],
          ['Poliestireno expandido', '0.030-0.040', '80'],
          ['Fibra de vidrio', '0.030-0.050', '450'],
          ['Aerogel', '0.012-0.020', '650'],
          ['Corcho', '0.035-0.050', '120']
        ]
      }
    ],
    aplicaciones: [
      'Aislamiento térmico de edificios e industria: seleccionar materiales con baja conductividad k para minimizar pérdidas energéticas.',
      'Diseño de radiadores y intercambiadores: maximizar el coeficiente convectivo h y el área de transferencia A.',
      'Protección térmica aeroespacial: escudos térmicos por ablación o materiales refractarios soportan temperaturas extremas por reentrada atmosférica.'
    ]
  },
  {
    id: 'Mezclas',
    nombre: 'Mezclas de Gases Ideales',
    teoría: [
      'Una mezcla de gases ideales se comporta como un gas ideal si cada componente se comporta idealmente y no hay interacciones químicas entre ellos.',
      'Ley de Dalton: la presión total de una mezcla es la suma de las presiones parciales que cada componente ejercería si ocupara solo el volumen a la temperatura de la mezcla.',
      'Ley de Amagat: el volumen total es la suma de los volúmenes parciales que cada componente ocuparía a la presión y temperatura de la mezcla (válida para gases ideales).',
      'La presión parcial de un componente i es P_i = y_i · P_total, donde y_i es la fracción molar. Para gases ideales, y_i también es igual a la fracción volumétrica.',
      'La masa molar aparente de la mezcla: M_m = Σ(y_i · M_i). La constante específica de la mezcla: R_m = R_u / M_m.',
      'Las propiedades extensivas de la mezcla (U, H, S) son la suma ponderada de las propiedades de cada componente puro a la temperatura de la mezcla.',
      'En mezclas de gases ideales, la entropía de mezcla es siempre positiva: ΔS_mezcla = -R_u·Σ(y_i·ln(y_i)). Este término representa la irreversibilidad de la mezcla.',
      'El aire atmosférico se modela comúnmente como una mezcla de gases ideales: aproximadamente 78% N₂, 21% O₂, 1% Ar y trazas de otros gases.'
    ],
    formulas: [
      'P_{total} = \\sum P_i = \\sum y_i P_{total}',
      'P_i = y_i P_{total}',
      'y_i = \\frac{N_i}{N_{total}} = \\frac{V_i}{V_{total}}',
      'x_i = \\frac{m_i}{m_{total}}',
      'M_m = \\sum y_i M_i',
      'R_m = \\frac{R_u}{M_m}',
      '\\Delta S_{mezcla} = -R_u \\sum y_i \\ln y_i'
    ],
    tablas: [
      {
        titulo: 'Composición aproximada del aire seco',
        headers: ['Componente', 'Fracción molar (%)', 'Masa molar (kg/kmol)'],
        rows: [
          ['Nitrógeno (N₂)', '78.08', '28.01'],
          ['Oxígeno (O₂)', '20.95', '32.00'],
          ['Argón (Ar)', '0.93', '39.95'],
          ['CO₂', '0.04', '44.01']
        ]
      },
      {
        titulo: 'Conversión entre fracciones',
        headers: ['Conversión', 'Fórmula'],
        rows: [
          ['Molar a másica', 'x_i = y_i·M_i / M_m'],
          ['Másica a molar', 'y_i = x_i/M_i / Σ(x_j/M_j)'],
          ['Presión parcial', 'P_i = y_i·P_total'],
          ['Volumen parcial', 'V_i = y_i·V_total']
        ]
      }
    ],
    aplicaciones: [
      'Diseño de cámaras de combustión: conocer la composición estequiométrica de aire-combustible es esencial para cálculos de temperatura de llama.',
      'Separación de gases: plantas de licuefacción de aire utilizan las diferentes temperaturas de saturación de N₂ y O₂.',
      'Análisis de escape de motores: la composición de gases de escape permite diagnosticar la eficiencia de la combustión.'
    ]
  },
  {
    id: 'Psicrometría',
    nombre: 'Psicrometría y Aire Húmedo',
    teoría: [
      'El aire húmedo es una mezcla de aire seco y vapor de agua. Se modela como mezcla de gases ideales donde el vapor de agua se comporta idealmente a bajas presiones parciales.',
      'Humedad específica (ω): masa de vapor de agua por unidad de masa de aire seco. Es la propiedad más importante en cálculos psicrométricos.',
      'Humedad relativa (φ): relación entre la presión parcial del vapor y la presión de saturación a la misma temperatura. Indica qué tan cerca está el aire de la saturación.',
      'Temperatura de bulbo húmedo (T_bh): temperatura que alcanza el aire cuando se satura adiabáticamente por evaporación de agua. Es menor que la temperatura de bulbo seco.',
      'Temperatura de punto de rocío: temperatura a la que el aire saturado al enfriarse isobáricamente comienza a condensar vapor. Útil para prevenir condensación en sistemas.',
      'Entalpía del aire húmedo: h = h_aire_seco + ω·h_vapor = c_p,aire·T + ω·(h_g + c_p,vapor·(T-T_sat)).',
      'Procesos psicrométricos fundamentales: calentamiento sensible (ω cte), enfriamiento y deshumidificación (hasta rocío), humidificación (ω aumenta), mezcla de corrientes de aire.',
      'El diagrama psicrométrico (cartilla) representa gráficamente las propiedades del aire húmedo: T_sec, T_bh, φ, ω, h, v. Es una herramienta esencial para diseño HVAC.'
    ],
    formulas: [
      '\\omega = \\frac{m_v}{m_a} = 0.622 \\frac{P_v}{P - P_v}',
      '\\phi = \\frac{P_v}{P_g(T)}',
      'h = c_{p,a} T + \\omega h_g(T)',
      '\\omega_3 = \\frac{\\dot{m}_{a1}\\omega_1 + \\dot{m}_{a2}\\omega_2}{\\dot{m}_{a1} + \\dot{m}_{a2}} \\quad \\text{(mezcla)}',
      '\\dot{Q} = \\dot{m}_a(h_2 - h_1) \\quad \\text{(calentamiento)}',
      '\\dot{m}_w = \\dot{m}_a(\\omega_2 - \\omega_1) \\quad \\text{(condensado)}'
    ],
    tablas: [
      {
        titulo: 'Propiedades del aire saturado (aprox.)',
        headers: ['T (°C)', 'P_g (kPa)', 'ω_sat (g/kg)'],
        rows: [
          ['0', '0.61', '3.8'],
          ['10', '1.23', '7.7'],
          ['20', '2.34', '14.7'],
          ['30', '4.25', '27.2'],
          ['40', '7.38', '49.0']
        ]
      },
      {
        titulo: 'Procesos psicrométricos',
        headers: ['Proceso', 'Efecto', 'Aplicación'],
        rows: [
          ['Calentamiento sensible', 'T↑, ω cte, φ↓', 'Calefacción'],
          ['Enfriamiento sensible', 'T↓, ω cte, φ↑', 'Refrigeración parcial'],
          ['Enfriamiento + dehum.', 'T↓, ω↓, h↓', 'Aire acondicionado'],
          ['Humidificación', 'ω↑, T↓', 'Evaporativos'],
          ['Mezcla', 'T y ω intermedios', 'Ventilación']
        ]
      }
    ],
    aplicaciones: [
      'Climatización de edificios: determinar la carga térmica y de humedad para dimensionar equipos HVAC.',
      'Secado industrial: calcular la cantidad de aire necesario para evaporar una determinada masa de agua de un producto.',
      'Prevención de condensación en aeronaves: controlar la humedad en cabinas presurizadas para evitar empañamiento y corrosión.'
    ]
  },
  {
    id: 'Exergía',
    nombre: 'Exergía y Análisis de Disponibilidad',
    teoría: [
      'La exergía (o disponibilidad) es la máxima cantidad de trabajo útil que se puede obtener de un sistema cuando éste evoluciona reversiblemente hasta alcanzar el equilibrio mecánico y térmico con el entorno (estado muerto).',
      'El estado muerto (P₀, T₀) es el estado de equilibrio con el medio ambiente. A partir de él no se puede extraer más trabajo.',
      'La anergía es la parte de la energía que no puede convertirse en trabajo útil. Energía = Exergía + Anergía.',
      'La exergía se destruye por irreversibilidades: fricción, transferencia de calor con ΔT finito, mezcla, reacciones químicas no controladas.',
      'Balance de exergía: ΔX = X_entrada - X_salida - X_destruida. A diferencia de la energía, la exergía no se conserva.',
      'Eficiencia de segundo principio (eficiencia exergética): η_II = X_recuperada / X_suministrada = 1 - X_destruida / X_suministrada.',
      'Exergía de flujo: x_flujo = (h - h₀) - T₀(s - s₀) + V²/2 + gz. Para sistemas cerrados: x = (u - u₀) + P₀(v - v₀) - T₀(s - s₀).',
      'La exergía térmica asociada a una transferencia de calor Q a temperatura T es X_Q = Q(1 - T₀/T). Cuanto más alta sea T, mayor exergía tiene el calor.',
      'En ciclos de potencia, la eficiencia exergética revela dónde se producen las mayores irreversibilidades (combustión, transferencia de calor, mezcla).'
    ],
    formulas: [
      'X_{destroyed} = T_0 S_{gen}',
      '\\eta_{II} = \\frac{X_{recovered}}{X_{supplied}} = 1 - \\frac{X_{destroyed}}{X_{supplied}}',
      '\\Delta X = X_{in} - X_{out} - X_{destroyed}',
      'x_{flujo} = (h - h_0) - T_0(s - s_0) + \\frac{V^2}{2} + gz',
      'x = (u - u_0) + P_0(v - v_0) - T_0(s - s_0)',
      'X_Q = Q\\left(1 - \\frac{T_0}{T}\\right)',
      'X_{trabajo} = W',
      '\\eta_{II} \\le \\eta_I'
    ],
    tablas: [
      {
        titulo: 'Comparación balance energía vs exergía',
        headers: ['Aspecto', 'Energía', 'Exergía'],
        rows: [
          ['Conservación', 'Sí', 'No (se destruye)'],
          ['Dependencia entorno', 'No', 'Sí (P₀, T₀)'],
          ['Irreversibilidades', 'No detecta', 'Las cuantifica'],
          ['Eficiencia', 'η_I (primero principio)', 'η_II (segundo principio)']
        ]
      },
      {
        titulo: 'Destrucción de exergía típica',
        headers: ['Proceso', 'X_destroyed / X_supplied'],
        rows: [
          ['Combustión', '20-30%'],
          ['Transferencia de calor', '5-15%'],
          ['Mezcla de fluidos', '5-10%'],
          ['Fricción mecánica', '1-5%'],
          ['Expansión en válvula', '10-20%']
        ]
      }
    ],
    aplicaciones: [
      'Diagnóstico de plantas de potencia: identificar componentes con mayor destrucción de exergía para optimizar el diseño.',
      'Cogeneración: aprovechar el calor residual de una turbina de gas para producir vapor útil, maximizando la exergía recuperada.',
      'Diseño de procesos químicos: minimizar irreversibilidades en reactores y separadores reduce el consumo energético global.'
    ]
  },
  {
    id: 'Propulsión',
    nombre: 'Propulsión Aeroespacial',
    teoría: [
      'La propulsión aeronáutica se basa en la aplicación del principio de acción-reacción: acelerar una masa de fluido para generar fuerza de empuje en sentido opuesto.',
      'El ciclo Brayton abierto es la base de los motores de reacción: admisión, compresión, combustión, expansión y eyección.',
      'Turborreactor: todo el aire pasa por el núcleo. Adecuado para vuelos supersónicos (Concorde, SR-71). Relación bypass = 0.',
      'Turbofan: una parte del aire pasa por el núcleo (hot) y otra por un ducto anular (cold). Mejor eficiencia en vuelo subsónico. Relaciones bypass típicas: 4-12 (transporte comercial).',
      'Turboprop: la turbina acciona una hélice mediante una caja reductora. Eficiente en vuelos lentos y cortos.',
      'Empuje (F): F = ṁ(V_salida - V_entrada) + (P_s - P_e)A_s. Para toberas adaptadas (P_s = P_e), el segundo término desaparece.',
      'Empuje específico: F/ṁ_aire. Empuje másico: F/(ṁ_aire + ṁ_combustible).',
      'TSFC (Thrust Specific Fuel Consumption): masa de combustible consumida por unidad de empuje y tiempo. Unidad: kg/(N·h) o lb/(lbf·h).',
      'Eficiencia propulsiva: η_p = 2/(1 + V_salida/V_entrada). Máxima cuando V_salida ≈ V_entrada, pero eso requiere ṁ muy alto (turbofan de alto bypass).',
      'Eficiencia térmica: η_t = (potencia cinética de gases)/(energía del combustible). Eficiencia total: η_total = η_t · η_p.',
      'Número de Mach de vuelo (Ma₀) determina el tipo de motor óptimo: turbofan para Ma₀ < 0.9, turbojet para 0.9 < Ma₀ < 3, estatorreactor/SCRAMjet para Ma₀ > 3.'
    ],
    formulas: [
      'F = \\dot{m}(V_s - V_e) + (P_s - P_e)A_s',
      '\\eta_p = \\frac{2}{1 + V_s/V_e}',
      'TSFC = \\frac{\\dot{m}_f}{F}',
      '\\eta_t = \\frac{\\dot{m}(V_s^2 - V_e^2)/2}{\\dot{m}_f \\cdot LHV}',
      '\\eta_{total} = \\eta_t \\cdot \\eta_p',
      'BPR = \\frac{\\dot{m}_{bypass}}{\\dot{m}_{core}}',
      '\\frac{T_{t4}}{T_{t2}} = \\frac{T_{max}}{T_{ entrada\\ compresor}}'
    ],
    tablas: [
      {
        titulo: 'Comparación de motores de aviación',
        headers: ['Motor', 'BPR', 'Ma₀ típico', 'η propulsiva', 'Aplicación'],
        rows: [
          ['Turborreactor', '0', '1.5-3.0', 'Baja', 'Militar/supersónico'],
          ['Turbofan alto', '8-12', '0.8-0.9', 'Alta', 'Transporte comercial'],
          ['Turbofan bajo', '0.5-2', '0.9-1.5', 'Media', 'Business jet'],
          ['Turboprop', '∞ (hélice)', '0.4-0.7', 'Alta', 'Regional/carga'],
          ['SCRAMjet', '—', '> 5', '—', 'Experimental/hipersónico']
        ]
      },
      {
        titulo: 'Eficiencias en propulsión',
        headers: ['Eficiencia', 'Definición', 'Rango típico'],
        rows: [
          ['Térmica (ηt)', 'Energía cinética / energía combustible', '30-45%'],
          ['Propulsiva (ηp)', 'Trabajo útil / energía cinética', '50-80%'],
          ['Total', 'ηt · ηp', '15-35%'],
          ['Transmisión (turboprop)', 'Potencia eje / potencia turbina', '95-98%']
        ]
      }
    ],
    aplicaciones: [
      'Diseño de turbinas de gas industriales: el análisis del ciclo Brayton permite optimizar la relación de presiones y la temperatura de entrada a turbina.',
      'Selección de motor para aeronaves: el número de Mach de crucero determina si se usa turbofan, turbojet o configuraciones combinadas.',
      'Reducción de emisiones: motores de alto bypass (GE9X, Trent XWB) minimizan el TSFC y el impacto acústico en aeropuertos.'
    ]
  }
]
