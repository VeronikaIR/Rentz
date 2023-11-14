package com.example.rentz.data.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "ITEMS")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private boolean availableNow;

    @NotBlank
    private Double priceForDay;

//    @NotBlank
//    private List<String> pictures;

    @NotBlank
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    //@MapsId("owner_id")
    private User owner;

//    @JsonIgnore
//    @OneToOne(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
//    private Reservation reservation;
}
