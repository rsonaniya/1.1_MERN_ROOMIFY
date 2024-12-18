import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function DetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="font-normal text-red-500">
            {errors.name.message}
          </span>
        )}
      </label>
      <div className="flex gap-4">
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "City Name is required" })}
          />
          {errors.city && (
            <span className="font-normal text-red-500">
              {errors.city.message}
            </span>
          )}
        </label>
        <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "Country Name is required" })}
          />
          {errors.country && (
            <span className="font-normal text-red-500">
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label htmlFor="" className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <span className="font-normal text-red-500">
            {errors.description.message}
          </span>
        )}
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("pricePerNight", {
            required: "Price Per Night Name is required",
          })}
        />
        {errors.pricePerNight && (
          <span className="font-normal text-red-500">
            {errors.pricePerNight.message}
          </span>
        )}
      </label>
      <label htmlFor="" className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("starRating", {
            required: "Star Rating is required",
          })}
        >
          <option value="" className="text-sm font-bold">
            Select a Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="font-normal text-red-500">
            {errors.starRating.message}
          </span>
        )}
      </label>
    </div>
  );
}
