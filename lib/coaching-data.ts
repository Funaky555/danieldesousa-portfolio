/**
 * Coaching Data for Daniel de Sousa
 * Professional Football Coach Portfolio
 *
 * This file contains all content data for the website.
 * Update this file to change content across the entire site.
 */

// ============================================================================
// COACH INFORMATION
// ============================================================================

export const coachInfo = {
  name: "Daniel de Sousa",
  title: "Professional Football Coach",
  subtitle: "UEFA B | Youth Development Specialist",
  tagline: "UEFA B Football Coach | Youth Development Specialist | 10+ Years Experience Portugal & China",
  location: "Porto, Portugal",
  age: 33,
  birthDate: "1992-05-07",
  contact: {
    email: "danieldesousa05@gmail.com",
    whatsapp: "+351 913350837",
    whatsappLink: "https://wa.me/351913350837",
  },
  bio: `Experienced Football Coach, PE Teacher and Sports Scientist with over 10 years of experience in Portugal and China, focused on youth development in diverse cultural environments. I have worked with players from U4 to professional, including athletes who have represented Portugal at youth international level. Passionate about player development, I combine strong pedagogical skills, solid football knowledge, modern digital and AI tools to support young athletes in their growth, both on and off the field.`,

  stats: [
    { label: "Years Experience", value: "10+", icon: "Calendar" },
    { label: "Countries", value: "Portugal & China", icon: "Globe" },
    { label: "Age Groups", value: "U4 to U18", icon: "Users" },
    { label: "Certification", value: "UEFA B", icon: "Award" },
  ],
};

// ============================================================================
// PROFESSIONAL EXPERIENCE
// ============================================================================

