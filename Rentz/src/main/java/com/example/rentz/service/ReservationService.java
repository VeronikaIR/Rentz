package com.example.rentz.service;

import com.example.rentz.data.domain.Reservation;
import com.example.rentz.data.domain.User;
import com.example.rentz.data.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }


    public Optional<Reservation> getReservationByOwner(User user) {
        return reservationRepository.findByOwner(user);
    }

    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public void editReservation(Reservation reservation) {
        reservationRepository.save(reservation);
    }

    public void deleteReservation(Reservation reservation) {
        reservationRepository.delete(reservation);
    }
}