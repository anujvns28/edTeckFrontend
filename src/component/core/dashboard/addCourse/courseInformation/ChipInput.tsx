import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { rootState } from "../../../../../reducer";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";

type FormData = {
  [key: string]: string[];
};

type ChipInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  errors: FieldErrors<FormData>;
};

const ChipInput = ({
  label,
  name,
  placeholder,
  register,
  setValue,
  errors,
}: ChipInputProps) => {
  
  const [tags, setTags] = useState<string[]>([]);
  const { course, editCourse } = useSelector((state: rootState) => state.course);

 
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      const value = e.currentTarget.value.trim();

      if (value && !tags.includes(value)) {
        const updatedTags = [...tags, value];
        setTags(updatedTags);
        e.currentTarget.value = "";
      }
    }
  };

  
  const handleDeleteChip = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  
  useEffect(() => {
    register(name, { required: true });

    if (editCourse && course?.tag) {
      setTags(course.tag as string[]);
    }
  }, [register, name, editCourse, course]);

  
  useEffect(() => {
    setValue(name, tags);
  }, [tags, setValue, name]);

  return (
    <div>
      <label className="text-sm text-richblack-5">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex w-full flex-wrap gap-y-2">
        {tags.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}

        <input
          className="form-style"
          placeholder={placeholder}
          name={name}
          onKeyDown={handleKeyDown}
        />
      </div>

      {errors[name as keyof FormData] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default ChipInput;