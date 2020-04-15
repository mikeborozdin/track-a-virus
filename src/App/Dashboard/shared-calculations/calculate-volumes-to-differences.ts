const calculateVolumesToDifferences = (dailyVolumes: number[]) =>
  dailyVolumes.map((currentVolume, index, originalCountryData) => {
    if (index === 0) {
      return currentVolume;
    } else {
      return currentVolume - originalCountryData[index - 1];
    }
  });

export default calculateVolumesToDifferences;