export const experience = [
  {
    id: 1,
    role: "Coordinator Football Department / Head Coach / PE Teacher",
    ageGroup: "U15",
    club: "Middle School no.2",
    location: "Tongling, China",
    country: "China",
    startDate: "2022-09",
    endDate: "2024-07",
    period: "September 2022 - July 2024",
    description: "Multi-role position combining football department leadership, competitive team coaching and physical education teaching.",
    isDetailed: true,
    sections: [
      {
        title: "Football Department Coordination",
        icon: "Building",
        items: [
          "Coordinated and led the school's football department in partnership with the Tongling Football Association",
          "Designed and implemented club-level training plans for competitive teams",
          "Organized team selection processes and managed tryouts",
          "Prepared teams for local and regional competitions",
          "Communicated regularly with parents and school administration",
          "Managed equipment, training schedules and football department logistics",
          "Collaborated with local authorities and the Chinese Football Association in official events",
        ],
      },
      {
        title: "Head Coach U15 (Male & Female)",
        icon: "Trophy",
        items: [
          "Football coach of U15 male and female teams in local and regional competitions",
          "Planned and led weekend training sessions (Saturdays and Sundays, 2 hours) focused on tactical, technical and physical development",
          "Developed individualized player development plans",
          "Conducted video analysis and tactical preparation for matches",
          "Managed team dynamics, discipline and player motivation",
          "Led the team during official matches and competitions",
          "Contributed to player progression toward local and regional selections",
        ],
      },
      {
        title: "Physical Education Teacher",
        icon: "GraduationCap",
        items: [
          "Taught Physical Education to students aged 11 to 15 across all grades",
          "Designed lessons following the Chinese national curriculum, adapted to local conditions",
          "Delivered content in: Athletics (running, jumping, throwing), Team sports (football, basketball), Racket sports (badminton, table tennis), Health and fitness education",
          "Promoted values of teamwork, discipline and healthy lifestyle through sport",
          "Adapted activities for students with different skill levels and physical abilities, including students with disabilities (motor, cognitive, or speech impairments)",
          "Participated as jury in various school activities including school Olympics",
          "Participated as referee in school football tournaments",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Football department coordination and leadership",
          "Competitive team coaching (U15 male and female)",
          "Physical education teaching across all grades",
          "Partnership management with local football associations",
          "Training program design and implementation",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "U15 Female City Champion (2023)",
          "U15 Male City Vice-Champions (2023 and 2024)",
          "Contributed to the school's recognition as a football development centre",
          "Developed partnerships with Tongling Football Association",
          "Implemented a more structured and professional approach to youth football at the school",
          "Players from this programme were selected for city football teams",
        ],
      },
    ],
    achievements: [
      "U15 Female City Champion (2023)",
      "U15 Male City Vice-Champions (2023 and 2024)",
      "Contributed to the school's recognition as a football development centre",
      "Developed partnerships with Tongling Football Association",
      "Implemented a more structured and professional approach to youth football at the school",
      "Players from this programme were selected for city football teams",
    ],
    media: {
      interviewLink: "https://app.tlnews.cn/detailArticle/24332680_68885_tonglingrb.html",
      interviewTitle: "The Foreign Coach's Last Football Lesson",
      schoolLogo: "/images/china/tonglingsymbol.jpg",
      photos: [
        "/images/china/Tongling1.jpg",
        "/images/china/Tongling8.jpg",
        "/images/china/Tongling4.jpg",
        "/images/china/Tongling5.jpg",
      ],
    },
    images: ["china-tongling-1.jpg", "china-tongling-2.jpg"],
  },
  {
    id: 2,
    role: "Head Coach U13 & U15",
    ageGroup: "U13 and U15",
    club: "Chizhou City Team",
    location: "Chizhou, China",
    country: "China",
    startDate: "2024-04",
    endDate: "2024-07",
    period: "April 2024 - July 2024",
    description: "Head coach for city representative teams preparing for national competitions, including intensive training camps and tournament participation.",
    isDetailed: true,
    sections: [
      {
        title: "Head Coach – U15 National Competition Preparation",
        icon: "Trophy",
        items: [
          "One-month intensive training program preparing U15 players for participation in a national championship",
          "Fully responsible for technical, tactical and physical preparation of the squad prior to competition",
          "Did not attend the tournament due to visa constraints, having completed the entire preparation phase",
        ],
      },
      {
        title: "Easter Internship – Wuhu Training Camp (Head Coach)",
        icon: "Building",
        items: [
          "Two-week coaching internship during Easter holidays in Wuhu",
          "Led daily training sessions and managed teams in friendly and competitive matches against other academies and city teams",
        ],
      },
      {
        title: "Head Coach – U13 National Competition",
        icon: "Trophy",
        items: [
          "Two-week intensive preparation period followed by travel and participation in a national youth tournament",
          "Led a very young and physically underdeveloped squad competing against stronger and more mature city teams",
          "Focus on learning, resilience and long-term player development",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Head coach of U13 and U15 squads",
          "Training design and periodization",
          "Match planning and game model implementation",
          "Player evaluation and development planning",
          "Technical and tactical leadership",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "Successfully prepared two age groups for national-level competitions",
          "Accelerated development of players in short preparation cycles",
          "Implemented professional training methodology at city-team level",
        ],
      },
    ],
    achievements: [
      "Successfully prepared two age groups for national-level competitions",
      "Accelerated development of players in short preparation cycles",
      "Implemented professional training methodology at city-team level",
    ],
    media: {
      photos: [],
    },
    images: ["china-chizhou.jpg"],
  },
  {
    id: 3,
    role: "Head Coach U15",
    ageGroup: "U15",
    club: "Tongling City Team",
    location: "Tongling, China",
    country: "China",
    startDate: "2022-06",
    endDate: "2022-08",
    period: "June 2022 - August 2022",
    description: "Coached city representative team for summer tournaments.",
    isDetailed: true,
    sections: [
      {
        title: "Head Coach U15 (Male)",
        icon: "Trophy",
        items: [
          "Coached U15 city representative team for summer tournament competitions",
          "Prepared and trained players for regional-level matches",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Tournament preparation and match coaching",
          "Regional-level competition management",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "Competitive tournament participation",
        ],
      },
    ],
    achievements: [],
    media: {
      photos: [],
    },
    images: [],
  },
  {
    id: 4,
    role: "Head Coach U11 Boys / U17 Girls | Assistant Coach U18 Boys",
    ageGroup: "U11, U17, U18",
    club: "Tagou Shaolin Wushu School",
    location: "Dengfeng, China",
    country: "China",
    startDate: "2021-04",
    endDate: "2021-12",
    period: "April 2021 - December 2021",
    description: "Multiple coaching roles at prestigious sports school combining martial arts and football training.",
    isDetailed: true,
    sections: [
      {
        title: "Assistant Coach U18 (Male)",
        icon: "Building",
        items: [
          "Supported U18 boys team as assistant coach",
        ],
      },
      {
        title: "Head Coach U17 (Female)",
        icon: "Trophy",
        items: [
          "Led U17 girls team as head coach",
        ],
      },
      {
        title: "Head Coach U11 (Male)",
        icon: "Trophy",
        items: [
          "Led U11 boys team as head coach",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Integrated tactical football training with athletic development",
          "Managed multiple age groups simultaneously",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "Successfully integrated tactical football training with athletic development at Wushu school",
          "Managed multiple age groups simultaneously",
        ],
      },
    ],
    achievements: [],
    media: {
      photos: [],
    },
    images: ["china-dengfeng.jpg"],
  },
  {
    id: 5,
    role: "Head Coach U6 to U15",
    ageGroup: "U6-U15",
    club: "Dalian Zichun Football Club",
    location: "Dalian, China",
    country: "China",
    startDate: "2020-09",
    endDate: "2020-12",
    period: "September 2020 - December 2020",
    description: "Coached grassroots to competitive youth levels at professional academy.",
    isDetailed: true,
    sections: [
      {
        title: "Head Coach U6 to U15 (Male and Female)",
        icon: "Trophy",
        items: [
          "Coached multiple age groups from U6 to U15 at professional academy",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Developed age-appropriate training curricula",
          "Managed player pathway development",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "Created comprehensive age-appropriate training curricula",
          "Established player pathway development system",
        ],
      },
    ],
    achievements: [],
    media: {
      photos: [],
    },
    images: ["china-dalian.jpg"],
  },
  {
    id: 6,
    role: "Assistant Coach U13 Boys",
    ageGroup: "U13",
    club: "Sport Lisboa e Benfica",
    location: "Lisboa, Portugal",
    country: "Portugal",
    startDate: "2018-09",
    endDate: "2019-07",
    period: "September 2018 - July 2019",
    description: "Assistant coach at one of Europe's top youth academies, working with elite young talent.",
    isDetailed: true,
    sections: [
      {
        title: "Assistant Coach U13 (Male)",
        icon: "Building",
        items: [
          "Assisted with U13 team training and match preparation",
          "Worked in high-performance training environment with world-class coaching staff",
          "Supported player development for elite young talent",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Training session support and match preparation",
          "Player development for elite young talent",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "Worked with players who progressed to Portuguese youth national teams",
          "Learned from world-class coaching staff",
          "High-performance training environment experience",
        ],
      },
    ],
    achievements: [],
    media: {
      photos: [],
    },
    images: ["portugal-benfica.jpg"],
  },
  {
    id: 7,
    role: "Head Coach U6 | Assistant Coach U14, U15, U16, U17, U18",
    ageGroup: "U6, U14-U18",
    club: "Clube Desportivo Trofense",
    location: "Trofa, Portugal",
    country: "Portugal",
    startDate: "2014-01",
    endDate: "2018-07",
    period: "January 2014 - July 2018",
    description: "Extended tenure with multiple coaching roles across youth categories.",
    isDetailed: true,
    sections: [
      {
        title: "Assistant Coach U18 (Male)",
        icon: "Building",
        items: [
          "Assisted with U18 team preparation for competitive matches",
        ],
      },
      {
        title: "Assistant Coach U17 (Male)",
        icon: "Building",
        items: [
          "Assisted with U17 team preparation for competitive matches",
        ],
      },
      {
        title: "Assistant Coach U16 (Male)",
        icon: "Building",
        items: [
          "Assisted with U16 team preparation for competitive matches",
        ],
      },
      {
        title: "Assistant Coach U15 (Male)",
        icon: "Building",
        items: [
          "Assisted with U15 team preparation for competitive matches",
        ],
      },
      {
        title: "Head Coach U6 (Male)",
        icon: "Trophy",
        items: [
          "Led U6 grassroots team development",
          "Created age-appropriate training sessions",
        ],
      },
      {
        title: "Scouter",
        icon: "Building",
        items: [
          "Player evaluation and talent identification",
        ],
      },
      {
        title: "Football Analyst",
        icon: "Building",
        items: [
          "Match analysis and tactical evaluation",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Supported team preparation for competitive matches across multiple age groups",
          "Developed players for higher competitive levels",
          "Scouting and tactical analysis responsibilities",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "CD Trofense Juniors - Division Promotion to National Level (Assistant Coach)",
          "Developed players for higher competitive levels",
          "Grassroots to elite youth coaching experience",
        ],
      },
    ],
    achievements: [],
    media: {
      photos: [],
    },
    images: ["portugal-trofense.jpg"],
  },
  {
    id: 8,
    role: "Assistant Coach U13",
    ageGroup: "U13",
    club: "União Desportiva Lavrense",
    location: "Matosinhos, Portugal",
    country: "Portugal",
    startDate: "2010-09",
    endDate: "2011-07",
    period: "September 2010 - July 2011",
    description: "First professional coaching role, assisting with U13 team development.",
    isDetailed: true,
    sections: [
      {
        title: "Assistant Coach U13",
        icon: "Building",
        items: [
          "Assisted with U13 team training and development",
          "First professional coaching role",
          "Supported youth player development",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Training session support",
          "Youth player development",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "Foundation of coaching career",
          "Youth player development",
        ],
      },
    ],
    achievements: [],
    media: {
      photos: [],
    },
    images: [],
  },
  {
    id: 9,
    role: "Trainee - Management Computer Equipment",
    ageGroup: "",
    club: "GALILEU - Specialists in Formation",
    location: "Porto, Portugal",
    country: "Portugal",
    startDate: "2011-04",
    endDate: "2011-06",
    period: "April 2011 - June 2011",
    description: "Trainee in Management Computer Equipment at GALILEU - Specialists in Formation.",
    isDetailed: true,
    sections: [
      {
        title: "Trainee (Management Computer Equipment)",
        icon: "Building",
        items: [
          "Completed professional training internship in computer equipment management",
          "Worked at GALILEU - Specialists in Formation",
          "Developed technical skills in computer systems and equipment",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Computer equipment management",
          "Technical support and maintenance",
          "Systems administration",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "Successfully completed 3-month professional training program",
          "Gained technical expertise in computer systems",
        ],
      },
    ],
    achievements: [],
    media: {
      photos: [],
    },
    images: [],
  },
];

