import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod/v4'
import MainLayout from '../layouts/MainLayout'

const signInSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type SignInForm = z.infer<typeof signInSchema>

export default function SignInPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = (data: SignInForm) => {
    console.log(data)
  }

  return (
    <MainLayout>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Sign In</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-142.75 sm:h-107 px-10 py-10">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Your primary email address"
                {...register('email')}
                className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 transition
                  ${errors.email
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-violet-500 focus:ring-violet-100'
                  }`}
              />
              {errors.email && (
                <span className="text-xs text-red-500">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register('password')}
                className={`w-full border rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 transition
                  ${errors.password
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-violet-500 focus:ring-violet-100'
                  }`}
              />
              {errors.password && (
                <span className="text-xs text-red-500">{errors.password.message}</span>
              )}
              <div className="flex justify-end mt-0.5">
                <a href="#" className="text-sm text-gray-600 hover:text-violet-600 transition">
                  Forget Password?
                </a>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold py-3.5 rounded-lg transition mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}