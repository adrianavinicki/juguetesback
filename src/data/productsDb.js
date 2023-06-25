const listProducts = [
  {
    id: 1001,
    name: "Peluche de osito",
    brand: "Juguetelandia",
    category: "Peluches",
    minimun_age: 3,
    description: "Un adorable peluche de osito marrón con una bufanda roja.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdxjgX_Wu5dfBDX5m9YGH12YZ4LisG8q3pEg&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 2999,
  },
  {
    id: 1002,
    name: "Set de lego clásico",
    brand: "LEGO",
    category: "Bloques de construcción",
    minimun_age: 5,
    description:
      "Un set de bloques de construcción LEGO clásicos para construir diferentes estructuras.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsbp4765aENZ5WnZRjDlSgigsy3_8_Q8QcCVr-omKgWSMtsnZlEps8cetju0tiXN9ysNk&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 5999,
  },
  {
    id: 1003,
    name: "Muñeca Barbie",
    brand: "Mattel",
    category: "Muñecas",
    minimun_age: 4,
    description: "Una muñeca Barbie con ropa elegante y accesorios.",
    image:
      "https://m.media-amazon.com/images/I/61ZvnbbbfdL._AC_UF894,1000_QL80_.jpg",
    product_status: true,
    quantity: 2000,
    price: 9999,
  },
  {
    id: 1004,
    name: "Camión de bomberos de juguete",
    brand: "ToysRUs",
    category: "Vehículos",
    minimun_age: 3,
    description:
      "Un camión de bomberos de juguete con luces y sonidos realistas.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAdTKo6TOfY51by5TGHCj7pQhlq7kpguoPHQ&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 8999,
  },
  {
    id: 1005,
    name: "Pelota de fútbol",
    brand: "SportsWorld",
    category: "Deportes",
    minimun_age: 6,
    description: "Una pelota de fútbol de tamaño estándar con diseño colorido.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToLtZNuCiWSCZQKw3JwAHP1gJJYRnvkZZbwwt5k2Xx5H-uAxsTjsY-EG-i7-AMaQXQZ9c&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 2499,
  },
  {
    id: 1006,
    name: "Puzzle de animales",
    brand: "Toyland",
    category: "Puzzles",
    minimun_age: 4,
    description: "Un puzzle de 100 piezas con ilustraciones de animales.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4kx8UICMPlClIVLqpbLkQ42kuzHvXX_K7lrR-FYeWnjnF8jukCJIPdHMEmREv-4_J408&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 1999,
  },
  {
    id: 1007,
    name: "Kit de experimentos científicos",
    brand: "ScienceKids",
    category: "Ciencia",
    minimun_age: 8,
    description:
      "Un kit de experimentos científicos para aprender y divertirse.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQukLij0hFUkDdh7kL6qSbAg3LZDU6FhurZY4zMOrKtped6ngL2DP2atpgps-J5wUH14nE&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 3999,
  },
  {
    id: 1008,
    name: "Cocina de juguete",
    brand: "Playtime",
    category: "Imitación",
    minimun_age: 2,
    description:
      "Una cocina de juguete con utensilios y accesorios para jugar a ser chef.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgutQ9hONo_tlf35fKVWekPtpe6So7_ZQkAQ&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 11999,
  },
  {
    id: 1009,
    name: "Lego City - Estación de Policía",
    brand: "LEGO",
    category: "Bloques de construcción",
    minimun_age: 5,
    description:
      "Construye una estación de policía con los bloques de construcción LEGO, incluye vehículos y figuras de policías.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR966ukW5XMpLHIumMLi4nm7EY4hDBGsUoyweB7nrm-Ekdt-Yu4qd24RRGjcayOoWI9t8M&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 10999,
  },
  {
    id: 1010,
    name: "Muñeca bebé llorona",
    brand: "Berjuan",
    category: "Muñecas",
    minimun_age: 3,
    description:
      "Muñeca de bebé que llora lágrimas de verdad y emite sonidos de llanto al moverla o inclinarla.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2V7bPq6p1pc6rF60QLgDijfnxQ7miOl-dbA&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 13999,
  },
  {
    id: 1011,
    name: "Pistola Nerf Elite Disruptor",
    brand: "Nerf",
    category: "Juegos de exterior",
    minimun_age: 8,
    description:
      "Pistola de juguete que dispara dardos de espuma hasta 27 metros de distancia, incluye 6 dardos.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxBb2SxlbTpsJu8mwlsaXgSQ3G67Q0Xvkge3SKjS1ls1z60U7P_eZYlrjOuGImbs4H4SA&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 2450,
  },
  {
    id: 1012,
    name: "Juego de mesa Monopoly",
    brand: "Hasbro",
    category: "Juegos de mesa",
    minimun_age: 8,
    description:
      "Juego de mesa clásico de negociación y compraventa de propiedades, incluye fichas y dinero en efectivo.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjefDsnxwZ9Qo0SrJjuqgg8QoluCHClGsQbg&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 6500,
  },
  {
    id: 1013,
    name: "Robot educativo mBot",
    brand: "Makeblock",
    category: "Robótica",
    minimun_age: 8,
    description:
      "Robot educativo para niños que pueden programar y controlar con una tableta o smartphone, incluye sensores y módulos.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxJb6oAkmTgwLvcLNYd4PMCTn7uhFCDCXLA&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 7800,
  },
  {
    id: 1014,
    name: "Set de peluquería de juguete",
    brand: "Barbie",
    category: "Juegos de imitación",
    minimun_age: 3,
    description:
      "Set de peluquería de juguete con secador, cepillos y accesorios de belleza para que los niños jueguen a ser peluqueros.",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_703800-MLA54247359908_032023-V.jpg",
    product_status: true,
    quantity: 2000,
    price: 12500,
  },
  {
    id: 1015,
    name: "Set de construcción de robots",
    brand: "Meccano",
    category: "Robótica",
    minimun_age: 10,
    description:
      "Set de construcción de robots de juguete con piezas y herramientas para construir robots móviles y programables.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhwSQ9b8W3pOuVgkOVjvL_ZSLwqYQ98Bjohw&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 9999,
  },
  {
    id: 1016,
    name: "Lego Classic Creative Bricks",
    brand: "LEGO",
    category: "Bloques de construcción",
    minimun_age: 4,
    description:
      "Un set de bloques de construcción clásicos de LEGO que fomenta la creatividad y la imaginación.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXQLoa_XoNmD4QSd2Kmcl1GiZvmc3gg2hlTg&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 15000,
  },
  {
    id: 1017,
    name: "Barbie Dreamhouse",
    brand: "Mattel",
    category: "Muñecas",
    minimun_age: 4,
    description:
      "La casa de ensueño de Barbie con múltiples habitaciones, accesorios y funciones interactivas.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMRjKJsxEhdYtYWhOEtNi-cYaW8N99teDlBg&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 11500,
  },
  {
    id: 1018,
    name: "Coche de control remoto",
    brand: "ToyZone",
    category: "Vehículos",
    minimun_age: 6,
    description:
      "Un coche de control remoto de alta velocidad con capacidad para realizar acrobacias y giros de 360 grados.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKDrpKZV6_P8jdgZjOo9XKWtT0ZXDjJxJaQltROFXyK6ztfDvcjgCTOZw-RJdA-FdrM0s&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 25000,
  },
  {
    id: 1019,
    name: "Puzzle de animales de la selva",
    brand: "Puzzlemaster",
    category: "Puzzles",
    minimun_age: 5,
    description:
      "Un puzzle de 100 piezas con temática de animales de la selva y colores vibrantes.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5jpLt0GenWLIpepse1tjxM_atxc3miftIrx4uOI8_bNoF42QG9C66LI6ckZyhP6K3Hik&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 5999,
  },
  {
    id: 1020,
    name: "Peluche interactivo",
    brand: "Juguetitos",
    category: "Peluches",
    minimun_age: 2,
    description:
      "Un peluche suave y adorable que emite sonidos y responde a los abrazos y caricias.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-J0in6rk2JZGfsAfqeCaieQoLajlEksZo5w&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 6500,
  },
  {
    id: 1021,
    name: "Peluche de leon",
    brand: "Juguetelandia",
    category: "Peluches",
    minimun_age: 3,
    description: "Un adorable peluche de leon.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr41Sj8y6e5JEzLS2rkJigBswC2p2IubFeOQ&usqp=CAU",
    product_status: true,
    quantity: 2000,
    price: 8800,
  },
  {
    id: 1022,
    name: "Barbie Dreamhouse",
    brand: "Barbie",
    category: "Casa de muñecas",
    minimun_age: 3,
    description:
      "La Casa de Ensueño de Barbie es una casa de muñecas de 3 pisos con siete habitaciones, un ascensor funcional y más de 70 accesorios para infinitas posibilidades de juego.",
    image: "https://https://m.media-amazon.com/images/I/81owpGnSI-L.jpg",
    product_status: true,
    quantity: 2000,
    price: 19999,
  },
  {
    id: 1023,
    name: "LEGO Star Wars Halcón Milenario",
    brand: "LEGO",
    category: "Bloques de construcción",
    minimun_age: 9,
    description:
      "Construye el icónico Halcón Milenario de Star Wars con más de 1300 piezas y recrea escenas de las películas con las mini-figuras de Han Solo, Chewbacca y otros personajes.",
    image: "https://i.blogs.es/f83a2b/millennium-falcon-lego-7/840_560.jpg",
    product_status: true,
    quantity: 2000,
    price: 26999,
  },
  {
    id: 1024,
    name: "Nerf N-Strike Elite Disruptor Blaster",
    brand: "Nerf",
    category: "Pistola",
    minimun_age: 8,
    description:
      "La pistola Nerf N-Strike Elite Disruptor puede disparar seis dardos seguidos a una distancia de hasta 27 metros. Tiene un tambor giratorio que permite recargar rápidamente durante las batallas intensas.",
    image: "https://i.ytimg.com/vi/oPGv5t_FbWA/maxresdefault.jpg",
    product_status: true,
    quantity: 2000,
    price: 39999,
  },
  {
    id: 1025,
    name: "Hot Wheels Pista de Choques Criss Cross",
    brand: "Hot Wheels",
    category: "Pista de carreras",
    minimun_age: 5,
    description:
      "La Pista de Choques Criss Cross de Hot Wheels es una pista de carreras de alta velocidad con múltiples zonas de choque y cuatro lanzadores para que hasta cuatro jugadores compitan al mismo tiempo.",
    image: "https://m.media-amazon.com/images/I/71291zjlclL.jpg",
    product_status: true,
    quantity: 2000,
    price: 21999,
  },
  {
    id: 1026,
    name: "Play-Doh Cocina del Chef",
    brand: "Play-Doh",
    category: "Arte y manualidades",
    minimun_age: 3,
    description:
      "El set Play-Doh Cocina del Chef permite a los niños crear y decorar sus propias creaciones de comida",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_806194-MCO32633177538_102019-O.jpg",
    product_status: true,
    quantity: 2000,
    price: 11999,
  },
  {
    id: 1027,
    name: "Barbie Fashionista Muñeca con Silla de Ruedas",
    brand: "Mattel",
    category: "Muñeca",
    minimun_age: 3,
    description:
      "La muñeca Barbie Fashionista con silla de ruedas es una muñeca inclusiva que viene con una silla de ruedas que se mueve de verdad. La muñeca también tiene una prótesis en la pierna para representar a personas con discapacidades físicas.",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_754681-MCO47370126094_092021-O.jpg",
    product_status: true,
    quantity: 2000,
    price: 61999,
  },
  {
    id: 1028,
    name: "Nerf Ultra One Blaster",
    brand: "Nerf",
    category: "Pistola",
    minimun_age: 8,
    description:
      "La pistola Nerf Ultra One Blaster dispara dardos ultralargos a una distancia de hasta 36 metros. Viene con un tambor grande de 25 dardos para que los jugadores puedan mantener la acción en marcha.",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_948211-MCO47037555465_082021-O.jpg",
    product_status: true,
    quantity: 2000,
    price: 7500,
  },
  {
    id: 1029,
    name: "Crayola Inspiration Art Case",
    brand: "Crayola",
    category: "Arte y manualidades",
    minimun_age: 5,
    description:
      "El set de arte Crayola Inspiration viene con 140 piezas de arte, incluyendo crayones, marcadores, lápices de colores y papel. Todo viene en una caja de transporte resistente para llevarlo a cualquier lugar.",
    image: "https://m.media-amazon.com/images/I/91LtElVE2dL.jpg",
    product_status: true,
    quantity: 2000,
    price: 23000,
  },
  {
    id: 1030,
    name: "Jenga Classic Juego de Mesa",
    brand: "Hasbro",
    category: "Juego de mesa",
    minimun_age: 6,
    description:
      "El juego de mesa Jenga Classic es un juego de habilidad y equilibrio en el que los jugadores deben quitar y apilar bloques de madera sin que la torre se derrumbe.",
    image:
      "https://falabella.scene7.com/is/image/FalabellaCO/1937942_3?wid=800&hei=800&qlt=70",
    product_status: true,
    quantity: 2000,
    price: 5999,
  },
  {
    id: 1031,
    name: "Hot Wheels Pista Torbellino",
    brand: "Hot Wheels",
    category: "Pista de carreras",
    minimun_age: 5,
    description:
      "La Pista Torbellino de Hot Wheels es un Emocionante juego de guías espontáneo!, Enfréntese cara a cara en tres intersecciones zonas de choque., Mira como los coches de la pista, maniobra restringida faltantes o chocar entre sí, Dos lanzadores para ambiente competencia se conecta a otros conjuntos de Hot Wheels Track (se vende por separado), Incluye un vehículo Hot Wheels",
    image: "https://m.media-amazon.com/images/I/81UmTje59DL._AC_SL1500_.jpg",
    product_status: true,
    quantity: 2000,
    price: 41999,
  },
  {
    id: 1032,
    name: "Melissa & Doug Wooden Building Blocks Set",
    brand: "Melissa & Doug",
    category: "Construction toys",
    minimun_age: 3,
    description:
      "Este juego incluye 100 bloques de madera maciza en cuatro colores diferentes y nueve formas diferentes. Los bloques vienen en una resistente caja de almacenamiento de madera con una tapa deslizante que también sirve como superficie de construcción.",
    image:
      "https://i5.walmartimages.ca/images/Thumbnails/336/389/6000203336389.jpg",
    product_status: true,
    quantity: 2000,
    price: 8999,
  },
  {
    id: 1033,
    name: "Fisher-Price Think & Learn Code-a-Pillar",
    brand: "Fisher-Price",
    category: "Electronic toys",
    minimun_age: 3,
    description:
      "Este juguete interactivo enseña habilidades de codificación a través de una serie de segmentos conectados que se pueden reorganizar para hacer que Code-a-Pillar se mueva de diferentes maneras. Incluye un segmento de sonido y tres segmentos rectos, y los segmentos adicionales se pueden comprar por separado.",
    image: "https://m.media-amazon.com/images/I/8175bmbrKNL.jpg",
    product_status: true,
    quantity: 2000,
    price: 36000,
  },
  {
    id: 1034,
    name: "Hot Wheels Track Builder System",
    brand: "Hot Wheels",
    category: "Vehicle Toys",
    minimun_age: 6,
    description:
      "El sistema Hot Wheels Track Builder le permite diseñar y construir sus propias pistas Hot Wheels personalizadas! Con una variedad de piezas de pista y conectores, puede crear bucles, saltos y acrobacias para desafiar a sus autos Hot Wheels.",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_639612-MCO43818539402_102020-O.jpg",
    product_status: true,
    quantity: 2000,
    price: 22999,
  },
  {
    id: 1035,
    name: "Fisher-Price Little People Caring for Animals Farm",
    brand: "Fisher-Price",
    category: "Playsets",
    minimun_age: 4,
    description:
      "Little People Caring for Animals Farm de Fisher-Price es un juego divertido e interactivo para niños pequeños. ¡Con sus figuras de animales de granja, granero y tractor, los niños pueden aprender sobre el cuidado de los animales y la agricultura mientras juegan!",
    image:
      "https://media.kohlsimg.com/is/image/kohls/5831685?wid=600&hei=600&op_sharpen=1",
    product_status: true,
    quantity: 2000,
    price: 20999,
  },
  {
    id: 1036,
    name: "Play-Doh Modeling Compound 10-Pack Case of Colors",
    brand: "Play-Doh",
    category: "Art and Craft Toys",
    minimun_age: 2,
    description:
      "Un juego de masa para modelar Play-Doh en una variedad de colores, perfecto para esculpir y moldear.",
    image: "https://m.media-amazon.com/images/I/51pu4wj05wL._AC_.jpg",
    product_status: true,
    quantity: 2000,
    price: 18999,
  },
  {
    id: 1037,
    name: "Melissa & Doug Deluxe Wooden Railway Train Set",
    brand: "Melissa & Doug",
    category: "Vehicle Playsets",
    minimun_age: 3,
    description:
      "Un juego de trenes de madera que permite a los niños crear sus propias vías de tren y tener un sinfín de juegos imaginativos.",
    image:
      "https://m.media-amazon.com/images/I/71CWlK5TaLL._AC_UF894,1000_QL80_.jpg",
    product_status: true,
    quantity: 2000,
    price: 62000,
  },
  {
    id: 1038,
    name: "Hot Wheels Basic Car 50-Pack",
    brand: "Hot Wheels",
    category: "Die-Cast Vehicles",
    minimun_age: 3,
    description:
      "Un juego de 50 autos Hot Wheels en varios diseños y colores para horas de juego imaginativo y colección.",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_855796-MCO47784765179_102021-O.jpg",
    product_status: true,
    quantity: 2000,
    price: 85000,
  },
  {
    id: 1039,
    name: "Melissa & Doug Wooden Scoop and Serve Ice Cream Counter",
    brand: "Melissa & Doug",
    category: "Kitchen Playsets",
    minimun_age: 3,
    description:
      "Un juego de mostrador de helado de madera con bolas de helado, coberturas, conos y dinero ficticio para juegos imaginativos.",
    image:
      "https://m.media-amazon.com/images/I/71o1dhAdiOL._AC_UF894,1000_QL80_.jpg",
    product_status: true,
    quantity: 2000,
    price: 31999,
  },
  {
    id: 1040,
    name: "VTech Kidizoom Smartwatch DX2",
    brand: "VTech",
    category: "Electronic Toys",
    minimun_age: 4,
    description:
      "Un reloj inteligente para niños con juegos, cámara y carátulas personalizables para juegos y aprendizaje interactivos.",
    image: "https://image.smythstoys.com/original/desktop/167082.jpg",
    product_status: true,
    quantity: 2000,
    price: 34000,
  },
];

module.exports = listProducts;
