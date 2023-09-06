// Generate probabilities using Gaussian distribution centered at peakIndex
function generateGaussianProbabilities(length, peakIndex, stdDev) {
  const probabilities = new Array(length).fill(0);
  let sum = 0;
  
  for (let i = 0; i < length; i++) {
    probabilities[i] = Math.exp(-Math.pow(i - peakIndex, 2) / (2 * Math.pow(stdDev, 2))) / (stdDev * Math.sqrt(2 * Math.PI));
    sum += probabilities[i];
  }
  
  // Normalize probabilities so they sum to 1
  for (let i = 0; i < length; i++) {
    probabilities[i] /= sum;
  }
  
  return probabilities;
}

// Sample an index based on given probabilities
function sampleIndexByProbability(indices, probabilities) {
  const rand = Math.random();
  let cumulative = 0;
  
  for (let i = 0; i < indices.length; i++) {
    cumulative += probabilities[i];
    if (rand < cumulative) {
      return indices[i];
    }
  }
  
  return indices[indices.length - 1];
}


// Function to sample items from an array based on Gaussian probabilities, without replacement
export function sampleWithGaussianPeakNoReplacement(items, nSamples, peakIndex, stdDev = 1.0) {
  if (nSamples > items.length) {
    throw new Error("Number of samples cannot exceed the number of items when sampling without replacement.");
  }

  const probabilities = generateGaussianProbabilities(items.length, peakIndex, stdDev);
  
  // Clone array of indices for items
  const indices = [...Array(items.length).keys()];
  
  let sampledItems = [];
  
  for (let i = 0; i < nSamples; i++) {
    // Sample index based on probabilities
    const sampledIndex = sampleIndexByProbability(indices, probabilities);

    // Remove the sampled index from further consideration
    indices.splice(indices.indexOf(sampledIndex), 1);

    // Remove its probability
    const removedProbability = probabilities.splice(sampledIndex, 1)[0];
    
    // Renormalize probabilities
    const sum = probabilities.reduce((a, b) => a + b, 0);
    for (let j = 0; j < probabilities.length; j++) {
      probabilities[j] /= (sum + removedProbability);
    }

    // Add item to sampled items
    sampledItems.push(items[sampledIndex]);
  }

  return sampledItems;
}

export function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}