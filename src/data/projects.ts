import type { Localized } from "@/lib/localized";
import type { StackId } from "./stacks";

export type Repo = {
  url: string;
  part?: "frontend" | "backend";
};

export type Highlight = {
  title: Localized;
  text: Localized;
};

export type Project = {
  slug: string;
  name: string;
  description: Localized;
  image?: string;
  url?: string;
  repos: Repo[];
  stacks: StackId[];
  overview: Localized[];
  highlights: Highlight[];
  internals: Localized[];
};

export const projects: Project[] = [
  {
    slug: "renvest",
    name: "Renvest",
    description: {
      pt: "Plataforma de educação financeira para investidores iniciantes, com trilhas de aprendizado, simulações e dados oficiais da B3 e da CVM. Meu TCC na UFC.",
      en: "A financial education platform for beginner investors, with learning paths, simulations and official data from B3 and CVM. My undergraduate thesis at UFC.",
      es: "Una plataforma de educación financiera para inversores principiantes, con rutas de aprendizaje, simulaciones y datos oficiales de B3 y CVM. Mi trabajo de grado en la UFC.",
    },
    image: "/projects/renvest.png",
    url: "https://renvest-eight.vercel.app",
    repos: [],
    stacks: [
      "react",
      "typescript",
      "tailwind",
      "python",
      "fastapi",
      "langchain",
      "rag",
      "openai",
      "supabase",
      "docker",
      "vercel",
    ],
    overview: [
      {
        pt: "O Renvest é meu TCC em Engenharia de Software na UFC Quixadá. A ideia é tirar o investidor iniciante da “tela em branco”: em vez de um chat genérico, ele percorre uma trilha de missões guiado pelo Rev, um tutor que conversa e desafia.",
        en: "Renvest is my Software Engineering thesis at UFC Quixadá. The goal is to get beginner investors past the “blank screen”: instead of a generic chat, they follow a trail of missions guided by Rev, a tutor that talks and challenges.",
        es: "Renvest es mi trabajo de grado en Ingeniería de Software en la UFC Quixadá. La idea es sacar al inversor principiante de la “pantalla en blanco”: en lugar de un chat genérico, recorre una ruta de misiones guiado por Rev, un tutor que conversa y desafía.",
      },
      {
        pt: "Cada resposta é ancorada em documentos oficiais do Banco Central, da CVM, da B3 e do FGC, com a fonte exibida junto. O aprendizado fica rastreável e longe das alucinações comuns em IAs genéricas.",
        en: "Every answer is grounded in official documents from Brazil's Central Bank, CVM, B3 and FGC, with the source shown alongside it. Learning stays traceable and away from the hallucinations common in generic AIs.",
        es: "Cada respuesta se basa en documentos oficiales del Banco Central de Brasil, la CVM, B3 y el FGC, con la fuente a la vista. El aprendizaje queda rastreable y lejos de las alucinaciones comunes en IAs genéricas.",
      },
    ],
    highlights: [
      {
        title: { pt: "Trilha de missões", en: "Mission trail", es: "Ruta de misiones" },
        text: {
          pt: "Três módulos progressivos (renda fixa e proteção, bolsa e governança, regulação da CVM) com lições, quizzes, baús de recompensa e um desafio final em cada etapa.",
          en: "Three progressive modules (fixed income and protection, stock market and governance, CVM regulation) with lessons, quizzes, reward chests and a final challenge at each stage.",
          es: "Tres módulos progresivos (renta fija y protección, bolsa y gobernanza, regulación de la CVM) con lecciones, quizzes, cofres de recompensa y un desafío final en cada etapa.",
        },
      },
      {
        title: { pt: "Tutor com fontes", en: "A tutor that cites", es: "Tutor con fuentes" },
        text: {
          pt: "O Rev tira dúvidas no meio da missão e no chat livre, sempre mostrando o documento oficial consultado.",
          en: "Rev answers questions mid-mission and in free chat, always showing the official document it consulted.",
          es: "Rev resuelve dudas en plena misión y en el chat libre, mostrando siempre el documento oficial consultado.",
        },
      },
      {
        title: { pt: "Perguntas sugeridas", en: "Suggested questions", es: "Preguntas sugeridas" },
        text: {
          pt: "Chips com perguntas prontas ajudam quem ainda não sabe o que perguntar.",
          en: "Ready-made question chips help people who don't know what to ask yet.",
          es: "Chips con preguntas listas ayudan a quien todavía no sabe qué preguntar.",
        },
      },
      {
        title: { pt: "Conta e progresso", en: "Account and progress", es: "Cuenta y progreso" },
        text: {
          pt: "Login com e-mail ou Google, sessão via JWT e onboarding exibido só no primeiro acesso.",
          en: "Sign-in with email or Google, JWT sessions and onboarding shown only on the first visit.",
          es: "Inicio de sesión con correo o Google, sesión vía JWT y onboarding solo en el primer acceso.",
        },
      },
    ],
    internals: [
      {
        pt: "Frontend em React 19, TypeScript e Tailwind CSS 4, com páginas carregadas sob demanda pelo React Router 7.",
        en: "Frontend in React 19, TypeScript and Tailwind CSS 4, with pages loaded on demand through React Router 7.",
        es: "Frontend en React 19, TypeScript y Tailwind CSS 4, con páginas cargadas bajo demanda mediante React Router 7.",
      },
      {
        pt: "Backend em Python com FastAPI e arquitetura RAG. A base de conhecimento é formada por PDFs oficiais registrados em um manifesto, e só eles são indexados.",
        en: "Python backend with FastAPI and a RAG architecture. The knowledge base is made of official PDFs registered in a manifest, and only those get indexed.",
        es: "Backend en Python con FastAPI y arquitectura RAG. La base de conocimiento está formada por PDFs oficiales registrados en un manifiesto, y solo esos se indexan.",
      },
      {
        pt: "A taxa Selic é consultada em tempo real na API do Banco Central.",
        en: "The Selic rate is fetched in real time from the Central Bank API.",
        es: "La tasa Selic se consulta en tiempo real en la API del Banco Central.",
      },
      {
        pt: "Deploy com Docker (build multi-stage e Nginx) ou na Vercel.",
        en: "Deployed with Docker (multi-stage build and Nginx) or on Vercel.",
        es: "Deploy con Docker (build multi-stage y Nginx) o en Vercel.",
      },
    ],
  },
  {
    slug: "your-menu",
    name: "Your Menu",
    description: {
      pt: "Plataforma de pedidos para restaurantes: cardápio digital, checkout com Pix e painel de pedidos em tempo real.",
      en: "An ordering platform for restaurants: digital menu, Pix checkout and a real-time order dashboard.",
      es: "Una plataforma de pedidos para restaurantes: menú digital, checkout con Pix y panel de pedidos en tiempo real.",
    },
    image: "/projects/your-menu.png",
    url: "https://your-menu-zeta.vercel.app",
    repos: [{ url: "https://github.com/RewelliOliveira/your-menu" }],
    stacks: ["react", "typescript", "tailwind", "vercel"],
    overview: [
      {
        pt: "Uma plataforma de pedidos para pequenos restaurantes. Cada loja ganha um cardápio digital público e um painel para acompanhar pedidos em tempo real, editar o cardápio e configurar a operação.",
        en: "An ordering platform for small restaurants. Each store gets a public digital menu and a dashboard to follow orders in real time, edit the menu and set up how it runs.",
        es: "Una plataforma de pedidos para restaurantes pequeños. Cada local tiene un menú digital público y un panel para seguir pedidos en tiempo real, editar el menú y configurar la operación.",
      },
      {
        pt: "O foco foi deixar o caminho do cliente curto, do prato ao Pix em uma página, e o do restaurante claro, com cada pedido passando por etapas bem definidas.",
        en: "The focus was keeping the customer's path short, from dish to Pix on a single page, and the restaurant's clear, with every order moving through well-defined steps.",
        es: "El foco fue que el camino del cliente fuera corto, del plato al Pix en una sola página, y el del restaurante claro, con cada pedido pasando por etapas bien definidas.",
      },
    ],
    highlights: [
      {
        title: { pt: "Cardápio digital", en: "Digital menu", es: "Menú digital" },
        text: {
          pt: "Categorias com busca, navegação fixa que destaca a seção visível e pratos com tamanhos, quantidade e observação.",
          en: "Searchable categories, sticky navigation that highlights the visible section, and dishes with sizes, quantity and notes.",
          es: "Categorías con búsqueda, navegación fija que resalta la sección visible y platos con tamaños, cantidad y observaciones.",
        },
      },
      {
        title: { pt: "Checkout em uma página", en: "One-page checkout", es: "Checkout en una página" },
        text: {
          pt: "Entrega ou retirada, CEP com preenchimento automático e pagamento por Pix, cartão ou dinheiro com troco. O QR Code Pix é gerado no próprio navegador.",
          en: "Delivery or pickup, postcode autofill and payment by Pix, card or cash with change. The Pix QR code is generated right in the browser.",
          es: "Entrega o retiro, código postal con autocompletado y pago con Pix, tarjeta o efectivo con cambio. El QR de Pix se genera en el propio navegador.",
        },
      },
      {
        title: { pt: "Painel de pedidos", en: "Order board", es: "Panel de pedidos" },
        text: {
          pt: "Quadro Novo → Em preparo → Em entrega, aviso de novos pedidos, métricas do dia e histórico.",
          en: "A New → Preparing → Out for delivery board, new-order alerts, daily metrics and history.",
          es: "Tablero Nuevo → En preparación → En camino, aviso de pedidos nuevos, métricas del día e historial.",
        },
      },
      {
        title: { pt: "Gestão da loja", en: "Store settings", es: "Gestión del local" },
        text: {
          pt: "Horários por dia, bairros atendidos, logo e capa, pausa rápida de itens e um botão para abrir e fechar a loja.",
          en: "Daily hours, delivery areas, logo and cover, quick item pausing and a switch to open and close the store.",
          es: "Horarios por día, barrios atendidos, logo y portada, pausa rápida de platos y un botón para abrir y cerrar el local.",
        },
      },
    ],
    internals: [
      {
        pt: "React 19, Vite, TypeScript, Tailwind CSS v4, shadcn/ui e Motion.",
        en: "React 19, Vite, TypeScript, Tailwind CSS v4, shadcn/ui and Motion.",
        es: "React 19, Vite, TypeScript, Tailwind CSS v4, shadcn/ui y Motion.",
      },
      {
        pt: "Uma camada de serviços é a única que conhece a origem dos dados. Hoje ela usa um backend simulado, pronto para dar lugar à API real sem mudar as telas.",
        en: "A service layer is the only part that knows where data comes from. Today it runs on a mock backend, ready to be swapped for the real API without touching the screens.",
        es: "Una capa de servicios es la única que conoce el origen de los datos. Hoy usa un backend simulado, listo para dar paso a la API real sin cambiar las pantallas.",
      },
      {
        pt: "As regras de servidor já valem: preços e total recalculados a partir do cardápio, pedidos aceitos só com a loja aberta e transições de status validadas.",
        en: "Server rules already apply: prices and totals recalculated from the menu, orders accepted only while the store is open, and validated status transitions.",
        es: "Las reglas de servidor ya se aplican: precios y total recalculados desde el menú, pedidos aceptados solo con el local abierto y transiciones de estado validadas.",
      },
      {
        pt: "O acompanhamento do pedido usa um código aleatório, não o número sequencial.",
        en: "Order tracking uses a random code, not the sequential order number.",
        es: "El seguimiento del pedido usa un código aleatorio, no el número secuencial.",
      },
    ],
  },
  {
    slug: "abyss",
    name: "Abyss",
    description: {
      pt: "Mergulho por rolagem até o ponto mais fundo da Terra, a 10.935 m.",
      en: "A scroll-driven dive to the deepest known point on Earth, 10,935 m down.",
      es: "Un descenso con scroll hasta el punto más profundo de la Tierra, a 10.935 m.",
    },
    image: "/projects/abyss-hero.png",
    url: "https://abyss-one-phi.vercel.app",
    repos: [{ url: "https://github.com/RewelliOliveira/Abyss" }],
    stacks: ["react", "typescript", "tailwind", "vercel"],
    overview: [
      {
        pt: "Uma landing page interativa em que rolar a página é o mergulho: da superfície iluminada pelo sol até o Challenger Deep, na Fossa das Marianas, a 10.935 m de profundidade.",
        en: "An interactive landing page where scrolling is the dive: from the sunlit surface down to the Challenger Deep, in the Mariana Trench, 10,935 m below.",
        es: "Una landing page interactiva en la que hacer scroll es el descenso: desde la superficie iluminada por el sol hasta el Challenger Deep, en la Fosa de las Marianas, a 10.935 m de profundidad.",
      },
      {
        pt: "No caminho, as zonas do oceano mudam de cor, a luz some e as criaturas de cada profundidade aparecem quando o mergulho chega até elas.",
        en: "Along the way the ocean zones change color, the light fades out and the creatures of each depth show up as the dive reaches them.",
        es: "En el camino, las zonas del océano cambian de color, la luz desaparece y las criaturas de cada profundidad aparecen cuando el descenso llega a ellas.",
      },
    ],
    highlights: [
      {
        title: { pt: "Rolagem como mergulho", en: "Scrolling as diving", es: "El scroll como descenso" },
        text: {
          pt: "A profundidade é calculada a partir do scroll e alimenta o painel de instrumentos, os faróis do submarino e as partículas.",
          en: "Depth is derived from the scroll and drives the instrument panel, the submarine's headlights and the particles.",
          es: "La profundidad se calcula a partir del scroll y alimenta el panel de instrumentos, los faros del submarino y las partículas.",
        },
      },
      {
        title: { pt: "Escuridão e lanterna", en: "Darkness and a lantern", es: "Oscuridad y linterna" },
        text: {
          pt: "Nas zonas sem luz, só um feixe que segue o cursor ou o toque revela o cenário, e as partes bioluminescentes das criaturas brilham no escuro.",
          en: "In the lightless zones only a beam that follows the cursor or touch reveals the scene, and the creatures' bioluminescent parts glow in the dark.",
          es: "En las zonas sin luz, solo un haz que sigue al cursor o al toque revela el escenario, y las partes bioluminiscentes de las criaturas brillan en la oscuridad.",
        },
      },
      {
        title: { pt: "Céu vivo", en: "A living sky", es: "Cielo vivo" },
        text: {
          pt: "Sol, raios de luz, gaivotas e o navio de pesquisa se movem antes da descida começar.",
          en: "The sun, light rays, seagulls and the research ship move before the descent begins.",
          es: "El sol, los rayos de luz, las gaviotas y el barco de investigación se mueven antes de que empiece el descenso.",
        },
      },
      {
        title: { pt: "Criaturas ilustradas", en: "Illustrated creatures", es: "Criaturas ilustradas" },
        text: {
          pt: "Mais de vinte ilustrações vetorizadas, de cachalotes a peixes-lanterna, cada uma entrando em cena na sua profundidade.",
          en: "More than twenty vectorized illustrations, from sperm whales to lanternfish, each one entering at its own depth.",
          es: "Más de veinte ilustraciones vectorizadas, de cachalotes a peces linterna, cada una entrando en escena a su profundidad.",
        },
      },
    ],
    internals: [
      {
        pt: "React 19, TypeScript e Tailwind CSS v4, com GSAP (ScrollTrigger, ScrollSmoother, SplitText e DrawSVG) em todo o movimento.",
        en: "React 19, TypeScript and Tailwind CSS v4, with GSAP (ScrollTrigger, ScrollSmoother, SplitText and DrawSVG) behind all the motion.",
        es: "React 19, TypeScript y Tailwind CSS v4, con GSAP (ScrollTrigger, ScrollSmoother, SplitText y DrawSVG) en todo el movimiento.",
      },
      {
        pt: "Ilustrações originais vetorizadas e otimizadas com SVGO, importadas como componentes.",
        en: "Original illustrations vectorized and optimized with SVGO, imported as components.",
        es: "Ilustraciones originales vectorizadas y optimizadas con SVGO, importadas como componentes.",
      },
      {
        pt: "O brilho nunca é um filtro SVG animado: os halos são gradientes radiais animados só em opacidade, para a rolagem continuar fluida.",
        en: "Glow is never an animated SVG filter: halos are radial gradients animated only in opacity, so scrolling stays smooth.",
        es: "El brillo nunca es un filtro SVG animado: los halos son gradientes radiales animados solo en opacidad, para que el scroll siga fluido.",
      },
      {
        pt: "Os movimentos ambientes são determinísticos, rodam num único ticker por cena e pausam fora da tela. Com movimento reduzido, ficam desligados.",
        en: "Ambient motion is deterministic, runs on a single ticker per scene and pauses off-screen. With reduced motion it is turned off.",
        es: "Los movimientos ambientales son deterministas, corren en un único ticker por escena y se pausan fuera de pantalla. Con movimiento reducido, se desactivan.",
      },
    ],
  },
  {
    slug: "hollowcrest",
    name: "Hollowcrest",
    description: {
      pt: "Site de um RPG de ação em pixel art 16-bit, com seis heróis animados em GSAP e sprites tratados em Python.",
      en: "A site for a 16-bit pixel art action RPG, with six heroes animated in GSAP and sprites processed in Python.",
      es: "Sitio de un RPG de acción en pixel art 16-bit, con seis héroes animados en GSAP y sprites procesados en Python.",
    },
    image: "/projects/hollowcrest.png",
    url: "https://hollowcrest-rho.vercel.app",
    repos: [{ url: "https://github.com/RewelliOliveira/Hollowcrest" }],
    stacks: ["react", "typescript", "tailwind", "python", "vercel"],
    overview: [
      {
        pt: "O site de apresentação de um RPG de ação medieval em pixel art 16-bit: seis heróis, um reino sem luz e as últimas tochas acesas.",
        en: "The landing site for a medieval action RPG in 16-bit pixel art: six heroes, a kingdom without light and the last torches still burning.",
        es: "El sitio de presentación de un RPG de acción medieval en pixel art 16-bit: seis héroes, un reino sin luz y las últimas antorchas encendidas.",
      },
      {
        pt: "Os sprites nasceram como artes geradas por IA e passaram por um tratamento em Python até virarem pixel art de verdade, com grade, paleta e linha de base iguais entre todos os personagens.",
        en: "The sprites started as AI-generated art and went through a Python pipeline until they became real pixel art, with the same grid, palette and baseline across every character.",
        es: "Los sprites nacieron como arte generado por IA y pasaron por un tratamiento en Python hasta convertirse en pixel art de verdad, con la misma cuadrícula, paleta y línea base en todos los personajes.",
      },
    ],
    highlights: [
      {
        title: { pt: "Seleção de classe", en: "Class selection", es: "Selección de clase" },
        text: {
          pt: "Arqueiro, assassino, berserker, lanceiro, mago e paladino, cada um com ficha própria e sprite animado.",
          en: "Archer, assassin, berserker, lancer, mage and paladin, each with its own sheet and animated sprite.",
          es: "Arquero, asesino, berserker, lancero, mago y paladín, cada uno con su ficha y sprite animado.",
        },
      },
      {
        title: { pt: "Três mundos", en: "Three worlds", es: "Tres mundos" },
        text: {
          pt: "Bosque, Hollowcrest e Skarn, com cenários tratados no mesmo estilo dos personagens.",
          en: "Bosque, Hollowcrest and Skarn, with backdrops processed in the same style as the characters.",
          es: "Bosque, Hollowcrest y Skarn, con escenarios tratados en el mismo estilo que los personajes.",
        },
      },
      {
        title: { pt: "Clima de jogo", en: "Game atmosphere", es: "Clima de juego" },
        text: {
          pt: "Brasas, neve, janelas piscando, texto digitado e transições em blocos de pixel, tudo animado com GSAP.",
          en: "Embers, snow, flickering windows, typed text and pixel-block transitions, all animated with GSAP.",
          es: "Brasas, nieve, ventanas parpadeantes, texto tipeado y transiciones en bloques de píxel, todo animado con GSAP.",
        },
      },
    ],
    internals: [
      {
        pt: "React 19, TypeScript e Tailwind CSS v4, com GSAP nas animações.",
        en: "React 19, TypeScript and Tailwind CSS v4, with GSAP for the animations.",
        es: "React 19, TypeScript y Tailwind CSS v4, con GSAP en las animaciones.",
      },
      {
        pt: "Scripts em Python estimam o tamanho do bloco de pixel, limpam a transparência, reduzem a paleta para até 32 cores e alinham os pés dos personagens na mesma linha.",
        en: "Python scripts estimate the pixel block size, clean up transparency, cut the palette down to 32 colors and line up every character's feet.",
        es: "Scripts en Python estiman el tamaño del bloque de píxel, limpian la transparencia, reducen la paleta a 32 colores y alinean los pies de los personajes.",
      },
      {
        pt: "Os pixels tratados também viram dados tipados, usados para desenhar e animar os sprites.",
        en: "The processed pixels also become typed data used to draw and animate the sprites.",
        es: "Los píxeles tratados también se convierten en datos tipados, usados para dibujar y animar los sprites.",
      },
    ],
  },
];
