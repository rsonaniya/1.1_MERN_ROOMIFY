import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function GuestSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="bg-gray-300 grid grid-cols-2 gap-5 p-6">
        <label
          htmlFor=""
          className="text-gray-700 text-sm font-semibold flex-1"
        >
          Adults
          <input
            type="number"
            min={1}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("adultCount", { required: "Adult Count is required" })}
          />
          {errors.adultCount && (
            <span className="font-normal text-red-500">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label
          htmlFor=""
          className="text-gray-700 text-sm font-semibold flex-1"
        >
          Children
          <input
            type="number"
            min={0}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("childCount", { required: "Child Count is required" })}
          />
          {errors.adultCount && (
            <span className="font-normal text-red-500">
              {errors.adultCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
}
