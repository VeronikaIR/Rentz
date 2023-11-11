package com.example.rentz.data.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private String id;

    @NotBlank
    private String title;

    @Lob
    @NotBlank
    private String description;

    @NotBlank
    private boolean availableNow;

    @NotBlank
    private Double priceForDay;

//    @NotBlank
//    private List<String> pictures;

    @NotBlank
  //  @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private String owner;

    //  @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rentedBy_id", referencedColumnName = "id")
    private String rentedBy;

    //    public Item() {
//    }
//
//    public Item(String title, String description, boolean availableNow, String owner, String rentedBy) {
//        this.title = title;
//        this.description = description;
//        this.availableNow = availableNow;
//        // this.pictures = pictures;
//        this.owner = owner;
//        this.rentedBy = rentedBy;
//    }
}
