/* ADD YOUR WORK HERE. See README.md. Each object is one project card. */
window.CATEGORIES=[
  ['new-projects','New projects'],['certificates','Certificates'],['certifications','Certifications'],
  ['internships','Internships'],['case-studies','Case studies'],['competitions','Competitions']
];
window.PROJECTS=[
  {
    id:'restaurant-sales',            // unique, lowercase, no spaces (used in links like projects.html#restaurant-sales)
    category:'new-projects',          // must match a category id above
    featured:true,                    // true = also shown on the Home page
    kind:'Business intelligence',
    title:'Restaurant Sales Dashboard',
    summary:'Turning daily sales into a clearer view of restaurant performance, busy periods, and menu items that need attention.',
    tools:['Excel','Power BI','DAX'],
    preview:'sales',                  // 'sales', 'inventory', or leave out
    concept:true,                     // shows the "Concept illustration" label
    overview:[
      'Built with Excel, Power BI and DAX to turn daily sales into a clearer view of restaurant performance. It focuses on busy periods and the menu items that need attention.',
      'The preview above is a concept illustration, not a screenshot of the dashboard. Screenshots and a project link will be added when they are ready.'
    ],
    link:''                           // optional: https://... adds a "View project" link
  },
  {
    id:'inventory-management',
    category:'new-projects',
    featured:true,
    kind:'Application development',
    title:'Inventory Management System',
    summary:'A practical stock management application designed to track inventory and make reorder decisions easier.',
    tools:['Python','SQL'],
    preview:'inventory',
    concept:true,
    overview:[
      'A stock management application built with Python and SQL, designed to track inventory and make reorder decisions easier.',
      'The preview above is a concept illustration, not a screenshot of the application. Screenshots and a project link will be added when they are ready.'
    ],
    link:''
  }
];
