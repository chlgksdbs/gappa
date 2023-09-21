package com.sixheadword.gappa.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class UserCustomRepository {

    private final EntityManager em;

}
