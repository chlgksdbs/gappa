package com.sixheadword.gappa.loan;

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

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class LoanService {

    private LoanRepository loanRepository;
    private UserRepository userRepository;

    // 대출 이력 조회
    public List<GetLoanResponseDto> getLoan(Authentication authentication){
        Long userSeq = Long.parseLong(authentication.getName());
        User user = userRepository.findById(userSeq).orElse(null);
        List<Loan> loans = loanRepository.findByFromUser(user);
        
        if(!loans.isEmpty()){
            List<GetLoanResponseDto> getLoanResponseDtos = new ArrayList<>();
            for(Loan loan : loans){
                GetLoanResponseDto getLoanResponseDto = GetLoanResponseDto.builder()
                        .loanSeq(loan.getLoanSeq())
                        .toUser(loan.getToUser().getUserSeq())
                        .principal(loan.getPrincipal())
                        .startDate(loan.getStartDate())
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
                        .toUser(loan.getToUser().getUserSeq())
                        .principal(loan.getPrincipal())
                        .startDate(loan.getStartDate())
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
                GetLoanOppResponseDto getLoanOppResponseDto = GetLoanOppResponseDto.builder()
                        .loanSeq(loan.getLoanSeq())
                        .fromUser(loan.getFromUser().getUserSeq())
                        .principal(loan.getPrincipal())
                        .startDate(loan.getStartDate())
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
                        .fromUser(loan.getFromUser().getUserSeq())
                        .principal(loan.getPrincipal())
                        .startDate(loan.getStartDate())
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