// ============================================================================
// EDUCATION & CERTIFICATIONS
// ============================================================================

export const education = {
  certifications: [
    {
      title: "UEFA B License",
      institution: "UEFA",
      status: "Certified",
      year: "Current",
      description: "UEFA B certified football coach",
    },
    {
      title: "IPDJ Football Coach Level 2",
      institution: "IPDJ",
      status: "Certified",
      year: "Valid until Dec 2028",
      description: "Portuguese Institute of Sport and Youth certification",
    },
    {
      title: "UEFA A License",
      institution: "UEFA",
      status: "In Progress",
      year: "Ongoing",
      description: "Working towards UEFA A certification",
    },
  ],

  degrees: [
    {
      title: "Master's Degree in Sports Sciences",
      specialization: "Specialization in Team Sports",
      institution: "University of Trás-os-Montes and Alto Douro, Vila Real, Portugal",
      startYear: "2011",
      endYear: "2017",
      description: "Specialized in team sports with focus on football coaching methodology",
    },
    {
      title: "Computer Management Equipment",
      specialization: "",
      institution: "Ruiz Costa Professional School, Matosinhos, Portugal",
      startYear: "2008",
      endYear: "2011",
      description: "Specialized in analysis equipment, test and repair the physical network, select all types of computer equipment for users and all types of businesses",
    },
  ],

  exchangePrograms: [
    {
      program: "Erasmus Exchange",
      specialization: "Sports Sciences",
      institution: "Akademia Wychowania Fizycznego we Wrocławiu",
      location: "Wroclaw, Poland",
      year: "2012 - 2013",
      description: "International sports science studies",
    },
    {
      program: "University Project (IMPAS)",
      specialization: "Performance Analysis of Sport",
      institution: "Otto von Guericke University Magdeburg",
      location: "Magdeburg, Germany",
      year: "2014 - 2015",
      description: "Performance analysis research project",
    },
  ],
};

