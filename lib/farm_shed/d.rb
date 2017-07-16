class D
  # For Dates and formatting dates for display

  DATETIME_FORMATTER = "%B %e, %Y %l:%M%P"

  DATE_FORMATTER = "%B %e, %Y"

  TIME_FORMATTER = '%L:%M%P'

  def initialize(datetime)
    @base = datetime
  end

  def datetime
    @base.strftime(DATETIME_FORMATTER)
  end

  def date
    @base.strftime(DATE_FORMATTER)
  end

  def time
    @base.strftime(TIME_FORMATTER)
  end

  def zone_name
    @base.strftime('%Z')
  end

  def zone_offest
    @base.strftime('%z')
  end

  def datetime_with_zone
    "#{datetime} #{zone_name}"
  end

  def time_with_zone
    "#{time} #{zone_name}"
  end

  def machine_date
    @base.strftime('%Y-%m-%d')
  end

  def machine_time(datetime)
    raise 'ERROR'
    # datetime.strftime('%Y-%m-%d')
  end
end
