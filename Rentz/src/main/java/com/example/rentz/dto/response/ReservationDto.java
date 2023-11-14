package com.example.rentz.dto.response;


import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDto {

    private Long id;

    private Long ownerId;

    private Long itemId;

    private Double totalPrice;

    private LocalDate bookedOn;

    private LocalDate bookedUntil;

}