// ============================================================================
// LANGUAGES
// ============================================================================

export const languages = [
  { language: "Portuguese", level: "Native", proficiency: 100 },
  { language: "English", level: "Proficient", proficiency: 90 },
  { language: "Spanish", level: "Proficient", proficiency: 85 },
  { language: "French", level: "Basic", proficiency: 40 },
  { language: "Chinese", level: "Basic", proficiency: 35 },
];

// ============================================================================
// SOFT SKILLS
// ============================================================================

export const softSkills = [
  { skill: "Leadership", icon: "Users" },
  { skill: "Critical Thinking", icon: "Brain" },
  { skill: "Collaboration", icon: "Handshake" },
  { skill: "Decision Making", icon: "Target" },
  { skill: "Flexibility", icon: "Workflow" },
  { skill: "Active Listening", icon: "Ear" },
];

// ============================================================================
// COACHING PHILOSOPHY
// ============================================================================

export const philosophy = {
  core: "My football coaching philosophy is based in developing players to perform within a clear and common idea, collective identity based on modern football principles. I believe the game should be played with intelligence, intensity, and intention. My goal is to build teams that control the game through structured organization, fluid positional play, and coordinated pressing, always respecting the principles of space, timing, and decision making.",

  keyPrinciples: ["Intelligence", "Intensity", "Intention"],

  gameMoments: [
    {
      title: "Offensive Organization",
      description: "Structured possession play with clear positional responsibilities",
      principles: [
        "Positional play - occupying and creating space",
        "Offering constant support",
        "Ensuring width and depth",
        "Numerical superiority in key zones",
      ],
    },
    {
      title: "Defensive Organization",
      description: "Compactness and coordinated pressing to win the ball early",
      principles: [
        "Reducing space between lines",
        "Coordinated pressing",
        "Intelligent positioning",
        "Collective defensive shape",
      ],
    },
    {
      title: "Offensive Transition",
      description: "Quick exploitation of space after winning possession",
      principles: [
        "Immediate forward progression",
        "Using numerical superiority",
        "Exploiting disorganized opponents",
        "Direct play when appropriate",
      ],
    },
    {
      title: "Defensive Transition",
      description: "Immediate reaction to loss of possession",
      principles: [
        "Counter-pressing",
        "Protecting key areas",
        "Organized retreat when needed",
        "Preventing counter-attacks",
      ],
    },
    {
      title: "Set Pieces",
      description: "Structured approach to dead-ball situations",
      principles: [
        "Clear roles and responsibilities",
        "Rehearsed routines",
        "Defensive organization",
        "Exploiting opponent weaknesses",
      ],
    },
  ],

  approach: `I lead training sessions with clarity, energy and a clear sense of direction, ensuring every player understands their role while feeling motivated to improve. I thrive in challenging environments, using creative thinking to adapt training exercises, solve on-the-spot problems and find new ways to engage and develop players of different levels and backgrounds.

I am known for my flexibility and ability to adapt to new cultures, team dynamics and unexpected situations, which has been especially important during my international experiences. I place high value on active listening, especially when working with multicultural teams, young players, staff members, and translators. I believe that understanding others' perspectives is key to building trust and effective communication.`,

  roles: `I have taken on multiple roles in football, including Head Coach, Assistant Coach, Scouter, Analyst, and Football Advisor, each contributing to my well-rounded understanding of the game. As a Head Coach, I've led youth teams with clear methodology and player-centered development, while as an Assistant, I supported team dynamics, planning and match preparation. My work as a Scouter involved identifying and evaluating talented players across various levels and teams, helping to strengthen recruitment decisions. In my roles as Analyst and Advisor, I provided tactical insights, match analysis and strategic guidance to improve both individual and team performance.`,
};

