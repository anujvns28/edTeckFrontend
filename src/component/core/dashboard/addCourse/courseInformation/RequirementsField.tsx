import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rootState } from "../../../../../reducer";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";

//  Form type
type FormData = {
  [key: string]: string[];
};

type RequirementsFieldProps = {
  label: string;
  name: string;
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  errors: FieldErrors<FormData>;
};

const RequirementsField = ({
  label,
  name,
  register,
  setValue,
  errors,
}: RequirementsFieldProps) => {
  
  const [requirement, setRequirement] = useState<string>("");
  const [requirementList, setRequirementList] = useState<string[]>([]);

  const { editCourse, course } = useSelector(
    (state: rootState) => state.course
  );

  //  add requirement
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const value = requirement.trim();

    if (value && !requirementList.includes(value)) {
      setRequirementList((prev) => [...prev, value]);
      setRequirement(""); // clear input
    }
  };

  //  remove requirement
  const handleRemoveRequirement = (index: number) => {
    const updated = requirementList.filter((_, i) => i !== index);
    setRequirementList(updated);
  };

  // register + edit mode
  useEffect(() => {
    register(name, { required: true });

    if (editCourse && course?.instructions) {
      setRequirementList(course.instructions as string[]);
    }
  }, [register, name, editCourse, course]);

  // sync with react-hook-form
  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList, setValue, name]);

  return (
    <div>
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRequirement(e.target.value)
          }
          className="form-style w-full"
        />

        <button
          type="button"
          onClick={handleClick}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

      {errors[name as keyof FormData] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}

      {requirementList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementList.map((item, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{item}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300"
                onClick={() => handleRemoveRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequirementsField;