export const storeProducts = [
	{
    id: 1,
    title: "Chicago Bass Guitar by Gear4music, Trans Red Burst",
    category: "basses",
    type: ["electric"],
    img: "/img/img-1.jpg",
    price: 150,
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    amount: 10,
    sold: 5
  },
  {
    id: 2,
    title: "Roundback Electro Acoustic Bass sdf sdfsdf sdfsdf Guitar by Gear4music, Black",
    category: "basses",
    type: ["acoustic"],
    img: "/img/img-2.jpg",
    price: 175,
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    amount: 3,
    sold: 7
  },
  {
    id: 3,
    title: "ESP LTD B-205 5-String SM Fretless Bass, Natural Satin",
    category: "basses",
    type: ["fretless"],
    img: "/img/img-3.jpg",
    price: 590,
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    amount: 5,
    sold: 3
  },
  {
    id: 4,
    title: "Ibanez SR305EB 5 String Bass, Weathered Black",
    category: "basses",
    type: ["5-string"],
    img: "/img/img-4.jpg",
    price: 400,
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    amount: 3,
    sold: 4
  },
  {
    id: 5,
    title: "ESP LTD D-6 6-String Bass Guitar, Natural Satin",
    category: "basses",
    type: ["6-string"],
    img: "/img/img-5.jpg",
    price: 830,
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    amount: 1,
    sold: 1
  },
  {
    id: 6,
    title: "Squier Vintage Modified Jazz Bass Left Handed, 3-Tone Sunburst",
    category: "basses",
    type: ["left-handed"],
    img: "/img/img-6.jpg",
    price: 470,
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    amount: 2,
    sold: 2
  }
];

export const categoryTitles = [
  {
    category: "basses",
    title: "Bass Guitars"
  },
  {
    category: "amps",
    title: "Bass Amps"
  },
  {
    category: "pedals",
    title: "Bass Pedals"
  },
  {
    category: "accessories",
    title: "Bass Accessories"
  }
];

export const typeTitles = [
  {
    type: "electric",
    title: "Electric"
  },
  {
    type: "acoustic",
    title: "Acoustic"
  },
  {
    type: "fretless",
    title: "Fretless"
  },
  {
    type: "5-string",
    title: "5 String"
  },
  {
    type: "6-string",
    title: "6 String"
  },
  {
    type: "left-handed",
    title: "Left Handed"
  },
];

export function getProductFromStorage(key) {
  if (!key) {
    return null;
  }

  try {
    const valueStr = window.localStorage.getItem(key);
    if (valueStr) {
      return JSON.parse(valueStr);
    }
    return null;
  } catch (err) {
    return null;
  }
}

export function setProductInStorage(key, obj) {
  if (!key) {
    console.err("Error: key is missing");
  }

  try {
    if (getProductFromStorage(key) == null)
      Object.assign(obj, {ordered: 1});
    window.localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    console.err(err);
  }
}

export function removeProductFromStorage(key) {
  if (!key) {
    console.err("Error: key is missing");
  }

  try {
    window.localStorage.removeItem(key);
  } catch (err) {
    console.err(err);
  }
}
