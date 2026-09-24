const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    duration: "2h 28m",
    genre: ["Sci-Fi", "Action", "Thriller"],
    rating: 8.8,
    certificate: "PG-13",

    poster:
      "https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",

    backdrop:
      "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",

    description:
      "A skilled thief who steals secrets through the use of dream-sharing technology is given the task of planting an idea into the mind of a CEO.",

    director: "Christopher Nolan",

    writers: [
      "Christopher Nolan"
    ],

    cast: [
      {
        name: "Leonardo DiCaprio",
        character: "Cobb",
        image:
          "https://image.tmdb.org/t/p/w300/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg"
      },
      {
        name: "Joseph Gordon-Levitt",
        character: "Arthur",
        image:
          "https://image.tmdb.org/t/p/w300/4U9G4YwTlIEZ3sC8qE8m0Kq0K8N.jpg"
      },
      {
        name: "Elliot Page",
        character: "Ariadne",
        image:
          "https://image.tmdb.org/t/p/w300/gK8i6sR7d5J4Z8x5QK4fL6M9X.jpg"
      },
      {
        name: "Tom Hardy",
        character: "Eames",
        image:
          "https://image.tmdb.org/t/p/w300/5d8K9X8J8m7X8x4V9J8R.jpg"
      }
    ],

    trailer:
      "https://www.youtube.com/embed/YoHD9XEInc0",

    language: "English",

    country: "USA",

    production: "Warner Bros. Pictures",

    similarMovies: [
      {
        id: 2,
        title: "Interstellar",
        year: 2014,
        rating: 8.7,
        genre: "Sci-Fi",
        image:
          "https://image.tmdb.org/t/p/original/i4PpBcuLvdcJwIf3hkcV9QDR1iH.jpg"
      },
      {
        id: 3,
        title: "The Matrix",
        year: 1999,
        rating: 8.7,
        genre: "Sci-Fi",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuouvs1O2Ymqo0f2-9Rs6qt33kHti7lbxrJ1dVtP52sZ2ynQqmNxslxfSG&s=10"
      },
      {
        id: 4,
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        genre: "Action",
        image:
          "https://image.tmdb.org/t/p/original/7yAPPLZpTnPN7qb1qSCNuotQpew.jpg"
      }
    ],

    reviews: [
      {
        user: "Rahul",
        rating: 9,
        comment:
          "One of the most creative science-fiction movies I have watched."
      },
      {
        user: "Aarav",
        rating: 10,
        comment:
          "The story, visuals and music are absolutely amazing."
      }
    ]
  },

  {
    id: 2,
    title: "Interstellar",
    year: 2014,
    duration: "2h 49m",
    genre: ["Sci-Fi", "Drama", "Adventure"],
    rating: 8.7,
    certificate: "PG-13",

    poster:
      "https://image.tmdb.org/t/p/original/i4PpBcuLvdcJwIf3hkcV9QDR1iH.jpg",

    backdrop:
      "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",

    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",

    director: "Christopher Nolan",

    writers: [
      "Jonathan Nolan",
      "Christopher Nolan"
    ],

    cast: [
      {
        name: "Matthew McConaughey",
        character: "Cooper",
        image:
          "https://image.tmdb.org/t/p/w300/8d3C8fE9w8x4L4.jpg"
      },
      {
        name: "Anne Hathaway",
        character: "Brand",
        image:
          "https://image.tmdb.org/t/p/w300/4k8q9L3.jpg"
      },
      {
        name: "Jessica Chastain",
        character: "Murph",
        image:
          "https://image.tmdb.org/t/p/w300/7J8K3.jpg"
      }
    ],

    trailer:
      "https://www.youtube.com/embed/zSWdZVtXT7E",

    language: "English",

    country: "USA",

    production: "Warner Bros. Pictures",

    similarMovies: [
      {
        id: 1,
        title: "Inception",
        year: 2010,
        rating: 8.8,
        genre: "Sci-Fi",
        image:
          "https://image.tmdb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg"
      },
      {
        id: 3,
        title: "The Matrix",
        year: 1999,
        rating: 8.7,
        genre: "Sci-Fi",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuouvs1O2Ymqo0f2-9Rs6qt33kHti7lbxrJ1dVtP52sZ2ynQqmNxslxfSG&s=10"
      }
    ],

    reviews: [
      {
        user: "Priya",
        rating: 10,
        comment:
          "Beautiful visuals and an emotional story."
      },
      {
        user: "Dev",
        rating: 9,
        comment:
          "A fantastic combination of science fiction and drama."
      }
    ]
  }
];

export default movies;