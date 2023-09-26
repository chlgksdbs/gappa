package com.sixheadword.gappa.accountHistory;

import com.sixheadword.gappa.accountHistory.dto.request.SetAccountTransactionRequestDto;
import com.sixheadword.gappa.accountHistory.dto.response.GetAccountTransactionResponseDto;
import com.sixheadword.gappa.accountHistory.repository.AccountHistoryRepository;
import com.sixheadword.gappa.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class AccountHistoryService {

    private final UserRepository userRepository;
    private final AccountHistoryRepository accountHistoryRepository;

    // 계좌 거래 내역 상세조회
    public List<GetAccountTransactionResponseDto> getTransactionDetail(SetAccountTransactionRequestDto setAccountTransactionRequestDto){
        List<AccountHistory> accountHistories = accountHistoryRepository.findAllByAccountSeq(setAccountTransactionRequestDto.getAccountSeq());

        List<GetAccountTransactionResponseDto> getAccountTransactionResponseDtos = new ArrayList<>();
        if(!accountHistories.isEmpty()){
            for(AccountHistory accountHistory : accountHistories){
                    GetAccountTransactionResponseDto getAccountTransactionResponseDto = GetAccountTransactionResponseDto.builder()
                            .accountHistorySeq(accountHistory.getAccountHistorySeq())
                            .toUser(accountHistory.getToUser().getName())
                            .oldBalance(accountHistory.getOldBalance())
                            .newBalance(accountHistory.getNewBalance())
                            .amount(accountHistory.getAmount())
                            .createdAt(accountHistory.getCreatedAt())
                            .accountType(accountHistory.isAccountType())
                            .profileImg(accountHistory.getToUser().getProfileImg())
                            .build();
                    getAccountTransactionResponseDtos.add(getAccountTransactionResponseDto);
                }
            }
        return getAccountTransactionResponseDtos;
    }

}
