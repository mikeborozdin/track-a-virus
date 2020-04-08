import randomcolor from 'randomcolor';

const getRandomCountryColors = (countries: string[]) => {
  const colors = randomcolor({
    count: countries.length,
    luminosity: 'bright',
    hue: 'random',
  });

  const countryColors: Record<string, string> = {};

  for (let i = 0; i < countries.length; i++) {
    countryColors[countries[i]] = colors[i];
  }

  return countryColors;
};

export default getRandomCountryColors;
