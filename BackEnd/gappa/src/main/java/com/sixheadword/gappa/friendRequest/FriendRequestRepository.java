package com.sixheadword.gappa.friendRequest;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class FriendRequestRepository {

    private final EntityManager em;

    public void save(FriendRequest friendRequest) {
        em.persist(friendRequest);
    }

    public FriendRequest findById(Long id){
        return em.find(FriendRequest.class, id);
    }

    public List<FriendRequest> findRequestsById(Long id){
        return em.createQuery("select R from FriendRequest R where R.toUser.id = :member_id and R.state = 'W' order by R.requestDate Desc", FriendRequest.class)
                .setParameter("member_id", id)
                .getResultList();
    }

}
