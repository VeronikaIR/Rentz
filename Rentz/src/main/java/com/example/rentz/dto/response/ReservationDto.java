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

    private String itemId;

    private String ownerId;

    private Double totalPrice;

    private LocalDate bookedOn;

    private LocalDate bookedUntil;

}
