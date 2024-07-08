export type User = {
  user_name: string;
  user_id: string;
  user_pw: string;
  user_birth: Date | string;
  user_mail: string;
  user_tel: string;
  major: string;
};

export type LoginUser = {
  user_id: string;
  user_pw: string;
}