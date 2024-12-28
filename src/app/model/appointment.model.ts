import { email, minLength, required } from "@rxweb/reactive-form-validators";

export class Appointment {
  @required()
  staff_id!: number;

  @required()
  service_id!: number;

  @required()
  start_date!: Date;

  @required()
  end_date!: Date;

  @required()
  full_name!: string;

  @required()
  first_name!: string;

  @required()
  last_name!: string;

  @required()
  @minLength({ value: 10 })
  phone!: string;

  @required()
  @email()
  email!: number;

  @required()
  notes!: string;

}