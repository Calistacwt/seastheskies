export const email = /\S+@\S+\.\S+/

export const phone = /^[1-9]\d{8,13}$/

export const date = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/

export const deepEqual = (source: any, target: any) => {
  // Check if both are objects
  if (typeof source === 'object' && typeof target === 'object') {
    // Check if both are null
    if (source === null && target === null) {
      return true
    }

    // Get the keys of both objects
    const keys1 = Object.keys(source)
    const keys2 = Object.keys(target)

    // Check if the number of keys is the same
    if (keys1.length !== keys2.length) {
      return false
    }

    // Iterate over the keys and recursively compare the values
    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(source[key], target[key])) {
        return false
      }
    }

    return true
  } else {
    // If not objects, perform simple equality check
    return source === target
  }
}
