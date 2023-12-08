package com.example.rentz.dto.request;

import com.example.rentz.data.ItemType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

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
    private ItemType itemType;

    @NotBlank
    private MultipartFile picture1;

    @NotBlank
    private MultipartFile picture2;

    @NotBlank
    private MultipartFile picture3;

    @NotBlank
    private Double pricePerDay;

//    @NotBlank
//    private Long ownerId;


}
