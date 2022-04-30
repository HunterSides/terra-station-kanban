import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { useSetRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { ReactNode, useState } from "react"

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
import { taskState } from "../../models/atoms"

interface INewListForm {
  listId: string
  name: string
}

const NewListForm = () => {
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
  } = useForm<INewListForm>()

  const submit = async ({ name }: INewListForm) => {
    setSubmitting(true)
    setError(undefined)

    try {
      setList((allTasks) => ({
        ...allTasks,
        [name]: [],
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
      <Submit submitting={submitting}>{t("Create")}</Submit>
    </Form>
  )
}

export default NewListForm
