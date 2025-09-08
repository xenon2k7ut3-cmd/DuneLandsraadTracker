// Mapping of house to vendor imagery
// mapUrl: world map image showing location
// vendorUrl: in-world screenshot with vendor visible
// source/reference: https://www.method.gg/dune-awakening/all-landsraad-house-representative-locations-in-dune-awakening

const candidatesFor = (house) => {
  const base = process.env.PUBLIC_URL || '';
  const houseLower = house.toLowerCase();
  const mapCandidates = [
    `${base}/house_images/location-${houseLower}.jpg`
  ];
  const vendorCandidates = [
    `${base}/house_images/${houseLower}.jpg`
  ];
  return { mapCandidates, vendorCandidates, referenceUrl: 'https://www.method.gg/dune-awakening/all-landsraad-house-representative-locations-in-dune-awakening' };
};

export const vendorImages = {
  Alexin: candidatesFor('Alexin'),
  Argosaz: candidatesFor('Argosaz'),
  Dyvetz: candidatesFor('Dyvetz'),
  Ecaz: candidatesFor('Ecaz'),
  Hagal: candidatesFor('Hagal'),
  Hurata: candidatesFor('Hurata'),
  Imota: candidatesFor('Imota'),
  Kenola: candidatesFor('Kenola'),
  Lindaren: candidatesFor('Lindaren'),
  Maros: candidatesFor('Maros'),
  Mikarrol: candidatesFor('Mikarrol'),
  Moritani: candidatesFor('Moritani'),
  Mutelli: candidatesFor('Mutelli'),
  Novebruns: candidatesFor('Novebruns'),
  Richese: candidatesFor('Richese'),
  Sor: candidatesFor('Sor'),
  Spinette: candidatesFor('Spinette'),
  Taligari: candidatesFor('Taligari'),
  Thorvald: candidatesFor('Thorvald'),
  Tseida: candidatesFor('Tseida'),
  Varota: candidatesFor('Varota'),
  Vernius: candidatesFor('Vernius'),
  Wallach: candidatesFor('Wallach'),
  Wayku: candidatesFor('Wayku'),
  Wydras: candidatesFor('Wydras')
};


