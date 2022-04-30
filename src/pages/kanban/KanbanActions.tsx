import { useTranslation } from "react-i18next"
import { LinkButton } from "components/general"
import { ExtraActions } from "components/layout"

const KanbanActions = () => {
  const { t } = useTranslation()

  return (
    <ExtraActions>
      <LinkButton to="/kanban/archives" color="primary" size="small">
        {t("Archives")}
      </LinkButton>

      <LinkButton to="/kanban/boards" color="primary" size="small">
        {t("Boards")}
      </LinkButton>
    </ExtraActions>
  )
}

export default KanbanActions
