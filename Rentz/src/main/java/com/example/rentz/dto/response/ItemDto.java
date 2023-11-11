package com.example.rentz.dto.response;

import lombok.*;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ItemDto {

    private String id;
    private String title;
    private String description;
    private boolean availableNow;
   // private List<String> pictures;
    private Long owner;
    private Long rentedBy;
}
