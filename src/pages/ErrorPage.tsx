import { useAppSelector } from "../app/hooks"
import { selectRequestError } from "../features/heroes/heroesSlice"

const ErrorPage = () => {
  const requestError = useAppSelector(selectRequestError)

  return (
    <div>Error occurred. {requestError && <span>{requestError}</span>}</div>
  )
}

export { ErrorPage }
