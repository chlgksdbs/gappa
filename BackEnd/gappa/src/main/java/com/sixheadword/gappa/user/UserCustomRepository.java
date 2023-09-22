package com.sixheadword.gappa.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class UserCustomRepository {

    private final EntityManager em;

    public Optional<User> findByNamePhone(String name, String phone){
        return em.createQuery("select U from User U where U.name = :name and U.phone = :phone", User.class)
                .setParameter("name", name)
                .setParameter("phone", phone)
                .getResultStream()
                .findFirst();
    }
}
