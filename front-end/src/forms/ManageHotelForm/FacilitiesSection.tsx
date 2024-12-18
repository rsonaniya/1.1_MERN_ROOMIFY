import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

export default function FacilitiesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className="flex text-sm gap-1 items-center text-gray-700"
          >
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) return true;
                  else return "At least one facility is required";
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="font-normal text-red-500">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
}
