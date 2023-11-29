package com.example.rentz.service;

import com.example.rentz.data.ItemType;
import com.example.rentz.data.domain.Item;
import com.example.rentz.data.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> getItemsByItemType(ItemType itemType){return itemRepository.findByItemType(itemType);}

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    public void editItem(Item item) {
        itemRepository.save(item);
    }

    public void deleteItem(Item item) {
        itemRepository.delete(item);
    }
}