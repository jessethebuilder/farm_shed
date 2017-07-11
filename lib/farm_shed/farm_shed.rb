module FarmShed
  #--- Time/Date stuff -----------------------------------------------------------
  def machine_date(datetime)
    datetime.strftime('%Y-%m-%d')
  end

  def wordy_date(datetime)
    datetime.strftime('%B %e, %Y')
  end

  def machine_time(datetime)
    datetime.strftime('%Y-%m-%d')
  end

  def wordy_time(datetime)
    datetime.strftime('%H:%M')
  end

  #--- Random Password ------------------------------------------------------------
  def random_password_character
    %w|a b c d e f g h i j k l m n o p q r s t u v w x y z
       A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
       1 2 3 4 5 6 7 8 9 0 ! ? @ * $ %|.sample
  end

  def random_password(length = 12)
    pw = ''
    length.times{ pw += random_password_character }
    pw
  end
end
