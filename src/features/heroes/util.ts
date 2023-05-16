import { Hero } from "./heroesAPI"

// TODO: remove when back-end provides an id directly
const prepareHeroesIds = (heroes: Hero[]) =>
  heroes.map((hero) => ({
    ...hero,
    id: hero.url.slice(hero.url.search("people") + 7, hero.url.length - 1),
  }))

export { prepareHeroesIds }
