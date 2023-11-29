package com.example.rentz.dto.response;

import com.example.rentz.data.ItemType;
import com.example.rentz.data.domain.User;
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
    // private List<String> pictures;
    private Long ownerId;
    private ItemType itemType;
//    private Long reservationId;
}
