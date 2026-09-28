"use client";

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Country, City } from "country-state-city"
import Select from 'react-select';
import { GlobeIcon } from "@heroicons/react/solid"; 



type option = {
    value: {
        latitude: string;
        longitude: string;
        isoCode: string;
    },
    label: string;
} | null;

type cityOption = {
    value: {
        latitude: string;
        longitude: string;
        countryCode: string;
        name: string;
        stateCode: string;
    },
    label: string;
} | null;




const options = Country.getAllCountries().map(country => ({
    value: {
       latitude: country.latitude,
        longitude: country.longitude,
        isoCode: country.isoCode,
    },
    label: country.name,
}));




function CityPicker() {
    const [selectedCountry, setSelectedCountry] = useState<option>(null);
    const [selectedCity, setSelectedCity] = useState<cityOption>(null);
    const router = useRouter();

    // Filtering the full city list is expensive, so only redo it when the country changes
    const cityOptions = useMemo(
        () =>
            selectedCountry
                ? City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map(city => ({
                    value: {
                        latitude: city.latitude!,
                        longitude: city.longitude!,
                        countryCode: city.countryCode,
                        name: city.name,
                        stateCode: city.stateCode,
                    },
                    label: city.name,
                }))
                : [],
        [selectedCountry]
    );

    const handleSelectedCountry = (option: option) => {
        setSelectedCountry(option);
        setSelectedCity(null);
    }

    const handleSelectedCity = (option: cityOption) => {
        setSelectedCity(option);
        if (!option) return;
        const { name, latitude, longitude } = option.value;
        router.push(`/location/${encodeURIComponent(name)}/${latitude}/${longitude}`)
    }

  return (
    <div className='space-y-4'>
        <div className='space-y-2'>
        <div className='flex items-center space-x-2 text-white/80'>
            <GlobeIcon className='h-5 w-5 text-white'/>
            <label htmlFor="country" className='text-white font-bold'>Country</label>
        </div>
        <Select
        inputId='country'
        className='text-black'
        value={selectedCountry}
        onChange={handleSelectedCountry} 
        options={options} 
        />
        </div>

        {selectedCountry && (
            <div className='space-y-2'>
            <div className='flex items-center space-x-2 text-white/80'>
                <GlobeIcon className='h-5 w-5 text-white'/>
                <label htmlFor="city" className='text-white font-bold'>City</label>
            </div>
            <Select
            inputId='city'
            className='text-black'
            value={selectedCity}
            onChange={handleSelectedCity} 
            options={cityOptions} 
            />
            </div>
        )}
    </div>
  )
}

export default CityPicker