// ============================================================================
// TACTICAL SYSTEMS
// ============================================================================

export const formations = [
  {
    name: "1-4-3-3",
    fullName: "1-4-3-3 Formation",
    description: "Attacking formation with width and forward pressure",
    positions: [
      { x: 50, y: 5, position: "GK", number: 1, name: "Goalkeeper" },
      { x: 15, y: 25, position: "LB", number: 3, name: "Left Back" },
      { x: 35, y: 20, position: "CB", number: 4, name: "Center Back (L)" },
      { x: 65, y: 20, position: "CB", number: 5, name: "Center Back (R)" },
      { x: 85, y: 25, position: "RB", number: 2, name: "Right Back" },
      { x: 50, y: 40, position: "CDM", number: 6, name: "Defensive Midfielder" },
      { x: 35, y: 52, position: "CM", number: 8, name: "Central Midfielder (L)" },
      { x: 65, y: 52, position: "CM", number: 10, name: "Central Midfielder (R)" },
      { x: 15, y: 75, position: "LW", number: 11, name: "Left Winger" },
      { x: 50, y: 80, position: "ST", number: 9, name: "Striker" },
      { x: 85, y: 75, position: "RW", number: 7, name: "Right Winger" },
    ],
    principles: [
      "Wide wingers provide width and stretch defense",
      "Midfield triangle controls center of pitch",
      "High pressing from forwards",
      "Full-backs support attacks",
      "Numerical superiority in wide areas",
    ],
    strengths: [
      "Excellent for attacking play",
      "Natural width",
      "High pressing capability",
      "Fluid attacking rotations",
    ],
  },
  {
    name: "1-4-4-2",
    fullName: "1-4-4-2 Formation",
    description: "Balanced formation with solid defensive structure",
    positions: [
      { x: 50, y: 5, position: "GK", number: 1, name: "Goalkeeper" },
      { x: 15, y: 25, position: "LB", number: 3, name: "Left Back" },
      { x: 35, y: 20, position: "CB", number: 4, name: "Center Back (L)" },
      { x: 65, y: 20, position: "CB", number: 5, name: "Center Back (R)" },
      { x: 85, y: 25, position: "RB", number: 2, name: "Right Back" },
      { x: 15, y: 55, position: "LM", number: 11, name: "Left Midfielder" },
      { x: 35, y: 50, position: "CM", number: 8, name: "Central Midfielder (L)" },
      { x: 65, y: 50, position: "CM", number: 6, name: "Central Midfielder (R)" },
      { x: 85, y: 55, position: "RM", number: 7, name: "Right Midfielder" },
      { x: 40, y: 80, position: "ST", number: 9, name: "Striker (L)" },
      { x: 60, y: 80, position: "ST", number: 10, name: "Striker (R)" },
    ],
    principles: [
      "Compact defensive block",
      "Two strikers create partnerships",
      "Wide midfielders track back",
      "Central midfield controls tempo",
      "Balanced team shape",
    ],
    strengths: [
      "Solid defensive organization",
      "Good transition play",
      "Partnership between strikers",
      "Versatile formation",
    ],
  },
  {
    name: "1-4-2-3-1",
    fullName: "1-4-2-3-1 Formation",
    description: "Modern attacking formation with creative midfield",
    positions: [
      { x: 50, y: 5, position: "GK", number: 1, name: "Goalkeeper" },
      { x: 15, y: 25, position: "LB", number: 3, name: "Left Back" },
      { x: 35, y: 20, position: "CB", number: 4, name: "Center Back (L)" },
      { x: 65, y: 20, position: "CB", number: 5, name: "Center Back (R)" },
      { x: 85, y: 25, position: "RB", number: 2, name: "Right Back" },
      { x: 35, y: 45, position: "CDM", number: 6, name: "Defensive Midfielder (L)" },
      { x: 65, y: 45, position: "CDM", number: 8, name: "Defensive Midfielder (R)" },
      { x: 15, y: 65, position: "LW", number: 11, name: "Left Winger" },
      { x: 50, y: 60, position: "CAM", number: 10, name: "Attacking Midfielder" },
      { x: 85, y: 65, position: "RW", number: 7, name: "Right Winger" },
      { x: 50, y: 80, position: "ST", number: 9, name: "Striker" },
    ],
    principles: [
      "Double pivot provides defensive security",
      "Attacking midfielder creative freedom",
      "Wingers create overloads",
      "Lone striker holds up play",
      "Fluid front three",
    ],
    strengths: [
      "Creative attacking play",
      "Defensive stability",
      "Central control",
      "Width in attack",
    ],
  },
];

