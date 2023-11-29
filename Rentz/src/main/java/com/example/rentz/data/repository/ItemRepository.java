package com.example.rentz.data.repository;

import com.example.rentz.data.ItemType;
import com.example.rentz.data.domain.Item;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    Optional<Item> findById(Long id);

    List<Item> findByItemType(@NotBlank ItemType itemType);
}
