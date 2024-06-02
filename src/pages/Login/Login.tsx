import loginBackground from '@/assets/images/illustration_login.png';
import logo from '@/assets/images/logo.png';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Typography } from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { getUserInfo, loginStandard, saveUserInfo } from '../../services/loginService';

export type UserSubmitForm = {
  username: string;
  password: string;
};

interface ErrorForm {
  message?: string;
  username?: string;
  password?: string;
}

export function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorForm, setErrorForm] = useState<string | undefined>('');
  const location = useLocation();
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Vui lòng nhập tên đăng nhập!')
      .email('Tên đăng nhập không đúng định dạng.')
      .max(255, 'Tên đăng nhập quá dài.'),
    password: Yup.string().required('Vui lòng nhập mật khẩu.').max(255, 'Mật khẩu quá dài'),
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (userInfo) {
      navigate(location.state?.from || '/');
    }
  }, [userInfo, location.state?.from, navigate]);

  const mutation = useMutation<AxiosResponse, Error, UserSubmitForm>({
    mutationFn: loginStandard,
    onSuccess: (data) => {
      console.log(data);
      saveUserInfo(data.data);
      navigate('/cashier');
    },
    onError: (error) => {
      if (axios.isAxiosError<ErrorForm>(error) && error.response) {
        const { username, password } = error.response.data;
        if (username) {
          setError('username', { type: 'manual', message: username });
        }
        if (password) {
          setError('password', { type: 'manual', message: password });
        }
        if (error.response.data?.message) {
          setErrorForm(error.response.data?.message);
        }
      } else {
        setErrorForm('Lỗi hệ thống, vui lòng liên hệ admin !');
      }
    },
  });

  const handleLoginStandard = async (data: UserSubmitForm) => {
    mutation.mutate(data);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UserSubmitForm) => {
    setErrorForm('');
    clearErrors(field);
    setValue(field, e.target.value);
  };

  return (
    <>
      {!userInfo && (
        <div className="flex w-full flex-col bg-[#f9fafb] md:h-lvh md:flex-row">
          <div
            className={`flex flex-col items-center justify-between p-4 shadow-[0_0_2px_0_rgba(145,158,171,0.2),0_12px_24px_-4px_rgba(145,158,171,0.12)] md:w-1/3 md:p-8`}
          >
            <img src={logo} alt="Logo" className=" w-[100px]" />
            <h3 className="text-center font-bold">
              Chào mừng đến với
              <br /> Coffee Store!
            </h3>
            <img src={loginBackground} alt="Logo" className="mb-auto mt-auto h-[150px] md:h-auto" />
          </div>
          <div className="flex flex-col items-center justify-center p-8 md:w-2/3">
            <h4 className="mb-9 font-bold">Đăng nhập vào Coffee Store</h4>
            <form onSubmit={handleSubmit(handleLoginStandard)}>
              <div className="flex w-full flex-col gap-6 md:w-[450px] lg:w-[500px]">
                <div>
                  <Input
                    color="blue"
                    label="Tên đăng nhập"
                    containerProps={{ className: 'h-14' }}
                    labelProps={{
                      className: 'peer-focus:!text-[12px] peer-placeholder-shown:!text-[18px]',
                    }}
                    {...register('username')}
                    error={Boolean(errors?.username)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e, 'username')}
                  />
                  {errors?.username && (
                    <Typography variant="small" color="gray" className="font-normal text-red-500">
                      {errors?.username?.message}
                    </Typography>
                  )}
                </div>
                <div>
                  <Input
                    color="blue"
                    type={showPassword ? 'text' : 'password'}
                    label="Mật khẩu"
                    containerProps={{ className: 'h-14' }}
                    labelProps={{
                      className: 'peer-focus:!text-[12px] peer-placeholder-shown:!text-[18px]',
                    }}
                    icon={
                      <i
                        onClick={() => setShowPassword(!showPassword)}
                        className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} absolute cursor-pointer rounded-full p-2.5 hover:bg-[#63738114]`}
                      />
                    }
                    {...register('password')}
                    error={Boolean(errors?.password)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e, 'password')}
                  />
                  {errors?.password && (
                    <Typography variant="small" color="gray" className="font-normal text-red-500">
                      {errors?.password?.message}
                    </Typography>
                  )}
                </div>
                {errorForm && (
                  <Input
                    type="text"
                    className="!border-none bg-[#ffd5dd] text-red-500 shadow-lg shadow-gray-900/5 ring-4 ring-transparent"
                    labelProps={{
                      className: 'hidden',
                    }}
                    value={'Email hoặc mật khẩu không đúng! Vui lòng kiểm tra lại!'}
                    containerProps={{ className: 'h-14' }}
                  />
                )}
                <p className="cursor-pointer text-right italic text-[#2065D1]">Quên mật khẩu?</p>
                <Button
                  loading={mutation.isPending}
                  type="submit"
                  className="flex h-12 justify-center bg-[#2065D1] text-base text-white hover:bg-[#103996]"
                  fullWidth
                >
                  Đăng nhập
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
