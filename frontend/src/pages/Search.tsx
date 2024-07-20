import { useSearchContext } from "../contexts/SearchContext";
import { useQuery } from "react-query";
import * as apiClient from '../api-client';
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";

const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
    };

    const { data: hotelData } = useQuery(["searchHotels", searchParams], () => apiClient.searchHotel(searchParams));

    const handleStarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;

        setSelectedStars((prevStars) => event.target.checked ? [...prevStars, starRating] : prevStars.filter((star) => star !== starRating));
    };

    const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const hotelType = event.target.value;

        setSelectedHotelTypes((prevHotelTypes) => event.target.checked ? [...prevHotelTypes, hotelType] : prevHotelTypes.filter((hotelT) => hotelT !== hotelType));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarChange} />
                    <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} Hotels Found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>
                    {/* {TODO SORT OPTIONS} */}
                </div>
                {hotelData?.data.map((hotel) => (
                    <SearchResultsCard hotel={hotel} />
                ))}
                <div>
                    <Pagination page={hotelData?.pagination.page || 1} pages={hotelData?.pagination.pages || 1} onPageChange={(page) => setPage(page)} />
                </div>
            </div>
        </div>
    )
}

export default Search;