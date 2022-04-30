import { useTranslation } from "react-i18next"
import classNames from "classnames/bind"
import { Col, Card, Grid } from "components/layout"
import { ModalButton } from "components/feedback"
import { InternalButton } from "components/general"
import styles from "./Header.module.scss"
import ListDialogue from "./List/ListDialogue"
const cx = classNames.bind(styles)

const Header = () => {
  const { t } = useTranslation()
  const { CreateList } = ListDialogue()
  const NewList = () => {
    return (
      <ModalButton
        title={t("Create New List")}
        renderButton={(open) => {
          return (
            <InternalButton onClick={open} chevron>
              {t("New List")}
            </InternalButton>
          )
        }}
      >
        <CreateList />
      </ModalButton>
    )
  }

  return <NewList />
}

export default Header
