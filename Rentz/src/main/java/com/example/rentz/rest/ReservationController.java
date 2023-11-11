package com.example.rentz.rest;

import com.example.rentz.data.domain.Reservation;
import com.example.rentz.dto.request.ReservationCreateDto;
import com.example.rentz.dto.response.ReservationDto;
import com.example.rentz.exception.ResourceNotFoundException;
import com.example.rentz.mapper.ReservationMapper;
import com.example.rentz.service.ReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    private final ReservationMapper reservationMapper;
    private final ReservationService reservationService;

    public ReservationController(ReservationMapper reservationMapper, ReservationService reservationService) {
        this.reservationMapper = reservationMapper;
        this.reservationService = reservationService;
    }

    @GetMapping
    public ResponseEntity<List<ReservationDto>> getAllReservations() {

        List<ReservationDto> reservationDtoList = new ArrayList<>();
        reservationService.getAllReservations().forEach(reservation -> {
            reservationDtoList.add(reservationMapper.toReservationDto(reservation));
        });

        return ResponseEntity.ok(reservationDtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDto> getReservationById(@PathVariable String id) {

        Reservation reservation = reservationService.getReservationById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));


        return ResponseEntity.ok(this.reservationMapper.toReservationDto(reservation));
    }

    @PostMapping
    public ResponseEntity<ReservationDto> createReservation(@RequestBody ReservationCreateDto reservationCreateDto) {

        Reservation reservation = reservationMapper.toReservation(reservationCreateDto);

        Reservation createdReservation = reservationService.createReservation(reservation);

        return new ResponseEntity<>(this.reservationMapper.toReservationDto(createdReservation), HttpStatus.CREATED);
    }

//    @PutMapping("/{id}")
//    public void editReservation(@PathVariable String id, @Valid @RequestBody ReservationCreateDto reservationCreateDto) {
//
//        Reservation reservation = reservationService.getReservationById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));
//
//        this.reservationMapper.updateReservation(reservation, reservationCreateDto);
//        reservationService.editReservation(reservation);
//    }

    @DeleteMapping("/{id}")
    public void deleteReservationById(@PathVariable String id) {

        Reservation reservation = reservationService.getReservationById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));

        reservationService.deleteReservation(reservation);
    }
}