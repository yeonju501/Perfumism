package com.ladder.perfumism.member.service;

import com.ladder.perfumism.member.domain.Member;
import javax.mail.MessagingException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {
//
//    private final JavaMailSender javaMailSender;
//
//    public MailService() {
//    }
//
//    public void sendMailChangePassword(Member member) {
//        .setTo(member.getEmail());
//        simpleMailMessage.setSubject("[Perfumism]" + member.getUsername() + "님의 비밀번호 찾기 안내입니다.");
//        simpleMailMessage.setText("안녕하세요. Perfumism 입니다.\n"
//            + member.getUsername() + "님의 비밀번호 찾기 안내 이메일 입니다. \n\n"
//            + "아래 링크를 통해 비밀번호를 변경할 수 있습니다.");
//        String htmlContent = "<a href=\"xxx\">Label</a>";
//        messageHelper = new MimeMessageHelper(simpleMailMessage, true, "UTF-8");
//        mailHandler.setText(htmlContent, true);
//        simpleMailMessage.set
//    }
}
