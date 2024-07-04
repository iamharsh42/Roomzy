import { useForm, FormProvider } from "react-hook-form";
import DetailsSection from "./DetailsSection";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    adultCount: number;
    childCount: number;
}

const ManageHotelForm = () => {
    const fromMethods = useForm<HotelFormData>();
    return (
        <FormProvider {...fromMethods}>
            <form>
                <DetailsSection />
            </form>
        </FormProvider>
    )
}

export default ManageHotelForm;