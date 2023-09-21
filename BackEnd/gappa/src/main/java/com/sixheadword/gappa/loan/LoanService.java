package com.sixheadword.gappa.loan;

import com.sixheadword.gappa.loan.dto.response.GetLoanOppResponseDto;
import com.sixheadword.gappa.loan.dto.response.GetLoanResponseDto;
import com.sixheadword.gappa.loan.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    // 대출 이력 조회
    public List<GetLoanResponseDto> getLoan(Long userSeq){
        List<Loan> loans = loanRepository.getLoanByUserSeq(userSeq);

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
    }

    // 대출중 이력 조회
    public List<GetLoanResponseDto> getOnLoan(Long userSeq){
        List<Loan> loans = loanRepository.getOnLoanByUserSeq(userSeq);

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

    }

    // 대금 이력 조회
    public List<GetLoanOppResponseDto> getLoanOpp(Long userSeq){
        List<Loan> loans = loanRepository.getLoanOppByUserSeq(userSeq);

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

    }

    // 대금중 이력 조회
    public List<GetLoanOppResponseDto> getOnLoanOpp(Long userSeq){
        List<Loan> loans = loanRepository.getOnLoanOppByUserSeq(userSeq);

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

    }

}
