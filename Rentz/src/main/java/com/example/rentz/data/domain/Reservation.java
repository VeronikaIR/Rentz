package com.example.rentz.data.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;


@Entity
@Table(name = "RESERVATIONS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @NotBlank
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reservedBy_id", referencedColumnName = "id")
    private User owner;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bookedItem_id", referencedColumnName = "id")
    private Item bookedItem;

    @NotBlank
    private Double totalPrice;

    @NotBlank
    private LocalDate bookedOn;

    @NotBlank
    private LocalDate bookedUntil;
}
