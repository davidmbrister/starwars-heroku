const { response } = require("express")
var express = require("express")
var fetch = require("node-fetch")
var router = express.Router()

router.get("/:characterId", async function (req, res, next) {
  const characterId = req.params.characterId
  const url = `https://swapi.dev/api/people/${characterId}/?format=json`

  let characterData = await fetch(url)
    .then(function (response) {
      let data = response.json()
      return data
    })
    .catch(function (error) {
      console.log(error)
    })

  let dataFetchPromises = []
  if (characterData.films.length)
    dataFetchPromises.push(getMoviesData(characterData))
  if (characterData.homeworld)
    dataFetchPromises.push(getPlanetData(characterData))
  if (characterData.species.length)
    dataFetchPromises.push(getSpeciesData(characterData))

  const fetchedData = await Promise.all(dataFetchPromises)
  characterData["filmsDetails"] = fetchedData[0]
  characterData["planetDetails"] = fetchedData[1]
  characterData["speciesDetails"] = fetchedData[2]

  const filteredAndTransformedCharData = (({
    name,
    height,
    mass,
    hair_color,
    skin_color,
    gender,
    birth_year,
    filmsDetails,
    planetDetails,
    speciesDetails,
  }) => ({
    name,
    height,
    mass,
    hair_color,
    skin_color,
    gender,
    birth_year,
    filmsDetails,
    planetDetails,
    speciesDetails,
  }))(characterData)
  res.send(filteredAndTransformedCharData)
})

module.exports = router

/**
 * @param {string[]} films an array of film url strings
 * @return {Promise<Object[]>} Array<{title, director, producers, release_date}>
 */
async function getMoviesData({ films }) {
  return new Promise(async function (resolve, reject) {
    await Promise.all(films.map((f) => fetch(f)))
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((jsonResponses) => {
        let transformedFilmData = jsonResponses.map((film) => {
          const { title, director, producers, release_date } = film
          return { title, director, producers, release_date }
        })
        resolve(transformedFilmData)
      })
  })
}

/**
 * @param {string} planetUrl a url string
 * @return {Promise<Object[]>} {name, terrain, population}
 */
async function getPlanetData({ homeworld }) {
  const planetUrl = homeworld
  return new Promise((resolve, reject) => {
    fetch(`${planetUrl}`)
      .then((res) => res.json())
      .then((jsonData) => {
        const { name, terrain, population } = jsonData
        resolve({ name, terrain, population })
      })
      .catch((e) => reject(e))
  })
}

/**
 * @param {string} speciesUrl a url string
 * @return {Promise<Object[]>} {average_lifespan, classification, language}
 */
async function getSpeciesData({ species }) {
  const speciesURL = species
  return new Promise((resolve, reject) => {
    fetch(`${speciesURL}`)
      .then((res) => res.json())
      .then((jsonData) => {
        const { name, average_lifespan, classification, language } = jsonData
        resolve({
          name,
          average_lifespan,
          classification,
          language,
        })
      })
      .catch((e) => reject(e))
  })
}