// ============================================================================
// SERVICES
// ============================================================================

export const services = [
  {
    id: "game-analysis",
    title: "Game Analysis",
    shortDescription: "Pre-match and post-match tactical analysis",
    description: "Comprehensive game analysis services including pre-match preparation, opposition scouting, and post-match performance review.",
    icon: "BarChart3",
    features: [
      "Pre-match tactical analysis",
      "Opposition scouting reports",
      "Post-match performance review",
      "Video analysis breakdowns",
      "Statistical performance data",
      "Tactical recommendations",
    ],
    deliverables: [
      "Detailed written reports",
      "Video analysis presentations",
      "Statistical dashboards",
    ],
  },
  {
    id: "scouting",
    title: "Scouting Consultancy",
    shortDescription: "Player evaluation and talent identification",
    description: "Professional scouting services with access to extensive player database and recruitment consultation.",
    icon: "Search",
    features: [
      "Player evaluation and profiling",
      "Talent identification",
      "Scouting database access",
      "Recruitment consultation",
      "Age-appropriate player assessments",
      "International scouting network",
    ],
    deliverables: [
      "Player scouting reports",
      "Talent recommendations",
      "Database access",
    ],
  },
  {
    id: "leadership",
    title: "Leadership Courses",
    shortDescription: "Team leadership and coaching staff development",
    description: "Leadership development programs for players, coaches, and staff focused on building winning cultures.",
    icon: "Users",
    features: [
      "Team leadership development",
      "Coaching staff training",
      "Captain/leadership programs for players",
      "Communication skills",
      "Cultural adaptation training",
      "Motivational techniques",
    ],
    deliverables: [
      "Customized training programs",
      "Workshop materials",
      "Ongoing support",
    ],
  },
  {
    id: "training",
    title: "Personalized Training",
    shortDescription: "Individual player development programs",
    description: "Tailored training programs designed for individual player development across all positions.",
    icon: "Target",
    features: [
      "Individual player development plans",
      "Position-specific training",
      "Tactical training sessions",
      "Technical skill development",
      "Physical conditioning guidance",
      "Mental preparation",
    ],
    deliverables: [
      "Personal development plans",
      "Training session designs",
      "Progress tracking",
    ],
  },
  {
    id: "seminars",
    title: "Seminars & Webinars",
    shortDescription: "Coaching methodology and tactical workshops",
    description: "Educational seminars and webinars covering coaching methodology, tactical analysis, and youth development.",
    icon: "Presentation",
    features: [
      "Coaching methodology seminars",
      "Tactical analysis workshops",
      "Youth development topics",
      "Online webinars",
      "Interactive Q&A sessions",
      "Practical demonstrations",
    ],
    deliverables: [
      "Presentation materials",
      "Video recordings",
      "Resource documents",
    ],
  },
];

