package com.sixheadword.gappa.loan.repository;

import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long>, LoanRepositoryCustom {
    // 대출 이력 조회
    List<Loan> findByFromUser(User user);

    // 대금 이력 조회
    List<Loan> findByToUser(User user);

    // 대출 이력 건수 조회
    Long countLoanByToUser(User user);

    // 대금 이력 건수 조회
    Long countLoanByFromUser(User user);

    // 대출 연체 건수 조회 (현재 시점 기준)
    Long countLoanByRedemptionDateGreaterThanAndFromUser(LocalDateTime now, User user);

    // 대출 정상 상환 건수 조회
    // "SELECT l FROM Loan l WHERE l.fromUser = :userSeq AND l.redemptionDate >= l.expiredDate"
    @Query(nativeQuery = true, value = "SELECT count(*) FROM loan l JOIN user u ON l.from_user = u.user_seq WHERE u.user_seq = :userSeq AND l.redemption_date >= l.expired_date")
    Long countLoanByUserSeq(@Param("userSeq") Long userSeq);

    // 대출 상태에 따른 대출 건 조회
    List<Loan> findByStatusEquals(char status);
    
    // 대출 상태와 기간에 따른 대출 건 조회
    List<Loan> findByStatusEqualsAndRedemptionDateBetween(char status, LocalDateTime leftDate, LocalDateTime rightDate);
}
