/**
 * Personal Trainers HK (PTHK) - Comprehensive Data Store
 * Brand Profile: @personaltrainershk
 */

const PTHK_DATA = {
  brand: {
    name: "PTHK | Personal Trainers Hong Kong",
    handle: "@personaltrainershk",
    instagramUrl: "https://www.instagram.com/personaltrainershk/",
    tagline: "Hong Kong's Elite Personal Training & Fitness Network",
    phone: "+852 9123 4567",
    whatsappNumber: "85291234567",
    email: "contact@personaltrainershk.com",
    locations: ["Central", "Wan Chai", "Tsim Sha Tsui", "Causeway Bay", "Mid-Levels", "Private Studio / Home / Online"]
  },

  trainers: [
    {
      id: "marcus-vance",
      name: "Marcus Vance",
      title: "Master Strength & Hypertrophy Coach",
      discipline: "strength",
      image: "assets/images/trainer-marcus.jpg",
      experience: "11+ Years",
      rating: 4.98,
      reviewsCount: 142,
      transformationsCount: 88,
      rateHKD: 1100,
      rateUSD: 140,
      certifications: ["CSCS", "NASM Master Trainer", "EXOS Performance", "Precision Nutrition L2"],
      locations: ["Central", "Mid-Levels"],
      gender: "male",
      bio: "Former collegiate athlete specializing in maximum muscle hypertrophy, powerlifting mechanics, and rapid body recomposition for HK corporate executives.",
      specialties: ["Hypertrophy & Shred", "Biomechanics & Heavy Lifts", "Metabolic Conditioning"],
      quote: "Discipline is the bridge between your fitness ambition and undeniable physical transformation.",
      badge: "Top Rated 2026"
    },
    {
      id: "sarah-chen",
      name: "Sarah Chen",
      title: "Boutique Sculpt & Metabolic Specialist",
      discipline: "fatloss",
      image: "assets/images/trainer-sarah.jpg",
      experience: "8+ Years",
      rating: 4.96,
      reviewsCount: 129,
      transformationsCount: 76,
      rateHKD: 1050,
      rateUSD: 135,
      certifications: ["ACE-CPT", "NASM Women's Fitness", "PN Nutritionist", "Pre/Post-Natal Certified"],
      locations: ["Central", "Wan Chai", "Causeway Bay"],
      gender: "female",
      bio: "Dedicated to female fat loss, glute hypertrophy, and sustainable metabolic health with zero starvation diets. Fluent in English and Cantonese.",
      specialties: ["Female Body Sculpting", "Glute Specialization", "Hormonal Balance & Diet"],
      quote: "We don't shrink ourselves to fit standards; we build strength to dominate our lives.",
      badge: "Client Choice"
    },
    {
      id: "alex-reyes",
      name: "Alex Reyes",
      title: "Pro Fight & Athletic Conditioning Coach",
      discipline: "boxing",
      image: "assets/images/trainer-alex.jpg",
      experience: "9+ Years",
      rating: 4.95,
      reviewsCount: 98,
      transformationsCount: 64,
      rateHKD: 1000,
      rateUSD: 128,
      certifications: ["WBC Certified Muay Thai & Boxing", "ISSA Master PT", "TRX High-Performance"],
      locations: ["Tsim Sha Tsui", "Central"],
      gender: "female",
      bio: "High-octane boxing, Muay Thai padwork, and athletic cardiovascular endurance coach. Transforms cardio workouts into an addictive adrenaline rush.",
      specialties: ["Combat Conditioning", "Explosive Power", "Extreme Fat Shredding"],
      quote: "Every round makes you tougher. When you train like a warrior, your body has no choice but to adapt.",
      badge: "High Energy"
    },
    {
      id: "kenji-tanaka",
      name: "Kenji Tanaka",
      title: "Senior Postural Rehab & Mobility Specialist",
      discipline: "rehab",
      image: "assets/images/trainer-kenji.jpg",
      experience: "12+ Years",
      rating: 4.99,
      reviewsCount: 165,
      transformationsCount: 92,
      rateHKD: 1200,
      rateUSD: 155,
      certifications: ["BSc Sports Science", "FMS L2", "PRI Postural Restoration", "NASM-CES Corrective Specialist"],
      locations: ["Central", "Mid-Levels", "In-Home"],
      gender: "male",
      bio: "Hong Kong's premier specialist in eradicating desk-bound chronic back, shoulder, and knee pain while rebuilding functional joint mobility.",
      specialties: ["Spine & Joint Alignment", "Corrective Exercise", "Pain-Free Functional Strength"],
      quote: "First move well, then move often. Longevity and pain-free living are the ultimate luxury.",
      badge: "Rehab Expert"
    },
    {
      id: "elena-koval",
      name: "Elena Koval",
      title: "Elite HIIT & Physique Recomp Coach",
      discipline: "fatloss",
      image: "assets/images/trainer-elena.jpg",
      experience: "7+ Years",
      rating: 4.94,
      reviewsCount: 84,
      transformationsCount: 58,
      rateHKD: 980,
      rateUSD: 125,
      certifications: ["NASM-CPT", "CrossFit L2", "Poliquin BioSignature", "Kettlebell Master"],
      locations: ["Wan Chai", "Causeway Bay", "TST"],
      gender: "female",
      bio: "Pioneering high-density functional metabolic resistance training (MRT). Known for rapid body recomposition in time-crunched executives.",
      specialties: ["Metabolic Resistance", "High-Density Circuits", "Kettlebell & Functional Plyo"],
      quote: "Intensity creates progress. Give me 45 focused minutes, and I will reshape your limits.",
      badge: "Rapid Recomp"
    }
  ],

  programs: [
    {
      id: "metamorphosis",
      badge: "Flagship Protocol",
      title: "12-Week Metamorphosis",
      target: "Total Body Recomposition & Hypertrophy",
      duration: "12 Weeks (36 Sessions)",
      priceHKD: "34,200 HKD",
      priceUSD: "$4,380 USD",
      features: [
        "3x Weekly 1-on-1 Elite In-Gym Personal Training",
        "Comprehensive InBody & 3D Posture Biomechanics Scan",
        "Personalized Metabolic Macro & Chef-Grade Meal Guide",
        "Weekly DEXA/Bodyfat Adjustments & Direct Coach WhatsApp",
        "VIP Access to Partner Boutiques across Central & TST"
      ],
      popular: true
    },
    {
      id: "executive-shred",
      badge: "Hong Kong Best Seller",
      title: "Executive Rapid Shred",
      target: "Fat Loss for Busy Finance & Tech Professionals",
      duration: "8 Weeks (24 Sessions)",
      priceHKD: "23,800 HKD",
      priceUSD: "$3,050 USD",
      features: [
        "Time-Optimized 45-Min High Density Workouts",
        "Travel & Hotel Workout Protocol for Business Trips",
        "Dining Out & HK Restaurant Survival Strategy Guide",
        "Sleep, Stress & Cortisol Optimization Matrix",
        "Dedicated VIP Concierge Support"
      ],
      popular: false
    },
    {
      id: "rehab-longevity",
      badge: "Medical & Orthopedic Grade",
      title: "Postural Reset & Sports Longevity",
      target: "Pain Eradication, Spine Decompression & Mobility",
      duration: "10 Weeks (20 Sessions)",
      priceHKD: "22,500 HKD",
      priceUSD: "$2,880 USD",
      features: [
        "Full Functional Movement Screen (FMS) Diagnostic",
        "Chronic Neck/Lower Back Desk Syndrome Correction",
        "Joint Capsule Mobility & Deep Core Activation",
        "Corrective Resistance Loading for Pain-Free Lifting",
        "Collaboration with Physiotherapists & Osteopaths"
      ],
      popular: false
    },
    {
      id: "hybrid-concierge",
      badge: "Ultra Flexibility",
      title: "PTHK Hybrid VIP Coaching",
      target: "In-Person Mastery + 24/7 Global Digital Coaching",
      duration: "Ongoing Monthly (8 Sessions/mo)",
      priceHKD: "8,900 HKD/mo",
      priceUSD: "$1,140 USD/mo",
      features: [
        "2x Weekly In-Gym Private Sessions + Digital Workouts",
        "Custom PTHK Training Mobile App with Video Form Review",
        "Daily Nutrition Audits & Real-Time WhatsApp Accountability",
        "Flexible Session Rescheduling (Ideal for dynamic schedules)",
        "Exclusive #PTHK Collective Network Perks & Gym Passes"
      ],
      popular: false
    }
  ],

  transformations: [
    {
      id: "david-wong",
      name: "David W. (Managing Director, Central)",
      trainer: "Marcus Vance",
      duration: "16 Weeks",
      fatLoss: "-14.2 kg Fat",
      muscleGain: "+4.5 kg Lean Mass",
      bodyFatChange: "26% → 11.5%",
      testimonial: "Working in investment banking, 70-hour weeks destroyed my health. PTHK paired me with Marcus who built a precise plan around my crazy schedule. I'm in the best shape of my life at 41.",
      image: "assets/images/transformation-split.jpg",
      tags: ["Fat Loss", "Executive", "Central Gym"]
    },
    {
      id: "chloe-lee",
      name: "Chloe L. (Creative Director, Wan Chai)",
      trainer: "Sarah Chen",
      duration: "12 Weeks",
      fatLoss: "-8.5 kg Fat",
      muscleGain: "+2.8 kg Toned Muscle",
      bodyFatChange: "28% → 18.2%",
      testimonial: "Sarah changed my entire relationship with food and lifting heavy. I used to do endless cardio with no results. Now I feel strong, confident, and sculpted.",
      image: "assets/images/transformation-split.jpg",
      tags: ["Glute Sculpt", "Fat Loss", "Wan Chai Studio"]
    },
    {
      id: "james-tan",
      name: "James T. (Tech Founder, Mid-Levels)",
      trainer: "Kenji Tanaka",
      duration: "14 Weeks",
      fatLoss: "-10 kg Fat",
      muscleGain: "+6 kg Muscle",
      bodyFatChange: "24% → 13%",
      testimonial: "After a disc herniation, I feared touching weights. Kenji not only eliminated my back pain within 4 weeks but built me up to a 160kg pain-free deadlift.",
      image: "assets/images/transformation-split.jpg",
      tags: ["Rehab & Strength", "Pain-Free", "Mid-Levels"]
    }
  ],

  instagramPosts: [
    {
      id: "ig-1",
      likes: "1,248",
      comments: "94",
      tag: "#PTHK Form Guide",
      caption: "Stop rounding your thoracic spine on RDLs. Here is how @marcusvance coaches hip hinge tension for maximum hamstring and glute recruitment.",
      handle: "@personaltrainershk"
    },
    {
      id: "ig-2",
      likes: "2,094",
      comments: "148",
      tag: "#PTHK Transformation",
      caption: "16 Weeks. -14.2kg. Zero starvation. Consistency beats intensity when precision coaching is applied. DM us 'TRANSFORM' to claim your consultation.",
      handle: "@personaltrainershk"
    },
    {
      id: "ig-3",
      likes: "956",
      comments: "62",
      tag: "#PTHK Boxing & HIIT",
      caption: "High tempo padwork drill with coach @alex_reyes at our TST flagship partner gym. Torch 800+ calories while learning genuine combat mechanics.",
      handle: "@personaltrainershk"
    },
    {
      id: "ig-4",
      likes: "1,670",
      comments: "112",
      tag: "#PTHK Mobility Hack",
      caption: "Sitting for 8+ hours in Central? Try this 3-minute hip flexor & psoas decompression sequence before your evening workout.",
      handle: "@personaltrainershk"
    }
  ],

  faqs: [
    {
      question: "How does the PTHK personal trainer matchmaking work?",
      answer: "We analyze your specific physical goals (fat loss, muscle gain, posture rehab, boxing), preferred training location across Hong Kong (Central, Wan Chai, TST, Causeway Bay or Private), schedule, and coach personality style. We then pair you with our certified top 1% specialist coach who holds an unmatched track record in your exact objective."
    },
    {
      question: "Where do training sessions take place in Hong Kong?",
      answer: "We operate out of premier, private boutique fitness facilities and partner studios in Central, Wan Chai, TST, Mid-Levels, and Causeway Bay. We also offer in-home private training at luxury residential clubhouses and hybrid online coaching."
    },
    {
      question: "What qualifications do PTHK certified coaches hold?",
      answer: "Every coach in the PTHK collective is rigorously vetted. They hold internationally accredited certifications (NASM, CSCS, ACE, EXOS, Poliquin), minimum 5+ years of verified coaching experience, insured coverage, and CPR/AED certifications."
    },
    {
      question: "How are nutrition and diet plans handled?",
      answer: "No generic PDF templates. Your assigned coach designs a custom macronutrient and meal roadmap customized to your metabolic rate, lifestyle, whether you cook or eat at Hong Kong restaurants, and social commitments."
    },
    {
      question: "I am a personal trainer or gym owner in HK. How do I join the #PTHK Collective?",
      answer: "We actively welcome elite coaches and boutique fitness studios. Click 'Join as a Trainer' in the navigation bar to submit your credentials, portfolio, and transformation case studies for review by our admissions board."
    }
  ]
};

// Export to window
if (typeof window !== 'undefined') {
  window.PTHK_DATA = PTHK_DATA;
}
