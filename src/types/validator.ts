import { Validator } from "@terra-money/terra.js"
import { Contacts } from "./components"

export interface TerraValidator extends Validator.Data {
  picture?: string
  contact?: Contacts
  miss_counter?: string
  voting_power?: string
  self?: string
  votes?: Vote[]
  rewards_30d?: string
}

interface Vote {
  options: Option[]
  proposal_id: string
  title: string
}

interface Option {
  option: string
  weight: string
}
