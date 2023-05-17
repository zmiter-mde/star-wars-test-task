import { useCallback, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import Container from "@mui/material/Container"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { Button, TextField, styled } from "@mui/material"
import { useAppDispatch } from "../../../app/hooks"
import { updateHeroById } from "../heroesSlice"
import { Hero } from "../heroesAPI"

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  height: yup
    .number()
    .min(1, "Enter a positive height")
    .required("Height is required"),
  mass: yup
    .number()
    .min(1, "Enter a positive mass")
    .required("Mass is required"),
})

const StyledForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "70%",
    margin: theme.spacing(2, "auto"),
  },
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, "auto"),
  backgroundColor: theme.palette.common.white,
  [theme.breakpoints.up("sm")]: {
    margin: theme.spacing(2, "auto"),
  },
  "& fieldset": { border: "none" },
  "& input": {
    boxShadow:
      "0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff, 0 0 15px blue, 0 0 25px blue",
    "&:focus": {
      boxShadow:
        "0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff, 0 0 15px green, 0 0 25px green",
    },
  },
  "> label": {
    color: theme.palette.common.black,
    "&.Mui-focused": {
      color: theme.palette.common.black,
    },
  },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.common.black,
  boxShadow:
    "0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff, 0 0 15px blue, 0 0 25px blue",
  "&:hover": {
    backgroundColor: theme.palette.common.black,
    boxShadow:
      "0 0 5px #fff, 0 0 8px #fff, 0 0 12px #fff, 0 0 15px green, 0 0 25px green",
  },
}))

interface HeroViewProps {
  hero: Hero
}

const HeroEdit = ({ hero }: HeroViewProps) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const formik = useFormik({
    initialValues: {
      name: hero.name,
      height: hero.height,
      mass: hero.mass,
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(updateHeroById({ ...hero, ...values }))
      actions.setSubmitting(false)
      setOpen(true)
    },
  })

  return (
    <Container>
      <StyledForm onSubmit={formik.handleSubmit}>
        <StyledTextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <StyledTextField
          fullWidth
          id="height"
          name="height"
          label="Height"
          type="text"
          value={formik.values.height}
          onChange={formik.handleChange}
          error={formik.touched.height && Boolean(formik.errors.height)}
          helperText={formik.touched.height && formik.errors.height}
        />

        <StyledTextField
          fullWidth
          id="mass"
          name="mass"
          label="Mass"
          type="text"
          value={formik.values.mass}
          onChange={formik.handleChange}
          error={formik.touched.mass && Boolean(formik.errors.mass)}
          helperText={formik.touched.mass && formik.errors.mass}
        />

        {/* TODO: <Planet url={hero.homeworld} /> */}

        <StyledButton variant="contained" type="submit">
          Update
        </StyledButton>
      </StyledForm>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success">Hero successfully updated!</Alert>
      </Snackbar>
    </Container>
  )
}

export { HeroEdit }
