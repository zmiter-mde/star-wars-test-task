import { styled } from "@mui/material"
import Typography from "@mui/material/Typography"

const StyledText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Star Wars', sans-serif",
  color: "#EEDB00",
  textAlign: "center",
  margin: theme.spacing(2, "auto"),
}))

interface PageTitleProps {
  title: string
}

const PageTitle = ({ title }: PageTitleProps) => {
  return <StyledText variant="h5">{title}</StyledText>
}

export { PageTitle }
