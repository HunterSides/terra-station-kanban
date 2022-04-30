import { useTranslation } from "react-i18next"
import { Page } from "components/layout"
import KanbanBoard from "./KanbanBoard"
import KanbanActions from "./KanbanActions"
const Kanban = () => {
  const { t } = useTranslation()
  return (
    <Page title={t("Kanban")} extra={<KanbanActions />}>
      <KanbanBoard />
    </Page>
  )
}

export default Kanban
