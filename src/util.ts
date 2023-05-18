import { Hero } from "./types"

// TODO: (never) remove when back-end provides properties properly
const prepareHeroesData = (heroes: Hero[]) =>
  heroes.map((hero) => ({
    ...hero,
    // @ts-ignore may be NaN, but we'll live with that for now
    height: parseInt(hero.height, 10),
    // @ts-ignore
    mass: parseInt(hero.mass, 10),
    id: hero.url.slice(hero.url.search("people") + 7, hero.url.length - 1),
  }))

// Hack to create the illusion of updating backend
// Still state is lost on pagination change, but good enough for now
// TODO: (never) Remove mergeHeroes when backend update is ready
const mergeHeroes = (remoteHeroes: Hero[], localHeroes: Hero[]) => {
  const updatedHeroes: Hero[] = []
  remoteHeroes.forEach((remoteHero) => {
    const localHero = localHeroes.find((hero) => hero.id === remoteHero.id)
    updatedHeroes.push({
      ...remoteHero,
      // Overriding if already stored locally
      ...localHero,
    })
  })

  return updatedHeroes
}

// TODO: move to colors config
const shadow = (color: string) =>
  `0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff, 0 0 15px ${color}, 0 0 25px ${color}`

export { prepareHeroesData, mergeHeroes, shadow }
