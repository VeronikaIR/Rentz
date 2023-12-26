package com.example.rentz.data.repository;

import com.example.rentz.data.domain.Reservation;
import com.example.rentz.data.domain.User;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {

    Optional<Reservation> findById(Long id);

    List<Reservation> findAllByOwner(@NotBlank User owner);
}
