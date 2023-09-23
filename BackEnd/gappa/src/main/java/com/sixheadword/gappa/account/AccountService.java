package com.sixheadword.gappa.account;

import com.sixheadword.gappa.account.dto.request.SetPrimaryReqeustDto;
import com.sixheadword.gappa.account.dto.response.GetAccountResponseDto;
import com.sixheadword.gappa.account.repository.AccountRepository;
import com.sixheadword.gappa.user.User;
import com.sixheadword.gappa.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.lang.reflect.Member;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AccountService {

    private final AccountRepository accountRepository;
    private final EntityManager em;

    // 대표 계좌 설정
    public void setPrimaryAccount(SetPrimaryReqeustDto setPrimaryReqeustDto, Authentication authentication){
//        Long userSeq = Long.parseLong(authentication.getName());
        Long accountSeq = setPrimaryReqeustDto.getAccountSeq();

        Account account = accountRepository.findById(accountSeq).orElse(null);
        if(account != null){
            account.modifyPrimary(true);
            accountRepository.save(account);
        }else {
            throw new IllegalArgumentException("계좌를 찾을 수 없습니다.");
        }
    }

    // 대표 계좌 변경
    public void changePrimaryAccount(SetPrimaryReqeustDto setPrimaryReqeustDto, Authentication authentication){
        Long userSeq = Long.parseLong(authentication.getName());
        Long accountSeq = setPrimaryReqeustDto.getAccountSeq();

        // 현재 대표 계좌 해제
        accountRepository.unsetPrimaryAccount(userSeq, accountSeq);
        // 대표 계좌 설정
        Account account = accountRepository.findById(accountSeq).orElse(null);
        if(account != null){
            account.modifyPrimary(true);
            accountRepository.save(account);
        }else {
            throw new IllegalArgumentException("계좌를 찾을 수 없습니다.");
        }
    }

    // 대표 계좌 조회
    public GetAccountResponseDto getPrimaryAccount(Long userSeq){
        Account account = accountRepository.findById(userSeq).orElse(null);

        if(account != null){
            GetAccountResponseDto result = GetAccountResponseDto.builder()
                    .account_seq(account.getAccountSeq())
                    .account_number(account.getAccountNumber())
                    .bank(account.getBank())
                    .balance(account.getBalance())
                    .build();

            return result;
        }else{
            throw new IllegalArgumentException("계좌를 찾을 수 없습니다");

        }
    }

    // 전체 계좌 조회
    public List<GetAccountResponseDto> getAllAcount(Long userSeq){
        User user = em.find(User.class, userSeq);
        List<Account> accounts = accountRepository.findByUser(user);

        if(accounts.size() != 0){
            List<GetAccountResponseDto> getAccountResponseDtos = new ArrayList<>();
            for(Account account : accounts){
                GetAccountResponseDto getAccountResponseDto = GetAccountResponseDto.builder()
                        .account_seq(account.getAccountSeq())
                        .account_number(account.getAccountNumber())
                        .bank(account.getBank())
                        .balance(account.getBalance())
                        .build();
                getAccountResponseDtos.add(getAccountResponseDto);
            }
            return getAccountResponseDtos;
        }else{
            throw new IllegalArgumentException("계좌를 찾을 수 없습니다");
        }

    }

}
