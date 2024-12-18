import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";

export default function AddHotel() {
  const { showToast } = useAppContext();
  const { isLoading, mutate } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({
        type: "SUCCESS",
        message: "Hotel Added Successfully",
      });
    },
    onError: (error: Error) => {
      showToast({
        type: "ERROR",
        message: error.message,
      });
    },
  });

  const handleSave = (HotelFormData: FormData) => {
    mutate(HotelFormData);
  };
  return (
    <div>
      <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    </div>
  );
}
