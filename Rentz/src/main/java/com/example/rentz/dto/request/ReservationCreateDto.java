package com.example.rentz.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationCreateDto {
    @NotBlank
    private String ownerId;

    @NotBlank
    private Double totalPrice;

    @NotBlank
    private LocalDate bookedOn;

    @NotBlank
    private Double priceForDay;

    @NotBlank
    private LocalDate bookedUntil;

}
