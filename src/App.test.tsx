import { rest } from "msw"
import { setupServer } from "msw/node"
import { render, screen, waitFor } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import { BrowserRouter } from "react-router-dom"

export const handlers = [
  rest.get(
    "https://swapi.dev/api/people?page=1&limit=10&search=",
    (_, res, ctx) => {
      return res(
        ctx.json({
          count: 1,
          results: [
            {
              url: "https://swapi.dev/api/people/1/",
              name: "Luke Skywalker",
              height: "172",
              mass: "77",
            },
          ],
        }),
        ctx.delay(150),
      )
    },
  ),
]

const server = setupServer(...handlers)

describe("Whole app simple test", () => {
  // Enable API mocking before tests.
  beforeAll(() => server.listen())

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers())

  // Disable API mocking after the tests are done.
  afterAll(() => server.close())

  test("fetches & receives a heroes array after clicking app loading", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    )

    // should show no user initially, and not be fetching a user
    expect(screen.getByTestId("swHeader")).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument()
    })
  })
})
