package com.example.rentz.dto.request;

import com.example.rentz.data.ItemType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemCreateDto {

    @NotBlank
    @Size(max = 55)
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private boolean availableNow;

    @NotBlank
    private Double priceForDay;

    //TODO implement logic for storing pictures
    // private List<String> pictures;

    @NotBlank
    private Long ownerId;

    @NotBlank
    private ItemType itemType;

}
