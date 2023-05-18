import { styled } from "@mui/material"
import { useAppSelector } from "../app/hooks"
import { selectRequestError } from "../features/heroes/heroesSlice"

const StyledError = styled("div")(() => ({
  fontFamily: "'Star Wars', sans-serif",
  color: "#EEDB00",
}))

const ErrorPage = () => {
  const requestError = useAppSelector(selectRequestError)

  return (
    <StyledError>
      Error occurred. {requestError && <span>{requestError}</span>}
    </StyledError>
  )
}

export { ErrorPage }
