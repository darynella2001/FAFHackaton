
const Images = [
    { image: require("../assets/1.jpg") },
    { image: require("../assets/2.jpg") },
    { image: require("../assets/3.jpg") },
    { image: require("../assets/4.jpg") },
];
export const data = [
        {
            id: '1',
          coordinate: {
            latitude: 47.054810,
            longitude: 28.856370,
          },
          title: "Amazing Food Place",
          description: "This is the best food place",
          image: Images[0].image,
          reviews: 99,
          categories: ['Restaurant', 'Hotel', 'Dineout'],

        },
        {
            id:'2',
          coordinate: {
            latitude: 47.032096,
            longitude: 28.848676,
          },
          title: "Second Amazing Food Place",
          description: "This is the second best food place",
          image: Images[1].image,
          reviews: 102,
          categories: ['Restaurant', 'Fastfood Center', 'Snacks Corner'],

        },
        {
            id: '3',
          coordinate: {
            latitude: 47.019188,
            longitude: 28.809373,
          },
          title: "Third Amazing Food Place",
          description: "This is the third best food place",
          image: Images[2].image,
          reviews: 220,
          categories: ['Restaurant', 'Hotel', 'Dineout'],

        },
        {
            id: '4',
          coordinate: {
            latitude: 47.001048,
            longitude: 28.851287,
          },
          title: "Fourth Amazing Food Place",
          description: "This is the fourth best food place",
          image: Images[3].image,
          reviews: 48,
          categories: ['Restaurant', 'Fastfood Center', 'Snacks Corner'],

        },
        {
            id: '5',
          coordinate: {
            latitude: 47.033373,
            longitude: 28.856237,
          },
          title: "Fifth Amazing Food Place",
          description: "This is the fifth best food place",
          image: Images[3].image,
          reviews: 178,
          categories: ['Restaurant', 'Hotel', 'Dineout'],

        },
    ];