package com.sixheadword.gappa.friendList;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class FriendListRepository {

    private final EntityManager em;

    public void save(FriendList friendList) {
        em.persist(friendList);
    }
}
