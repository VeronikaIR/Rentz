package com.example.rentz.data.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ITEMS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User owner;

     @JsonIgnore
     @OneToMany(mappedBy = "bookedItem")
     private List<Reservation> reservations = new ArrayList<>();

   // @OneToOne(cascade = CascadeType.ALL)
    //private User rented;
}
