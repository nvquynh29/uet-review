const generateSlug = (title: string): string => {
  if (title.length == 0) {
    return ''
  }
  const slug = title.replace(/\s+/g, '-').toLowerCase();
  const randomId = randomNumber(100000, 999999)
  return `${slug}-${randomId}`
}

const randomNumber = (min: number, max: number): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export {
  generateSlug
}
