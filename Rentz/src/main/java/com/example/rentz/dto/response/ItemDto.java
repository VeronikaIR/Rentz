package com.example.rentz.dto.response;

import com.example.rentz.data.ItemType;
import lombok.*;

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
    private Double priceForDay;
    private byte[] picture1Base64;
    private byte[] picture2Base64;
    private byte[] picture3Base64;
    private Long ownerId;
    private ItemType itemType;
//    private Long reservationId;
}
