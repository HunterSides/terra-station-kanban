import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import styles from "./ListDialogue.module.scss"
import {
  Form,
  FormItem,
  Submit,
  Input,
  TextArea,
  FormError,
} from "components/form"
import { IList, taskState } from "../../models/atoms"
import { ModalButton } from "components/feedback"
import { InternalButton } from "components/general"

interface Props {
  list: IList
  name: string
}

const ListDialogue = () => {
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
  } = useForm<Props>()
  

  const handleEdit = async ({ name }: Props) => {
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
  const handleCreate = async ({ name }: Props) => {
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
  const CreateList = () => {
    return (
      <Form onSubmit={handleSubmit(handleCreate)}>
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
  const EditList = () => {
    return (
      <ModalButton
      title={t("Edit List")}
      renderButton={(open) => {
        return (
          <InternalButton className={styles.editbutton} onClick={open}>
            {t("edit")}
          </InternalButton>
        )
      }}
    >
      <Form onSubmit={handleSubmit(handleEdit)}>
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
    </ModalButton>
    )
  }

  return { 
    CreateList, 
    EditList
  }
}

export default ListDialogue