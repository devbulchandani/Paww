package com.example.paww.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.paww.dto.DogCreateRequest;
import com.example.paww.dto.DogResponse;
import com.example.paww.dto.DogSearchParams;
import com.example.paww.models.Dog;
import com.example.paww.models.User;
import com.example.paww.repository.DogRepository;
import com.example.paww.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DogService {
    private final DogRepository dogs;
    private final UserRepository users;
    private final Cloudinary cloudinary;

    @Transactional
    public DogResponse create(UUID registrantId, DogCreateRequest req, MultipartFile image) {
        User registrant = users.findById(registrantId)
                .orElseThrow(() -> new IllegalArgumentException("Registrant not found"));

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            try {
                var uploadResult = cloudinary.uploader().upload(
                        image.getBytes(),
                        ObjectUtils.asMap("folder", "dogs")
                );
                imageUrl = uploadResult.get("secure_url").toString();

            } catch (Exception e) {
                throw new RuntimeException("Failed to upload image", e);
            }
        }

        Dog d = new Dog();
        d.setName(req.getName());
        d.setDescription(req.getDescription());
        d.setAge(req.getAge());
        d.setGender(req.getGender());
        d.setAddress(req.getAddress());
        d.setVaccinatedStatus(req.getVaccinatedStatus());
        d.setImageUrl(imageUrl);
        d.setRegisteredBy(registrant);

        dogs.save(d);
        return toResponse(d);
    }

    public DogResponse get(UUID id){
        return dogs.findById(id).map(this::toResponse).orElse(null);
    }

    public List<DogResponse> search(DogSearchParams p){
        List<Dog> dogList = dogs.findAll();

        return dogList.stream()
                .filter(d -> p.getGender() == null || d.getGender().equals(p.getGender()))
                .filter(d -> p.getVaccinated() == null || d.getVaccinatedStatus().equals(p.getVaccinated()))
                .filter(d -> p.getMaxAge() <= 0 || (d.getAge() != null && d.getAge() <= p.getMaxAge()))


                .filter(d -> p.getState() == null ||
                        (d.getAddress() != null && p.getState().equalsIgnoreCase(d.getAddress().getState())))
                .filter(d -> p.getCity() == null ||
                        (d.getAddress() != null && p.getCity().equalsIgnoreCase(d.getAddress().getCity())))
                .filter(d -> p.getLocality() == null ||
                        (d.getAddress() != null && p.getLocality().equalsIgnoreCase(d.getAddress().getLocality())))
                .filter(d -> p.getStreet() == null ||
                        (d.getAddress() != null && p.getStreet().equalsIgnoreCase(d.getAddress().getStreet())))
                .filter(d -> p.getPostalCode() == null ||
                        (d.getAddress() != null && p.getPostalCode().equalsIgnoreCase(d.getAddress().getPincode())))

                .map(this::toResponse)
                .collect(Collectors.toList());

    }

    private DogResponse toResponse(Dog d) {
        return new DogResponse(
                d.getId(),
                d.getName(),
                d.getDescription(),
                d.getAge(),
                d.getGender(),
                d.getImageUrl(),
                d.getAddress(),
                d.getVaccinatedStatus(),
                d.getRegisteredBy() != null ? d.getRegisteredBy().getName() : null,
                d.getRegisteredBy() != null ? d.getRegisteredBy().getPhone() : null
        );
    }
}



