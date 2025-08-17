import React, { useState, useEffect } from "react";
import { dogAPI, locationAPI } from "../../services/api";
import type { Dog, DogSearchParams } from "../../types";
import DogCard from "./DogCard";

const DogSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useState<DogSearchParams>({});
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [localities, setLocalities] = useState<string[]>([]);
  const [streets, setStreets] = useState<string[]>([]);
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [stateList, dogList] = await Promise.all([
          locationAPI.getStates(),
          dogAPI.search({}),
        ]);
        setStates(stateList);
        setDogs(dogList);
      } catch (err) {
        setError("Failed to load data");
      }
    };
    loadInitialData();
  }, []);

  // Load cities when state changes
  useEffect(() => {
    if (searchParams.state) {
      const loadCities = async () => {
        try {
          const cityList = await locationAPI.getCities(searchParams.state!);
          setCities(cityList);
          // Reset dependent fields
          setSearchParams((prev) => ({
            ...prev,
            city: undefined,
            locality: undefined,
            street: undefined,
          }));
          setLocalities([]);
          setStreets([]);
        } catch (err) {
          console.error("Failed to load cities:", err);
        }
      };
      loadCities();
    }
  }, [searchParams.state]);

  // Load localities when city changes
  useEffect(() => {
    if (searchParams.state && searchParams.city) {
      const loadLocalities = async () => {
        try {
          const localityList = await locationAPI.getLocalities(
            searchParams.state!,
            searchParams.city!
          );
          setLocalities(localityList);
          // Reset dependent fields
          setSearchParams((prev) => ({
            ...prev,
            locality: undefined,
            street: undefined,
          }));
          setStreets([]);
        } catch (err) {
          console.error("Failed to load localities:", err);
        }
      };
      loadLocalities();
    }
  }, [searchParams.state, searchParams.city]);

  // Load streets when locality changes
  useEffect(() => {
    if (searchParams.state && searchParams.city && searchParams.locality) {
      const loadStreets = async () => {
        try {
          const streetList = await locationAPI.getStreets(
            searchParams.state!,
            searchParams.city!,
            searchParams.locality!
          );
          setStreets(streetList);
          // Reset street field
          setSearchParams((prev) => ({
            ...prev,
            street: undefined,
          }));
        } catch (err) {
          console.error("Failed to load streets:", err);
        }
      };
      loadStreets();
    }
  }, [searchParams.state, searchParams.city, searchParams.locality]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setSearchParams((prev) => ({
        ...prev,
        [name]: target.checked ? true : undefined,
      }));
    } else {
      setSearchParams((prev) => ({
        ...prev,
        [name]: value || undefined,
      }));
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const results = await dogAPI.search(searchParams);
      setDogs(results);
    } catch (err) {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = async () => {
    setSearchParams({});
    setCities([]);
    setLocalities([]);
    setStreets([]);

    try {
      const results = await dogAPI.search({});
      setDogs(results);
    } catch (err) {
      setError("Failed to load dogs");
    }
  };

  const handleAdopt = (dog: Dog) => {
    setSelectedDog(dog);
    setShowContactModal(true);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
    setSelectedDog(null);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Find Dogs for Adoption</h2>

        {/* Search Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={searchParams.gender || ""}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="UNKNOWN">Unknown</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="maxAge"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Max Age (years)
            </label>
            <input
              type="number"
              id="maxAge"
              name="maxAge"
              value={searchParams.maxAge || ""}
              onChange={handleSearchChange}
              min="0"
              max="25"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any age"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="vaccinated"
              name="vaccinated"
              checked={searchParams.vaccinated || false}
              onChange={handleSearchChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="vaccinated"
              className="ml-2 block text-sm text-gray-700"
            >
              Vaccinated only
            </label>
          </div>
        </div>

        {/* Location Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              State
            </label>
            <select
              id="state"
              name="state"
              value={searchParams.state || ""}
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Any State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <select
              id="city"
              name="city"
              value={searchParams.city || ""}
              onChange={handleSearchChange}
              disabled={!searchParams.state}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="">Any City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="locality"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Locality
            </label>
            <select
              id="locality"
              name="locality"
              value={searchParams.locality || ""}
              onChange={handleSearchChange}
              disabled={!searchParams.city}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="">Any Locality</option>
              {localities.map((locality) => (
                <option key={locality} value={locality}>
                  {locality}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Street
            </label>
            <select
              id="street"
              name="street"
              value={searchParams.street || ""}
              onChange={handleSearchChange}
              disabled={!searchParams.locality}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="">Any Street</option>
              {streets.map((street) => (
                <option key={street} value={street}>
                  {street}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="pincode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={searchParams.pincode || ""}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter pincode"
          />
        </div>

        {/* Search Buttons */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search Dogs"}
          </button>

          <button
            onClick={handleClearFilters}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Results */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {dogs.length} {dogs.length === 1 ? "dog" : "dogs"} found
        </h3>

        {dogs.length === 0 && !loading ? (
          <div className="text-center py-8 text-gray-500">
            No dogs found matching your criteria. Try adjusting your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} onAdopt={handleAdopt} />
            ))}
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && selectedDog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <p className="text-gray-600 mb-4">
              To adopt <strong>{selectedDog.name}</strong>, please contact:
            </p>

            <div className="space-y-2 mb-6">
              <p>
                <strong>Name:</strong> {selectedDog.registrantName}
              </p>
              <p>
                <strong>Phone:</strong> {selectedDog.registrantPhone}
              </p>
            </div>

            <div className="flex space-x-4">
              <a
                href={`tel:${selectedDog.registrantPhone}`}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex-1 text-center"
              >
                Call Now
              </a>
              <a
                href={`https://wa.me/${selectedDog.registrantPhone?.replace(
                  /[^0-9]/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex-1 text-center"
              >
                WhatsApp
              </a>
            </div>

            <button
              onClick={closeContactModal}
              className="w-full mt-4 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DogSearch;
