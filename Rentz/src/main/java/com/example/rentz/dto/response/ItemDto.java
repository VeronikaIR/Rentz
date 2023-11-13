package com.example.rentz.dto.response;

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
    private Long rentedById;
}
