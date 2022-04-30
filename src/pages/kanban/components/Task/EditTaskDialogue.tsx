import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { useSetRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import {
  Form,
  FormItem,
  Submit,
  Input,
  TextArea,
  FormError,
} from "components/form"
import { IList, ITask } from "../../models/atoms"
import { taskState } from "../../models/atoms"
import { v4 as uuidv4 } from "uuid"

interface IEditTaskForm {
  name: string
  description: string
}

const EditTaskDialogue = ({ listId, tasks, index }: IList) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setTasks = useSetRecoilState(taskState)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<Error>()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEditTaskForm>()

  const submit = ({ name, description }: IEditTaskForm) => {
    
    const updateTask = { id: uuidv4(), name: name, description: description }
    try {
      setTasks((allTasks) => ({
        ...allTasks,
        [listId]: [updateTask, ...allTasks[listId]],
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
          placeholder={t("Please input a task name")}
          autoFocus
        />
      </FormItem>

      <FormItem label={t("Description")} error={errors.description?.message}>
        <TextArea
          {...register("description", {
            required: "Description is required",
          })}
          placeholder={t("Please input a task description")}
        />
      </FormItem>

      {error && <FormError>{error.message}</FormError>}
      <Submit submitting={submitting}>{t("update")}</Submit>
    </Form>
  )
}

export default EditTaskDialogue
