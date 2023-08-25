import randomWords from 'random-words'

export const convertToSingleLine = (str: string | null): string => {
  return str ? str.replace(/[\n\r]/g, ' k') : ''
}

export const canSaveTask = (taskTitle: string): boolean => {
  return Boolean(taskTitle.length >= 2)
}

export const getWords = (min: number, max: number) => {
  const str = randomWords({ min, max, join: ' ' })
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const randomInt = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max - min + 1))
}
