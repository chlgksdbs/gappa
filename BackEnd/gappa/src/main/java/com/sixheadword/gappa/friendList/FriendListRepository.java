package com.sixheadword.gappa.friendList;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class FriendListRepository {

    private final EntityManager em;

    public Optional<FriendList> findByUserSeqs(Long member_id, Long user_seq){
        return em.createQuery("select L from FriendList L where (L.toUser.id = :member_id and L.fromUser.id = :user_seq) or (L.toUser.id = :user_seq and L.fromUser.id = :member_id)", FriendList.class)
                .setParameter("member_id", member_id)
                .setParameter("user_seq", user_seq)
                .getResultStream()
                .findFirst();
    }

    public void save(FriendList friendList) {
        em.persist(friendList);
    }

    public void delete(FriendList friendList){
        em.remove(friendList);
    }

    public List<FriendList> findListById(Long id) {
        return em.createQuery("select L from FriendList L where L.fromUser.id = :member_id or L.toUser.id = :member_id", FriendList.class)
                .setParameter("member_id", id)
                .getResultList();
    }
}
