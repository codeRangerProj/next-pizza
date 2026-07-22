import {z} from "zod";

export const passwordSchema = z.string().min(4, {message: 'Пароль должен содержать не менее 4 символов'})

export const formLoginSchema = z.object({
  email: z.email({message: 'Введите корректную почту'}),
  password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema.extend({
  fullName: z.string().min(2, {message: 'Введите имя и фамилию'}),
  confirmPassword: passwordSchema,
}).refine(value => value.password === value.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
})

export type TFormLoginValues = z.infer<typeof formLoginSchema>
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>
