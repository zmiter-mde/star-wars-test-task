import { useEffect } from "react"
import "./Lightsaber.css"
import { shadow } from "../../util"

const magicColorsCount = 16777215

const Lightsaber = () => {
  useEffect(() => {
    // A bit of fun :D
    const interval = setInterval(() => {
      const light = document.getElementById("light")!
      const randomColor = Math.floor(Math.random() * magicColorsCount).toString(
        16,
      )
      light.style.boxShadow = shadow(`#${randomColor}`)
    }, 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <div id="lightsaber">
      <span id="light"></span>
      <span id="generator">
        <span id="guard">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span id="handlestart">
          <span></span>
          <span></span>
        </span>
        <span id="handle">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span className="long"></span>
          <span className="long"></span>
          <span className="box"></span>
        </span>
        <span className="wings">
          <span className="wing wing1"></span>
          <span className="wing wing2"></span>
          <span className="wing wing3"></span>
        </span>

        <span className="light"></span>
      </span>
    </div>
  )
}

export { Lightsaber }
