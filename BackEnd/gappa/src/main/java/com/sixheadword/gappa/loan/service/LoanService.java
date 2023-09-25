package com.sixheadword.gappa.loan.service;

import com.sixheadword.gappa.loan.Loan;
import com.sixheadword.gappa.loan.dto.request.LoanInfoRequestDto;
import com.sixheadword.gappa.loan.dto.response.GetLoanOppResponseDto;
import com.sixheadword.gappa.loan.dto.response.GetLoanResponseDto;
import com.sixheadword.gappa.loan.repository.LoanRepository;
import com.sixheadword.gappa.user.User;
import com.sixheadword.gappa.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class LoanService {

    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final EntityManager em;


    // 대출 정보 등록
    public void registLoanInfo(LoanInfoRequestDto loanInfoRequestDto) {

        User fromUser = userRepository.findById(loanInfoRequestDto.getFromUser()).orElse(null);
        User toUser = userRepository.findById(loanInfoRequestDto.getToUser()).orElse(null);
        Long calInterest = Math.round((loanInfoRequestDto.getPrincipal() * 0.2) / 365);

        if(fromUser != null && toUser != null){
            Loan loan = new Loan();
            loan.setFromUser(fromUser);
            loan.setToUser(toUser);
            loan.setPrincipal(loanInfoRequestDto.getPrincipal());
            loan.setLoanReasonCategory(loanInfoRequestDto.getLoanReasonCategory());
            loan.setLoanOtherReason(loanInfoRequestDto.getLoanOtherReason());
            loan.setStartDate(loanInfoRequestDto.getStartDate());
            loan.setRedemptionDate(loanInfoRequestDto.getRedemptionDate());
            loan.setInterest(calInterest);
            loan.setStatus('W');

//            Loan loan = Loan.builder()
//                    .fromUser(fromUser)
//                    .toUser(toUser)
//                    .principal(loanInfoRequestDto.getPrincipal())
//                    .loanReasonCategory(loanInfoRequestDto.getLoanReasonCategory())
//                    .loanOtherReason(loanInfoRequestDto.getLoanOtherReason())
//                    .startDate(loanInfoRequestDto.getStartDate())
//                    .redemptionDate(loanInfoRequestDto.getRedemptionDate())
//                    .interest(calInterest)
//                    .status('W')
//                    .build();
            loanRepository.save(loan);
        }else{
            throw new IllegalArgumentException("대출 신청에 실패했습니다.");
        }
    }



    // 대출 이력 조회
    public List<GetLoanResponseDto> getLoan(Authentication authentication){
        Long userSeq = Long.parseLong(authentication.getName());
        User user = userRepository.findById(userSeq).orElse(null);
        List<Loan> loans = loanRepository.findByFromUser(user);

        if(!loans.isEmpty()){
            List<GetLoanResponseDto> getLoanResponseDtos = new ArrayList<>();
            for(Loan loan : loans){
                // 신청중(W)과 취소(F)인 경우 제외
                if(loan.getStatus() == 'W' || loan.getStatus() == 'F') continue;
                GetLoanResponseDto getLoanResponseDto = GetLoanResponseDto.builder()
                        .loanSeq(loan.getLoanSeq())
                        .toUser(loan.getToUser().getName())
                        .principal(loan.getPrincipal())
                        .startDate(loan.getStartDate())
                        .redemptionDate(loan.getRedemptionDate())
                        .profileImg(loan.getToUser().getProfileImg())
                        .status(loan.getStatus())
                        .build();
                getLoanResponseDtos.add(getLoanResponseDto);
            }
            return getLoanResponseDtos;
        }else {
            throw new IllegalArgumentException("대출 이력이 없습니다.");
        }
    }

    // 대출중 이력 조회
    public List<GetLoanResponseDto> getOnLoan(Authentication authentication){
        Long userSeq = Long.parseLong(authentication.getName());
        List<Loan> loans = loanRepository.getOnLoanByUserSeq(userSeq);

        if(!loans.isEmpty()){
            List<GetLoanResponseDto> getLoanResponseDtos = new ArrayList<>();
            for(Loan loan : loans){
                GetLoanResponseDto getLoanResponseDto = GetLoanResponseDto.builder()
                        .loanSeq(loan.getLoanSeq())
                        .toUser(loan.getToUser().getName())
                        .principal(loan.getPrincipal())
                        .startDate(loan.getStartDate())
                        .redemptionDate(loan.getRedemptionDate())
                        .profileImg(loan.getToUser().getProfileImg())
                        .status(loan.getStatus())
                        .build();
                getLoanResponseDtos.add(getLoanResponseDto);
            }
            return getLoanResponseDtos;
        }else{
            throw new IllegalArgumentException("대출중인 이력이 없습니다.");
        }
    }

    // 대금 이력 조회
    public List<GetLoanOppResponseDto> getLoanOpp(Authentication authentication){
        Long userSeq = Long.parseLong(authentication.getName());
        User user = userRepository.findById(userSeq).orElse(null);
        List<Loan> loans = loanRepository.findByToUser(user);

        if(!loans.isEmpty()){
            List<GetLoanOppResponseDto> getLoanOppResponseDtos = new ArrayList<>();
            for(Loan loan : loans){
                // 신청중(W)과 취소(F)인 경우 제외
                if(loan.getStatus() == 'W' || loan.getStatus() == 'F') continue;
                GetLoanOppResponseDto getLoanOppResponseDto = GetLoanOppResponseDto.builder()
                        .loanSeq(loan.getLoanSeq())
                        .fromUser(loan.getFromUser().getName())
                        .profileImg(loan.getFromUser().getProfileImg())
                        .principal(loan.getPrincipal())
                        .startDate(loan.getStartDate())
                        .redemptionDate(loan.getRedemptionDate())
                        .status(loan.getStatus())
                        .build();
                getLoanOppResponseDtos.add(getLoanOppResponseDto);
            }
            return getLoanOppResponseDtos;
        }else{
            throw new IllegalArgumentException("대금 이력이 없습니다.");
        }
        

    }

    // 대금중 이력 조회
    public List<GetLoanOppResponseDto> getOnLoanOpp(Authentication authentication){
        Long userSeq = Long.parseLong(authentication.getName());
        List<Loan> loans = loanRepository.getOnLoanOppByUserSeq(userSeq);

        if(!loans.isEmpty()){
            List<GetLoanOppResponseDto> getLoanOppResponseDtos = new ArrayList<>();
            for(Loan loan : loans){
                GetLoanOppResponseDto getLoanOppResponseDto = GetLoanOppResponseDto.builder()
                        .loanSeq(loan.getLoanSeq())
                        .fromUser(loan.getFromUser().getName())
                        .profileImg(loan.getFromUser().getProfileImg())
                        .principal(loan.getPrincipal())
                        .startDate(loan.getStartDate())
                        .redemptionDate(loan.getRedemptionDate())
                        .status(loan.getStatus())
                        .build();
                getLoanOppResponseDtos.add(getLoanOppResponseDto);
            }
            return getLoanOppResponseDtos;
        }else{
            throw new IllegalArgumentException("대금중인 이력이 없습니다.");
        }
    }

}