export const servicePricing = {
  note: "Valores podem ser discutidos, dependendo do tempo de viagem, localização e tipo de forum a designar.",
  noteEn: "Prices can be discussed depending on travel time, location, and type of forum to be designated.",
  contactForQuote: true,
};

// ============================================================================
// SEO KEYWORDS
// ============================================================================

export const seoKeywords = {
  portuguese: [
    "treino de futebol",
    "exercícios de futebol",
    "exercicios sub 13",
    "sub 15",
    "principios futebol",
    "sistema tatico",
    "analise de jogo",
  ],
  english: [
    "football coaching drills",
    "scouting",
    "tactical analyst",
    "youth football coach",
    "football training",
  ],
  general: [
    "UEFA B coach",
    "Portugal football coach",
    "China football coach",
    "youth development",
  ],
};

// ============================================================================
// SOCIAL MEDIA (to be added)
// ============================================================================

export const socialMedia = {
  linkedin: "https://www.linkedin.com/in/daniel-de-sousa-56984a102/",
  twitter: "https://x.com/DanieldeSousa05",
  instagram: "", // To be added
  youtube: "", // To be added
};

// ============================================================================
// HERO BADGES
// ============================================================================

export const heroBadges = {
  ageGroups: ["U4 to U18", "Professional", "Senior", "Walking Football"],
  roles: ["Scouting", "Game Analyst", "PE Teacher"],
  certifications: [
    {
      name: "UEFA B Football Coach",
      logo: "/images/uefa.png",
    },
    {
      name: "IPDJ Certified",
      logo: "/images/ipdj.png",
      validity: "Valid until Dec 2028",
    },
  ],
};

