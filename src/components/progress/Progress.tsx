import { CircularProgress, styled } from "@mui/material"

const StyledCircularProgress = styled(CircularProgress)(() => ({
  margin: "0 auto",
  color: "#EEDB00",
  display: "block",
}))

const Progress = () => {
  return <StyledCircularProgress />
}

export { Progress }
