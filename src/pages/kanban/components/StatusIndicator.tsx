import Switch from "@mui/material/Switch"
import { useState } from "react"
import styles from "./StatusIndicator.module.scss"

type Props = {
  status: "open" | "closed"
}

const StatusIndicator = ({ status }: Props) => {
  const [toggled, setToggled] = useState(false)

  if (status === "open") {
    return (
      <Switch
        classes={styles}
        checked={toggled}
        onChange={(e) => setToggled(e.target.checked)}
      />
    )
  } else if (status === "closed") {
    return <Switch classes={styles} />
  } else {
    return null
  }
}

export default StatusIndicator
