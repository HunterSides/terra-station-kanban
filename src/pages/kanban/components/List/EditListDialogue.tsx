import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { useSetRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { ReactNode, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { RenderButton } from "types/components"
import { Button } from "components/general"
import { Grid } from "components/layout"
import { ModalButton } from "components/feedback"
import {
  Form,
  FormItem,
  Submit,
  Input,
  TextArea,
  FormError,
} from "components/form"
import { IList, taskState } from "../../models/atoms"

interface IEditListForm {
  list: IList[]
  name: string
}

const EditListDialogue = ({ listId }: IList) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setList = useSetRecoilState(taskState)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<Error>()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEditListForm>()

  const submit = async ({ name}: IEditListForm) => {

    const newListName = { listId: name}
    try {
      setList((allTasks) => ({
        ...allTasks,
        [listId]: [],
      }))
      setValue("name", "")
      navigate("/kanban", { replace: true })
    } catch (error) {
      setError(error as Error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FormItem label={t("Name")} error={errors.name?.message}>
        <Input
          {...register("name", { required: "a name is required" })}
          placeholder={t("Please input a name")}
          autoFocus
        />
      </FormItem>
      {error && <FormError>{error.message}</FormError>}
      <Submit submitting={submitting}>{t("Update")}</Submit>
    </Form>
  )
}

export default EditListDialogue


