import React, { useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import { rootState } from "../../../../../reducer";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";


type FormData = {
  [key: string]: File | string;
};

type UploaderProps = {
  name: string;
  label: string;
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  errors: FieldErrors<FormData>;
};

const Uploader = ({
  setValue,
  register,
  name,
  label,
  errors,
}: UploaderProps) => {
  
  const [preViewFile, setPreViewFile] = useState<string | null>(null);

  const { course, editCourse } = useSelector(
    (state: rootState) => state.course
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  //  open file dialog
  const handleClick = () => {
    inputRef.current?.click();
  };

  //  file change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setPreViewFile(URL.createObjectURL(file as File));
    setValue(name, file as any);
  };

  // register + edit mode
  useEffect(() => {
    register(name, { required: true });

    if (editCourse && course?.thumbnail) {
      setPreViewFile(course.thumbnail as string);
    }
  }, [register, name, editCourse, course]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label}
      </label>

      <div className="bg-richblack-700 flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500">
        {preViewFile ? (
          <div className="flex w-full flex-col p-6">
            <img
              src={preViewFile}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />

            <button
              type="button"
              onClick={() => setPreViewFile(null)}
              className="mt-3 text-richblack-400 underline"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div
            onClick={handleClick}
            className="flex w-full flex-col items-center p-6"
          >
            <input
              ref={inputRef}
              onChange={handleChange}
              type="file"
              className="invisible"
              accept="image/*"
            />

            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Upload Image
            </p>

            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name as keyof FormData] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default Uploader;