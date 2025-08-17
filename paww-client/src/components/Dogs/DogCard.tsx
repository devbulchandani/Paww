import React from 'react';
import type { Dog } from '../../types';

interface DogCardProps {
  dog: Dog;
  onAdopt?: (dog: Dog) => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, onAdopt }) => {
  const handleAdoptClick = () => {
    if (onAdopt) {
      onAdopt(dog);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {dog.imageUrl && (
        <img
          src={dog.imageUrl}
          alt={dog.name}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{dog.name}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            dog.vaccinatedStatus 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {dog.vaccinatedStatus ? 'Vaccinated' : 'Not Vaccinated'}
          </span>
        </div>

        {dog.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {dog.description}
          </p>
        )}

        <div className="space-y-1 text-sm text-gray-500 mb-3">
          {dog.age && (
            <p>Age: {dog.age} {dog.age === 1 ? 'year' : 'years'}</p>
          )}
          <p>Gender: {dog.gender.toLowerCase()}</p>
          <p>Location: {dog.address.city}, {dog.address.state}</p>
        </div>

        {onAdopt && (
          <button
            onClick={handleAdoptClick}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact for Adoption
          </button>
        )}
      </div>
    </div>
  );
};

export default DogCard;