// ============================================================================
// SOFTWARE & TOOLS
// ============================================================================

export const softwareTools = [
  {
    category: "Video & Match Analysis",
    tools: [
      {
        name: "Adobe Premiere Pro",
        description: "Professional video editing for match highlights and training footage",
        icon: "Video",
        level: "Advanced",
      },
      {
        name: "DaVinci Resolve",
        description: "Color grading and advanced video editing for tactical presentations",
        icon: "Film",
        level: "Intermediate",
      },
      {
        name: "Hudl",
        description: "Football-specific video analysis and team management platform",
        icon: "Play",
        level: "Advanced",
      },
    ],
  },
  {
    category: "AI & Productivity",
    tools: [
      {
        name: "ChatGPT",
        description: "AI-powered assistant for training plan generation, report writing, and tactical idea brainstorming",
        icon: "Bot",
        level: "Daily Use",
      },
      {
        name: "Microsoft Copilot",
        description: "AI integration across Office tools for document creation and data analysis",
        icon: "Sparkles",
        level: "Regular",
      },
    ],
  },
  {
    category: "Tactical & Scouting",
    tools: [
      {
        name: "Wyscout",
        description: "Player scouting, match data, and performance analytics platform",
        icon: "Search",
        level: "Advanced",
      },
      {
        name: "Football Manager",
        description: "Tactical simulation and player development modelling",
        icon: "Target",
        level: "Regular",
      },
    ],
  },
  {
    category: "Office & Communication",
    tools: [
      {
        name: "Microsoft Office",
        description: "Word, Excel, PowerPoint for reports, presentations, and data organisation",
        icon: "FileText",
        level: "Daily Use",
      },
      {
        name: "Google Workspace",
        description: "Docs, Sheets, Drive for collaborative work and team management",
        icon: "Cloud",
        level: "Daily Use",
      },
    ],
  },
];
