export interface IRegisterFormInput {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface ILoginFormInput {
  email: string;
  password: string;
}
