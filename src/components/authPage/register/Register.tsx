import { RegisterButton } from "../../../shared/buttons/RegisterButton";
import { registerThunk } from "../../../redux/auth/operations";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../../../helpers/schemas";
import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  AuthLink,
  PasswordToggle,
  StyledAuthForm,
  StyledAuthInput,
  StyledRegisterWrapp,
  StyledTitle,
  ValidationError,
  WrapInPass,
} from "../AuthPages.styled";

import { useState } from "react";
import sprite from "../../../images/icons/sprite.svg";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schemaRegister),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordValid = () => {
    return password.length >= 8 && password.length <= 64 && !errors.password;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setValue("password", passwordValue);
  };

  const submit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await dispatch(registerThunk(data)).unwrap();
      reset();
      navigate("/");
      toast.success("Registration successful!");
    } catch (error) {
      navigate("/");
      toast.error("Registration failed. Are you using this email already?");
    }
  };

  return (
    <StyledRegisterWrapp>
      <StyledTitle>Sign Up</StyledTitle>
      <StyledAuthForm onSubmit={handleSubmit(submit)}>
        <StyledAuthInput type="text" placeholder="Name" {...register("name")} />
        {errors?.name && (
          <ValidationError>{errors.name.message}</ValidationError>
        )}
        <StyledAuthInput
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors?.email && (
          <ValidationError>{errors.email.message}</ValidationError>
        )}

        <WrapInPass>
          <StyledAuthInput
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            onChange={handlePasswordChange}
            className={`${
              password.length === 0
                ? "empty"
                : isPasswordValid()
                ? "valid"
                : "invalid"
            }`}
          />
          <PasswordToggle
            onClick={() => togglePasswordVisibility()}
            type="button"
          >
            {showPassword ? (
              <svg>
                <use
                  xlinkHref={`${sprite}#icon-eye`}
                  width={18}
                  height={18}
                ></use>
              </svg>
            ) : (
              <svg>
                <use
                  xlinkHref={`${sprite}#icon-eye-off`}
                  width={18}
                  height={18}
                ></use>
              </svg>
            )}
          </PasswordToggle>
        </WrapInPass>
        {errors?.password && (
          <ValidationError>{errors.password.message}</ValidationError>
        )}
        <RegisterButton onClick={handleSubmit(submit)}>Register</RegisterButton>
      </StyledAuthForm>
      <AuthLink to="/auth/login">Login</AuthLink>
    </StyledRegisterWrapp>
  );
};

export default Register;
