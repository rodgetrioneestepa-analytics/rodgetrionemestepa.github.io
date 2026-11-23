/* Project content lives here. Tools, methods and data sources stay separate. */
(() => {
const tool = (name, icon, role, tone = 'blue') => ({ name, icon, role, tone });
const method = (name, role) => ({ name, role });
const source = (name, role, link = '') => ({ name, role, link });
const linkedin = 'https://www.linkedin.com/in/rodge-trione-estepa/';
window.CATEGORIES=[
  ['new-projects','New projects'],['certificates','Certificates'],['certifications','Certifications'],
  ['internships','Internships'],['case-studies','Case studies'],['competitions','Competitions']
];
window.PROJECTS=[
  {
    id:'metricast', category:'new-projects', featured:true, detailsUrl:'projects/metricast.html',
    kind:'Academic project · Restaurant analytics', title:'METRICAST',
    summary:'A restaurant analytics and forecasting project connecting POS data preparation with sales, product and operational insights.',
    image:'assets/projects/metricast-reference.webp',
    imageAlt:'METRICAST data-management interface showing related transaction, product-sales and payment CSV imports.',
    tools:[
      tool('Python','python','Sales forecasting and data analysis.'),
      tool('CSV / POS Data Processing','data','Importing and preparing related restaurant transaction records.','green')
    ],
    methods:[
      method('Time-Series Forecasting','Reviewing future sales, transaction and demand trends.'),
      method('Forecast Evaluation','Interpreting holdout results with MAPE and RMSE.'),
      method('Data Visualization','Presenting sales, product and operational patterns.'),
      method('Database Design','Organizing relationships between sales, line items and payment records.')
    ],
    dataSources:[source('Restaurant POS exports','Transactions.csv, ProductSales.csv and Payments.csv supply related business records.')],
    details:{
      built:'An academic restaurant analytics workspace covering POS imports, performance dashboards, customer and product views, operational reports, and sales forecasts.',
      why:'To bring related restaurant records into a clearer view of performance and support sales and demand planning.',
      how:'The reference screens show a workflow for importing the three related POS files, checking data relationships, exploring performance views and reviewing actual-versus-forecast charts with error measures.',
      learned:'I learned to connect related POS records and to review forecast error alongside the chart before interpreting a prediction.'
    },
    contactLink:linkedin
  },
  {
    id:'jru-library-assist', category:'new-projects', featured:true, detailsUrl:'projects/jru-library-rag.html',
    kind:'Academic project · Applied AI', title:'JRU Library Assist',
    summary:'A library FAQ assistant that finds relevant source passages and produces conversational answers with citations.',
    image:'assets/projects/jru-library-assist.webp',
    imageAlt:'JRU Library Assist chat interface displaying a library-hours answer and source citations.',
    tools:[
      tool('Python','python','Backend application and document-retrieval pipeline.'),
      tool('Groq API','groq','Language-model responses and conversational query rewriting.','red'),
      tool('ChromaDB','database','Vector storage and cosine-similarity retrieval.','yellow'),
      tool('Sentence Transformers','embeddings','MiniLM embeddings for semantic document matching.','green'),
      tool('Flask','flask','Python web application and chat API.'),
      tool('LangChain Text Splitters','chain','Splitting FAQ text into overlapping passages.','green'),
      tool('Jupyter Notebook / Google Colab','jupyter','Research, experimentation and prototype evaluation.','yellow'),
      tool('HTML / CSS / JavaScript','code','The browser interface and chat interactions.'),
      tool('Vercel','vercel','Web application hosting and deployment; separate from the retrieval methods.'),
      tool('Docker','docker','Packaging the Python service for deployment.'),
      tool('openpyxl','data','Reading the Excel FAQ workbook.','green')
    ],
    methods:[
      method('Retrieval-Augmented Generation','Grounding generated answers in retrieved library information.'),
      method('Semantic Search','Matching questions to passages by meaning.'),
      method('Natural Language Processing','Preparing questions and source text for retrieval and responses.'),
      method('Text Chunking & Embeddings','Creating overlapping passages and vector representations.'),
      method('Source Citations','Connecting answers to the supporting passages.'),
      method('Retrieval Evaluation','Checking retrieval behavior and source-grounded answers.')
    ],
    dataSources:[source('JRU Library FAQ workbook','The supplied library FAQ records provide the source information for answers.')],
    details:{
      built:'A web-based library companion for questions about hours, borrowing, renewals, resources and library policies, with source links attached to supported answers.',
      why:'To make library information easier to find in natural language while keeping the supporting source visible.',
      how:'Python prepares the FAQ workbook, splits its text into passages and embeds them with Sentence Transformers. ChromaDB retrieves the three closest passages; Groq generates an answer with citations. Flask serves the interface and API. Requests without sufficient source support receive a fallback response.',
      learned:'I learned how text preparation, chunking and retrieval quality affect whether a generated answer can be traced to its sources.'
    },
    link:'https://jru-library-assist.vercel.app/', linkLabel:'Open application', contactLink:linkedin
  },
  {
    id:'faostat-dashboard', category:'new-projects', featured:true, detailsUrl:'projects/faostat.html',
    kind:'Academic project · Agricultural analytics', title:'FAOSTAT Dashboard',
    summary:'An interactive view of Asian crop and livestock performance, historical trends, descriptive statistics and rice forecasts.',
    image:'assets/projects/faostat-dashboard.webp',
    imageAlt:'Asian Agricultural Production Overview dashboard with production trends, regional comparisons, yield indicators and a country map.',
    imageFit:'cover',
    tools:[tool('Google Looker Studio / Data Studio','looker','Interactive dashboard authoring, visual reporting and filters.')],
    methods:[
      method('Data Visualization','Charts, maps and filters for comparing countries, regions and commodities.'),
      method('Descriptive Statistics','Summarizing production, yield, harvested area and livestock indicators.'),
      method('Agricultural Data Analysis','Comparing Asian agricultural indicators across 1961–2024.'),
      method('Forecasting','Presenting regional and country rice forecasts for 2025–2027.'),
      method('Forecast Evaluation','Comparing holdout MAE and RMSE with a naive baseline.')
    ],
    dataSources:[source('FAO FAOSTAT','Crops and Livestock Products data; FAOSTAT is the data source, while Looker Studio is the dashboard tool.','https://www.fao.org/faostat/en/#data/QCL')],
    details:{
      built:'A multi-page agricultural dashboard covering Asian countries and regions, with production, yield, harvested area, livestock, descriptive-statistics and forecasting views.',
      why:'To make long-term agricultural patterns easier to compare across countries, regions and commodities.',
      how:'The dashboard organizes FAOSTAT indicators into filtered charts, maps and summary views. Its forecast pages compare regional and country rice projections with historical observations and holdout error measures.',
      learned:'I learned to compare indicators using consistent definitions and to examine forecast error rather than treat a projection as certainty.'
    },
    link:'https://datastudio.google.com/reporting/c5fa71ea-7072-4c0c-bf98-9d022484a28d', linkLabel:'Open dashboard', contactLink:linkedin
  },
  {
    id:'asean-dse-2026', category:'competitions', featured:true, detailsUrl:'projects/asean.html',
    kind:'Academic team project · Data storytelling', title:'ASEAN Data Science Explorers 2026',
    summary:'An education-to-employment data story examining Philippine youth labor-market indicators, participation and gender differences.',
    image:'assets/projects/asean-dse-2026.webp',
    imageAlt:'Philippine Youth and Education Dashboard comparing youth employment, unemployment, labor-force participation and NEET indicators.',
    imageFit:'cover',
    tools:[
      tool('SAP Analytics Cloud','sap','Dashboard charts and a story exploring Philippine youth labor-market indicators.'),
      tool('Canva','canva','Design and presentation of the team’s data story.','green')
    ],
    methods:[
      method('Data Visualization','Comparing employment, unemployment, labor-force participation and NEET indicators.'),
      method('Data Storytelling','Connecting the dashboard evidence to an education-to-employment narrative.'),
      method('Labor Market Analysis','Examining youth outcomes, selected-year trends and gender differences.')
    ],
    dataSources:[
      source('ILOSTAT / YouthSTATS','Youth labor-market indicators cited in the presentation.'),
      source('Philippine Statistics Authority','Published labor-market statistics and supporting contextual references.')
    ],
    details:{
      built:'A team presentation titled “From Education to Employment: A Data Story of Youth Labor Market Trends in the Philippines,” supported by a youth and education dashboard.',
      why:'To explore school-to-work transitions, pandemic disruption and recovery through a set of complementary youth labor-market indicators.',
      how:'The team organized ILOSTAT indicators and PSA references into dashboard comparisons and a Canva presentation. Selected-year trends and gender comparisons support the descriptive narrative.',
      learned:'I learned to interpret several labor-market indicators together and to distinguish descriptive patterns from evidence of cause and effect.'
    },
    contactLink:linkedin
  }
];
})();
