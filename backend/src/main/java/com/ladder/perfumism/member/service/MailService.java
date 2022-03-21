package com.ladder.perfumism.member.service;

import com.ladder.perfumism.global.exception.BusinessException;
import com.ladder.perfumism.global.exception.ErrorCode;
import com.ladder.perfumism.member.domain.Member;
import java.util.Random;
import javax.mail.MessagingException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender javaMailSender;

    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendMailChangePassword(Member member, String code) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(member.getEmail());
        simpleMailMessage.setSubject("[Perfumism]" + member.getUsername() + "님의 비밀번호 찾기 안내입니다.");
        simpleMailMessage.setText("안녕하세요. Perfumism 입니다.\n"
            + member.getUsername() + "님의 비밀번호 찾기 안내 이메일 입니다. \n\n"
            + "아래 인증번호를 통해 비밀번호를 변경할 수 있습니다. \n"
            + "인증 번호: " + code);
        javaMailSender.send(simpleMailMessage);
    }

    public String randomCode() {
        StringBuilder temp = new StringBuilder();

        Random rnd = new Random();
        for (int i = 0; i < 16; i++) {
            int rIndex = rnd.nextInt(3);
            switch (rIndex) {
                case 0:
                    temp.append((char) (rnd.nextInt(26) + 97));
                    break;
                case 1:
                    temp.append((char) (rnd.nextInt(26) + 65));
                    break;
                case 2:
                    temp.append(rnd.nextInt(10));
                    break;
            }
        }

        return temp.toString();
    }
}
