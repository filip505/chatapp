export const unpack = async function (promise) {
  try {
    const result = await promise
    return result
  } catch (error) {
    return null
  }
}

export const errorHandler = function (action) {
  return (req, res) => {
    action(req, res).catch((error) => {
      console.log('ERROR', error)
      res.status(error.status).send(error.body)
    })
  }
}