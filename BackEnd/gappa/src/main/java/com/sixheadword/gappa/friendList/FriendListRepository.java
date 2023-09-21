package com.sixheadword.gappa.friendList;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class FriendListRepository {

    private final EntityManager em;

    public void save(FriendList friendList) {
        em.persist(friendList);
    }

    public List<FriendList> findListById(Long id) {
        return em.createQuery("select L from FriendList L where L.fromUser.id = :member_id or L.toUser.id = :member_id", FriendList.class)
                .setParameter("member_id", id)
                .getResultList();
    }
}
