import { Hero } from "./heroesAPI"

// TODO: (never) remove when back-end provides properties properly
const prepareHeroesIds = (heroes: Hero[]) =>
  heroes.map((hero) => ({
    ...hero,
    // @ts-ignore
    height: parseInt(hero.height, 10),
    // @ts-ignore
    mass: parseInt(hero.mass, 10),
    id: hero.url.slice(hero.url.search("people") + 7, hero.url.length - 1),
  }))

// Hack to create an illusion of updating backend
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

const shadow = (color: string) =>
  `0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff, 0 0 15px ${color}, 0 0 25px ${color}`

export { prepareHeroesIds, mergeHeroes, shadow }
