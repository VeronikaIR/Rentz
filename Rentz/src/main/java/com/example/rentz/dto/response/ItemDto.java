package com.example.rentz.dto.response;

import com.example.rentz.data.ItemType;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {

    private Long id;
    private String title;
    private String description;
    private boolean availableNow;
    private Double pricePerDay;
    private byte[] picture1Base64;
    private byte[] picture2Base64;
    private byte[] picture3Base64;
    private Long ownerId;
    private ItemType itemType;
    private List<LocalDate> reservationDates;
}
