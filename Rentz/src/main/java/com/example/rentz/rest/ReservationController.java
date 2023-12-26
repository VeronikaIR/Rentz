package com.example.rentz.rest;

import com.example.rentz.data.domain.Item;
import com.example.rentz.data.domain.Reservation;
import com.example.rentz.data.domain.User;
import com.example.rentz.dto.request.ReservationCreateDto;
import com.example.rentz.dto.response.ReservationDto;
import com.example.rentz.exception.ResourceNotFoundException;
import com.example.rentz.mapper.ReservationMapper;
import com.example.rentz.service.ItemService;
import com.example.rentz.service.ReservationService;
import com.example.rentz.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationMapper reservationMapper;
    private final ReservationService reservationService;

    private final UserService userService;
    private final ItemService itemService;

    public ReservationController(ReservationMapper reservationMapper, ReservationService reservationService, UserService userService, ItemService itemService) {
        this.reservationMapper = reservationMapper;
        this.reservationService = reservationService;
        this.userService = userService;
        this.itemService = itemService;
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
    public ResponseEntity<ReservationDto> getReservationById(@PathVariable Long id) {

        Reservation reservation = reservationService.getReservationById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));


        return ResponseEntity.ok(this.reservationMapper.toReservationDto(reservation));
    }


    @GetMapping("/owner/{id}")
    public ResponseEntity<List<ReservationDto>> getReservationsByUser(@PathVariable Long id) {

        User user = userService.getUserById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        List<Reservation> reservations = reservationService.getReservationByOwner(user);
        List<ReservationDto> toReturn = new ArrayList<>();
        reservations.forEach((reservation -> {
            ReservationDto reservationDto = this.reservationMapper.toReservationDto(reservation);
            reservationDto.setItemTitle(reservation.getItem().getTitle());
            toReturn.add(reservationDto);
        }
        ));

        return ResponseEntity.ok(toReturn);
    }

    @PostMapping
    public ResponseEntity<String> createReservation(@RequestBody List<ReservationCreateDto> reservationCreateDtoList) {

        User user = this.userService.getUserById(reservationCreateDtoList.get(0).getOwnerId()).orElseThrow(() -> new ResourceNotFoundException("User not found!"));

        reservationCreateDtoList.forEach(reservationCreateDto -> {
            Item item = this.itemService.getItemById(reservationCreateDto.getItemId()).orElseThrow(() -> new ResourceNotFoundException("Item not found!"));

            Reservation reservation = reservationMapper.toReservation(reservationCreateDto);
            reservation.setOwner(user);
            reservation.setItem(item);
            reservationService.createReservation(reservation);
        });


        return ResponseEntity.status(HttpStatus.CREATED).body("{\"message\": \"created\"}");
    }

//    @PutMapping("/{id}")
//    public void editReservation(@PathVariable Long id, @Valid @RequestBody ReservationCreateDto reservationCreateDto) {
//
//        Reservation reservation = reservationService.getReservationById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));
//
//        this.reservationMapper.updateReservation(reservation, reservationCreateDto);
//        reservationService.editReservation(reservation);
//    }

    @DeleteMapping("/{id}")
    public void deleteReservationById(@PathVariable Long id) {

        Reservation reservation = reservationService.getReservationById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found"));

        reservationService.deleteReservation(reservation);
    }
}