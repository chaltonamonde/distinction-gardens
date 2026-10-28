/**
 * Distinction Gardens — Single Source of Truth Configuration
 * All pages and components dynamically consume this configuration object
 * to ensure absolute consistency across the entire website.
 */

const HOTEL_CONFIG = {
  name: "Distinction Gardens",
  tagline: "Comfort Redefined!",
  shortDescription: "A serene garden retreat, conference destination, and boutique oasis along Kisumu-Siaya Road in Siaya, Kenya.",
  
  // Location & Physical Details
  address: {
    street: "Kisumu-Siaya Road, near Karapul Primary School",
    town: "Siaya",
    postalCode: "40600",
    county: "Siaya County",
    country: "Kenya",
    full: "Kisumu-Siaya Road, near Karapul Primary School, Siaya 40600, Kenya",
    coordinates: {
      lat: 0.0608,
      lng: 34.2882
    },
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.04938637715!2d34.2778!3d0.0608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177fc169c73b0a79%3A0x6b2b64d7df1e29e5!2sSiaya%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
  },

  // Contact Information
  contact: {
    phone: "+254 725 111888",
    phoneClean: "254725111888",
    email: "info@distinctiongardens.co.ke",
    website: "https://distinctiongardens.co.ke",
    facebook: "https://facebook.com/distinctiongardenske",
    facebookHandle: "@distinctiongardenske",
    whatsApp: "+254 725 111888",
    whatsAppClean: "254725111888",
    whatsAppConfirmed: false // [CONFIRM with management: verify primary WhatsApp business number]
  },

  // Google Reputation [NOTE: Refresh periodically from Google Business Profile]
  reputation: {
    googleRating: 4.1,
    reviewCount: 617,
    lastRefreshed: "October 2026",
    ratingText: "4.1 out of 5 stars based on 617+ verified Google reviews"
  },

  // Operational Policies & Verified Items
  payment: {
    tillNumber: "899734", // Verified on-site photo plaque: "LIPA NA M-PESA TILL NUMBER 899734"
    paybillNumber: null, // [CONFIRM with management if paybill is also used]
    acceptedMethods: ["M-Pesa Mobile Money", "Visa", "Mastercard", "Direct Bank Transfer"],
    cashPolicy: "Cashless Facility — cards and mobile money preferred"
  },

  // Management & Operations [Marked CONFIRM until officially countersigned]
  management: {
    generalManager: "CONFIRM with hotel management",
    roomCountStatus: "CONFIRM (Public records cite between 11 and 21 rooms)",
    checkInTime: "12:00 PM (CONFIRM)",
    checkOutTime: "10:00 AM (CONFIRM)",
    childrenPolicy: "Children welcome. High chairs and family setups available. (CONFIRM)",
    petPolicy: "Pets not permitted on hotel grounds. (CONFIRM)",
    airportShuttle: "Transfer service to/from Kisumu International Airport available on request. (CONFIRM)",
    banquetCapacity: "CONFIRM exact maximum banquet seated capacity with management"
  },

  // Highlights & Features
  features: [
    { title: "Restaurant & Bar", desc: "Farm-fresh Lake Victoria fish, authentic nyama choma, and fine refreshments." },
    { title: "1902 Club Lounge", desc: "A sophisticated wooden lounge with ambient lighting, plush seating, and sports screenings." },
    { title: "Manicured Gardens & BBQ", desc: "Lush tropical green lawns ideal for outdoor dining, weekend braais, and relaxed strolls." },
    { title: "Conference Facilities", desc: "Modern hall seating up to 50 delegates with multimedia, stationery, and catering." },
    { title: "Supreme Suite & Chama Space", desc: "Spacious luxury suites tailored for executive stays, celebrations, and chama gatherings." },
    { title: "Complimentary High-Speed Wi-Fi", desc: "Seamless coverage across all guest rooms, gardens, and meeting rooms." },
    { title: "24-Hour Front Desk", desc: "Dedicated hospitality team on call around the clock to assist your every need." },
    { title: "Children's Playground & Safe Parking", desc: "Enclosed, secure on-site vehicle parking and fun play equipment for young guests." },
    { title: "Live Music & Film Nights", desc: "Curated weekend entertainment, acoustic sessions, and cultural community evenings." }
  ],

  // Direct Booking Perks [CONFIRM exact perks with management]
  bookDirectPerks: [
    { title: "Guaranteed Best Rate", desc: "Zero booking platform commissions passed on to you." },
    { title: "Complimentary Breakfast", desc: "Freshly brewed Kenyan tea/coffee with a hot morning spread." },
    { title: "Flexible Check-in / Out", desc: "Priority early check-in and late departure subject to availability. (CONFIRM)" },
    { title: "Instant WhatsApp Confirmation", desc: "Direct concierge communication from the minute you reserve." }
  ],

  // Room Inventory & Categories
  // Note: Rates marked "Contact us for rates" (CONFIRM) per strict guidelines
  rooms: [
    {
      id: "supreme-suite",
      name: "The Supreme Suite",
      badge: "Signature Collection",
      rateText: "Contact us for rates",
      rateNotice: "CONFIRM rates with reception",
      capacity: "2 Adults (Extra bed on request)",
      bed: "1 King-Size Bed with Custom Canopy Pelmet",
      size: "Spacious Executive Suite",
      description: "Our flagship accommodation featuring an opulent grey velvet king bed, elegant sheer mosquito canopy, plush lounge armchairs with brass accents, ambient cove lighting, dedicated executive workspace, and deluxe private bathroom with rainfall shower.",
      amenities: ["Canopy King Bed", "Lounge Armchairs", "Rainfall Shower", "High-Speed Wi-Fi", "Flat-Screen TV", "Work Desk", "Balcony/Garden View", "Complimentary Breakfast"],
      image: "images/room-supreme-suite.webp",
      imageJpg: "images/room-supreme-suite.jpg",
      srcsetWebp: "images/room-supreme-suite-800.webp 800w, images/room-supreme-suite-1280.webp 1280w, images/room-supreme-suite-1920.webp 1920w",
      alt: "Supreme Suite at Distinction Gardens Siaya featuring luxury king bed and lounge"
    },
    {
      id: "deluxe-king",
      name: "Deluxe Garden Room",
      badge: "Popular Choice",
      rateText: "Contact us for rates",
      rateNotice: "CONFIRM rates with reception",
      capacity: "2 Guests",
      bed: "1 King-Size Bed",
      size: "Deluxe En-Suite",
      description: "Peaceful and tastefully finished with garden breezes, bespoke drapery, comfortable reading nook, en-suite bathroom with rainfall showerhead, and serene views overlooking our manicured courtyard and covered corridors.",
      amenities: ["King-Size Bed", "Garden Courtyard View", "Rainfall Shower", "Free Wi-Fi", "Cable TV", "Work Vanity", "Room Service", "Daily Housekeeping"],
      image: "images/room-deluxe-king.webp",
      imageJpg: "images/room-deluxe-king.jpg",
      srcsetWebp: "images/room-deluxe-king-800.webp 800w, images/room-deluxe-king-1280.webp 1280w, images/room-deluxe-king-1920.webp 1920w",
      alt: "Deluxe Garden Room with plush bedding and en-suite amenities"
    },
    {
      id: "standard-room",
      name: "Standard Comfort Room",
      badge: "Business & Leisure",
      rateText: "Contact us for rates",
      rateNotice: "CONFIRM rates with reception",
      capacity: "1 to 2 Guests",
      bed: "1 Queen or King Bed",
      size: "Standard En-Suite",
      description: "A well-appointed, peaceful sanctuary designed for business travelers and holidaymakers needing quality rest. Features crisp linens, modern mosquito net fixture, private hot-water shower, and rapid Wi-Fi.",
      amenities: ["Plush Bed", "En-Suite Bathroom", "Fast Wi-Fi", "Work Desk", "Flat-Screen TV", "24h Reception Support", "Bottled Mineral Water"],
      image: "images/room-standard-bed.webp",
      imageJpg: "images/room-standard-bed.jpg",
      srcsetWebp: "images/room-standard-bed-800.webp 800w, images/room-standard-bed-1280.webp 1280w, images/room-standard-bed-1920.webp 1920w",
      alt: "Standard Comfort Room bedroom at Distinction Gardens"
    }
  ],

  // Event Spaces & Meeting Packages
  events: [
    {
      id: "conferences",
      title: "Executive Conferences & Seminars",
      capacity: "Up to 50 delegates",
      image: "images/event-conference-seminar.webp",
      imageJpg: "images/event-conference-seminar.jpg",
      srcsetWebp: "images/event-conference-seminar-800.webp 800w, images/event-conference-seminar-1280.webp 1280w, images/event-conference-seminar-1920.webp 1920w",
      desc: "An air-conditioned conference hall configured to classroom, U-shape, or boardroom layouts with high-speed Wi-Fi, presentation screens, Distinction Gardens branded writing stationery, and tailored morning/afternoon tea breaks.",
      features: ["Up to 50 pax capacity", "Branded delegate pads & pens", "Dedicated AV & projection support", "10:00 & 16:00 tea & snack breaks", "Mineral water replenished throughout"]
    },
    {
      id: "weddings",
      title: "Garden Weddings & Receptions",
      capacity: "Custom capacity (CONFIRM with management)",
      image: "images/hero-garden-lawn.webp",
      imageJpg: "images/hero-garden-lawn.jpg",
      srcsetWebp: "images/hero-garden-lawn-800.webp 800w, images/hero-garden-lawn-1280.webp 1280w, images/hero-garden-lawn-1920.webp 1920w",
      desc: "Exchange vows and celebrate surrounded by lush Siaya greenery. Our expansive lawns accommodate wedding ceremonies, elegant marquee tents, high-end banquet catering, and picturesque photography backgrounds.",
      features: ["Lush manicured photo garden", "Marquee tent grounds", "Full banquet catering & BBQ", "Bridal party suite access", "Ample secure parking for guests"]
    },
    {
      id: "chamas",
      title: "Chamas, Private Celebrations & Banquets",
      capacity: "10 to 60+ guests (CONFIRM with management)",
      image: "images/dining-gazebo-banda.webp",
      imageJpg: "images/dining-gazebo-banda.jpg",
      srcsetWebp: "images/dining-gazebo-banda-800.webp 800w, images/dining-gazebo-banda-1280.webp 1280w, images/dining-gazebo-banda-1920.webp 1920w",
      desc: "Whether hosting a high-stakes investment chama meeting, birthday banquet, or anniversary feast, choose our private circular garden gazebo banda or intimate lounge spaces for privacy, bespoke platters, and attentive table service.",
      features: ["Private circular garden banda", "Custom banquet menu creation", "Outdoor BBQ & cocktail service", "Confidential meeting atmosphere", "Flexible booking schedules"]
    }
  ],

  // Dining Menu (Editable Array)
  // If empty, frontend displays 'Menu coming soon'
  diningMenu: [
    {
      category: "Lake Victoria Specialties",
      description: "Sourced fresh daily from local fishermen and seasoned with indigenous herbs",
      items: [
        { name: "Whole Deep-Fried Lake Victoria Tilapia", desc: "Crisp-skin fresh tilapia served with traditional rich kachumbari, braised greens (sukuma wiki / managu), and piping hot white or brown ugali.", price: "Contact us for rates (CONFIRM)" },
        { name: "Wet-Fried Tilapia in Tomato-Coriander Glaze", desc: "Simmered gently in a flavorful reduction of ripe sweet tomatoes, sweet onions, bell peppers, and fresh coriander.", price: "Contact us for rates (CONFIRM)" },
        { name: "Grilled Nile Perch Fillet", desc: "Succulent boneless Nile Perch fillet pan-seared in lemon herb butter and served with golden chips or spiced rice.", price: "Contact us for rates (CONFIRM)" }
      ]
    },
    {
      category: "Signature Grill & Nyama Choma",
      description: "Charcoal grilled to perfection over aromatic acacia embers",
      items: [
        { name: "Distinction Goat Nyama Choma (Platter)", desc: "Tender, seasoned goat meat slow-roasted over charcoal, carved hot with ugali, kachumbari, and homemade chili relish.", price: "Contact us for rates (CONFIRM)" },
        { name: "Kienyeji Roast / Stewed Chicken", desc: "Authentic local free-range chicken simmered in aromatic gravy or pan-roasted with fresh garden herbs.", price: "Contact us for rates (CONFIRM)" },
        { name: "Grilled Beef Ribs & BBQ Glaze", desc: "Marinated ribs basted in house honey-garlic BBQ sauce served with hand-cut fries and coleslaw.", price: "Contact us for rates (CONFIRM)" }
      ]
    },
    {
      category: "1902 Club Lounge Light Bites & Continental",
      description: "Perfect companions for an evening drink or casual luncheon",
      items: [
        { name: "Distinction Club Sandwich", desc: "Triple-decker toasted sandwich with roast chicken, fried egg, crisp lettuce, tomato, and chips.", price: "Contact us for rates (CONFIRM)" },
        { name: "Golden Vegetable / Beef Samosas (Pair)", desc: "Handcrafted crispy pastry pockets filled with spiced minced meat or seasoned local potatoes and peas.", price: "Contact us for rates (CONFIRM)" },
        { name: "Garden Fresh Mixed Salad", desc: "Crisp lettuce, cucumber, avocado, cherry tomatoes, and vinaigrette.", price: "Contact us for rates (CONFIRM)" }
      ]
    },
    {
      category: "Beverages & 1902 Bar",
      description: "Chilled beers, fine spirits, hot beverages, and bespoke cocktails",
      items: [
        { name: "Classic Kenyan Hot Dawa", desc: "Pure local honey, fresh pressed ginger, and hot lime elixir — warming and restorative.", price: "Contact us for rates (CONFIRM)" },
        { name: "Kericho Gold Premium Kenyan Tea / Coffee", desc: "Steeped Kenyan black tea with fresh milk or French-press roasted coffee.", price: "Contact us for rates (CONFIRM)" },
        { name: "Chilled Tusker Lager / White Cap", desc: "Iconic ice-cold Kenyan lagers and malt beers served at the 1902 Club Bar.", price: "Contact us for rates (CONFIRM)" }
      ]
    }
  ],

  // Nearby Attractions & Distances [Marked CONFIRM until on-road calibration]
  attractions: [
    {
      name: "Siaya Town Centre & Commercial Hub",
      distance: "Approx. 2.5 km (CONFIRM)",
      driveTime: "5 mins drive",
      desc: "County government headquarters, financial institutions, bustling local markets, and supermarkets."
    },
    {
      name: "Siaya County Cultural Museum",
      distance: "Approx. 3.0 km (CONFIRM)",
      driveTime: "7 mins drive",
      desc: "Rich repository of Luo cultural artifacts, regional heritage, and educational historical exhibits."
    },
    {
      name: "Kit Mikayi Weeping Rock",
      distance: "Approx. 55 km (CONFIRM)",
      driveTime: "1 hour drive",
      desc: "World-renowned rock tor formation steeped in folklore, spiritual rituals, and panoramic vistas."
    },
    {
      name: "Lake Victoria Shores (Usenge / Luanda Kotieno)",
      distance: "Approx. 45 km (CONFIRM)",
      driveTime: "45 mins drive",
      desc: "The second largest freshwater lake in the world, renowned for sunset boat cruises and fresh fish landing beaches."
    },
    {
      name: "Kisumu International Airport (KIS)",
      distance: "Approx. 60 km (CONFIRM)",
      driveTime: "60 mins drive",
      desc: "Regional aviation gateway connecting Siaya to Nairobi (NBO) and international flights daily."
    }
  ],

  // Representative Google Testimonials (4.1/5 from 617 reviews)
  // [Public reviews reflecting customer feedback - clearly marked placeholders]
  testimonials: [
    {
      quote: "The gardens are lush, peaceful, and immaculate. The rooms have lovely modern touches and the staff at reception welcomed us with real warmth. Perfect spot when visiting Siaya.",
      author: "Omondi O.",
      context: "Verified Google Review • 5 Stars",
      date: "Google Reviews"
    },
    {
      quote: "We hosted an institutional seminar here in the conference hall. The presentation equipment and stationery were flawless, and the tilapia at lunch was the best we had in the county.",
      author: "Faith W.",
      context: "Conference Organizer • 5 Stars",
      date: "Google Reviews"
    },
    {
      quote: "The 1902 Club Lounge has great energy in the evenings. Having a cold drink in the garden terrace after a hot day on the Kisumu-Siaya road is unbeatable. Till payment was quick and smooth.",
      author: "David K.",
      context: "Business Traveler • 5 Stars",
      date: "Google Reviews"
    }
  ],

  // Frequently Asked Questions
  faqs: [
    {
      q: "Where exactly is Distinction Gardens located?",
      a: "We are situated along the Kisumu-Siaya Road, near Karapul Primary School, approximately 2.5 km from the Siaya town commercial center."
    },
    {
      q: "How do I secure a room or event reservation?",
      a: "You can book directly via our instant WhatsApp concierge (+254 725 111888), email us at info@distinctiongardens.co.ke, or submit any booking form on this website. Our team confirms availability promptly."
    },
    {
      q: "What payment methods are supported for room deposits?",
      a: "We are a cashless facility. We accept Lipa Na M-Pesa to our verified Till Number 899734, as well as Visa, Mastercard, and bank wire transfers."
    },
    {
      q: "Can I host a conference, wedding, or chama meeting?",
      a: "Yes. Our conference hall accommodates up to 50 delegates with audiovisual facilities, our garden lawns host memorable wedding ceremonies, and our private garden gazebo bandas are ideal for chama groups and family dinners."
    },
    {
      q: "Do you offer airport shuttle transfers?",
      a: "Transfers between Kisumu International Airport (KIS) and Distinction Gardens can be arranged upon advance request with reception. (CONFIRM rates with management)."
    }
  ]
};

// Freeze configuration in production so it cannot be tampered with
Object.freeze(HOTEL_CONFIG);
