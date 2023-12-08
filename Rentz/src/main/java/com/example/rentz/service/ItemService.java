package com.example.rentz.service;

import com.example.rentz.data.ItemType;
import com.example.rentz.data.domain.CustomUserDetails;
import com.example.rentz.data.domain.Item;
import com.example.rentz.data.domain.User;
import com.example.rentz.data.repository.ItemRepository;
import com.example.rentz.dto.request.ItemCreateDto;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final UserService userService;

    public ItemService(ItemRepository itemRepository, UserService userService) {
        this.itemRepository = itemRepository;
        this.userService = userService;
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> getItemsByItemType(ItemType itemType) {
        return itemRepository.findByItemType(itemType);
    }

    public Optional<Item> getItemById(Long id) {
        return itemRepository.findById(id);
    }

    public Item createItem(ItemCreateDto itemCreateDto) throws IOException {

        Item item = new Item();
        item.setTitle(itemCreateDto.getTitle());
        item.setDescription(itemCreateDto.getDescription());
        item.setItemType(itemCreateDto.getItemType());
        item.setPricePerDay(itemCreateDto.getPricePerDay());
        item.setPicture1Base64(itemCreateDto.getPicture1().getBytes());
        item.setPicture2Base64(itemCreateDto.getPicture2().getBytes());
        item.setPicture3Base64(itemCreateDto.getPicture3().getBytes());

        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getFireBaseId(userDetails.getUid()).get();
        item.setOwner(user);


        return itemRepository.save(item);
    }

    public void editItem(Item item) {
        itemRepository.save(item);
    }

    public void deleteItem(Item item) {
        itemRepository.delete(item);
    }
}