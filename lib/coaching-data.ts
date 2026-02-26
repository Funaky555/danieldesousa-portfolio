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
          "Taught Physical Education to students aged 11–15 across all grades",
          "Designed and delivered lessons aligned with the Portuguese national curriculum, adapted to the Chinese national curriculum and local conditions",
          "Delivered classes with the support of a Chinese translator, ensuring clear communication and effective learning",
          "Delivered practical and theoretical content in: Athletics (running, jumping, throwing), Team sports (basketball, volleyball, handball, football), Racket sports (badminton, table tennis), Health and fitness education",
          "Provided theoretical lessons on: Sports Nutrition (balanced diet, hydration, macronutrients, micronutrients, pre- and post-training meals), Basic anatomy and physiology related to movement and sport performance, Common sports injuries, injury mechanisms, prevention strategies, warm-up and cool-down principles, stretching, recovery, and rest",
          "Introduced tactical and rule-based concepts of collective ball sports",
          "Used visual aids, presentations, and practical demonstrations to enhance understanding",
          "Encouraged critical thinking, questioning, and application of theoretical knowledge to practical sessions",
          "Promoted values of teamwork, discipline, respect, and healthy lifestyle through sport",
          "Adapted activities for students with different skill levels and physical abilities, including students with motor, cognitive, or speech impairments",
          "Participated as jury in school events and activities, including School Olympics",
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
    achievements: [],
    trophyLinks: [
      { sectionIndex: 4, itemIndex: 0, trophyId: "u15-female-c" },
      { sectionIndex: 4, itemIndex: 1, trophyId: "u15-male-vc" },
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
        title: "Head Coach U15 (Male)",
        icon: "Trophy",
        items: [
          "Led preparation for the U15 squad for national competition using Portuguese coaching methodology",
          "Developed technical, tactical, and physical training programs to optimize team performance",
          "Prepared the team despite not being able to attend the tournament due to visa restrictions",
        ],
      },
      {
        title: "Easter Internship – Wuhu Training Camp",
        icon: "Building",
        items: [
          "Conducted an intensive two-week training camp with bi-daily sessions for city representative teams",
          "Organized approximately five friendly matches to provide match experience and practical application of training",
          "Focused on improving individual skills, tactical awareness, and team cohesion during the camp",
        ],
      },
      {
        title: "Head Coach U13 (Male)",
        icon: "Trophy",
        items: [
          "Prepared the U13 squad for national competition using Portuguese coaching methodology",
          "Led training for one week prior to the tournament, focusing on skill development and tactical understanding",
          "Treated the tournament as a learning experience for the team, which was less developed technically and tactically",
          "Focused on giving players exposure, confidence, and practical match experience despite early elimination in the group stage",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Plan and conduct age-appropriate football training sessions for U13 and U15 teams",
          "Apply Portuguese coaching methodology to enhance technical, tactical and physical development",
          "Prepare teams for national competitions and training camps, including friendly matches",
          "Monitor player progress and adapt training sessions to optimize performance",
          "Organize intensive training camps with bi-daily sessions to maximize learning and development",
          "Focus on player development, match experience, and building team cohesion, especially with less experienced squads",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "Provided structured Portuguese-methodology training for U13 and U15 city representative teams",
          "Gave U13 players valuable national tournament experience, focusing on development and learning despite early elimination",
          "Successfully implemented intensive training and friendly matches during the Easter Wuhu camp, enhancing players' tactical and technical skills",
          "Contributed to player growth and exposure to competitive football, even in teams with lower baseline abilities",
          "Ensured continuity of high-quality coaching despite external limitations such as visa restrictions and tournament constraints",
        ],
      },
    ],
    achievements: [],
    media: {
      photos: [
        "/images/china/Chizhou1.jpg",
        "/images/china/Chizhou2.jpg",
        "/images/china/Chizhou3.jpg",
      ],
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
          "Led all preparation sessions for the U15 city representative team, focusing on technical, tactical, and physical development",
          "Applied Portuguese coaching methodology to enhance team cohesion, individual skills, and game understanding",
          "Developed and implemented the team's training program for the district tournament",
          "Prepared the squad for competition despite COVID restrictions preventing travel for foreign coaches",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Plan and conduct training sessions using Portuguese coaching methodology",
          "Prepare the team for competitive matches and district tournaments",
          "Monitor player development and adapt training to optimize performance",
          "Develop tactical and technical plans to maximize team efficiency in match situations",
          "Ensure players were ready physically and mentally for the tournament despite limited access to official competitions",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "Achieved the best-ever result for Tongling City in the district tournament, finishing 5th after just one month of preparation",
          "Successfully implemented Portuguese coaching methodology in a new environment, improving team performance and cohesion",
          "Provided strong foundational preparation for young players in a competitive setting despite COVID-related limitations",
          "Contributed to raising the standard of youth football in Tongling through structured, high-quality training",
        ],
      },
    ],
    achievements: [],
    media: {
      photos: [
        "/images/china/TonglingCity4.jpg",
        "/images/china/TonglingCity1.jpg",
        "/images/china/TonglingCity2.jpg",
      ],
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
          "Supported the head coach in daily training sessions for the U18 male team",
          "Assisted with technical, tactical, and physical development of players",
          "Helped organize training drills, match simulations, and team management in a restricted boarding environment",
        ],
      },
      {
        title: "Head Coach U17 (Female)",
        icon: "Trophy",
        items: [
          "Selected the best female players from U15 to U18, forming a squad of twenty outfield players and two goalkeepers",
          "Led training sessions focused on skill development, tactical awareness and team cohesion",
          "Organized friendly matches in nearby cities after COVID restrictions eased, providing match experience for the squad",
          "Developed individualized training plans to optimize player progression within a limited match schedule",
        ],
      },
      {
        title: "Head Coach U11 (Male)",
        icon: "Trophy",
        items: [
          "Led all training sessions for the U11 male team using Portuguese coaching methodology",
          "Focused on individual skill development, creativity, decision-making, and understanding of game principles",
          "Provided both collective and individual coaching to ensure holistic development of young players",
          "Monitored player progress and adapted sessions to meet the needs of each athlete",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Plan and implement age-appropriate football training sessions for U11, U17, and U18 teams",
          "Apply Portuguese coaching methodology to enhance technical and tactical development",
          "Conduct player selection and squad management for female and male teams",
          "Provide individualized training support and feedback to optimize player growth",
          "Adapt coaching and training methods to a restricted boarding environment during COVID",
          "Organize friendly matches when external restrictions allowed, to give players match exposure",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "Successfully built a competitive U17 female squad by selecting top talent from multiple age groups",
          "Developed U11 male players using Portuguese methodology, improving technical, tactical and creative skills",
          "Maintained high standards of player development despite strict COVID restrictions and lack of official competitions",
          "Provided holistic training for players in a boarding school environment, ensuring continuity of development during challenging circumstances",
          "Helped players gain confidence, discipline, and understanding of game principles in both male and female squads",
        ],
      },
    ],
    achievements: [],
    media: {
      photos: [
        "/images/china/Tagou1.jpg",
        "/images/china/Tagou2.jpg",
        "/images/china/Tagou4.jpg",
        "/images/china/Tagou5.png",
      ],
    },
    images: ["china-dengfeng.jpg"],
  },
  {
    id: 5,
    role: "Head Coach U6 to U14",
    ageGroup: "U6-U14",
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
        title: "Head Coach U6 to U14 (Male and Female)",
        icon: "Trophy",
        items: [
          "Coached multiple age groups from U6 to U14, delivering both collective and individual sessions",
          "Developed players technical, tactical, physical and psychological skills using Portuguese training methodology",
          "Designed age-appropriate exercises to enhance creativity, decision-making and game understanding",
          "Conducted individual player assessments to support personalized development plans",
          "Organized and supervised academy tournaments and internal competitions to provide competitive match experience",
          "Conducted outreach training sessions in other schools, including primary schools and schools for children with visual or hearing impairments, promoting football and the academy",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Plan and deliver age-specific football training sessions for U6 to U14 players",
          "Provide individualized coaching to support skill development and performance improvement",
          "Implement Portuguese coaching methodology in daily training and match preparation",
          "Organize and oversee academy tournaments and competitive matches",
          "Conduct outreach programs in other schools to promote football and the academy's programs",
          "Work closely with academy staff to monitor player progress and adapt training plans",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "Promoted the academy through school outreach programs, including sessions for children with visual and hearing impairments",
          "Successfully led players in internal academy tournaments, fostering competitive experience and team cohesion",
          "Contributed to the overall growth of the academy's youth program and visibility in the local community",
        ],
      },
    ],
    achievements: [],
    media: {
      photos: [
        "/images/china/Dalian1.jpg",
        "/images/china/Dalian2.jpg",
        "/images/china/Dalian3.jpg",
        "/images/china/Dalian4.jpg",
      ],
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
          "Assisted the head coach in planning and conducting training sessions for U13 players, strictly applying SL Benfica's training methodology",
          "Responsible for leading warm-ups and creativity-focused exercises during the first 30 minutes of each session",
          "Supported individual player development, providing technical, tactical and psychological guidance",
          "Helped implement training drills, match strategies, and team management under the supervision of senior coaches",
          "Produced weekly video highlights of collective and individual performance for analysis and feedback",
          "Assisted with set-piece preparation, opponent analysis and match-day warm-ups",
          "Participated in national and international tournaments (Spain and France) with selected players from different SL Benfica Football Training Centers (CFTs)",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Provide support during training sessions and match preparation",
          "Guide players in warm-ups, creativity exercises and technical/tactical drills",
          "Analyze opponents and provide insights for tactical planning",
          "Prepare set-piece routines and visual materials for players",
          "Monitor and support player development both individually and collectively",
          "Collaborate with coaching staff to ensure high-performance training standards",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "Achieved 2nd place, tied with 1st, in the AF Braga U13 First Division, often competing against players one year older",
          "Worked with players who progressed to Portuguese youth national teams",
          "Gained experience in a high-performance environment with world-class coaching staff",
          "Developed expertise in individual player development, tactical analysis, and holistic management of elite youth players",
          "Contributed to improving team creativity, cohesion and match performance through tailored exercises and video analysis",
          "Participated in and contributed to team performance in national and international tournaments in Spain and France with selected CFT players",
        ],
      },
    ],
    achievements: [],
    media: {
      photos: [
        "/images/portugal/Benfica1.jpg",
        "/images/portugal/Benfica2.jpg",
      ],
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
          "Assisted in daily training sessions and weekly competitive preparation",
          "Organized and implemented tactical drills aligned with the team's game model",
          "Prepared and managed set-piece files (offensive and defensive situations)",
          "Led pre-match warm-up routines",
          "Supported goalkeepers' training sessions in coordination with the coaching staff",
          "Contributed to tactical organization and team structure during matches",
        ],
      },
      {
        title: "Assistant Coach U17 (Male)",
        icon: "Building",
        items: [
          "Supported the planning and execution of training sessions",
          "Organized tactical exercises and small-sided games",
          "Prepared and reviewed set-piece routines",
          "Led match-day warm-up protocols",
          "Assisted in goalkeeper-specific training activities",
          "Collaborated in tactical adjustments and in-game support",
        ],
      },
      {
        title: "Assistant Coach U16 (Male)",
        icon: "Building",
        items: [
          "Assisted in structuring weekly training plans",
          "Implemented technical and tactical drills during training sessions",
          "Organized attacking and defensive set-piece strategies",
          "Prepared and conducted pre-match warm-ups",
          "Supported goalkeeper development within team training context",
          "Helped reinforce team tactical discipline and positional organization",
        ],
      },
      {
        title: "Assistant Coach U15 (Male)",
        icon: "Building",
        items: [
          "Assisted in training session delivery and exercise management",
          "Organized tactical drills and positional exercises",
          "Prepared set-piece organization files and match-related routines",
          "Led structured warm-up sessions before matches",
          "Supported goalkeeper integration into team tactical work",
          "Contributed to overall team tactical preparation",
        ],
      },
      {
        title: "Head Coach U6 (Male)",
        icon: "Trophy",
        items: [
          "Led and managed the U6 team during a foundational stage of long-term player development",
          "Designed and implemented age-appropriate training sessions focused on coordination, motor skills, and fundamental technical actions",
          "Applied the football methodology of Escola de Futebol Trofintas, ensuring alignment with the club's development philosophy",
          "Introduced basic tactical principles through structured and engaging activities",
          "Promoted discipline, teamwork, and positive behavioural habits from an early age",
          "Organized and supervised team participation in youth football tournaments, including APEF competitions, as well as Easter and Christmas tournaments",
          "Maintained communication with parents regarding player progress and development",
        ],
      },
      {
        title: "Scouter (Youth Academy)",
        icon: "Building",
        items: [
          "Identified and evaluated potential talents for integration into the academy structure",
          "Attended youth matches and tournaments to assess technical, tactical, physical, and psychological profiles",
          "Produced detailed scouting reports to support recruitment decisions",
          "Collaborated with coaching staff to align scouting profiles with the club's game model and development philosophy",
        ],
      },
      {
        title: "Football Analyst – U17 & U18",
        icon: "Building",
        items: [
          "Performed match and training analysis for the U17 and U18 teams (while serving as Assistant Coach)",
          "Prepared video breakdowns of team tactical organization and individual performance",
          "Analyzed opponent structures and key tactical patterns",
          "Supported set-piece analysis and performance feedback sessions",
          "Assisted in translating analytical data into practical training adjustments",
        ],
      },
      {
        title: "Football Analyst – First Team (January – June)",
        icon: "Building",
        items: [
          "Prepared opponent analysis reports and tactical summaries for the coaching staff",
          "Produced video clips highlighting strengths, weaknesses and key match moments",
          "Contributed to performance evaluation processes in a professional competitive environment",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Planning and delivery of training sessions across multiple youth age groups (U6–U18)",
          "Support in competitive match preparation, including tactical organization and game model implementation",
          "Design and management of set-piece strategies (offensive and defensive)",
          "Leadership of structured pre-match warm-up routines",
          "Implementation of technical, tactical, and position-specific drills",
          "Support in goalkeeper training within team sessions",
          "Talent identification and player recruitment evaluation for academy integration",
          "Match and opponent analysis (youth and professional levels)",
          "Preparation of video reports and tactical presentations for coaching staff",
          "Performance feedback and individual player development monitoring",
          "Alignment with club methodology and long-term player development philosophy",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "Secured 1st place in U16 Porto District 1st Division as Assistant Coach, winning the championship",
          "Achieved 2nd place in U18, leading to promotion to the Second National Division (Assistant Coach)",
          "Achieved 2nd place in U17, narrowly missing promotion (Assistant Coach)",
          "Supported the development of players progressing to higher competitive levels",
          "Enhanced the club's scouting and analytical processes through structured reporting and tactical evaluation",
          "Built a strong foundation in long-term youth development and performance analysis, integrating practical coaching with data-driven insights",
        ],
      },
    ],
    achievements: [],
    trophyLinks: [
      { sectionIndex: 9, itemIndex: 0, trophyId: "u16-c" },
      { sectionIndex: 9, itemIndex: 1, trophyId: "u18-vc-promo" },
      { sectionIndex: 9, itemIndex: 2, trophyId: "u17-vc" },
    ],
    media: {
      photos: [
        "/images/portugal/Trofense1.jpg",
        "/images/portugal/Trofense2.jpg",
        "/images/portugal/Trofense3.jpg",
        "/images/portugal/Trofense4.jpg",
      ],
    },
    images: ["portugal-trofense.jpg"],
  },
  {
    id: 8,
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
  {
    id: 9,
    role: "Assistant Coach U13",
    ageGroup: "U13",
    club: "União Desportiva Lavrense",
    location: "Matosinhos, Portugal",
    country: "Portugal",
    startDate: "2010-09",
    endDate: "2011-07",
    period: "September 2010 - July 2011",
    description: "First professional coaching role, assisting in the training and development of the U13 team.",
    isDetailed: true,
    sections: [
      {
        title: "Assistant Coach U13 (Male)",
        icon: "Building",
        items: [
          "Assisted in the training and development of the U13 team in my first professional coaching role",
          "Supported the technical and tactical progression of young players during a key developmental stage",
          "Contributed to creating a positive and structured learning environment",
          "Gained foundational experience in youth football coaching and team management",
        ],
      },
      {
        title: "Key Responsibilities",
        icon: "Building",
        items: [
          "Training session support, including planning assistance and exercise organization",
          "Implementation of technical drills and small-sided games",
          "Individual player feedback and correction",
          "Support in youth player development, both technically and tactically",
          "Assistance in match preparation and game-day organization",
        ],
      },
      {
        title: "Achievements & Impact",
        icon: "Trophy",
        items: [
          "Built the foundation of my coaching career in a competitive youth environment",
          "Contributed to the development of players technical consistency and game understanding",
          "Strengthened my communication and leadership skills within a coaching staff",
        ],
      },
    ],
    achievements: [],
    media: {
      photos: [
        "/images/portugal/Lavrense1.jpg",
      ],
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
      description: "Set pieces are strategic moments of the game — corners, free kicks, throw-ins, goal kicks and penalties.",
      principles: [
        "Organization and detail in every routine",
        "Offensive and defensive intentionality",
        "Corners, free kicks, throw-ins, goal kicks, penalties",
        "Clear competitive advantage opportunities",
      ],
    },
    {
      title: "The 6th Moment — Creativity",
      description: "Within a clear structure, there is space for freedom. Creativity is not imposed — it is empowered.",
      principles: [
        "I provide tools, principles and context",
        "Then I let talent express itself",
        "Freedom to take risks within structure",
        "Creativity is not imposed — it is empowered",
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
      { x: 15, y: 22, position: "LB", number: 5, name: "Left Back" },
      { x: 38, y: 20, position: "CB", number: 3, name: "Center Back (L)" },
      { x: 62, y: 20, position: "CB", number: 4, name: "Center Back (R)" },
      { x: 85, y: 22, position: "RB", number: 2, name: "Right Back" },
      { x: 50, y: 40, position: "CDM", number: 6, name: "Defensive Midfielder" },
      { x: 35, y: 52, position: "CM", number: 10, name: "Central Midfielder (L)" },
      { x: 65, y: 52, position: "CM", number: 8, name: "Central Midfielder (R)" },
      { x: 15, y: 72, position: "LW", number: 11, name: "Left Winger" },
      { x: 50, y: 78, position: "ST", number: 9, name: "Striker" },
      { x: 85, y: 72, position: "RW", number: 7, name: "Right Winger" },
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
      { x: 15, y: 22, position: "LB", number: 5, name: "Left Back" },
      { x: 38, y: 20, position: "CB", number: 3, name: "Center Back (L)" },
      { x: 62, y: 20, position: "CB", number: 4, name: "Center Back (R)" },
      { x: 85, y: 22, position: "RB", number: 2, name: "Right Back" },
      { x: 15, y: 50, position: "LM", number: 11, name: "Left Midfielder" },
      { x: 38, y: 50, position: "CM", number: 6, name: "Central Midfielder (L)" },
      { x: 62, y: 50, position: "CM", number: 8, name: "Central Midfielder (R)" },
      { x: 85, y: 50, position: "RM", number: 7, name: "Right Midfielder" },
      { x: 38, y: 75, position: "ST", number: 10, name: "Striker (L)" },
      { x: 62, y: 75, position: "ST", number: 9, name: "Striker (R)" },
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
      { x: 15, y: 22, position: "LB", number: 5, name: "Left Back" },
      { x: 38, y: 20, position: "CB", number: 3, name: "Center Back (L)" },
      { x: 62, y: 20, position: "CB", number: 4, name: "Center Back (R)" },
      { x: 85, y: 22, position: "RB", number: 2, name: "Right Back" },
      { x: 42, y: 45, position: "CDM", number: 6, name: "Defensive Midfielder (L)" },
      { x: 58, y: 48, position: "CDM", number: 8, name: "Defensive Midfielder (R)" },
      { x: 15, y: 65, position: "LW", number: 11, name: "Left Winger" },
      { x: 50, y: 62, position: "CAM", number: 10, name: "Attacking Midfielder" },
      { x: 85, y: 68, position: "RW", number: 7, name: "Right Winger" },
      { x: 50, y: 82, position: "ST", number: 9, name: "Striker" },
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
  {
    id: "websites",
    title: "Website & CV Creation",
    shortDescription: "Professional websites and digital CVs for clubs and individuals",
    description: "Professional website creation for clubs, academies, businesses and individuals, plus polished CV and digital portfolio design.",
    icon: "Globe",
    features: [
      "Website creation for clubs, academies and businesses",
      "Personal and professional websites for individuals",
      "Professional CV and digital portfolio design",
      "Responsive and mobile-first design",
      "Modern, clean aesthetic inspired by professional standards",
      "Basic maintenance and support included",
    ],
    deliverables: [
      "Fully functional website",
      "Digital CV / Portfolio",
      "Source files delivered",
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
  instagram: "https://www.instagram.com/dan_desousa/",
  facebook: "https://www.facebook.com/danieldesousa05",
  youtube: "",
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
        name: "LongoMatch",
        description: "Professional football video analysis software for match review and performance coding",
        icon: "Video",
        level: "Advanced",
        logo: null,
      },
      {
        name: "Coach Paint",
        description: "Video annotation and telestration tool for presenting tactical concepts to players",
        icon: "Film",
        level: "Regular",
        logo: null,
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
        logo: "https://cdn.simpleicons.org/openai/ffffff",
      },
      {
        name: "Claude AI",
        description: "Advanced AI assistant for in-depth analysis, content creation, and strategic planning",
        icon: "Sparkles",
        level: "Daily Use",
        logo: "https://cdn.simpleicons.org/anthropic/ffffff",
      },
      {
        name: "eASYmUSIC ai",
        description: "AI-powered music tool for creating motivational audio content for training sessions",
        icon: "Bot",
        level: "Regular",
        logo: null,
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
        logo: null,
      },
      {
        name: "Instat",
        description: "Advanced football statistics and performance data for player and team analysis",
        icon: "BarChart",
        level: "Regular",
        logo: null,
      },
      {
        name: "Football Manager",
        description: "Tactical simulation and player development modelling",
        icon: "Target",
        level: "Regular",
        logo: null,
      },
    ],
  },
  {
    category: "Office & Communication",
    tools: [
      {
        name: "Microsoft Office",
        description: "Word, PowerPoint and Excel for reports and presentations",
        icon: "FileText",
        level: "Daily Use",
        logo: "https://cdn.simpleicons.org/microsoftoffice/ffffff",
      },
      {
        name: "Discord",
        description: "Team communication platform for coordinating with staff, players, and coaching networks",
        icon: "MessageSquare",
        level: "Daily Use",
        logo: "https://cdn.simpleicons.org/discord/ffffff",
      },
      {
        name: "TeamSpeak",
        description: "Voice communication tool for real-time coordination during training and analysis sessions",
        icon: "Mic",
        level: "Regular",
        logo: "https://cdn.simpleicons.org/teamspeak/ffffff",
      },
      {
        name: "Skype",
        description: "Video conferencing for remote coaching sessions and international team meetings",
        icon: "Video",
        level: "Regular",
        logo: "https://cdn.simpleicons.org/skype/ffffff",
      },
    ],
  },
];

// ============================================================================
// MEDIA CONTENT
// ============================================================================

export type MediaCategory = "football" | "sports";
export type ArticleType = "opinion" | "analysis" | "tactics" | "development";
export type PressType = "newspaper" | "television" | "online" | "radio";

export interface MediaArticle {
  id: number;
  category: MediaCategory;
  type: ArticleType;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  url: string;
}

export interface PodcastEpisode {
  id: number;
  episodeNumber: number;
  title: string;
  description: string;
  duration: string;
  date: string;
  platforms: { name: string; url: string }[];
  tags: string[];
}

export interface PressAppearance {
  id: number;
  outlet: string;
  type: PressType;
  title: string;
  description: string;
  date: string;
  url: string;
  image?: string;
}

export interface RecommendedChannel {
  id: number;
  name: string;
  description: string;
  url: string;
  platform: "youtube" | "spotify" | "podcast";
  youtubeChannelId?: string;
}

export const mediaContent = {
  // Articles — empty until Daniel publishes his own content
  featuredArticles: [] as MediaArticle[],

  // Podcast — empty until Daniel's own podcast launches
  podcastEpisodes: [] as PodcastEpisode[],

  // Recommended channels (not Daniel's own content)
  recommendedChannels: [
    {
      id: 1,
      name: "The Coaches Voice",
      description: "In-depth interviews and analysis with world-class football managers and coaches.",
      url: "https://www.youtube.com/@TheCoachesVoice",
      platform: "youtube" as const,
      // YouTube channel ID — verify at: https://www.youtube.com/@CoachesVoice (view source → search "channelId")
      youtubeChannelId: "UCRyq4C_X2XgLNUEq49aBhXA",
    },
  ] as RecommendedChannel[],

  pressAppearances: [
    {
      id: 1,
      outlet: "TL News (Tongling)",
      type: "online" as PressType,
      title: "The Foreign Coach's Last Football Lesson",
      description: "Featured in the Tongling local press for my final season at Middle School no.2 and the football programme's community impact.",
      date: "2024-07",
      url: "https://app.tlnews.cn/detailArticle/24332680_68885_tonglingrb.html",
      image: "/images/china/Tongling1.jpg",
    },
    {
      id: 2,
      outlet: "Jornal Record",
      type: "newspaper" as PressType,
      title: "Últimas Notícias de Futebol — Jornal Record",
      description: "O Jornal Record é um dos principais diários desportivos de Portugal. Acompanha as últimas notícias do futebol português e europeu.",
      date: "2026-02",
      url: "https://www.record.pt",
      image: "/images/portugal/Trofense1.jpg",
    },
    {
      id: 3,
      outlet: "A Bola",
      type: "newspaper" as PressType,
      title: "Últimas Notícias — A Bola",
      description: "A Bola é um dos mais antigos diários desportivos de Portugal, com cobertura diária do futebol nacional e internacional.",
      date: "2026-02",
      url: "https://www.abola.pt",
      image: "/images/portugal/Benfica1.jpg",
    },
    {
      id: 4,
      outlet: "O Jogo",
      type: "newspaper" as PressType,
      title: "Últimas Notícias — O Jogo",
      description: "O Jogo é um dos principais jornais desportivos do Porto, com foco no futebol português e europeu.",
      date: "2026-02",
      url: "https://www.ojogo.pt",
      image: "/images/portugal/Trofense3.jpg",
    },
  ] as PressAppearance[],

  otherSportsArticles: [
    {
      id: 101,
      category: "sports" as MediaCategory,
      type: "analysis" as ArticleType,
      title: "UEFA set to probe Real Madrid-Benfica row after Viní Jr racism claims",
      excerpt: "UEFA has opened disciplinary proceedings following Vinícius Jr's claims of racist abuse during the Real Madrid vs Benfica match — a case with wide implications for football governance.",
      date: "2026-02-18",
      readTime: 4,
      tags: ["UEFA", "Football", "Real Madrid"],
      url: "https://www.euronews.com/2026/02/18/uefa-set-to-probe-racism-row-after-real-madrids-vinicius-jr-claims-abuse-in-benfica-match",
    },
    {
      id: 102,
      category: "sports" as MediaCategory,
      type: "opinion" as ArticleType,
      title: "Ex-FIFA chief Sepp Blatter backs calls to boycott World Cup in the US",
      excerpt: "Former FIFA president Sepp Blatter has supported growing calls to boycott the 2026 World Cup in the United States, in a rare public intervention from the disgraced ex-chief.",
      date: "2026-01-27",
      readTime: 3,
      tags: ["FIFA", "World Cup", "Football"],
      url: "https://www.euronews.com/2026/01/27/ex-fifa-president-sepp-blatter-backs-calls-to-boycott-world-cup-in-the-us",
    },
    {
      id: 103,
      category: "sports" as MediaCategory,
      type: "analysis" as ArticleType,
      title: "Norway tops medals count as Milan-Cortina Winter Olympics close in Verona Arena",
      excerpt: "Norway dominated the 2026 Winter Olympics medal table as the Games concluded with a spectacular closing ceremony in Verona, wrapping up two weeks of elite winter sport.",
      date: "2026-02-23",
      readTime: 5,
      tags: ["Winter Olympics", "Norway", "Champions"],
      url: "https://www.euronews.com/2026/02/23/norway-tops-the-medals-count-as-milan-cortina-olympics-close-in-verona-arena",
    },
    {
      id: 104,
      category: "sports" as MediaCategory,
      type: "opinion" as ArticleType,
      title: "Jamaica bobsleigh team continues Cool Runnings legacy at Winter Games",
      excerpt: "The legendary Jamaican bobsleigh team carried their inspiring Cool Runnings tradition forward at the 2026 Milan-Cortina Winter Olympics, capturing hearts worldwide.",
      date: "2026-02-10",
      readTime: 4,
      tags: ["Bobsleigh", "Jamaica", "Winter Olympics"],
      url: "https://www.euronews.com/2026/02/10/jamaica-bobsleigh-team-to-continue-cool-runnings-legacy-at-winter-olympics",
    },
  ] as MediaArticle[],


};
