class Address < ActiveRecord::Base
  include ActionView::Helpers::TagHelper

  belongs_to :has_address, :polymorphic => true

  STATE_HASH = {"AL"=>"Alabama", "AK"=>"Alaska", "AZ"=>"Arizona", "AR"=>"Arkansas", "CA"=>"California", "CO"=>"Colorado", "CT"=>"Connecticut", "DC"=>"Washington DC", "DE"=>"Delaware", "FL"=>"Florida", "GA"=>"Georgia", "HI"=>"Hawaii", "ID"=>"Idaho", "IL"=>"Illinois", "IN"=>"Indiana", "IA"=>"Iowa", "KS"=>"Kansas", "KY"=>"Kentucky", "LA"=>"Louisiana", "ME"=>"Maine", "MD"=>"Maryland", "MA"=>"Massachusetts", "MI"=>"Michigan", "MN"=>"Minnesota", "MS"=>"Mississippi", "MO"=>"Missouri", "MT"=>"Montana", "NE"=>"Nebraska", "NV"=>"Nevada", "NH"=>"New Hampshire", "NJ"=>"New Jersey", "NM"=>"New Mexico", "NY"=>"New York", "NC"=>"North Carolina", "ND"=>"North Dakota", "OH"=>"Ohio", "OK"=>"Oklahoma", "OR"=>"Oregon", "PA"=>"Pennsylvania", "RI"=>"Rhode Island", "SC"=>"South Carolina", "SD"=>"South Dakota", "TN"=>"Tennessee", "TX"=>"Texas", "UT"=>"Utah", "VT"=>"Vermont", "VA"=>"Virginia", "WA"=>"Washington", "WV"=>"West Virginia", "WI"=>"Wisconsin", "WY"=>"Wyoming"}

  def state_short
    return self.state.upcase if STATE_HASH.has_key?(self.state.upcase)

    STATE_HASH.each do |k, v|
      return k if self.state.upcase == v.upcase
    end

    return self.state
  end

  geocoded_by :to_s

  reverse_geocoded_by :lat, :lon do |address, results|
    parse_reverse_geocode_results(address, results)
  end

  def to_s
    s = ''
    [:street, :street2, :street3, :city, :state, :zip].each do |sym|
      s += "#{send(sym)}, " if send(sym)
    end
    s.length > 2 ? s.chop.chop : s
  end

  def google_embedded_map(api_key, prefix: nil, zoom: 16)
    html = '<iframe src="'

    html += google_embedded_map_url(api_key, prefix: prefix, zoom: zoom)
    html += '"></iframe>'

    # html = content_tag :iframe, src: google_embedded_map_url(api_key, prefix: prefix, zoom: zoom)
    html.html_safe
  end

  def google_map_link
    "https://www.google.com/maps/place/#{to_s.gsub(' ', '+')}/@#{lat},#{lon},17z/data=!3m1!4b1!4m2!3m1!1s0x548fbf599dca6039:0xf468b51315c688e5"
  end

  # def google_embedded_directions(api_key, prefix: nil, zoom: 16)

  # end

  def google_embedded_map_url(api_key, prefix: nil, maptype: 'roadmap', zoom: 16)
    url = "https://www.google.com/maps/embed/v1/place?key="
    url += api_key
    url += "&maptype=#{maptype}&zoom=#{zoom}&q="
    url += "#{prefix},+" if prefix
    url += self.to_s.parameterize
    url
  end

  def google_embedded_directions_from_my_location_url(api_key, prefix: nil)
    url = "https://www.google.com/maps/embed/v1/directions?key="
    url += api_key
    url += "&origin=my+location&destination="
    url += "#{prefix},+" if prefix
    url += self.to_s.parameterize
    url += '"'
    url
  end

  def self.geocode_zip(zip)
    a = new zip: zip
    a.geocode
    [a.lat, a.lon]
  end

  private

  def self.parse_reverse_geocode_results(address, results)
    if geo = results.first
      address.city = geo.city
      address.state = geo.state
      address.zip = geo.postal_code
    end

    address
  end
end
