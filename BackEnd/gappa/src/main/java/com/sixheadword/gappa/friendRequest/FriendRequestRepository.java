package com.sixheadword.gappa.friendRequest;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class FriendRequestRepository {

    private final EntityManager em;

    public void save(FriendRequest friendRequest) {
        em.persist(friendRequest);
    }
}
