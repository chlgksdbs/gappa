package com.sixheadword.gappa.friendRequest;

import com.sixheadword.gappa.friendList.FriendList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

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

    public Optional<FriendRequest> findByUserSeqs(Long member_id, Long user_seq){
        return em.createQuery("select R from FriendRequest R where (R.toUser.id = :member_id and R.fromUser.id = :user_seq) or (R.toUser.id = :user_seq and R.fromUser.id = :member_id) and R.state = 'A'", FriendRequest.class)
                .setParameter("member_id", member_id)
                .setParameter("user_seq", user_seq)
                .getResultStream()
                .findFirst();
    }

    public boolean existsByUserSeqs(Long member_id, Long user_seq){
        Long count = em.createQuery("select count(R) from FriendRequest R where R.toUser.id = :user_seq and R.fromUser.id = :member_id and R.state = 'W'", Long.class)
                .setParameter("member_id", member_id)
                .setParameter("user_seq", user_seq)
                .getSingleResult();

        return count > 0;
    }


}
