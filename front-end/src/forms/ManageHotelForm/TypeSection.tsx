import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

export default function TypeSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const selectedType = watch("type");
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              selectedType === type
                ? "rounded-full bg-blue-800 text-white px-4 py-2 cursor-pointer text-sm font-semibold"
                : "rounded-full bg-gray-300 px-4 py-2 cursor-pointer text-sm font-semibold"
            }
          >
            <input
              type="radio"
              className="hidden"
              value={type}
              {...register("type", { required: "Hotel Type is required" })}
            />
            {type}
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="font-normal text-red-500">{errors.type.message}</span>
      )}
    </div>
  );
}
