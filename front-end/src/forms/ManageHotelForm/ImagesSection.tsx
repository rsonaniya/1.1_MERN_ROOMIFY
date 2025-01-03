import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function ImagesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          multiple
          accept="image/*"
          type="file"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              if (totalLength === 0)
                return "At least one image should be added";
              if (totalLength > 6)
                return "Total number of images can not be more than 6";
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="font-normal text-red-500">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
}
