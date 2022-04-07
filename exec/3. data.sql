create table accord (
       accord_id bigint not null auto_increment,
        eng_name varchar(255),
        kor_name varchar(255),
        primary key (accord_id)
    );

    create table article (
       article_id bigint not null auto_increment,
        created_at datetime not null,
        deleted_at datetime,
        updated_at datetime,
        content longtext not null,
        subject varchar(255) not null,
        title varchar(255) not null,
        vote_exist bit not null,
        member_id bigint,
        primary key (article_id)
    );
 
    create table article_image (
       image_id bigint not null auto_increment,
        created_at datetime not null,
        deleted_at datetime,
        updated_at datetime,
        image_url varchar(255),
        article_id bigint,
        primary key (image_id)
    );
   
    create table brand (
       brand_id bigint not null auto_increment,
        name varchar(255),
        primary key (brand_id)
    );
   
    create table comment (
       comment_id bigint not null auto_increment,
        created_at datetime not null,
        deleted_at datetime,
        updated_at datetime,
        content longtext not null,
        deletion bit,
        article_id bigint,
        member_id bigint,
        parent_id bigint,
        primary key (comment_id)
    );
    
    create table member (
       member_id bigint not null auto_increment,
        created_at datetime not null,
        deleted_at datetime,
        updated_at datetime,
        authority varchar(255),
        email varchar(50) not null,
        gender integer,
        image varchar(255),
        kakao_id varchar(255),
        password varchar(255) not null,
        username varchar(20) not null,
        primary key (member_id)
    );
    
    create table notification (
       notification_id bigint not null auto_increment,
        created_at datetime not null,
        deleted_at datetime,
        updated_at datetime,
        read_at datetime,
        type varchar(255),
        comment_id bigint,
        member_id bigint,
        primary key (notification_id)
    );

    create table passwordcode (
       code_id varchar(255) not null,
        expiration_date datetime,
        expired bit,
        user_id bigint,
        primary key (code_id)
    );

    create table perfume (
       perfume_id bigint not null auto_increment,
        average_grade double precision,
        base_notes varchar(255),
        image varchar(255),
        launch_year integer,
        longevity varchar(255),
        middle_notes varchar(255),
        name varchar(255),
        sillage varchar(255),
        top_notes varchar(255),
        total_like integer,
        total_survey bigint,
        brand_id bigint,
        primary key (perfume_id)
    );

    create table perfume_accord (
       perfume_accord_id bigint not null auto_increment,
        accord_id bigint,
        perfume_id bigint,
        primary key (perfume_accord_id)
    );

    create table perfume_like (
       perfume_like_id bigint not null auto_increment,
        created_at datetime not null,
        deleted_at datetime,
        updated_at datetime,
        member_id bigint,
        perfume_id bigint,
        primary key (perfume_like_id)
    );

    create table perfume_monthly (
       perfume_monthly_id bigint not null auto_increment,
        created_at datetime not null,
        deleted_at datetime,
        updated_at datetime,
        like_count bigint,
        perfume_id bigint,
        primary key (perfume_monthly_id)
    );
 
    create table refresh_token (
       refresh_token_id bigint not null auto_increment,
        email varchar(255),
        token varchar(255),
        primary key (refresh_token_id)
    );

    create table review (
       review_id bigint not null auto_increment,
        created_at datetime not null,
        deleted_at datetime,
        updated_at datetime,
        content longtext,
        grade integer,
        total_like integer,
        member_id bigint,
        perfume_id bigint,
        primary key (review_id)
    );
  
    create table review_like (
       review_like_id bigint not null auto_increment,
        created_at datetime not null,
        deleted_at datetime,
        updated_at datetime,
        member_id bigint,
        review_id bigint,
        primary key (review_like_id)
    );
  
    create table similar_perfume (
       similar_perfume_id bigint not null auto_increment,
        origin_id bigint,
        similar_id bigint,
        primary key (similar_perfume_id)
    );
  
    create table vote (
       vote_id bigint not null auto_increment,
        created_at datetime not null,
        deleted_at datetime,
        updated_at datetime,
        expiration bit,
        title varchar(255) not null,
        total_voter integer,
        article_id bigint,
        primary key (vote_id)
    );

    create table vote_item (
       vote_item_id bigint not null auto_increment,
        created_at datetime not null,
        deleted_at datetime,
        updated_at datetime,
        content varchar(255) not null,
        vote_member_count integer,
        vote_id bigint,
        primary key (vote_item_id)
    );

    create table vote_member (
       vote_member_id bigint not null auto_increment,
        created_at datetime not null,
        deleted_at datetime,
        updated_at datetime,
        member_id bigint,
        vote_id bigint,
        vote_item_id bigint,
        primary key (vote_member_id)
    );
