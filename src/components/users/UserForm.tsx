import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../common/Input";
import Button from "../common/Button";

import { userSchema, type UserFormData } from "../../utils/validation";

import type { User } from "../../types/user";

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  initialData?: User | null;
}

const UserForm = ({ onSubmit, initialData }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        email: initialData.email,
        role: initialData.role,
        status: initialData.status,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Name" {...register("name")} error={errors.name?.message} />

      <Input
        label="Email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input label="Role" {...register("role")} error={errors.role?.message} />

      <select
        {...register("status")}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="active">Active</option>

        <option value="inactive">Inactive</option>

        <option value="pending">Pending</option>

      </select>

      <Button type="submit">Save User</Button>
    </form>
  );
};

export default UserForm;
