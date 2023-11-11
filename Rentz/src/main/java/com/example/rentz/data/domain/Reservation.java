package com.example.rentz.data.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;


@Entity
@Table(name = "reservations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private String itemId;

    @NotBlank
    private String ownerId;

    @NotBlank
    private Double totalPrice;

    @NotBlank
    private LocalDate bookedOn;

    @NotBlank
    private LocalDate bookedUntil;
}
