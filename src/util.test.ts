import { prepareHeroesData, mergeHeroes, shadow } from "./util"

describe("util tests", () => {
  it("should prepare heroes' data, taken from urls", () => {
    expect(
      prepareHeroesData([
        {
          // @ts-ignore
          height: "172",
          // @ts-ignore
          mass: "72",
          url: "https://swapi.dev/api/people/2/",
        },
      ]),
    ).toEqual([
      {
        height: 172,
        mass: 72,
        url: "https://swapi.dev/api/people/2/",
        id: "2",
      },
    ])
  })

  it("should merge heroes' data, taken from BE with existing state", () => {
    expect(
      mergeHeroes(
        [
          {
            height: 172,
            mass: 72,
            url: "https://swapi.dev/api/people/2/",
            name: "Remote Name",
            id: "2",
            homeworld: "",
          },
        ],
        [
          {
            height: 172,
            mass: 72,
            url: "https://swapi.dev/api/people/2/",
            name: "Existing Local Name",
            id: "2",
            homeworld: "",
          },
        ],
      ),
    ).toEqual([
      {
        height: 172,
        mass: 72,
        url: "https://swapi.dev/api/people/2/",
        id: "2",
        name: "Existing Local Name",
        homeworld: "",
      },
    ])
  })

  it("should return correct box-shadow css", () => {
    expect(shadow("blue")).toEqual(
      "0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff, 0 0 15px blue, 0 0 25px blue",
    )
  })
})
